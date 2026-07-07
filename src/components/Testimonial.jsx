import { useState, useEffect } from "react";
import { testimonials } from "../data/navData";
import useReveal from "../hooks/useReveal";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonial = () => {
  useReveal();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => go("next"), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const go = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) =>
        dir === "next"
          ? (prev + 1) % testimonials.length
          : (prev - 1 + testimonials.length) % testimonials.length
      );
      setAnimating(false);
    }, 300);
  };

  const { name, title, feedback, image } = testimonials[current];

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden">
      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="reveal text-center mb-12">
          <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-300 font-bold px-5 py-2 rounded-full text-xs uppercase tracking-wider mb-4">
            💬 Client Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-black leading-tight text-white">
            Loved by{" "}
            <span className="animated-gradient-text">Businesses</span>{" "}
            Worldwide
          </h2>
          <p className="text-gray-500 mt-3 text-base">
            Real feedback from clients who've experienced our solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: active quote */}
          <div className="reveal-left space-y-6">
            <div className={`transition-all duration-300 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="text-amber-400 text-lg" />)}
              </div>

              <div className="relative">
                <FaQuoteLeft className="text-green-500/20 text-6xl absolute -top-3 -left-3 pointer-events-none" />
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed font-medium italic relative z-10 pl-7">
                  "{feedback}"
                </p>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-purple-500 blur-md opacity-40 scale-110" />
                  <img src={image} alt={name} className="relative w-14 h-14 rounded-full object-cover border-2 border-green-500/50 shadow-lg" />
                </div>
                <div>
                  <p className="font-black text-white">{name}</p>
                  <p className="text-green-400 font-semibold text-sm">{title || "Valued Client"}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <button onClick={() => go("prev")} className="w-11 h-11 rounded-full border border-white/10 hover:border-green-500/50 bg-white/5 hover:bg-green-500/10 flex items-center justify-center text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-110">←</button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { if (!animating) { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 300); } }}
                    className={`rounded-full transition-all duration-300 ${i === current ? "w-7 h-2.5 bg-gradient-to-r from-green-500 to-emerald-600" : "w-2.5 h-2.5 bg-gray-700 hover:bg-gray-500"}`}
                  />
                ))}
              </div>
              <button onClick={() => go("next")} className="w-11 h-11 rounded-full border border-white/10 hover:border-green-500/50 bg-white/5 hover:bg-green-500/10 flex items-center justify-center text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-110">→</button>
            </div>
          </div>

          {/* Right: clickable card list */}
          <div className="reveal-right hidden lg:grid grid-cols-1 gap-3">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                onClick={() => { if (!animating) { setAnimating(true); setTimeout(() => { setCurrent(i); setAnimating(false); }, 300); } }}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 ${
                  i === current
                    ? "bg-gray-800 border-green-500/50 shadow-lg shadow-green-500/10 scale-[1.02]"
                    : "bg-gray-800/40 border-white/5 hover:border-green-500/30 hover:bg-gray-800/70 opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, j) => <FaStar key={j} className="text-amber-400 text-xs" />)}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 italic mb-3">"{t.feedback}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-9 h-9 rounded-full object-cover border-2 border-green-500/40" />
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-green-400 text-xs">{t.title || "Client"}</p>
                  </div>
                  {i === current && <span className="ml-auto text-green-400 text-xs font-bold">● Active</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
