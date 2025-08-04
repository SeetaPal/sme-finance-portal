
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const nodemailer = require('nodemailer');
// require('dotenv').config();


// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // MongoDB connection
// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));


// // In-memory OTP storage
// const otpStore = {};  // { email: { otp, expiresAt } }


// // ✅ FIXED: Add verifiedEmails set
// const verifiedEmails = new Set();


// // Mongoose schema
// const messageSchema = new mongoose.Schema({
//   name: String,
//   mobile: String,
//   email: String,
//   subject: String,
//   message: String,
//   createdAt: { type: Date, default: Date.now }
// });
// const Message = mongoose.model('Message', messageSchema);

// // ✉️ Send OTP
// // app.post('/send-otp', async (req, res) => {
// //   const { email } = req.body;
// //   if (!email) return res.status(400).json({ success: false, message: "Email is required" });

// //   const otp = Math.floor(100000 + Math.random() * 900000).toString();
// //   const expiresAt = Date.now() + 5 * 60 * 1000;

// //   otpStore[email] = { otp, expiresAt };

// //   try {
// //     const transporter = nodemailer.createTransport({
// //       service: 'gmail',
// //       auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASS
// //       }
// //     });
    

   

// //     const mailOptions = {
// //       from: process.env.EMAIL_USER,             // sender (your email, from env)
// //       to: process.env.EMAIL_RECEIVER,           // admin/your receiver email from env
// //       subject: `New Contact Form Message: ${subject}`,
// //       html: `
// //         <h3>New message from Contact Form</h3>
// //         <p><strong>Name:</strong> ${name}</p>
// //         <p><strong>Mobile:</strong> ${mobile}</p>
// //         <p><strong>Email:</strong> ${email}</p>
// //         <p><strong>Message:</strong> ${message}</p>
// //       `
// //     };
    

// //     await transporter.sendMail(mailOptions);
// //     res.status(200).json({ success: true, message: 'OTP sent to email.' });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: 'Failed to send OTP.' });
// //   }
// // });

// app.post('/send-otp', async (req, res) => {
//   const { email } = req.body;
//   if (!email) return res.status(400).json({ success: false, message: "Email is required" });

//   const otp = Math.floor(100000 + Math.random() * 900000).toString();
//   const expiresAt = Date.now() + 5 * 60 * 1000;

//   otpStore[email] = { otp, expiresAt };

//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email, // ✅ send OTP to the user who is verifying
//       subject: 'Your OTP for Verification',
//       text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ success: true, message: 'OTP sent to email.' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Failed to send OTP.' });
//   }
// });



// app.post('/check-otp', (req, res) => {
//     const { email, otp } = req.body;
//     const stored = otpStore[email];
  
//     if (!stored || stored.otp !== otp || Date.now() > stored.expiresAt) {
//       return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
//     }
  
//     verifiedEmails.add(email);     // ✅ Mark as verified
//     delete otpStore[email];        // ✅ Remove OTP
  
//     return res.status(200).json({ success: true, message: 'OTP Verified' });
//   });
  



// app.post('/submit-form', async (req, res) => {
//     const { name, mobile, email, subject, message } = req.body;
  
//     if (!verifiedEmails.has(email)) {
//       return res.status(403).json({ success: false, message: 'OTP not verified for this email.' });
//     }
  
//     try {
//       await new Message({ name, mobile, email, subject, message }).save();
  
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS
//         }
//       });
      
      
//       const mailOptions = {
//         from: 'seetapal875@gmail.com',
//         to: 'seetaofficial25@gmail.com',
//         replyTo: email, // ✅ Add this line
//         subject: `New Contact Form Message: ${subject}`,
//         html: `
//           <h3>New message from Contact Form</h3>
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Mobile:</strong> ${mobile}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Message:</strong> ${message}</p>
//         `
//       };
      
  
//       await transporter.sendMail(mailOptions);
//       verifiedEmails.delete(email); // ✅ Cleanup after submission
  
//       res.status(200).json({ success: true, message: 'Message submitted & email sent!' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: 'Server error.' });
//     }
//   });
  

// // Start server
// app.listen(process.env.PORT || 3000, () => {
//   console.log(`🚀 Server running on port ${process.env.PORT || 3000}`);
// });


// fgd
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Error:', err));


  app.use('/api', routes);  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
