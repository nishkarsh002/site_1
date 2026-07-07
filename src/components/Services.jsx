import { Link } from "react-router-dom";
import { servicesOffer } from "../data/navData";
import useReveal from "../hooks/useReveal";

const Service = () => {
  useReveal();

  return (
    <section className="relative py-16 bg-gradient-to-b from-gray-950 to-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(16,185,129,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(139,92,246,0.15) 0%, transparent 50%)"
        }}
      />

      <div className="relative container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="reveal text-center mb-20">
          <span className="inline-block bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider mb-5">
            🚀 Our Services
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Comprehensive Solutions for{" "}
            <span className="animated-gradient-text">Modern Businesses</span>
          </h2>
          <p className="text-gray-400 mt-5 text-lg max-w-2xl mx-auto">
            Empowering your digital transformation with cutting-edge services
          </p>
        </div>

        {/* Horizontal scroll container */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-800 pb-4">
          <div className="flex gap-6 px-2 min-w-max">
            {servicesOffer.map((service, index) => (
              <div
                key={index}
                className={`reveal delay-${(index % 5 + 1) * 100} group relative flex-shrink-0 w-72 bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/5 hover:border-green-400/40 transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-3`}
              >
                {/* Top gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative p-8 text-center">
                  {/* Icon container */}
                  <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300" />
                    <div className="relative w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl border border-white/10 group-hover:border-green-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img src={service.img} alt={service.title} className="w-10 h-10 object-contain" />
                    </div>
                  </div>

                  <h5 className="text-lg font-bold mb-3 text-gray-100 group-hover:text-green-300 transition-colors duration-300">
                    {service.title}
                  </h5>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Learn more link */}
                  <Link to="/services">
                    <span className="inline-flex items-center gap-2 text-green-400 text-sm font-semibold opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="reveal text-center mt-14">
          <Link to="/services">
            <button className="group px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-lg shadow-green-500/30 hover:shadow-green-500/60 hover:scale-105 transition-all duration-300">
              View All Services
              <span className="ml-2 group-hover:translate-x-1 inline-block transition-transform">→</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Service;
