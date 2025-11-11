import { Link } from "react-router-dom";
import { services } from "../data/navData";
import Marquee from "react-fast-marquee";



const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center mb-40 pb-40"
      style={{
        backgroundImage: 'url("../assets/test/banner_test.jpg")',
        height: "100vh",
      }}
    >
      {/* Text Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center">
  <div className="max-w-2xl text-white">
    <h6 className="text-sm md:text-base font-medium tracking-wide mb-3 uppercase opacity-80">
      Designing for the Future
    </h6>

    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6 drop-shadow-sm">
      Revolutionize Your Workflow <br className="hidden md:block" /> With <span className="text-blue-400">MileaZo</span>
    </h2>

    <p className="text-sm md:text-lg font-light leading-relaxed text-white/90">
      To grow your business, brand advertising and marketing play a crucial role.
      Similarly, cultivating your core strengths is necessary for long-term success.
    </p>
  </div>
</div>


      <div className="relative -mt-24 lg:mt-9 z-30">
        <div className="container mx-auto px-4">
          <Link to="/services">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-2 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="relative bg-white text-center group overflow-hidden  rounded-md"
              >
                
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-90 transition-opacity duration-300 z-10" />
                <div className="relative z-20 p-6 flex flex-col items-center border-black border-2 text-sm">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="w-14 h-14 mb-3 "
                  />
                  <h5 className="font-[smaller] text-gray-800 group-hover:text-white transition text-center break-words">
  {service.title}
</h5>
                </div>
              </div>
            ))}
          </div>
           </Link>
        </div>
      </div>


      <div className="container mx-auto  my-24 px-4 ">
        <div className="flex flex-row items-center justify-between gap-4">

          {/* Left: Text Section */}
          <div className="w-1/2 text-xl font-semibold text-gray-800">
            Our Happy Clients, Our Biggest Achievement
          </div>

          {/* Right: Marquee Section */}
          <div className="w-1/2">
            <Marquee gradient={false} speed={50}>
              {[
              
                // "assets/client/cl1.webp",
                "assets/client/cl2.webp",
                "assets/client/cl3.webp",
                
              ].map((src, index) => (
                <div key={index} className="mx-6">
                  <img src={src} alt="client-logo" className="h-12 w-auto" />
                </div>
              ))}
            </Marquee>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Banner;
