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

exports.PaymentSuccess = async (req, res) => {};

exports.PaymentFail = async (req, res) => {};

exports.PaymentCancel = async (req, res) => {};

exports.PaymentIPN = async (req, res) => {};

exports.InvoiceList = async (req, res) => {};

exports.InvoiceProductList = async (req, res) => {};