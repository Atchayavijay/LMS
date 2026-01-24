import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Premium reusable input component.
 * Standardizes styling across the application.
 */
const Input = ({
  label,
  error,
  className,
  type = 'text',
  placeholder = '',
  ...props
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-white text-[15px] font-normal ml-1 block">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={twMerge(
          clsx(
            'w-full bg-white/[0.05] border border-white/10 rounded-full py-2.5 px-6 text-white text-[14px] placeholder:text-white/50 focus:outline-none focus:border-white/70 focus:bg-white/[0.08] transition-all',
            error && 'border-red-500/50 focus:border-red-500',
            className
          )
        )}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-[12px] ml-4 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
