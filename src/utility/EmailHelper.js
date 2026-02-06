const nodemailer = require("nodemailer");

const EmailSent = async (emailTo, emailText, emailSubject) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURITY === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: "MERN Ecommerce Solution <info@teamrabbil.com>",
    to: emailTo,
    subject: emailSubject,
    text: emailText,
    envelope: { from: "info@teamrabbil.com", to: emailTo },
  };

  try {
    const info = await transport.sendMail(mailOptions);
    return { status: "success", message: "Email sent successfully", info };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};

module.exports = { EmailSent };
