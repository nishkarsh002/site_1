import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';
import useReveal from '../hooks/useReveal';

const ContactUs = () => {
  useReveal();
  const [formData, setFormData] = useState({ name: "", email: "", number: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Sending...");
    try {
      const res = await fetch("https://site2-livid-three.vercel.app/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  const infoCards = [
    { emoji: "📍", title: "Office Address",  color: "border-green-500/30 bg-green-500/5",  text: "Near Sita Sundari Apartment,\nMahuabagh Road,\nPatna, Bihar 801506" },
    { emoji: "📞", title: "Phone Number",    color: "border-purple-500/30 bg-purple-500/5", text: "+91 72630 25531" },
    { emoji: "✉️", title: "Email Address",   color: "border-emerald-500/30 bg-emerald-500/5", text: "techhoduofficial@gmail.com" },
  ];

  const inputClass = "w-full p-4 bg-gray-800/60 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-all duration-300";
  const labelClass = "font-semibold text-sm text-gray-400 mb-2 block";

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[420px] bg-gradient-to-br from-gray-950 via-green-900/30 to-gray-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('/assets/test/img.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black animated-gradient-text mb-3">Get In Touch</h1>
          <p className="text-gray-400 text-lg">Let's build something amazing together</p>
        </div>
      </div>

      {/* Body */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-20 px-6">
        <div className="reveal mb-14 text-center max-w-3xl mx-auto">
          <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-300 font-bold px-5 py-2 rounded-full text-xs uppercase tracking-wider mb-4">
            📧 Contact Us
          </span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-white">
            Accelerate Your Growth With{' '}
            <span className="animated-gradient-text">Expert Solutions</span>
          </h2>
          <p className="mt-4 text-gray-400 text-base">
            The perfect blend of innovation, expertise, and dedication.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Info Cards */}
          <div className="space-y-5 flex flex-col justify-center">
            {infoCards.map((card, i) => (
              <div key={i} className={`reveal delay-${(i+1)*100} flex items-start gap-5 p-6 rounded-2xl border ${card.color} hover:scale-105 transition-all duration-300`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 text-2xl shadow-lg shadow-green-500/20">
                  {card.emoji}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 text-white">{card.title}</h4>
                  <p className="text-gray-400 leading-relaxed whitespace-pre-line text-sm">{card.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="reveal bg-gray-800/40 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h3>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input type="text" name="number" value={formData.number} onChange={handleChange} placeholder="+91 00000 00000" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Subject *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="How can we help?" className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Your Message *</label>
                <textarea rows="5" name="message" value={formData.message} onChange={handleChange} required placeholder="Tell us about your project..." className={`${inputClass} resize-none`} />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 rounded-full font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/60 hover:scale-105 transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
