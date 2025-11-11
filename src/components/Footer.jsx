import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section>
      {/* Call to Action Bar */}
      <div className="bg-gray-800 flex flex-col items-start px-4 py-6 sm:px-12 md:flex-row md:justify-between md:items-center h-auto md:h-40">
        <div className="mb-4 md:mb-0 max-w-3xl">
          <p className="text-white text-2xl md:text-3xl font-semibold">
            Looking for the Best IT Business Solutions?
          </p>
          <p className="text-white text-sm mt-1">
            As an app web crawler expert, We will help to organize.
          </p>
        </div>
        <div>
          <a href="/contact_us">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
            Get A Quote
          </button>
         </a>
        </div>
      </div>

      {/* Main Footer Section */}
      <footer className="bg-[#0b0c2a] text-white pt-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="../assets/img/logo.jpg" alt="logo" className="h-12" />
            </div>
            <p className="text-sm mb-4">
              We work with a passion of taking challenges and creating new ones in the advertising sector.
            </p>
            <Link to="/about">
             <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">
              About us
            </button>
            </Link>
           
          </div>

          {/* Column 2: Only Social Icons */}
          <div>
            <h4 className="text-3xl font-semibold mb-4 border-b border-blue-500 inline-block">
              Follow Us
            </h4>
            <div className="flex gap-4 mt-4 text-gray-400 text-3xl">
              <a href="https://www.facebook.com/p/Mileazo-100077308435735/" target="_blank">
              <FaFacebookF className="hover:text-white transition" />
              </a>
              
              <a href="https://www.linkedin.com/company/mileazo/?originalSubdomain=in" target="_blank"> 
              <FaLinkedin className="hover:text-white transition" />
              </a>
              
              <a href="https://www.instagram.com/mileazo/" target="_blank">
              <FaInstagram className="hover:text-white transition" />
              </a>

              {/* <FaYoutube className="hover:text-white transition" /> */}
            </div>
          </div>

          {/* Column 3: Official Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-blue-500 inline-block">
              Official Info:
            </h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-400" />
                0 (141) 2729706
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                info@mileazo.com
              </li>
              <li className="flex items-center gap-2">
               
                Office FF 25, JTM Mall,<br />
                  Model Town, Jagatpura, <br />
                  Jaipur, Rajasthan  302017
              </li>
              
            </ul>
          </div>

          {/* Column 4: Gallery */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-blue-500 inline-block">
              Gallery
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[4, 5, 6, 8].map((img, idx) => (
                <img
                  key={idx}
                  src={`assets/Icon/${img}.jpg`}
                  alt={`gallery-${img}`}
                  className="w-full h-16 object-cover rounded hover:opacity-90 transition"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between text-sm text-gray-400">
            <p>2025 © All rights reserved by <a href="#" className="text-blue-400 hover:underline">Mileazo</a></p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
