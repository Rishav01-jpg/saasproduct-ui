const nodemailer = require("nodemailer");

const sendDemoReminderEmail = async (booking) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CRM Demo" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "Reminder: Your CRM Demo at 11:00 AM 🚀",
      html: `
        <h2>Hi ${booking.name},</h2>
        <p>Your CRM live demo is scheduled at <b>11:00 AM</b>.</p>
        <p>Please join using the Zoom link below:</p>
        <a href="${booking.zoomLink}">${booking.zoomLink}</a>
        <br/><br/>
        <p>See you soon!</p>
        <p>— CRM Team</p>
      `,
    });

    console.log("Reminder email sent to:", booking.email);
  } catch (error) {
    console.error("Email error:", error.message);
  }
};

module.exports = sendDemoReminderEmail;