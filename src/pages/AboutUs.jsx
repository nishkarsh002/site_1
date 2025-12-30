import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const scrollRef = useRef(null);

  return (
    <div className="bg-white text-gray-900">

      <Navbar />
      {/* About Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-br from-gray-900 via-green-900 to-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/assets/test/img.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 mb-4">About Us</h1>
          <p className="text-gray-300 text-xl">Innovating the future, one solution at a time</p>
        </div>
      </div>

  
      <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between gap-16">

        <div className="lg:w-1/2 mb-10 lg:mb-0 space-y-6">
          <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm uppercase tracking-wider">
            🚀 Our Story
          </span>
          <h1 className="text-4xl lg:text-5xl font-black leading-tight">
            Empowering Businesses Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600">Innovation</span>
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            In today's fast-paced digital landscape, having the right technology partner isn't just an advantage—it's essential. At
            <b> Techhodu</b>, we merge cutting-edge innovation with proven expertise to create solutions that drive real business impact. From <b>web development and mobile apps to digital marketing and custom software</b>, we deliver comprehensive services designed around your unique goals.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our resource outsourcing and dedicated development support give you instant access to world-class talent who integrate seamlessly with your team. Whether it's a sprint project or a long-term partnership, our flexible engagement models scale with your needs.
          </p>
          <div className="bg-gradient-to-r from-green-50 to-purple-50 p-6 rounded-2xl border-l-4 border-green-500">
            <p className="text-gray-800 font-medium text-lg">
              With a client-first philosophy, seasoned professionals, and an unwavering commitment to excellence, we transform challenges into opportunities. Choose <b>TechHodu</b> — where innovation meets execution, and your success becomes our mission.
            </p>
          </div>
          <Link to="/services">
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
              Explore Our Services →
            </button>
          </Link>
        </div>

        {/* Right Image Section */}
        <div className="lg:w-1/2 flex flex-col items-center justify-center relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
          <img src="assets/client/about_banner.jpg" alt="banner img" className="relative rounded-3xl shadow-2xl border-4 border-green-500/30 hover:scale-105 transition-transform duration-500"/>
        </div>
      </div>


      <Footer />
    </div>
  )
}

export default AboutUs
