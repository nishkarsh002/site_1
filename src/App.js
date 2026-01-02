import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Career from "./pages/Career";
import ContactUs from "./pages/ContactUs";
import Blogs from "./pages/Blogs";
import BlogPost from "./components/BlogPost";
import ScrollTop from "./components/ScrollTop";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact_us" element={<ContactUs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          className: "text-sm font-medium rounded-md",
          duration: 3000,
        }}
      />
    </BrowserRouter>
  );
}

export default App;
