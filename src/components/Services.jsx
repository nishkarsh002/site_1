import { Link } from "react-router-dom";
import { servicesOffer } from "../data/navData";


const Service = () => {
    return (
        <div className="relative pt-24 pb-16 bg-gradient-to-b from-white to-gray-100">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm uppercase tracking-wider mb-4">
                        🚀 Our Services
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                        Comprehensive Solutions for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-purple-600">Modern Businesses</span>
                    </h2>
                    <p className="text-gray-600 mt-4 text-lg">Empowering your digital transformation journey</p>
                </div>

                {/* Horizontal Scroll Cards */}
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200">
                    <div className="flex gap-6 px-4 py-6 min-w-[100%]">
                        {servicesOffer.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-purple-50 transition-all duration-300 rounded-3xl shadow-lg hover:shadow-2xl p-8 flex-shrink-0 w-[90%] sm:w-[50%] md:w-[35%] lg:w-[28%] xl:w-[22%] min-h-[360px] text-center border-2 border-gray-100 hover:border-green-300 group"
                            >
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <img
                                        src={service.img}
                                        alt="img"
                                        className="w-12 h-12"
                                    />
                                </div>
                                <h5 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-green-600 transition-colors">
                                    {service.title}
                                </h5>
                                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
                                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-green-600 font-semibold text-sm">Learn More →</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;
