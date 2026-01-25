import React from 'react'
import { ArrowRight } from 'lucide-react'

const RelatedCourses = ({ courseData }) => {
    return (
        <div className="mt-20 border-t border-white/10 pt-12">
            <h2 className="text-2xl font-bold mb-8 text-white">Fullstack Development Career Track</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3].map((_, idx) => (
                    <div key={idx} className="group cursor-pointer">
                        <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video border border-white/10 group-hover:border-white/20 transition-all">
                            <img
                                src={courseData.videoPreview}
                                alt="Course"
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                            {/* Thumbnail Overlays */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                                <span className="text-[80px] font-black text-white/10 tracking-tighter leading-none select-none mix-blend-overlay scale-125 translate-y-2">2025</span>
                            </div>
                            <div className="absolute bottom-3 left-0 right-0 text-center z-10">
                                <h3 className="text-white font-[800] text-[10px] uppercase tracking-[0.1em] drop-shadow-lg">
                                    Watch Before <span className="text-[#d8ea38]">Coding In</span>
                                </h3>
                            </div>

                            {/* Bestseller Badge */}
                            <div className="absolute top-3 left-3 z-20">
                                <div className="bg-[#de5da1] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-lg">
                                    Bestseller
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="inline-block bg-[#de5da1] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider mb-1">
                                Bestseller
                            </div>
                            <h3 className="font-bold text-white text-lg leading-tight group-hover:text-primary-pink transition-colors line-clamp-2">
                                The Complete Python Pro Bootcamp
                            </h3>
                            <p className="text-xs text-[#a1a1aa] font-medium leading-relaxed line-clamp-2">
                                Learn data science, automation, build websites, games and apps!
                            </p>
                        </div>
                    </div>
                ))}

                {/* View All Card */}
                <div className="group cursor-pointer h-full min-h-[220px] rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center justify-center gap-4 relative overflow-hidden backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                    <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform bg-white/5 relative z-10">
                        <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-white text-sm relative z-10">View all</span>
                </div>
            </div>
        </div>
    )
}

export default RelatedCourses
