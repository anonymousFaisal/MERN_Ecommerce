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

const CreateInvoiceService = async ({ user_ID, email }) => {
  try {
    if (!Types.ObjectId.isValid(user_ID)) {
      return { status: "error", message: "Invalid user id" };
    }
    const userID = new Types.ObjectId(user_ID);
    // ===========1. Calculate Total Payable and Vat ===============
    let matchStage = { $match: { userID } };
    let joinProductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProductStage = { $unwind: { path: "$product" } };
    let cartProducts = await CartModel.aggregate([matchStage, joinProductStage, unwindProductStage]);
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
    vat = Number(vat.toFixed(2));
    payable = Number(payable.toFixed(2));

    // ===========2. Prepare Customer Details and Shipping Details ===========
    const profile = await ProfileModel.findOne({ userID }).lean();
    if (!profile) {
      return { status: "fail", message: "Profile not found. Complete profile first." };
    }

    const cus_details = `Name: ${profile.cus_name}, Email: ${email}, Address: ${profile.cus_add}, Phone: ${profile.cus_phone}`;
    const ship_details = `Name: ${profile.ship_name}, City: ${profile.ship_city}, Address: ${profile.ship_add}, Phone: ${profile.ship_phone}`;

    // ===========3. Create Invoice ===========
    const session = await startSession();
    let invoice;

    try {
      await session.withTransaction(async () => {
        const tran_id = crypto.randomUUID() ;

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

      return { status: "success", data: invoice };
    } catch (err) {
      return { status: "error", message: err.message };
    } finally {
      session.endSession();
    }

    // ===========4. Prepare SSL Payment ===========

    return {
      status: "success",
      message: "Invoice created successfully",
    };
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
