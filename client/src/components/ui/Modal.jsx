import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Premium generic modal component.
 * Includes backdrop blur, animations, and responsive design.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  showClose = true,
  maxWidth = '500px',
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        style={{ maxWidth }}
        className={twMerge(
          clsx(
            "relative w-full bg-white rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 font-satoshi",
            className
          )
        )}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between px-8 py-6">
            {title ? (
              <h2 className="text-xl font-bold text-black flex-grow text-center ml-8">{title}</h2>
            ) : <div className="flex-grow" />}
            
            {showClose && (
              <button 
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-black transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-10 pb-10 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
