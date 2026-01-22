import React from 'react';
import { Star, BookOpen, Clock, Award, ChevronRight } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="group relative flex flex-col w-full max-w-[270px] h-[350px] bg-gradient-to-b from-[#D9D9D9]/20 to-[#D9D9D9]/5 border-[0.7px] border-white/10 rounded-[30px] p-3 transition-all duration-300 hover:scale-[1.05] backdrop-blur-[4px] shadow-2xl flex-shrink-0">
      {/* Course Image - Increased height */}
      <div className="relative w-full h-[162px] rounded-[22px] overflow-hidden mb-3">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Category & Rating Badges */}
      <div className="flex items-center justify-between mb-2.5 px-1">
        <span className="text-[9px] uppercase tracking-wider font-bold text-white/70 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
          {course.category}
        </span>
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-full">
          <Star className="w-2.5 h-2.5 fill-[#FFB800] text-[#FFB800]" />
          <span className="text-[10px] font-bold text-white">{course.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-1">
        <h3 className="text-white text-[14px] font-bold leading-tight mb-2 truncate" title={course.title}>
          {course.title}
        </h3>
        <p className="text-white/40 text-[10px] leading-relaxed line-clamp-2 mb-4">
          {course.description}
        </p>
      </div>

      {/* Footer: Details & Action - Lowered the line and increased gap above */}
      <div className="mt-auto px-1">
        <div className="w-full h-[0.5px] bg-white/10 mb-3"></div>
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2.5 text-white/40">
            <div className="flex items-center gap-0.5">
              <BookOpen className="w-3 h-3" />
              <span className="text-[9px] font-medium">{course.lessons}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Clock className="w-3 h-3" />
              <span className="text-[9px] font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Award className="w-3 h-3" />
              <span className="text-[9px] font-medium">{course.projects}</span>
            </div>
          </div>

          <button className="bg-[#D63384] hover:bg-[#B02868] text-white text-[10px] font-bold px-3.5 py-1.5 rounded-full transition-all flex-shrink-0">
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseSection = ({ title, highlightWord, courses }) => {
  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center bg-transparent overflow-hidden">
      {/* Vertical Stripes Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '60px 100%' }}>
      </div>

      <div className="relative z-10 w-full max-w-[1241px]">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C42] to-[#FF3FB4]">{highlightWord}</span>
          </h2>
          
          {/* Decorative line with stars - Visible lines with proper gradient */}
          <div className="flex items-center justify-center gap-3 w-full max-w-[600px] mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/60"></div>
            <div className="flex gap-1 items-center">
              <Star className="w-2 h-2 text-white/60 fill-white/60" />
              <Star className="w-3 h-3 text-white fill-white" />
              <Star className="w-2 h-2 text-white/60 fill-white/60" />
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/60"></div>
          </div>
        </div>

        {/* Main Glass Container - Colors from Figma property screenshot */}
        <div className="relative w-full min-h-[412px] py-12 px-6 rounded-[45px] border-[0.7px] border-white/20 bg-gradient-to-b from-[#D9D9D9]/[0.1] to-[#D9D9D9]/[0.05] backdrop-blur-[4px] shadow-3xl">
          {/* Internal Glow Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-[#FF5E5E]/10 via-transparent to-transparent blur-[140px] pointer-events-none"></div>

          {/* Course Grid - Responsive grid layout with increased gap */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-12 justify-center items-center">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>

          {/* Bottom Scroll Indicator */}
          <div className="mt-10 flex justify-center">
             <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-[#FF5E5E] rounded-full"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
