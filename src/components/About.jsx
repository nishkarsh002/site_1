import { FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="pt-10 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-gray-50 to-white">
  <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

    {/* Image */}
    <div className="relative floating-animation flex justify-center">
      <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-purple-500 rounded-3xl blur-2xl opacity-20"></div>

      <img
        src="assets/test/about.jpg"
        alt="About us"
        className="relative rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md 
                   border-4 border-green-500/30
                   mt-6 lg:mt-0
                   hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* Content */}
    <div className="space-y-6 text-center lg:text-left">

      <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 
                       text-white font-bold px-5 py-2 rounded-full shadow-lg 
                       text-xs uppercase tracking-wider">
        💡 About Our Company
      </span>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
        Building Tomorrow's <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600">
          Digital Solutions
        </span> Today
      </h2>

      <p className="text-gray-700 text-base sm:text-lg border-l-4 border-green-500 
                    pl-5 py-2 bg-green-50/50 rounded-r-lg text-left">
        We're a next-generation technology partner specializing in Web & Mobile App Development.
      </p>

      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="bg-green-50 p-4 rounded-xl border border-green-200">
          <h4 className="text-2xl font-bold text-green-600">150+</h4>
          <p className="text-sm text-gray-600">Projects Delivered</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
          <h4 className="text-2xl font-bold text-purple-600">98%</h4>
          <p className="text-sm text-gray-600">Client Satisfaction</p>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
        <Link to="/contact_us">
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 
                             text-white px-7 py-3 rounded-full shadow-lg 
                             hover:scale-105 transition-all font-semibold">
            Let's Connect →
          </button>
        </Link>

        <div className="flex items-center space-x-3 bg-gray-50 px-5 py-3 
                        rounded-full border border-gray-200">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 
                          flex items-center justify-center text-white">
            <FaPhoneAlt />
          </div>
          <div>
            <p className="text-xs text-gray-500">24/7 Support</p>
            <p className="text-sm font-bold text-gray-900">+91 72630 25531</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

  );
};

export default About;
