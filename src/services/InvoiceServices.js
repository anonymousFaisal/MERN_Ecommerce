const mongoose = require("mongoose");
const CartModel = require("../models/CartModel");
const ProfileModel = require("../models/ProfileModel");
const InvoiceModel = require("../models/InvoiceModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentSettingModel = require("../models/PaymentSettingModel");
const { Types, startSession } = mongoose;
const FormData = require("form-data");
const axios = require("axios");
const crypto = require("crypto");

// Function to round to 2 decimal places
const round2 = (n) => Number(Math.round((Number(n) + Number.EPSILON) * 100) / 100);

const CreateInvoiceService = async ({ user_ID, email }) => {
  try {
    if (!Types.ObjectId.isValid(user_ID)) {
      return { status: "error", message: "Invalid user id" };
    }
    const userID = new Types.ObjectId(user_ID);

    // =========== 1. Calculate Total Payable and Vat ===============
    const matchStage = { $match: { userID } };
    const joinProductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    const unwindProductStage = { $unwind: { path: "$product" } };

    const cartProducts = await CartModel.aggregate([matchStage, joinProductStage, unwindProductStage]);

    if (cartProducts.length === 0) {
      return { status: "error", message: "Cart is empty" };
    }

    // Compute Totals
    let totalAmount = 0;
    cartProducts.forEach((element) => {
      const price = element.product.discount ? Number(element.product.discountPrice) : Number(element.product.price);
      totalAmount += price * Number(element.qty);
    });

    let vat = totalAmount * 0.05; // 5% vat
    let payable = totalAmount + vat;
    vat = round2(vat);
    payable = round2(payable);

    // =========== 2. Prepare Customer Details and Shipping Details ===========
    const profile = await ProfileModel.findOne({ userID }).lean();
    if (!profile) {
      return {
        status: "error",
        message: "Profile not found. Complete profile first.",
      };
    }

    const cus_details = `Name: ${profile.cus_name}, Email: ${email}, Address: ${profile.cus_add}, Phone: ${profile.cus_phone}`;
    const ship_details = `Name: ${profile.ship_name}, City: ${profile.ship_city}, Address: ${profile.ship_add}, Phone: ${profile.ship_phone}`;

    // =========== 3. Create Invoice ===========
    const session = await startSession();
    let invoice;
    const tran_id = crypto.randomUUID();
    try {
      await session.withTransaction(async () => {
        // Create invoice
        invoice = await InvoiceModel.create(
          [
            {
              userID,
              total: totalAmount,
              vat,
              payable,
              cus_details,
              ship_details,
              tran_id,
              val_id: 0,
              payment_status: "pending",
              delivery_status: "pending",
            },
          ],
          { session }
        );

        const invoiceID = invoice[0]._id;

        // Insert invoice products directly from cartProducts
        await InvoiceProductModel.insertMany(
          cartProducts.map((element) => ({
            userID,
            productID: element.productID,
            invoiceID,
            qty: Number(element.qty),
            price: element.product.discount ? Number(element.product.discountPrice) : Number(element.product.price),
            color: element.color,
            size: element.size,
          })),
          { session }
        );

        // Clear cart
        await CartModel.deleteMany({ userID }, { session });
      });
    } catch (err) {
      return { status: "error", message: err.message };
    } finally {
      session.endSession();
    }

    // =========== 4. Prepare SSLCommerz Payment ===========
    let PaymentSettings = await PaymentSettingModel.find();
    const form = new FormData();

    // payment settings
    form.append("store_id", PaymentSettings[0].store_id);
    form.append("store_passwd", PaymentSettings[0].store_passwd);
    form.append("total_amount", payable.toString());
    form.append("currency", PaymentSettings[0].currency);
    form.append("tran_id", tran_id);
    form.append("success_url", PaymentSettings[0].success_url);
    form.append("fail_url", PaymentSettings[0].fail_url);
    form.append("cancel_url", PaymentSettings[0].cancel_url);
    form.append("ipn_url", PaymentSettings[0].ipn_url);

    // customer details
    form.append("cus_name", profile.cus_name);
    form.append("cus_email", email);
    form.append("cus_add1", profile.cus_add);
    form.append("cus_city", profile.cus_city);
    form.append("cus_state", profile.cus_state);
    form.append("cus_postcode", profile.cus_postcode);
    form.append("cus_country", profile.cus_country);
    form.append("cus_phone", profile.cus_phone);

    // shipping details
    form.append("shipping_method", "YES");
    form.append("ship_name", profile.ship_name);
    form.append("ship_add1", profile.ship_add);
    form.append("ship_city", profile.ship_city);
    form.append("ship_state", profile.ship_state);
    form.append("ship_postcode", profile.ship_postcode);
    form.append("ship_country", profile.ship_country);
    form.append("ship_phone", profile.ship_phone);

    // product details
    form.append("product_name", "MERN Shop product");
    form.append("product_category", "MERN Shop product category");
    form.append("product_profile", "According to invoice");
    form.append("product_amount", "According to invoice");

    const SSLRes = await axios.post(PaymentSettings[0].init_url, form);

    return { status: "success", data: SSLRes.data };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

const PaymentFailService = async () => {};

const PaymentCancelService = async () => {};

const PaymentIPNService = async () => {};

const PaymentSuccessService = async () => {};

const InvoiceListService = async () => {};

const InvoiceProductListService = async () => {};

module.exports = {
  CreateInvoiceService,
  PaymentFailService,
  PaymentCancelService,
  PaymentIPNService,
  PaymentSuccessService,
  InvoiceListService,
  InvoiceProductListService,
};
