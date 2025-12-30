import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      {/* Call to Action Bar */}
      <div className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 px-6 py-12 sm:px-12 border-t-2 border-green-500/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-green-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-green-500/20">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block mb-3 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full backdrop-blur-sm">
                <span className="text-xs font-semibold tracking-widest uppercase text-green-300">
                  🚀 Let's Collaborate
                </span>
              </div>
              <h3 className="text-3xl md:text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                Ready to Build Something Amazing?
              </h3>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl">
                Transform your ideas into reality with our expert team. Let's create the future together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact_us">
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                  Start Your Project →
                </button>
              </a>
              <a href="/services">
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300 whitespace-nowrap">
                  View Services
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1: About */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-lg blur-md opacity-50"></div>
                  <img src="../assets/img/logo.png" alt="logo" className="relative h-20 rounded-lg" />
                </div>
                
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Pioneering digital innovation with passion and expertise. Transforming challenges into opportunities.
              </p>
              <Link to="/about">
                <button className="group relative px-6 py-3 bg-gradient-to-r from-green-500/20 to-purple-500/20 hover:from-green-500 hover:to-purple-500 text-white text-sm rounded-full font-semibold border border-green-500/30 hover:border-transparent transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Learn More</span>
                </button>
              </Link>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-green-400 to-purple-500 rounded-full"></span>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Services', 'Career', 'Contact'].map((link, idx) => (
                  <li key={idx}>
                    <Link to={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase().replace(' ', '_')}`} className="text-gray-400 hover:text-green-400 transition-colors flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-green-400 transition-all duration-300"></span>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-green-400 to-purple-500 rounded-full"></span>
                Get In Touch
              </h4>
              <ul className="space-y-4">
                <li className="group">
                  <a href="tel:01412729706" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform border border-green-500/30">
                      <FaPhoneAlt className="text-green-400 text-sm" />
                    </div>
                    <span className="text-sm">0 (141) 2729706</span>
                  </a>
                </li>
                <li className="group">
                  <a href="mailto:info@mileazo.com" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform border border-purple-500/30">
                      <FaEnvelope className="text-purple-400 text-sm" />
                    </div>
                    <span className="text-sm">support@techhodu.com</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                    <span className="text-blue-400">📍</span>
                  </div>
                  <span className="text-sm leading-relaxed">
                    Office FF 25, JTM Mall,<br />
                    Model Town, Jagatpura,<br />
                    Jaipur, Rajasthan 302017
                  </span>
                </li>
              </ul>
            </div>

            {/* Column 4: Social & Gallery */}
            <div>
              <h4 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-green-400 to-purple-500 rounded-full"></span>
                Connect & Explore
              </h4>
              
              {/* Social Icons */}
              <div className="flex gap-3 mb-6">
                <a href="/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 hover:from-blue-500 hover:to-blue-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-blue-500/30 hover:border-transparent">
                  <FaFacebookF className="text-lg" />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-500/20 hover:from-blue-400 hover:to-blue-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-blue-400/30 hover:border-transparent">
                  <FaLinkedin className="text-lg" />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 hover:from-pink-500 hover:to-purple-500 flex items-center justify-center transition-all duration-300 transform hover:scale-110 border border-pink-500/30 hover:border-transparent">
                  <FaInstagram className="text-lg" />
                </a>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 gap-2">
                {[4, 5, 6, 8].map((img, idx) => (
                  <div key={idx} className="relative group overflow-hidden rounded-xl border-2 border-gray-800 hover:border-green-500/50 transition-all">
                    <img
                      src={`assets/Icon/${img}.jpg`}
                      alt={`gallery-${img}`}
                      className="w-full h-20 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-500/70 via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">View</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </footer>
    </section>
  );
};

export default Footer;
