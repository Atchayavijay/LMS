import React, { useState } from 'react';
import { X, BookOpen } from 'lucide-react';

/**
 * Professional Create Course Modal inspired by the TagMango UX.
 * This is the first step where the instructor provides a working title.
 */
const CreateCourseModal = ({ isOpen, onClose, onContinue }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const maxTitleLength = 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-[500px] bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 font-satoshi">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6">
          <h2 className="text-xl font-bold text-black flex-grow text-center ml-8">Create new course</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-10 pb-10 pt-4 flex flex-col items-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-8">
            <BookOpen className="text-orange-500" size={36} />
          </div>

          {/* Texts */}
          <h3 className="text-2xl font-bold text-black mb-3">How about a working title?</h3>
          <p className="text-gray-500 text-center text-sm leading-relaxed mb-10 max-w-[320px]">
            It's ok if you can't think of a good title now. You can change it later.
          </p> 

          {/* Inputs */}
          <div className="w-full space-y-4">
            <div className="relative">
              <input 
                type="text"
                placeholder="e.g. Learn Aquascaping from Scratch"
                maxLength={maxTitleLength}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 pr-16 text-black focus:outline-none focus:border-orange-500 transition-all placeholder:text-gray-300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                {title.length} / {maxTitleLength}
              </span>
            </div>

            <div className="relative">
              <input 
                type="text"
                placeholder="Link to this course"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 text-black focus:outline-none focus:border-orange-500 transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            disabled={!title.trim()}
            onClick={() => onContinue({ title, description })}
            className={`w-full h-14 rounded-2xl mt-12 font-bold text-white transition-all transform active:scale-[0.98] ${
              title.trim() 
                ? 'bg-orange-500 shadow-lg shadow-orange-500/20 hover:bg-orange-600' 
                : 'bg-gray-200 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourseModal;
