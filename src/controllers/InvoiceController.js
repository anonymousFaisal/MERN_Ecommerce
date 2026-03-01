const {
  CreateInvoiceService,
  PaymentFailService,
  PaymentCancelService,
  PaymentIPNService,
  PaymentSuccessService,
  InvoiceListService,
  InvoiceProductListService,
} = require("../services/InvoiceServices");
const asyncHandler = require("../utility/asyncHandler");
const config = require("../config/config");

exports.CreateInvoice = asyncHandler(async (req, res) => {
  const user_ID = req.user?.id;
  const email = req.user?.email;
  if (!user_ID || !email) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const result = await CreateInvoiceService({ user_ID, email });
  const code = result.status === "success" ? 200 : 400;
  return res.status(code).json(result);
});

exports.PaymentSuccess = asyncHandler(async (req, res) => {
  let trxID = req.params.trxID;
  await PaymentSuccessService(trxID);
  return res.redirect(`${config.corsOrigin}/payment/success/${trxID}`);
});

exports.PaymentFail = asyncHandler(async (req, res) => {
  let trxID = req.params.trxID;
  await PaymentFailService(trxID);
  return res.redirect(`${config.corsOrigin}/payment/fail/${trxID}`);
});

exports.PaymentCancel = asyncHandler(async (req, res) => {
  let trxID = req.params.trxID;
  await PaymentCancelService(trxID);
  return res.redirect(`${config.corsOrigin}/payment/cancel/${trxID}`);
});

exports.PaymentIPN = asyncHandler(async (req, res) => {
  trxID = req.params.trxID;
  let sslStatus = req.body.status;
  const result = await PaymentIPNService(trxID, sslStatus);
  const code = result.status === "success" ? 200 : 400;
  return res.status(code).json(result);
});

exports.InvoiceList = asyncHandler(async (req, res) => {
  const userID = req.user?.id;
  if (!userID) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const result = await InvoiceListService(userID);
  const code = result.status === "success" ? 200 : 400;
  return res.status(code).json(result);
});

exports.InvoiceProductList = asyncHandler(async (req, res) => {
  const user_ID = req.user?.id;
  if (!user_ID) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
  const invoice_ID = req.params.invoiceID;
  const result = await InvoiceProductListService(user_ID, invoice_ID);
  const code = result.status === "success" ? 200 : 400;
  return res.status(code).json(result);
});
