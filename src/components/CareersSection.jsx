import { useState } from "react";
import { roles } from "../data/navData";
import CareerForm from "./CareerForm";
import useReveal from "../hooks/useReveal";

export default function CareersSection() {
  useReveal();
  const [showForm, setShowForm] = useState(null);
  const [showInfo, setShowInfo] = useState(null);

  const handleOpen = (id) => { setShowForm(id); setShowInfo(null); };
  const handleClose = () => setShowForm(null);
  const handleToggleInfo = (id) => { setShowInfo(showInfo === id ? null : id); setShowForm(null); };

  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 py-16 px-6 text-center">
        <div className="reveal max-w-3xl mx-auto">
          <span className="inline-block bg-green-500/10 border border-green-500/30 text-green-300 font-bold px-5 py-2 rounded-full text-xs uppercase tracking-wider mb-5">
            💼 Join Our Team
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Launch Your Career at{' '}
            <span className="animated-gradient-text">TechHodu</span>
          </h2>
          <p className="text-gray-400 text-base leading-relaxed">
            Seeking passionate engineers and tech innovators who want to create exceptional
            products and grow alongside industry leaders.
          </p>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-purple-600 py-5 text-center">
        <p className="text-xl md:text-2xl font-black text-white px-4">
          🚀 Current Openings — Be Part of Something Extraordinary
        </p>
      </div>

      {/* Cards */}
      <div className="bg-gradient-to-b from-gray-950 to-gray-900 py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {roles.map((role, i) => (
            <div key={role.id} className={`reveal delay-${(i+1)*100} relative bg-gray-800/60 backdrop-blur-sm rounded-3xl p-7 border border-white/5 hover:border-green-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10 hover:-translate-y-1`}>
              {/* Opening count badge */}
              <div className="absolute -top-3 -right-3 w-11 h-11 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-black text-sm shadow-lg shadow-green-500/30">
                {role.openings}
              </div>

              <h3 className="text-xl font-black animated-gradient-text mb-4">{role.title}</h3>

              <div className="space-y-2 mb-5">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  <span className="text-gray-500">Openings:</span>
                  <span className="text-white font-semibold">{role.openings}</span>
                </p>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span className="text-gray-500">Experience:</span>
                  <span className="text-white font-semibold">{role.experience} years</span>
                </p>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">{role.objective}</p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleOpen(role.id)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-2.5 px-4 rounded-full font-semibold text-sm shadow-lg hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => handleToggleInfo(role.id)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white py-2.5 px-4 rounded-full font-semibold text-sm border border-white/10 hover:border-green-500/40 transition-all duration-300"
                >
                  {showInfo === role.id ? "Hide" : "Details"}
                </button>
              </div>

              {showInfo === role.id && (
                <div className="mt-5 p-4 bg-green-500/5 border-l-4 border-green-500 rounded-r-2xl">
                  <p className="text-sm text-gray-300 leading-relaxed">{role.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <CareerForm isOpen={true} onClose={handleClose} role={roles.find(r => r.id === showForm)} />
      )}
    </>
  );
}
