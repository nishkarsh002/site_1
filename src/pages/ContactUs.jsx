import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Sending...");

    try {
      const res = await fetch("https://itfirm-8uc6.onrender.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: '', email: '', number: '', subject: '', message: '' });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingToast);
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div>
      <Navbar />

      <div className="relative h-[500px] bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/assets/test/img.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-300 text-xl">Let's build something amazing together</p>
        </div>
      </div>

      <section className="bg-gradient-to-b from-white to-gray-50 py-20 px-4 md:px-20 text-gray-800">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm uppercase tracking-wider mb-4">
            📧 Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Accelerate Your Growth With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600">Expert Solutions</span>
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            The perfect blend of innovation, expertise, and dedication to transform your digital vision into reality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Side Info */}
          <div className="space-y-6 lg:flex flex-col justify-center items-center">
            {/* Office Address */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl shadow-lg flex gap-6 lg:w-3/4 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-3xl">📍</span>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-gray-900">Office Address</h4>
                <p className="text-gray-700 leading-relaxed">
                  Near Sita Sundari Apartment,<br />
                    Mahuabagh Road,<br />
                    Patna, Bihar 801506
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-3xl shadow-lg flex gap-6 lg:w-3/4 border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-3xl">📞</span>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-gray-900">Phone Number</h4>
                <p className="text-gray-700 text-lg font-semibold">+91 72630 25531</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl shadow-lg flex gap-6 lg:w-3/4 border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-3xl">✉️</span>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2 text-gray-900">Email Address</h4>
                <p className="text-gray-700 font-medium">support@techhodu.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-2xl border-2 border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-semibold text-sm text-gray-700 mb-2 block">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-700 mb-2 block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-700 mb-2 block">Phone</label>
                  <input
                    type="text"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm text-gray-700 mb-2 block">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold text-sm text-gray-700 mb-2 block">Your Message *</label>
                <textarea
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project..."
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all duration-300 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
