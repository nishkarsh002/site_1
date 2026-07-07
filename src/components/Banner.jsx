import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/navData";
import useReveal from "../hooks/useReveal";

const WORDS = ["Web Apps", "Mobile Apps", "SaaS Products", "Digital Brands"];

const Banner = () => {
  useReveal();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  /* ── Typewriter effect ── */
  useEffect(() => {
    const word = WORDS[wordIndex];
    let timeout;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 90);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 50);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  return (
    <>
      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
        style={{ minHeight: "88vh" }}
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("../assets/test/banner_test.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Radial glow blobs */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

        {/* CSS particles */}
        <div className="particle p1" /><div className="particle p2" /><div className="particle p3" />
        <div className="particle p4" /><div className="particle p5" /><div className="particle p6" />
        <div className="particle p7" /><div className="particle p8" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col justify-center min-h-[88vh] max-w-6xl">
          <div className="max-w-3xl py-16">

            {/* Badge */}
            <div className="reveal inline-flex items-center gap-2 mb-5 px-4 py-2 bg-green-500/10 border border-green-400/25 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <span className="text-green-300 text-xs font-semibold tracking-widest uppercase">
                Innovation Meets Excellence
              </span>
            </div>

            {/* Headline — all on one line flow */}
            <div className="mb-6 space-y-1">
              <h1 className="reveal delay-100 text-5xl md:text-6xl lg:text-7xl font-black leading-none text-white">
                We Build
              </h1>
              <h1 className="reveal delay-200 text-5xl md:text-6xl lg:text-7xl font-black leading-none">
                <span className="animated-gradient-text typing-cursor">{displayed}</span>
              </h1>
              <h1 className="reveal delay-300 text-5xl md:text-6xl lg:text-7xl font-black leading-none text-white">
                That <span className="animated-gradient-text">Scale.</span>
              </h1>
            </div>

            {/* Sub */}
            <p className="reveal delay-400 text-gray-400 text-base md:text-lg leading-relaxed max-w-xl mb-8">
              Empowering businesses with cutting-edge technology. We craft exceptional digital
              experiences that drive growth and innovation.
            </p>

            {/* CTAs */}
            <div className="reveal delay-500 flex flex-wrap gap-3">
              <Link to="/contact_us">
                <button className="group relative overflow-hidden px-7 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-lg shadow-green-500/30 hover:shadow-green-500/60 transition-all duration-300 transform hover:scale-105 text-sm">
                  <span className="relative z-10">Get Started →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </button>
              </Link>
              <Link to="/services">
                <button className="px-7 py-3.5 bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:border-white/40 text-white font-semibold rounded-full transition-all duration-300 text-sm">
                  Explore Services ↗
                </button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="reveal delay-500 flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10">
              {[
                { value: "150+", label: "Projects" },
                { value: "98%",  label: "Satisfaction" },
                { value: "5+",   label: "Years" },
                { value: "24/7", label: "Support" },
              ].map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-black animated-gradient-text">{s.value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      {/* ── EXPERTISE CARDS ── */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 py-14">
        <div className="container mx-auto px-6 max-w-7xl">

          <div className="reveal text-center mb-10">
            <span className="inline-block bg-gradient-to-r from-green-500/20 to-purple-500/20 border border-green-500/30 text-green-300 font-bold px-5 py-2 rounded-full text-xs uppercase tracking-wider mb-3">
              🚀 Our Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              What We <span className="animated-gradient-text">Specialize In</span>
            </h2>
          </div>

          <Link to="/services">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`reveal delay-${(index + 1) * 100} tilt-card relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm text-center group rounded-2xl border border-white/5 hover:border-green-400/50 transition-all duration-300 overflow-hidden cursor-pointer`}
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 animated-border opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-5 flex flex-col items-center">
                    <div className="w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-green-500/10 to-purple-500/10 border border-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img src={service.icon} alt={service.title} className="w-7 h-7" />
                    </div>
                    <h5 className="font-semibold text-xs md:text-sm text-gray-300 group-hover:text-green-300 transition-colors text-center leading-tight">
                      {service.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Banner;
