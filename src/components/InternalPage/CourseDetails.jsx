import React, { useState } from 'react'
import { Star, CheckCircle, FileText, PlayCircle, Plus, Minus, ChevronDown, MessageSquare, Users, ThumbsUp } from 'lucide-react'
import heroBackground from '../../assets/hero-background.png'

const CourseDetails = ({ courseData }) => {
    const [expandedSection, setExpandedSection] = useState(0);

    return (
        <div className="lg:col-span-8 space-y-10">

            {/* Title Section */}
            <div className="space-y-5">
                <div className="inline-block bg-primary-pink text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                    Bestseller
                </div>
                <h1 className="text-3xl lg:text-[42px] font-bold leading-[1.2] tracking-tight">
                    {courseData.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 text-yellow-400">
                        <span className="font-bold text-base">{courseData.rating}</span>
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                        </div>
                    </div>
                    <span className="text-[#a1a1aa]">({courseData.ratingCount} ratings)</span>
                    <span className="text-white font-medium ml-2">{courseData.students} students enrolled</span>
                </div>

                <div className="text-sm text-gray-300">
                    Created by <span className="text-primary-pink cursor-pointer hover:underline">{courseData.instructor}</span>
                    <div className="text-[#a1a1aa] text-xs mt-1 font-light">{courseData.instructorRole} | 10+ years experience</div>
                </div>
            </div>

            {/* What You'll Learn Box - Exact Gradient Match */}
            <div className="relative overflow-hidden rounded-2xl p-6 lg:p-8 mt-8 border border-white/10">
                {/* Custom Gradient Background for this box */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff3fb4]/15 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none" />

                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        {courseData.whatYouWillLearn.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <div className="mt-1 bg-transparent rounded-full border border-white/30 p-0.5 flex-shrink-0">
                                    <CheckCircle className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-[13px] leading-relaxed text-[#d4d4d8] font-light">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Course Content - Exact Specification Match */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 tracking-tight">Course Content</h2>

                {/* Outer Box Container - Matching user specs */}
                <div
                    className="relative overflow-hidden bg-[#0c0c0c] shadow-3xl border-white/10"
                    style={{
                        maxWidth: '837px',
                        width: '100%',
                        height: '500px',
                        borderWidth: '0.67px',
                        borderRadius: '14px',
                        padding: '27px 18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}
                >
                    {/* Background Image and Glows */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <img
                            src={heroBackground}
                            alt=""
                            className="w-full h-full object-cover opacity-40 scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

                        {/* Radial Glows - Reduced blur for sharper look */}
                        <div className="absolute -top-1/4 -left-1/4 w-full h-full bg-[#de5da1]/15 blur-[60px] rounded-full" />
                        <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-[#4a102f]/25 blur-[80px] rounded-full" />
                    </div>

                    {/* Inner Content - Scrollbar Hidden */}
                    <div
                        className="relative z-10 overflow-y-auto scrollbar-hide"
                        style={{
                            maxWidth: '801px',
                            width: '100%',
                            height: '446px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '9px',
                            scrollbarWidth: 'none', /* Firefox */
                            msOverflowStyle: 'none'  /* IE and Edge */
                        }}
                    >
                        {/* Webkit scrollbar hide */}
                        <style>{`
                            .scrollbar-hide::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {courseData.content.map((section, idx) => {
                            const isExpanded = expandedSection === idx;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => setExpandedSection(isExpanded ? -1 : idx)}
                                    className={`group border border-white/10 transition-all duration-500 rounded-[12px] overflow-hidden cursor-pointer flex-shrink-0 ${isExpanded ? 'bg-white/10 border-white/30' : 'bg-[#121212]/80 hover:bg-black/90 hover:border-white/20'}`}
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-4 px-6">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-semibold text-white/95 text-[15px] tracking-wide">{section.title}</span>
                                            <span className="text-[11px] text-[#71717a] font-light">{section.lectures} lectures • {section.duration}</span>
                                        </div>
                                        <div className="text-white/60 group-hover:text-white transition-all duration-300">
                                            {isExpanded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                        </div>
                                    </div>

                                    {/* Expanded Content */}
                                    {isExpanded && (
                                        <div className="px-6 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
                                            <div className="space-y-3">
                                                {[...Array(section.lectures > 4 ? 4 : section.lectures)].map((_, lIdx) => (
                                                    <div key={lIdx} className="flex items-center justify-between group/item">
                                                        <div className="flex items-center gap-4 text-[13px] text-[#d4d4d8] group-hover/item:text-white transition-colors">
                                                            {lIdx === 4 ? <FileText className="w-4 h-4 text-[#71717a]" /> : <PlayCircle className="w-4 h-4 text-[#71717a] group-hover/item:text-white transition-colors" />}
                                                            <span className="font-light tracking-wide">{lIdx === 0 ? "Welcome to the Course" : lIdx === 1 ? "Setting Up Environment" : "Lecture Content Placeholder"}</span>
                                                        </div>
                                                        <span className="text-xs text-[#52525b] font-medium">05:30</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Requirements */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2 text-[#d4d4d8] text-[15px] font-light marker:text-white/50">
                    <li>A computer (Windows, Mac, or Linux) with internet access</li>
                    <li>No prior programming experience required - we'll start from the basics</li>
                    <li>Willingness to learn and practice coding regularly</li>
                    <li>Basic computer skills (file management, web browsing)</li>
                </ul>
            </div>

            {/* Description */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Description</h2>
                <div className="space-y-4 text-[#d4d4d8] text-[15px] font-light leading-relaxed">
                    <p>
                        This course is designed to teach you Python by building practical applications from the ground up. It starts with the basics and gradually moves into more advanced topics, using real-world examples to help you understand how Python is used in practice.
                    </p>
                    <p>
                        You'll build 20 different apps throughout the course, each focusing on a specific area of Python programming. These include:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 marker:text-white/50">
                        <li>Automation scripts</li>
                        <li>Web applications</li>
                    </ul>
                    <button className="flex items-center gap-1 text-[#de5da1] font-medium hover:text-[#D35586] transition-colors text-sm mt-2">
                        Show more <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Who This Course Is For */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Who This Course Is For</h2>
                <ul className="list-disc pl-5 space-y-2 text-[#d4d4d8] text-[15px] font-light marker:text-white/50">
                    <li>Beginners who want to start a career in web development</li>
                    <li>Self-taught developers looking to fill knowledge gaps</li>
                    <li>Designers wanting to bring their designs to life with code</li>
                    <li>Entrepreneurs building their own web applications</li>
                    <li>Students seeking practical, real-world development skills</li>
                    <li>Anyone interested in learning modern full-stack development</li>
                </ul>
            </div>

            {/* Instructor Section */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Instructor</h2>

                <div className="space-y-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#de5da1]">
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
                                    alt={courseData.instructor}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-[#de5da1] text-lg font-bold mb-1">{courseData.instructor}</div>
                                <div className="text-[#d4d4d8] font-light text-sm mb-3">Senior Python Developer & Instructor</div>

                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#a1a1aa] font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Star className="w-3.5 h-3.5 fill-[#de5da1] text-[#de5da1]" />
                                        4.6 Instructor Rating
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        101,301 Reviews
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Users className="w-3.5 h-3.5" />
                                        644,748 Students
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <PlayCircle className="w-3.5 h-3.5" />
                                        15 Courses
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-[#d4d4d8] text-[15px] font-light leading-relaxed mt-4">
                        Ardit Sulce is a Python programmer and educator who has taught over 600,000 students how to code through his hands-on, real-world project courses on Udemy. He also runs PythonHow where he shares practical tutorials, and publishes Daily Python Projects on Substack — the most popular Python newsletter on the platform.
                    </div>
                </div>
            </div>

            {/* Rating Summary Card - Exact Color Match */}
            <div className="mt-12 flex justify-start">
                <div
                    className="relative overflow-hidden border border-white/5 shadow-2xl flex items-center px-10"
                    style={{
                        width: '642px',
                        height: '194px',
                        borderRadius: '15px',
                        background: 'linear-gradient(135deg, #2a1b1b 0%, #120c0c 100%)'
                    }}
                >
                    {/* Atmospheric Glows */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        {/* Top-center reddish glow */}
                        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-full h-full bg-[#ff3fb4]/10 blur-[80px] rounded-full" />
                        {/* Subtle ambient light */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 w-full flex items-center">
                        {/* Left Side: Score */}
                        <div className="w-[35%] flex flex-col items-center border-r border-white/10 pr-8">
                            <div className="text-[72px] font-bold text-white leading-none mb-3 tracking-tight">5.0</div>
                            <div className="flex gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-[18px] h-[18px] text-[#FFB800] fill-[#FFB800]" />
                                ))}
                            </div>
                            <div className="text-white/60 text-[14px] font-medium font-satoshi">7,306 Ratings</div>
                        </div>

                        {/* Right Side: Progress Bars */}
                        <div className="flex-1 pl-10 space-y-[8px]">
                            {[
                                { stars: 5, pct: "90%", count: "6,256" },
                                { stars: 4, pct: "75%", count: "1,050" },
                                { stars: 3, pct: "55%", count: "126" },
                                { stars: 2, pct: "8%", count: "20" },
                                { stars: 1, pct: "8%", count: "5" }
                            ].map((row, idx) => (
                                <div key={idx} className="flex items-center gap-4 group">
                                    <div className="flex items-center gap-1.5 min-w-[32px]">
                                        <span className="text-white/80 text-[13px] font-medium">{row.stars}</span>
                                        <Star className="w-[14px] h-[14px] text-[#FFB800] fill-[#FFB800]" />
                                    </div>

                                    {/* Progress Bar Container - Semi-transparent track */}
                                    <div className="flex-1 h-[6px] bg-white/15 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#FFB800] transition-all duration-700 ease-out"
                                            style={{ width: row.pct }}
                                        />
                                    </div>

                                    <div className="w-[45px] text-right">
                                        <span className="text-white/80 text-[13px] font-medium">{row.count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Student Reviews */}
            <div className="mt-12 space-y-8 border-t border-white/10 pt-8">
                {[
                    { name: "Michael Chen", initial: "MC", time: "2 weeks ago", text: "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand. I landed my first dev job after completing this course.", helpful: 124 },
                    { name: "Emily Rodriguez", initial: "ER", time: "1 month ago", text: "Perfect for beginners! The projects are practical and helped me build a strong portfolio. The support from the instructor and community is amazing.", helpful: 96 },
                    { name: "James Wilson", initial: "JW", time: "3 weeks ago", text: "Great course with comprehensive content. I would have liked more advanced topics, but overall it's an excellent foundation for web development.", helpful: 75 },
                    { name: "Sophie Taylor", initial: "ST", time: "1 week ago", text: "Best investment I've made in my career! Went from zero coding knowledge to building full-stack applications. The course structure is well-organized and engaging.", helpful: 152 }
                ].map((review, idx) => (
                    <div key={idx} className="flex gap-4 border-b border-white/5 pb-8 last:border-0 last:pb-0">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                            {review.initial}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h4 className="font-bold text-white text-[15px]">{review.name}</h4>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-[#71717a] text-xs">{review.time}</span>
                            </div>
                            <p className="text-[#d4d4d8] text-sm leading-relaxed font-light">
                                {review.text}
                            </p>
                            <div className="flex items-center gap-2 mt-2 group cursor-pointer">
                                <div className="p-1 rounded-full group-hover:bg-white/10 transition-colors">
                                    <ThumbsUp className="w-3.5 h-3.5 text-[#a1a1aa] group-hover:text-white" />
                                </div>
                                <span className="text-[#71717a] text-xs group-hover:text-white transition-colors">Helpful ({review.helpful})</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CourseDetails
