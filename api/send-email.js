import { Resend } from "resend";
import busboy from "busboy";

export const runtime = "nodejs";

export const config = {
  api: {
    bodyParser: false,
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

    if (!name || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const isCareer = Boolean(role);

    await resend.emails.send({
      from: "onboarding@techhodu.dev",
      to: "nishdixit0207@gmail.com",
      subject: isCareer
        ? `New Application for ${role}`
        : `New Message from Contact Form: ${subject}`,
      html: isCareer
        ? `
          <h2>New Job Application</h2>
          <p><b>Role:</b> ${role}</p>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${number || "Not provided"}</p>
          <p><b>Message:</b> ${message || "No message"}</p>
        `
        : `
          <h2>New Contact Form Message</h2>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${number}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      attachments: file
        ? [
            {
              filename: file.filename,
              content: file.content,
            },
          ]
        : [],
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("SEND EMAIL ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
}

/* ---------------- HELPERS ---------------- */

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });
    const fields = {};
    let fileData = null;

    bb.on("field", (name, value) => {
      fields[name] = value;
    });

    bb.on("file", (name, stream, info) => {
      if (!info.filename) return;

      const chunks = [];
      stream.on("data", chunk => chunks.push(chunk));
      stream.on("end", () => {
        fileData = {
          filename: info.filename,
          content: Buffer.concat(chunks).toString("base64"),
        };
      });
    });

    bb.on("finish", () => resolve({ fields, file: fileData }));
    bb.on("error", reject);

    req.pipe(bb); // ✅ FIXED
  });
}
