
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CareersSection from '../components/CareersSection';

const Career = () => {


  return (
    <div>
      <Navbar />


      <div className="relative h-[500px] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('/assets/test/img.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 mb-4">Join Our Team</h1>
          <p className="text-gray-300 text-xl">Build your career with innovative minds</p>
        </div>
      </div>

      <CareersSection />


      <Footer />
    </div>
  )
}

export default Career