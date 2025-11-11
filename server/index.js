require("dotenv").config({ path: ".env.local" });

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

// Resend API configuration
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const app = express();
const allowedOrigins = ['http://localhost:3000', 'https://itfirm-theta.vercel.app' , 'https://www.mileazo.com',  'https://mileazo.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.post("/send-email", upload.single("file"), async (req, res) => {
  const { name, email, number, message, role, subject } = req.body;
  const file = req.file;

  console.log("Received email request:", { name, email, role, subject });
  console.log("API Key check:", RESEND_API_KEY ? "Set" : "Missing");

  try {
    let emailSubject = "";
    let emailText = "";
    let emailHtml = "";

    // 💼 If role is present, it's from the Career form
    if (role) {
      emailSubject = `New Application for ${role}`;
      emailText = `Email: ${email}\nName: ${name}\nMessage: ${message}\nPhone: ${number}\nApplied Role: ${role}`;
      emailHtml = `
        <h2>New Job Application</h2>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Message:</strong> ${message}</p>
      `;
    } else {
      // 📩 Contact Form
      emailSubject = `New Message from Contact Form: ${subject}`;
      emailText = `Email: ${email}\nName: ${name}\nPhone: ${number}\nSubject: ${subject}\nMessage: ${message}`;
      emailHtml = `
        <h2>New Contact Form Message</h2>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Message:</strong> ${message}</p>
      `;
    }

    // Prepare Resend API request
    const emailData = {
      from: "onboarding@resend.dev", // Use your verified domain later
      to: "nishdixit0207@gmail.com", // Must match your Resend signup email
      reply_to: email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    };

    // Note: File attachments with Resend require base64 encoding
    // For now, we'll skip attachments - add them later if needed

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", data);
      return res.status(500).json({
        message: "Error sending email",
        error: data.message || "Unknown error",
      });
    }

    console.log("Email sent successfully:", data.id);
    
    // Clean up uploaded file if exists
    if (file) {
      fs.unlink(file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      message: "Error sending email",
      error: error.message,
    });
  }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
