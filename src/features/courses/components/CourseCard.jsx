import React from 'react';
import Button from '../../../components/ui/Button';

/**
 * Isolated CourseCard component within the Courses feature.
 * Encapsulates UI and specific course logic.
 */
const CourseCard = ({ course }) => {
  const { title, category, description, price, thumbnail, instructor } = course;

  return (
    <div className="group relative bg-white/[0.03] border border-white/5 rounded-[32px] overflow-hidden hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500 flex flex-col h-full">
      {/* Thumbnail Area */}
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-pink/20 to-primary-purple/20 animate-pulse group-hover:scale-110 transition-transform duration-700" />
        {thumbnail && (
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-700" 
          />
        )}
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
            {category}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white group-hover:text-primary-pink transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="text-white/50 mt-3 text-sm line-clamp-2 italic">
          {description}
        </p>

        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-white/40 text-[10px] uppercase tracking-tighter">Investment</span>
            <span className="text-white font-bold text-lg leading-none mt-1">${price}</span>
          </div>
          
          <Button size="sm" className="shadow-none">
            Enroll
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
