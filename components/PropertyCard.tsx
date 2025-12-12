'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface PropertyCardProps {
  id: string;
  image: string;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
}

export default function PropertyCard({
  id,
  image,
  price,
  title,
  location,
  beds,
  baths,
  area,
}: PropertyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className={`property-card group ${isVisible ? 'animate-in' : ''}`}>
      <div className="relative h-72 overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-all duration-700"
          />
        )}
        <div className="absolute top-0 right-0 bg-white text-luxury-black px-6 py-3 font-serif" style={{fontWeight: 300, letterSpacing: '0.05em'}}>
          {price}
        </div>
      </div>
      
      <div className="p-8">
        <h3 className="text-xl font-serif mb-3 text-white group-hover:text-gray-300 transition-colors" style={{fontWeight: 400}}>
          {title}
        </h3>
        <p className="text-gray-400 mb-6 flex items-center text-xs" style={{fontWeight: 300, letterSpacing: '0.05em'}}>
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {location}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/10 pt-6" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{area}</span>
          </div>
        </div>
        
        <Link href={`/properties/${id}`} className="block mt-4">
          <button className="btn-secondary w-full">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
