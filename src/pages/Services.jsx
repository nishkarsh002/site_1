import { useState, useEffect } from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { servicesCard, slides } from '../data/navData';

const Services = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];
  return (
    <div>
      <Navbar />

      <div className="relative h-[500px] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/assets/test/img.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 mb-4">Our Services</h1>
          <p className="text-gray-300 text-xl">Comprehensive solutions for modern challenges</p>
        </div>
      </div>

      <div className="px-6 py-20 bg-gradient-to-b from-white to-gray-50 text-gray-800">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm uppercase tracking-wider mb-4">
            ⚡ What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight">
            Tailored Solutions for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600">Your Success</span>
          </h2>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
          {servicesCard.map((service, idx) => (
            <div
              key={idx}
              className="group relative h-[350px] rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-white to-gray-100 transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 border-gray-200 hover:border-green-400"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover group-hover:opacity-10 transition duration-500"
              />
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-gray-900 to-transparent p-6 text-white text-center group-hover:bottom-full group-hover:opacity-0 transition-all duration-500 ease-in-out">
                <div className="flex justify-center mb-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
                    <img src={service.icon} alt={service.title} className="w-7 h-7" />
                  </div>
                </div>
                <h3 className="font-bold text-xl">{service.title}</h3>
              </div>
              <div className="absolute top-full group-hover:top-0 left-0 w-full h-full bg-gradient-to-br from-green-500 to-purple-600 p-8 text-white text-center transition-all duration-500 ease-in-out flex flex-col justify-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <img src={service.icon} alt={service.title} className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row py-20 bg-gradient-to-br from-gray-50 to-purple-50 text-gray-800 gap-12 px-6">
        {/* Left - Image Slide */}
        <div className="relative w-full lg:w-1/2 h-[350px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl border-4 border-green-500/30">
          <img
            src={slide.image}
            alt="Slide"
            className="w-full h-full object-center object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          <div className="absolute inset-0 flex items-center justify-between px-6">
            <button
              onClick={prevSlide}
              className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center space-y-6">
          <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm uppercase tracking-wider w-fit">
            💼 Who We Are
          </span>
          <h2 className="text-4xl lg:text-5xl font-black leading-tight">
            Flexible Outsourcing to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600">Power Your Vision</span>
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Unlock the full potential of your projects with our on-demand tech talent.
            From backend to frontend, mobile to cloud — we provide skilled professionals in <b>Java, Fullstack, Dotnet, and more</b>. Whether you need a single developer or a full development team, our flexible outsourcing model adapts to your goals, timelines, and budget.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white p-5 rounded-2xl shadow-lg border border-green-200">
              <h4 className="text-3xl font-bold text-green-600 mb-1">500+</h4>
              <p className="text-sm text-gray-600">Developers Available</p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-lg border border-purple-200">
              <h4 className="text-3xl font-bold text-purple-600 mb-1">24/7</h4>
              <p className="text-sm text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </div>



      <Footer />

    </div>
  )
}

export default Services