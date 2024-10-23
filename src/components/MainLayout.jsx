import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, BrowserRouter } from 'react-router-dom';
import Working from './Working'
// import Uploader from './Uploader'
import Uploder from './Uploder';
import Pricing from './Pricing'
import Features from './Features'
import Testimonials from './Testimonials'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import Footer from './Footer'
import Forms1 from './Login/Forms1'
import Forms from './Register/Forms'

// const MainLayout = () => {
//   return (
//     <div>MainLayout</div>
//   )
// }

// export default MainLayout

const MainLayout = () => {
    const location = useLocation();

    // Define routes where Navbar, HeroSection, and Footer should not appear
    const hideComponentsOnRoutes = ['/login', '/signup', '/upload', '/workflow'];

    // Check if the current path matches one of the routes where components should be hidden
    const shouldHideComponents = hideComponentsOnRoutes.includes(location.pathname);

    return (
        <>
            {/* Conditionally render Navbar, HeroSection, and Footer */}
            {!shouldHideComponents && <Navbar />}
            <Routes>
                <Route path="/workflow" element={<Working />} />
                <Route path='/upload' element={<Uploder />} />
                {/* <Route path="/pricing" element={<Pricing />} /> */}
                {/* <Route path="/testimonials" element={<Testimonials />} /> */}
                <Route path='/login' element={<Forms1 />} />
                <Route path="/signup" element={<Forms />} />
                {/* Add other routes here */}
            </Routes>
            {!shouldHideComponents && <HeroSection />}
            {!shouldHideComponents && <Footer />}
        </>
    );
}

export default MainLayout