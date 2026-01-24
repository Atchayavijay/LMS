import React, { useState } from 'react'
import Navbar from '../layout/Navbar'
import Footer from '../layout/Footer'
import heroBackground from '../../assets/hero-background.png'
import CourseDetails from './CourseDetails'
import CourseSidebar from './CourseSidebar'
import RelatedCourses from './RelatedCourses'

const InternalPage = () => {
    const courseData = {
        title: "Master full-stack web development from scratch. Build real-world projects with React, Node.js, and modern tools.",
        rating: 4.7,
        ratingCount: "12,459",
        students: "45,782",
        instructor: "Sarah Johnson",
        instructorRole: "Senior Full-Stack Developer & Instructor",
        lastUpdated: "January 2025",
        language: "English",
        price: 49.99,
        originalPrice: 129.99,
        discountTime: "Limited Time",
        videoPreview: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        whatYouWillLearn: [
            "Build full-stack web applications from scratch using React and Node.js",
            "Master modern JavaScript ES6+ features and best practices",
            "Create responsive, mobile-first designs with Tailwind CSS",
            "Implement authentication and authorization with JWT",
            "Work with databases including MongoDB and PostgreSQL",
            "Deploy applications to production on cloud platforms",
            "Build RESTful APIs and integrate third-party services",
            "Implement state management with Redux and Context API"
        ],
        content: [
            { title: "Getting Started with Web Development", lectures: 8, duration: "1h 45m" },
            { title: "Getting Started with Web Development", lectures: 8, duration: "1h 45m" },
            { title: "Getting Started with Web Development", lectures: 8, duration: "1h 45m" },
            { title: "Getting Started with Web Development", lectures: 8, duration: "1h 45m" },
            { title: "Getting Started with Web Development", lectures: 8, duration: "1h 45m" },
            { title: "Getting Started with Web Development", lectures: 8, duration: "1h 45m" },
            { title: "Getting Started with Web Development", lectures: 8, duration: "1h 45m" }
        ]
    }

    return (
        <div className="min-h-screen bg-[#090C03] font-satoshi text-white selection:bg-primary-pink selection:text-white">
            <Navbar />

            {/* Background Image - Matches Hero Section Style */}
            <div className="absolute top-0 left-0 w-full h-[800px] pointer-events-none z-0 overflow-hidden">
                <img
                    src={heroBackground}
                    alt="Background"
                    className="w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
                {/* Fade to background color */}
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#090C03] to-transparent" />
            </div>

            <main className="relative z-10 pt-32 lg:pt-40 pb-20">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        {/* Left Column - Main Content */}
                        <CourseDetails courseData={courseData} />

                        {/* Right Column - Sticky Sidebar */}
                        <CourseSidebar courseData={courseData} />
                    </div>

                    {/* Fullstack Development Career Track */}
                    <RelatedCourses courseData={courseData} />

                </div>
            </main>

            <Footer />
        </div>
    )
}

export default InternalPage