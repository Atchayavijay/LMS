import React from 'react';
import { Star, BookOpen, Clock, Award, ChevronRight } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div 
      className="group relative flex flex-col w-full h-[360px] border-[1px] border-white/10 rounded-[40px] p-4 transition-all duration-300 hover:scale-[1.02] hover:border-[#FF3FB4] hover:shadow-[0_0_30px_rgba(255,63,180,0.6)] backdrop-blur-[4px] shadow-2xl flex-shrink-0"
      style={{ background: 'linear-gradient(91.43deg, rgba(217, 217, 217, 0.224) 1.92%, rgba(217, 217, 217, 0.048) 102.33%)' }}
    >
      {/* Course Image */}
      <div className="relative w-full h-[155px] rounded-[22px] overflow-hidden mb-4">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Category & Rating Badges */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[10px] font-medium text-white/70 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          {course.category}
        </span>
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
          <span className="text-[11px] font-bold text-white/90">{course.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-1 text-left">
        <h3 className="text-white text-[15px] font-bold leading-tight mb-2 truncate" title={course.title}>
          {course.title}
        </h3>
        <p className="text-white/40 text-[11px] leading-relaxed line-clamp-2 mb-4">
          {course.description}
        </p>
      </div>

      {/* Footer: Details & Action */}
      <div className="mt-auto px-1">
        <div className="w-full h-[1px] bg-white/5 mb-4"></div>
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-3 text-white/40">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium">{course.lessons}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium">{course.projects}</span>
            </div>
          </div>

          <button className="bg-gradient-to-r from-[#D63384] to-[#FF3FB4] hover:opacity-90 text-white text-[11px] font-bold px-4 py-2 rounded-full transition-all flex-shrink-0 shadow-lg shadow-pink-500/10">
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

      <div className="relative z-10 w-full max-w-[1300px]">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-4">
            {title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C42] to-[#FF3FB4]">{highlightWord}</span>
          </h2>
          
          {/* Decorative line with stars */}
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

        {/* Main Glass Container */}
        <div className="relative w-full min-h-[440px] py-10 px-8 rounded-[45px] border-[1px] border-white/5 bg-[#121212] shadow-3xl">
          {/* Subtle internal glow matching the image */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-[45px]"></div>

          {/* Course Grid: 4 columns with exact gaps */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center">
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>

          {/* Bottom Scroll Indicator - Styled to match the image */}
          <div className="mt-12 flex justify-center">
             <div className="w-[400px] h-[3px] bg-white/5 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-white/20 rounded-full transition-all duration-300"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
