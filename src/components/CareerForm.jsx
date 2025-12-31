import React, { useState } from "react";
import toast from "react-hot-toast";

export default function CareerForm({ isOpen, onClose, role }) {
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({}); // store validation errors

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    file: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ validation logic
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.number.trim()) {
      newErrors.number = "Phone number is required.";
    } else if (!/^[0-9]{7,15}$/.test(formData.number)) {
      newErrors.number = "Enter a valid phone number (7-15 digits).";
    }

    if (!formData.file) {
      newErrors.file = "Resume file is required.";
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(formData.file.type)) {
        newErrors.file = "Only PDF or Word documents allowed.";
      }
      if (formData.file.size > 5 * 1024 * 1024) {
        newErrors.file = "File size must be less than 5MB.";
      }
    }

    if (formData.message.trim() && formData.message.length < 20) {
      newErrors.message = "Message should be at least 20 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ✅ true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    setStatus(true);

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("number", formData.number);
    payload.append("message", formData.message);
    payload.append("role", role?.title);
    payload.append("file", formData.file);

    try {
      const res = await fetch("https://site2-livid-three.vercel.app/send-email", {
        method: "POST",
        body: payload,
      });

      if (res.status === 200) {
        toast.success("Application sent successfully!");
        setFormData({
          name: "",
          email: "",
          number: "",
          file: null,
          message: "",
        });
        setErrors({});
        onClose(); // close modal
      } else {
        toast.error("Failed to send application.");
      }
    } catch (error) {
      toast.error("An error occurred while sending application.");
    } finally {
      setStatus(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-lg p-6 rounded-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Apply for: {role?.title}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              name="number"
              placeholder="Your Number"
              value={formData.number}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number}</p>
            )}
          </div>

          <div>
            <input
              type="file"
              name="file"
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
            {errors.file && (
              <p className="text-red-500 text-sm">{errors.file}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="py-2 rounded font-semibold">
              Why you're a good fit:
            </label>
            <textarea
              name="message"
              placeholder="Describe Yourself"
              value={formData.message}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded ${
              status ? "cursor-not-allowed opacity-70" : "hover:bg-blue-700"
            }`}
            disabled={status}
          >
            {status ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
