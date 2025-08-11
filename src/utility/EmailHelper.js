const nodemailer = require("nodemailer");

const EmailSent = async (emailTo, emailText, emailSubject) => {
  const transport = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 587,                 
    secure: false,             
    auth: { user: "info@teamrabbil.com", pass: "~sR4[bhaC[Qs" },
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
