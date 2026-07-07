import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { servicesCard, slides } from '../data/navData';
import useReveal from '../hooks/useReveal';

const Services = () => {
  useReveal();
  const [index, setIndex] = useState(0);
  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[420px] bg-gradient-to-br from-gray-950 via-purple-900/30 to-gray-950 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "url('/assets/test/img.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-green-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black animated-gradient-text mb-3">Our Services</h1>
          <p className="text-gray-400 text-lg">Comprehensive solutions for modern challenges</p>
        </div>
      </div>

      {/* Service Cards */}
      <div className="px-6 py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="reveal text-center mb-14 max-w-3xl mx-auto">
          <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-300 font-bold px-5 py-2 rounded-full text-xs uppercase tracking-wider mb-4">
            ⚡ What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-white">
            Tailored Solutions for{' '}
            <span className="animated-gradient-text">Your Success</span>
          </h2>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
          {servicesCard.map((service, idx) => (
            <div key={idx} className={`reveal delay-${(idx % 4 + 1) * 100} group relative h-[320px] rounded-3xl overflow-hidden border border-white/5 hover:border-green-400/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2`}>
              <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:opacity-10 transition duration-500" />
              {/* Default overlay */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/60 to-transparent p-6 text-white text-center group-hover:bottom-full group-hover:opacity-0 transition-all duration-500">
                <div className="flex justify-center mb-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                    <img src={service.icon} alt={service.title} className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="font-bold text-lg">{service.title}</h3>
              </div>
              {/* Hover overlay */}
              <div className="absolute top-full group-hover:top-0 left-0 w-full h-full bg-gradient-to-br from-green-600 to-purple-700 p-7 text-white text-center transition-all duration-500 flex flex-col justify-center">
                <div className="w-14 h-14 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <img src={service.icon} alt={service.title} className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm leading-relaxed text-white/90">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outsourcing Section */}
      <div className="flex flex-col lg:flex-row py-20 bg-gradient-to-b from-gray-950 to-gray-900 gap-10 px-6">
        {/* Slider */}
        <div className="relative w-full lg:w-1/2 h-[320px] lg:h-[480px] rounded-3xl overflow-hidden border border-white/10">
          <img src={slides[index].image} alt="Slide" className="w-full h-full object-cover transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-between px-5">
            <button onClick={prevSlide} className="w-11 h-11 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <FaChevronLeft />
            </button>
            <button onClick={nextSlide} className="w-11 h-11 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
          <div className="reveal">
            <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-300 font-bold px-5 py-2 rounded-full text-xs uppercase tracking-wider">
              💼 Who We Are
            </span>
          </div>
          <h2 className="reveal delay-100 text-3xl lg:text-5xl font-black leading-tight text-white">
            Flexible Outsourcing to{' '}
            <span className="animated-gradient-text">Power Your Vision</span>
          </h2>
          <p className="reveal delay-200 text-gray-400 text-base leading-relaxed">
            Unlock the full potential of your projects with our on-demand tech talent.
            From backend to frontend, mobile to cloud — we provide skilled professionals in{' '}
            <b className="text-white">Java, Fullstack, Dotnet, and more</b>. Our flexible outsourcing
            model adapts to your goals, timelines, and budget.
          </p>
          <div className="reveal delay-300 grid grid-cols-2 gap-4">
            <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-2xl border border-green-500/20">
              <h4 className="text-3xl font-bold text-green-400 mb-1">500+</h4>
              <p className="text-sm text-gray-400">Developers Available</p>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm p-5 rounded-2xl border border-purple-500/20">
              <h4 className="text-3xl font-bold text-purple-400 mb-1">24/7</h4>
              <p className="text-sm text-gray-400">Support Available</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
