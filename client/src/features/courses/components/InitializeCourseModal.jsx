import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { Modal, Button, Input } from '../../../components/ui';

/**
 * InitializeCourseModal
 * Captures the initial title before heading to the full editor.
 */
const InitializeCourseModal = ({ isOpen, onClose, onContinue, isCreating }) => {
    const [title, setTitle] = useState('');
    const maxTitleLength = 100;
  
    const handleContinue = () => {
        if (title.trim()) {
            onContinue({ title });
        }
    };

    return (
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        title="Create new course"
      >
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-8">
              <BookOpen className="text-orange-500" size={36} />
            </div>
            
            <h3 className="text-2xl font-bold text-black mb-3 text-center">How about a working title?</h3>
            <p className="text-gray-500 text-center text-sm leading-relaxed mb-10 max-w-[320px]">
              It's ok if you can't think of a good title now. You can change it later.
            </p>
            
            <div className="w-full relative">
                <input 
                  type="text"
                  placeholder="e.g. Learn Aquascaping from Scratch"
                  maxLength={maxTitleLength}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-14 bg-white border border-gray-200 rounded-xl px-4 pr-16 text-black focus:outline-none focus:border-orange-500 transition-all placeholder:text-gray-300 font-satoshi"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                  {title.length} / {maxTitleLength}
                </span>
            </div>

            <Button 
              disabled={!title.trim() || isCreating}
              onClick={handleContinue}
              isLoading={isCreating}
              className={`w-full h-14 rounded-2xl mt-12 font-bold text-white transition-all ${
                title.trim() && !isCreating ? 'bg-orange-500 shadow-lg shadow-orange-500/20 hover:bg-orange-600' : 'bg-gray-200'
              }`}
            >
              Continue
            </Button>
        </div>
      </Modal>
    );
};

export default InitializeCourseModal;
