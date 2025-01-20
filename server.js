const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config(); // For environment variables

const app = express();
const PORT = process.env.PORT || 3000; // Set the port dynamically

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (Optional for storing messages)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB connection error:", err));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", messageSchema);

// Nodemailer Config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables
    pass: process.env.EMAIL_PASS, // Use environment variables
  },
});

// Routes
app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Save message to the database
  const newMessage = new Message({ name, email, subject, message });
  try {
    await newMessage.save();
    console.log("Message saved to database.");
  } catch (err) {
    console.error("Error saving message to database:", err);
  }

  // Email message content
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Use environment variable for your email
    subject: `New Contact Form Message: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("Failed to send email.");
    } else {
      console.log("Email sent:", info.response);
      return res.status(200).send("Email sent successfully!");
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
