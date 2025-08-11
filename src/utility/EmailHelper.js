const nodemailer = require("nodemailer");

const EmailSent = async (emailTo, emailText, emailSubject) => {
  const transport = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: "25",
    secure: false,
    auth: { user: "info@teamrabbil.com", pass: "~sR4[bhaC[Qs" },
    tls: { rejectUnauthorized: false },
  });
    const mailOptions = {
    from: "MERN Ecommerce Solution <info@teamrabbil.com>",
    to: emailTo,
    subject: emailSubject,
    text: emailText,
  };

    try {
    const info = await transport.sendMail(mailOptions);
    return { status: "success", message: "Email sent successfully", info };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};


module.exports = { EmailSent };