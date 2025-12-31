import { useState } from "react";
import toast from "react-hot-toast";

export default function CareerForm({ isOpen, onClose, role }) {
  const [status, setStatus] = useState(false);
  const [errors, setErrors] = useState({});

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
    return Object.keys(newErrors).length === 0;
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
      const res = await fetch("https://www.techhodu.com/api/send-email", {
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
        onClose();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-purple-600 p-6 rounded-t-3xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-300"
          >
            ×
          </button>
          <h2 className="text-2xl md:text-3xl font-black text-white pr-12">
            Apply for: {role?.title}
          </h2>
          <p className="text-white/90 mt-2">Join our innovative team and build the future</p>
        </div>

        {/* Form */}
        <form className="p-6 md:p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 focus:border-green-500 px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 focus:border-green-500 px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="number"
                placeholder="+1 (555) 000-0000"
                value={formData.number}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 focus:border-green-500 px-4 py-3 rounded-xl transition-all duration-300 outline-none"
                required
              />
              {errors.number && (
                <p className="text-red-500 text-sm mt-1">{errors.number}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Resume/CV *
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                accept=".pdf,.doc,.docx"
                className="w-full border-2 border-gray-200 focus:border-green-500 px-4 py-3 rounded-xl transition-all duration-300 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                required
              />
              {errors.file && (
                <p className="text-red-500 text-sm mt-1">{errors.file}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Why are you a good fit? (Optional)
            </label>
            <textarea
              name="message"
              placeholder="Tell us about your experience, skills, and why you're excited about this role..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full border-2 border-gray-200 focus:border-green-500 px-4 py-3 rounded-xl transition-all duration-300 outline-none resize-none"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 ${
                status ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={status}
            >
              {status ? "Sending Application..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
