const FinanceForm = require('../models/FinanceForm');
const nodemailer = require('nodemailer');

exports.submitForm = async (req, res) => {
  const { name, designation, company, mobile, email } = req.body;

  try {
    const newForm = new FinanceForm({ name, designation, company, mobile, email });
    await newForm.save();

    // Optional: send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: 'New Finance Form Submission',
      html: `
        <h3>New Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Designation:</strong> ${designation}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Email:</strong> ${email}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: 'Form submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
