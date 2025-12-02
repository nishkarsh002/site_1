import { useState } from "react";
import { testimonials } from "../data/navData";

const Testimonial = () => {
  const [current, setCurrent] = useState(0);

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const { name, title, feedback, image } = testimonials[current];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-purple-50 py-24 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        {/* Left Side - Heading */}
        <div className="md:w-1/2 text-center md:text-left">
           <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm uppercase tracking-wider mb-6">
              💬 Client Stories
            </span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 mb-6 leading-tight">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600">Businesses</span> Worldwide
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Real feedback from real clients who've experienced the power of our solutions. Their success is our greatest achievement.
          </p>
        </div>

        {/* Right Side - Testimonial Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-10 relative w-full md:w-1/2 border-2 border-green-100 hover:border-green-300 transition-all duration-300">
          <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
            "
          </div>
          <p className="text-gray-800 text-lg leading-relaxed mb-8 pt-4 font-medium italic">"{feedback}"</p>
          <div className="flex items-center gap-5 mb-6">
            <img src={image} alt={name} className="w-16 h-16 rounded-full border-4 border-green-400 shadow-lg" />
            <div>
              <h4 className="font-bold text-gray-900 text-lg">{name}</h4>
              <p className="text-green-600 text-sm font-semibold">{title}</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevTestimonial}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110"
            >
              &#8592;
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
