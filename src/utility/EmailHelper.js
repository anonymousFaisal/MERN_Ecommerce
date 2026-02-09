const { Resend } = require("resend");
const config = require("../config/config");

const resend = new Resend(config.email.resendApiKey);

const EmailSent = async (emailTo, emailText, emailSubject) => {
  try {
    const { data, error } = await resend.emails.send({
      from: config.email.from,
      to: emailTo,
      subject: emailSubject,
      text: emailText,
    });

    if (error) {
      return { status: "error", message: error.message };
    }

    return { status: "success", message: "Email sent successfully", info: data };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

module.exports = { EmailSent };
