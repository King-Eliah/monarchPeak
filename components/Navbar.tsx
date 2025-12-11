'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/agents', label: 'Agents' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled || isMenuOpen ? 'bg-luxury-black' : 'bg-transparent'}`}>
      <div className="max-w-[95%] mx-auto px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex items-center h-full -ml-18 mt-4">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="MonarchPeak Logo" 
                width={1500} 
                height={600}
                className="h-50 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-gray-400 transition-colors duration-400 text-xs tracking-widest"
                  style={{fontWeight: 300}}
                >
                  {link.label.toUpperCase()}
                </Link>
              ))}
            </div>
            <a href="/book-visit" className="btn-primary">
              BOOK A VISIT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-3 text-white hover:text-gray-400 transition-colors duration-300 text-xs tracking-widest"
                onClick={() => setIsMenuOpen(false)}
                style={{fontWeight: 300}}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
            <a href="/book-visit" className="btn-primary w-full mt-6 block text-center">
              BOOK A VISIT
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
