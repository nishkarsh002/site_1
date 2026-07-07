import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import useReveal from '../hooks/useReveal';

const AboutUs = () => {
  useReveal();
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[420px] bg-gradient-to-br from-gray-950 via-green-900/30 to-gray-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('/assets/test/img.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black animated-gradient-text mb-3">About Us</h1>
          <p className="text-gray-400 text-lg">Innovating the future, one solution at a time</p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Text */}
          <div className="lg:w-1/2 space-y-7">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-300 font-bold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider">
                🚀 Our Story
              </span>
            </div>
            <h2 className="reveal delay-100 text-4xl lg:text-5xl font-black leading-tight text-white">
              Empowering Businesses Through{' '}
              <span className="animated-gradient-text">Innovation</span>
            </h2>
            <p className="reveal delay-200 text-gray-400 text-base leading-relaxed">
              In today's fast-paced digital landscape, having the right technology partner isn't just an
              advantage—it's essential. At <b className="text-white">TechHodu</b>, we merge cutting-edge innovation with proven
              expertise to create solutions that drive real business impact. From <b className="text-white">web development and
              mobile apps to digital marketing and custom software</b>, we deliver comprehensive services
              designed around your unique goals.
            </p>
            <p className="reveal delay-300 text-gray-400 text-base leading-relaxed">
              Our resource outsourcing and dedicated development support give you instant access to
              world-class talent who integrate seamlessly with your team. Whether it's a sprint project
              or a long-term partnership, our flexible engagement models scale with your needs.
            </p>

            <div className="reveal delay-400 bg-green-500/5 border-l-4 border-green-500 p-5 rounded-r-2xl">
              <p className="text-gray-300 text-base leading-relaxed">
                With a client-first philosophy, seasoned professionals, and an unwavering commitment to
                excellence, we transform challenges into opportunities. Choose{' '}
                <b className="text-white">TechHodu</b> — where innovation meets execution.
              </p>
            </div>

            <div className="reveal delay-500">
              <Link to="/services">
                <button className="group relative overflow-hidden px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full shadow-lg shadow-green-500/30 hover:shadow-green-500/60 hover:scale-105 transition-all duration-300 text-sm">
                  <span className="relative z-10">Explore Our Services →</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 reveal-right relative flex items-center justify-center">
            <div className="absolute w-80 h-80 bg-gradient-to-br from-green-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <img
              src="assets/client/about_banner.jpg"
              alt="About TechHodu"
              className="relative z-10 rounded-3xl shadow-2xl shadow-green-500/10 border border-white/10 hover:scale-105 transition-transform duration-500 max-w-full"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
