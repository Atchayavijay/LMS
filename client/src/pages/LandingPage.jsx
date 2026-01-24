import React from 'react'
import HeroSection from '../components/HomePage/HeroSection'
import PathSelector from '../components/HomePage/PathSelector'
import TopRatedCourses from '../components/HomePage/TopRatedCourses'
import InDemandCourses from '../components/HomePage/InDemandCourses'
import BlogSection from '../components/HomePage/BlogSection'
import TestimonialsSection from '../components/HomePage/TestimonialsSection'
import CTACarousel from '../components/HomePage/CTACarousel'
import Footer from '../components/layout/Footer'

/**
 * LandingPage component.
 * Now refactored to be a "clean" page component,
 * delegating Layout (Navbar/Footer) to MainLayout.
 */
const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <PathSelector />
      <TopRatedCourses />
      <InDemandCourses />
      <BlogSection />
      
      {/* Bottom section with specific gradient styling */}
      <div className="bg-gradient-to-b from-[#090C03] via-[#090C03] via-60% to-[#3d1219] relative">
        <TestimonialsSection />
        <CTACarousel />
        <Footer />
      </div>
    </div>
  )
}

export default LandingPage;
