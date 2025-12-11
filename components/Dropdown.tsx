'use client';

import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function Dropdown({ label, options, value, onChange, placeholder = 'Select...' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative">
      <label className="block text-xs text-gray-400 mb-3 tracking-widest" style={{fontWeight: 300}}>
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-luxury-black border border-white/20 px-4 py-3 text-white text-xs tracking-wider text-left focus:outline-none focus:border-white transition-all duration-300 flex items-center justify-between"
        style={{fontWeight: 300}}
      >
        <span className={!selectedOption ? 'text-gray-500' : ''}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-luxury-charcoal border border-white/20 max-h-60 overflow-y-auto animate-drop-down">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-xs tracking-wider transition-all duration-300 ${
                option.value === value 
                  ? 'bg-white text-luxury-black' 
                  : 'text-white hover:bg-white/10'
              }`}
              style={{fontWeight: 300}}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
