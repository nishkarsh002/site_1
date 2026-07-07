import { useEffect, useRef, useState } from "react";
import { FaPhoneAlt, FaCode, FaMobile, FaRocket, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useReveal from "../hooks/useReveal";

const features = [
  { icon: <FaCode />,      label: "Custom Development",  color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
  { icon: <FaMobile />,    label: "Mobile First Design", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { icon: <FaRocket />,    label: "Fast Delivery",       color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/20" },
  { icon: <FaShieldAlt />, label: "Secure & Scalable",   color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
];

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const step = Math.ceil(num / 50);
        let cur = 0;
        const timer = setInterval(() => {
          cur = Math.min(cur + step, num);
          setCount(cur);
          if (cur >= num) clearInterval(timer);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

const About = () => {
  useReveal();
  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-900 to-gray-950 overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image */}
          <div className="reveal-left relative flex justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full border-2 border-dashed border-green-500/20 animate-spin" style={{ animationDuration: "20s" }} />
            </div>
            <div className="absolute w-64 h-64 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-full blur-3xl" />

            {/* Floating stat badges */}
            <div className="absolute -top-4 -right-4 md:top-8 md:right-0 z-20 bg-gray-800 border border-green-500/30 rounded-2xl shadow-xl shadow-green-500/10 p-4">
              <p className="text-xs text-gray-400 font-medium">Projects Done</p>
              <p className="text-3xl font-black text-green-400"><Counter target="150" suffix="+" /></p>
            </div>
            <div className="absolute -bottom-4 -left-4 md:bottom-8 md:left-0 z-20 bg-gray-800 border border-purple-500/30 rounded-2xl shadow-xl shadow-purple-500/10 p-4" style={{ animationDelay: "0.3s" }}>
              <p className="text-xs text-gray-400 font-medium">Satisfaction Rate</p>
              <p className="text-3xl font-black text-purple-400"><Counter target="98" suffix="%" /></p>
            </div>

            <img
              src="assets/test/about.jpg"
              alt="About TechHodu"
              className="relative z-10 rounded-3xl shadow-2xl shadow-green-500/10 w-full max-w-sm md:max-w-md border border-white/10 object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Content */}
          <div className="space-y-7">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-300 font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider">
                💡 About Our Company
              </span>
            </div>

            <h2 className="reveal delay-100 text-4xl md:text-5xl font-black text-white leading-tight">
              Building Tomorrow's{" "}
              <span className="relative inline-block">
                <span className="animated-gradient-text">Digital Solutions</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                  <path d="M0 3 Q50 0 100 3 Q150 6 200 3" stroke="url(#ul)" strokeWidth="3" fill="none" />
                  <defs>
                    <linearGradient id="ul" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}Today
            </h2>

            <p className="reveal delay-200 text-gray-400 text-base leading-relaxed border-l-4 border-green-500 pl-5 py-2 bg-green-500/5 rounded-r-xl">
              We're a next-generation technology partner specializing in Web & Mobile App Development.
              Our mission is to transform ideas into powerful digital experiences through innovation,
              expertise, and dedication.
            </p>

            <div className="reveal delay-300 grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <div key={i} className={`flex items-center gap-3 p-4 rounded-2xl border ${f.bg} hover:scale-105 transition-transform duration-300`}>
                  <span className={`text-xl ${f.color}`}>{f.icon}</span>
                  <span className="text-gray-300 font-semibold text-sm">{f.label}</span>
                </div>
              ))}
            </div>

            <div className="reveal delay-400 flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link to="/contact_us">
                <button className="group relative overflow-hidden px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-lg shadow-green-500/30 hover:shadow-green-500/60 hover:scale-105 transition-all duration-300 text-sm">
                  <span className="relative z-10">Let's Connect →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </button>
              </Link>

              <a href="tel:+917263025531" className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 hover:border-green-500/50 bg-white/5 hover:bg-green-500/10 transition-all duration-300 group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <FaPhoneAlt className="text-xs" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">24/7 Support</p>
                  <p className="text-sm font-bold text-white">+91 72630 25531</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
