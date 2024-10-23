import React from 'react'
import { BrowserRouter as Router, Route, useLocation, Form } from 'react-router-dom'
// import Working from './components/Working'
// import Pricing from './components/Pricing'
// import Features from './components/Features'
// import Testimonials from './components/Testimonials'
// import Navbar from './components/Navbar'
// import HeroSection from './components/HeroSection'
// import Footer from './components/Footer'
// import Forms1 from './components/Login/Forms1'
// import Forms from './components/Register/Forms'
import MainLayout from './components/MainLayout'

const App = () => {
  return (
    <>
      {/* <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/features" element={<Features />} />
          <Route path='/working' element={<Working />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path='/login' element={<Forms1 />} />
          <Route path="/signup" element={<Forms />} />
        </Routes>
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <HeroSection />
          <Footer />
        </div>



      </BrowserRouter> */}
      {/* <BrowserRouter>
      <Routes> */}
        <Router>
          <MainLayout />
        </Router>
      {/* </Routes>
      </BrowserRouter> */}

      
    </>
  )
}

export default App