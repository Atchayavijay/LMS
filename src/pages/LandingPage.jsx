import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import PathSelector from '../components/sections/PathSelector'
import TopRatedCourses from '../components/sections/TopRatedCourses'
import InDemandCourses from '../components/sections/InDemandCourses'
import BlogSection from '../components/sections/BlogSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTACarousel from '../components/sections/CTACarousel'

const LandingPage = () => {
  return (
    <div className="h-full w-full bg-[#090C03] overflow-y-auto">
      <Navbar />
      <main className="flex flex-col">
        <HeroSection />
        <PathSelector />
        <TopRatedCourses />
        <InDemandCourses />
        <BlogSection />
        
        {/* Bottom cohesive section */}
        <div className="bg-gradient-to-b from-[#090C03] via-[#090C03] via-70% to-[#3d1219] relative">
          <TestimonialsSection />
          <CTACarousel />
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default LandingPage;
