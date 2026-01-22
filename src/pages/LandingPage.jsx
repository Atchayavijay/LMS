import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/HomePage/HeroSection'
import PathSelector from '../components/HomePage/PathSelector'
import TopRatedCourses from '../components/HomePage/TopRatedCourses'
import InDemandCourses from '../components/HomePage/InDemandCourses'
import BlogSection from '../components/HomePage/BlogSection'
import TestimonialsSection from '../components/HomePage/TestimonialsSection'
import CTACarousel from '../components/HomePage/CTACarousel'

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
