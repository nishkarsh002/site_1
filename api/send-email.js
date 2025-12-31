import { Resend } from "resend";
import Busboy from "busboy";

export const config = {
  api: {
    bodyParser: false, // required for file uploads
  },
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { fields, file } = await parseForm(req);

    const { name, email, number, message, role, subject } = fields;

    let emailSubject = "";
    let emailText = "";
    let emailHtml = "";

    // 💼 Career form
    if (role) {
      emailSubject = `New Application for ${role}`;
      emailText = `Email: ${email}
Name: ${name}
Phone: ${number}
Applied Role: ${role}
Message: ${message || "No message"}`;

      emailHtml = `
        <h2>New Job Application</h2>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number || "Not provided"}</p>
        <p><strong>Message:</strong> ${message || "No message"}</p>
        ${file ? `<p><strong>Resume:</strong> Attached</p>` : ""}
      `;
    } 
    // 📩 Contact form
    else {
      emailSubject = `New Message from Contact Form: ${subject}`;
      emailText = `Email: ${email}
Name: ${name}
Phone: ${number}
Subject: ${subject}
Message: ${message}`;

      emailHtml = `
        <h2>New Contact Form Message</h2>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${number}</p>
        <p><strong>Message:</strong> ${message}</p>
      `;
    }

    const attachments = [];

    if (file) {
      attachments.push({
        filename: file.filename,
        content: file.content, // base64
      });
    }

    await resend.emails.send({
      from: "onboarding@techhodu.dev",
      to: "nishdixit0207@gmail.com",
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
      attachments,
    });

    return res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error sending email",
      error: error.message,
    });
  }
}

/* ---------------- HELPERS ---------------- */

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const busboy = new Busboy({ headers: req.headers });

    const fields = {};
    let fileData = null;

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("file", (name, stream, info) => {
      const chunks = [];

      stream.on("data", (chunk) => chunks.push(chunk));

      stream.on("end", () => {
        fileData = {
          filename: info.filename,
          content: Buffer.concat(chunks).toString("base64"),
        };
      });
    });

    busboy.on("finish", () => {
      resolve({ fields, file: fileData });
    });

    busboy.on("error", reject);

    req.pipe(busboy);
  });
}
