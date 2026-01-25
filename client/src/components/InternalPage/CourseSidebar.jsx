import React from 'react'
import { Play, FileText, Infinity, Smartphone, Award, CheckCircle } from 'lucide-react'

const CourseSidebar = ({ courseData }) => {
    return (
        <div className="lg:col-span-4 relative">
            {/* Sticky positioning wrapper */}
            <div className="sticky top-28">

                {/* Course Purchase Card - Responsive Width */}
                <div
                    className="relative overflow-hidden shadow-2xl backdrop-blur-2xl"
                    style={{
                        maxWidth: '382px',
                        width: '100%',
                        height: '763px',
                        borderRadius: '13px',
                        background: 'rgba(12, 9, 26, 0.4)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                    }}
                >
                    {/* Glass effect background layers */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/20 z-0" />
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a0b1e]/40 via-[#0c091a]/30 to-[#4a102f]/50 z-0" />
                    {/* Ambient Glow Overlay */}
                    <div className="absolute top-[20%] left-0 right-0 h-[400px] bg-[radial-gradient(circle,rgba(255,63,180,0.12)_0%,rgba(0,0,0,0)_70%)] pointer-events-none z-0" />

                    {/* Main Content Container Z-Index 10 */}
                    <div className="relative z-10 w-full h-full p-[17px] pt-[19px]">

                        {/* Inner Layout Box: Video Preview */}
                        <div
                            className="overflow-hidden relative"
                            style={{
                                width: '100%',
                                maxWidth: '349px',
                                height: '195px',
                                borderRadius: '12px'
                            }}
                        >
                            {/* Video Preview Image Area */}
                            <div className="relative w-full h-full group cursor-pointer">
                                <img
                                    src={courseData.videoPreview}
                                    alt="Course Preview"
                                    className="w-full h-full object-cover opacity-80"
                                />
                                {/* Light Overlay to let text pop */}
                                <div className="absolute inset-0 bg-black/30" />
                                {/* Bottom vignette for the text */}
                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/90 to-transparent" />

                                {/* "2025" Big Text Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                                    <span className="text-[120px] font-black text-white/10 tracking-tighter leading-none select-none mix-blend-overlay scale-125 translate-y-2">2025</span>
                                </div>

                                {/* Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>

                                {/* "WATCH BEFORE CODING IN" text */}
                                <div className="absolute bottom-4 left-0 right-0 text-center z-10">
                                    <h3 className="text-white font-[800] text-[13px] uppercase tracking-[0.1em] drop-shadow-lg">
                                        Watch Before <span className="text-[#d8ea38]">Coding In</span>
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Content Section - Adjusted for relative flow */}
                        <div className="relative mt-6">
                            {/* Price Row */}
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-[36px] font-[800] text-white tracking-[-0.02em] leading-none">${courseData.price}</span>
                                <span className="text-[16px] text-[#A1A1AA] line-through decoration-1 decoration-[#A1A1AA]/60 font-medium">${courseData.originalPrice}</span>
                            </div>

                            {/* Discount Pill */}
                            <div className="inline-block bg-gradient-to-r from-[#de5da1] to-[#D35586] text-white text-[11px] font-[700] px-3 py-1 rounded-[4px] mb-6 tracking-wide shadow-lg shadow-primary-pink/20">
                                67% OFF • Limited Time
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3 mb-6">
                                <button className="w-full bg-gradient-to-r from-[#D6569B] to-[#B642C4] hover:opacity-90 text-white font-[700] text-[15px] py-3.5 rounded-lg transition-all shadow-lg active:scale-[0.98]">
                                    Buy Now
                                </button>
                                <button className="w-full bg-transparent hover:bg-white/5 text-white border border-white/20 font-[700] text-[15px] py-3.5 rounded-lg transition-all active:scale-[0.98]">
                                    Add to Cart
                                </button>
                            </div>

                            {/* Money Back Text */}
                            <div className="text-center text-[10px] text-[#71717A] font-medium mb-6 tracking-wide">
                                30-Day Money-Back Guarantee
                            </div>

                            {/* Course Includes List */}
                            <div className="space-y-3">
                                <h4 className="font-[600] text-white text-[14px]">This course includes:</h4>
                                <ul className="space-y-[12px] text-[13px] text-[#d4d4d8] font-light">
                                    <li className="flex items-center gap-3">
                                        <Play className="w-4 h-4 text-white/70" /> 15.5 hours on-demand video
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-white/70" /> 42 downloadable resources
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Infinity className="w-4 h-4 text-white/70" /> Full lifetime access
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Smartphone className="w-4 h-4 text-white/70" /> Access on mobile and desktop
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <Award className="w-4 h-4 text-white/70" /> Certificate of completion
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-4 h-4 text-white/70" /> Self-paced learning
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CourseSidebar
