const {
  CreateInvoiceService,
  PaymentFailService,
  PaymentCancelService,
  PaymentIPNService,
  PaymentSuccessService,
  InvoiceListService,
  InvoiceProductListService,
} = require("../services/InvoiceServices");

exports.CreateInvoice = async (req, res) => {
  try {
    const user_ID = req.user?.id;
    const email = req.user?.email;
    if (!user_ID || !email) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    const result = await CreateInvoiceService({ user_ID, email });
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.PaymentSuccess = async (req, res) => {
  try {
    trxID = req.params.trxID;
    const result = await PaymentSuccessService(trxID);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.PaymentFail = async (req, res) => {
  try {
    trxID = req.params.trxID;
    const result = await PaymentFailService(trxID);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.PaymentCancel = async (req, res) => {
  try {
    trxID = req.params.trxID;
    const result = await PaymentCancelService(trxID);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.PaymentIPN = async (req, res) => {
  try {
    trxID = req.params.trxID;
    let sslStatus = req.body.status;
    const result = await PaymentIPNService(trxID, sslStatus);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.InvoiceList = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    const result = await InvoiceListService(userID);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

exports.InvoiceProductList = async (req, res) => {
  try {
    const user_ID = req.user?.id;
    if (!user_ID) {
      return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }
    const invoice_ID = req.params.invoiceID;
    const result = await InvoiceProductListService(user_ID, invoice_ID);
    const code = result.status === "success" ? 200 : 400;
    return res.status(code).json(result);
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
