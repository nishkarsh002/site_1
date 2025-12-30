import { Link } from "react-router-dom";
import { services } from "../data/navData";
import Marquee from "react-fast-marquee";



const Banner = () => {
  return (
    <>
    <div
      className="relative bg-cover bg-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
      style={{
        backgroundImage: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%), url("../assets/test/banner_test.jpg")',
        minHeight: "90vh",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Text Content */}
      <div className="container mx-auto px-4 py-20 flex flex-col justify-center min-h-[90vh]">
        <div className="max-w-3xl text-white slide-in">
          <div className="inline-block mb-4 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-full backdrop-blur-sm">
            <h6 className="text-xs md:text-sm font-semibold tracking-widest uppercase text-green-300">
              ✨ Innovation Meets Excellence
            </h6>
          </div>

          <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-8 drop-shadow-2xl">
            Transform Your Digital <br className="hidden md:block" /> 
            <span className="gradient-text">Vision Into Reality</span>
          </h2>

          <p className="text-base md:text-xl font-light leading-relaxed text-gray-300 max-w-2xl mb-8">
            Empowering businesses with cutting-edge technology solutions. We craft exceptional digital experiences that drive growth and innovation in the modern era.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link to="/contact_us">
              <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
                Get Started →
              </button>
            </Link>
            <Link to="/services">
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white font-semibold rounded-full transition-all duration-300">
                Explore Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Services Cards Section - Separate from hero */}
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm uppercase tracking-wider mb-4">
            🚀 Our Expertise
          </span>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-2">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500">Specialize In</span>
          </h3>
        </div>
        
        <Link to="/services">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 text-center group overflow-hidden rounded-2xl border-2 border-green-500/30 hover:border-green-400 transition-all duration-300 shadow-xl hover:shadow-green-500/50 transform hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10" />
                <div className="relative z-20 p-6 md:p-8 flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 mb-3 md:mb-4 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-green-500/30">
                    <img
                      src={service.icon}
                      alt={service.title}
                      className="w-8 h-8 md:w-10 md:h-10"
                    />
                  </div>
                  <h5 className="font-semibold text-sm md:text-base text-gray-200 group-hover:text-green-300 transition text-center break-words leading-tight">
                    {service.title}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </Link>
      </div>
    </div>

    {/* Client Marquee Section - Separate with proper spacing */}
    {/* <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-green-500/20 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            Left: Text Section
            <div className="md:w-2/5 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 mb-3">
                Trusted by Industry Leaders
              </h3>
              <p className="text-gray-400 text-base">Delivering excellence across the globe</p>
            </div>

            Right: Marquee Section
            <div className="md:w-3/5 w-full">
              <Marquee gradient={false} speed={50}>
                {[
                  "assets/client/cl2.webp",
                  "assets/client/cl3.webp",
                  "assets/client/cl2.webp",
                  "assets/client/cl3.webp",
                ].map((src, index) => (
                  <div key={index} className="mx-6 md:mx-8 bg-white/10 p-4 md:p-5 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all border border-white/10 hover:border-green-400/50">
                    <img src={src} alt="client-logo" className="h-10 md:h-12 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </>
  );
};

export default Banner;
