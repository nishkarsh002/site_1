import { useState } from "react";
import { roles } from "../data/navData";
import CareerForm from "./CareerForm";

export default function CareersSection() {
  const [showForm, setShowForm] = useState(null);
  const [showInfo, setShowInfo] = useState(null);

  const handleOpen = (id) => {
    setShowForm(id);
    setShowInfo(null); // Close any open info when opening form
  };
  
  const handleClose = () => {
    setShowForm(null);
  };

  const handleToggleInfo = (id) => {
    setShowInfo(showInfo === id ? null : id);
    setShowForm(null); // Close any open form when opening info
  };

  return (
    <>
      <div className="bg-gradient-to-br from-gray-50 to-purple-50 py-20 px-4 md:px-20 text-center">
        <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm uppercase tracking-wider mb-6">
          💼 Join Our Team
        </span>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">Launch Your Career at <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600">TechHodu</span></h2>
        <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
          We're seeking passionate engineers and tech innovators who want to create exceptional products and grow alongside industry leaders.
        </p>
      </div>

      <div className="text-center py-12 bg-gradient-to-r from-green-500 to-purple-600">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white px-4 leading-tight">
          🚀 Current Openings – Be Part of Something Extraordinary
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-20 py-20 bg-gradient-to-b from-white to-gray-50">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-3xl shadow-xl p-8 relative border-2 border-gray-200 hover:border-green-400 transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              {role.openings}
            </div>
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600 mb-4">{role.title}</h3>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <strong>Openings:</strong> {role.openings}
              </p>
              <p className="text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <strong>Experience:</strong> {role.experience} years
              </p>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">{role.objective}</p>

            <div className="flex gap-3">
              <button
                onClick={() => handleOpen(role.id)}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Apply Now
              </button>
              
              <button
                onClick={() => handleToggleInfo(role.id)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold border-2 border-gray-300 hover:border-gray-400 transition-all duration-300"
              >
                {showInfo === role.id ? "Hide" : "Details"}
              </button>
            </div>

            {showInfo === role.id && (
              <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-purple-50 border-l-4 border-green-500 rounded-2xl">
                <p className="text-sm text-gray-800 leading-relaxed">{role.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Render form outside of cards to prevent flickering */}
      {showForm && (
        <CareerForm 
          isOpen={true} 
          onClose={handleClose} 
          role={roles.find(role => role.id === showForm)}
        />
      )}
    </>
  );
}
