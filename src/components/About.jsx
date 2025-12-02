import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image */}
        <div className="relative floating-animation">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>
          <img
            src="assets/test/about.jpg"
            alt="About us"
            className="relative rounded-3xl shadow-2xl w-full max-w-md mx-auto mt-[62vh] border-4 border-green-500/30 lg:mt-0 hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right: Content */}
        <div className="space-y-6">
          <div className="mb-4">
            <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm uppercase tracking-wider">
              💡 About Our Company
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Building Tomorrow's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600">Digital Solutions</span> Today
          </h2>

          <p className="text-gray-700 text-lg border-l-4 border-green-500 pl-6 py-2 bg-green-50/50 rounded-r-lg">
            We're a next-generation technology partner specializing in Web & Mobile App Development. Our mission is to transform ideas into powerful digital experiences through innovation, expertise, and dedication.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
              <h4 className="text-3xl font-bold text-green-600">150+</h4>
              <p className="text-sm text-gray-600">Projects Delivered</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200">
              <h4 className="text-3xl font-bold text-purple-600">98%</h4>
              <p className="text-sm text-gray-600">Client Satisfaction</p>
            </div>
          </div>

          {/* Contact Block */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
            <Link to="/contact_us">
              <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-green-500/50 transition-all duration-300 font-semibold transform hover:scale-105">
                Let's Connect →
              </button>
            </Link>

            <div className="flex items-center space-x-4 bg-gray-50 px-6 py-3 rounded-full border border-gray-200">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">24/7 Support</p>
                <p className="text-lg font-bold text-gray-900">0 (141) 2729706</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
