const Message = require('../models/Message');
const transporter = require('../utils/mailer');
const { verifiedEmails } = require('./otpController');

exports.submitMessage = async (req, res) => {
  const { name, mobile, email, subject, message } = req.body;

  if (!verifiedEmails.has(email)) {
    return res.status(403).json({ success: false, message: 'OTP not verified for this email.' });
  }

  try {
    await new Message({ name, mobile, email, subject, message }).save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER || 'seetaofficial25@gmail.com',
      replyTo: email,
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <h3>New message from Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    verifiedEmails.delete(email);
    res.json({ success: true, message: 'Message submitted & email sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
