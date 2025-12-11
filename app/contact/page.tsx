'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main>
      <Navbar />
      
      {/* Header */}
      <section className="relative pt-32 pb-20 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl font-serif mb-6 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{fontWeight: 300, letterSpacing: '0.1em'}}>
            GET IN TOUCH
          </h1>
          <p className={`text-sm text-gray-400 tracking-widest transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{fontWeight: 300}}>
            WE&apos;RE HERE TO ASSIST YOU
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <div className={`bg-luxury-charcoal p-12 border border-white/10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-2xl font-serif mb-8 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
                SEND A MESSAGE
              </h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h2 className="text-2xl font-serif mb-12 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
                CONTACT DETAILS
              </h2>
              
              <div className="space-y-12">
                {/* Office Locations */}
                <div>
                  <h3 className="text-sm mb-6 text-white tracking-widest" style={{fontWeight: 300}}>MAIN OFFICE</h3>
                  <div className="space-y-3 text-gray-300 text-sm" style={{fontWeight: 300}}>
                    <p className="flex items-start">
                      <svg className="w-4 h-4 mr-3 text-white mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>
                        MonarchPeak Building<br />
                        Airport Hills, Accra<br />
                        Ghana
                      </span>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <h3 className="text-sm mb-6 text-white tracking-widest" style={{fontWeight: 300}}>PHONE</h3>
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+233123456789" className="hover:text-white transition-colors" style={{fontWeight: 300}}>
                        +233 123 456 789
                      </a>
                    </p>
                    <p className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+233987654321" className="hover:text-white transition-colors" style={{fontWeight: 300}}>
                        +233 987 654 321
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <h3 className="text-sm mb-6 text-white tracking-widest" style={{fontWeight: 300}}>EMAIL</h3>
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:info@monarchpeak.gh" className="hover:text-white transition-colors" style={{fontWeight: 300}}>
                        info@monarchpeak.gh
                      </a>
                    </p>
                    <p className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:sales@monarchpeak.gh" className="hover:text-white transition-colors" style={{fontWeight: 300}}>
                        sales@monarchpeak.gh
                      </a>
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <h3 className="text-sm mb-6 text-white tracking-widest" style={{fontWeight: 300}}>BUSINESS HOURS</h3>
                  <div className="space-y-2 text-gray-300 text-sm" style={{fontWeight: 300}}>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className="ml-7">
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                    <p className="ml-7">
                      Sunday: By Appointment Only
                    </p>
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-sm mb-6 text-white tracking-widest" style={{fontWeight: 300}}>FOLLOW US</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-luxury-black transition-all duration-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-luxury-black transition-all duration-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-luxury-black transition-all duration-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-luxury-charcoal">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center animate-fade-in" style={{fontWeight: 300, letterSpacing: '0.2em'}}>
            FIND US
          </h2>
          <div className="bg-luxury-black h-96 flex items-center justify-center">
            <p className="text-gray-400">Google Maps Integration Available</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
