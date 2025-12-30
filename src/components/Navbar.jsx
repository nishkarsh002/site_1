import  { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {navItems }from "../data/navData";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchShow, setSearchShow] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchShow(!searchShow);
  };

  

  return (
    <div className="w-full">

      <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl relative z-30 border-b border-green-500/20">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">

            <Link to="/" className="flex items-center gap-3 group">
              <img src="../assets/img/logo.png" alt="Logo" className="h-auto w-24 md:w-32 lg:w-36 group-hover:scale-110 transition-transform duration-300" />
            </Link>
         

         
          <ul className="hidden lg:flex items-center gap-8 text-base font-medium">
            {navItems.map((item, i) => (
              <li key={i} className="relative group">
                { (
                  <Link to={item.link} className="text-gray-300 hover:text-green-400 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          
          <div className="flex items-center gap-4"> 
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-green-400 hover:text-green-300 text-2xl"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

    
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-900 px-4 border-t border-green-500/20">
            <ul className="flex flex-col gap-2 py-4">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link to={item.link} className="block py-3 text-gray-300 hover:text-green-400 hover:bg-gray-800 px-4 rounded transition-all">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
