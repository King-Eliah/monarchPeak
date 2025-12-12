'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import PropertyCard from '@/components/PropertyCard';
import { featuredProperties } from '@/lib/data';
import Image from 'next/image';
import { useState } from 'react';
import { use } from 'react';

export default function PropertyDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Find the property by ID
  const property = featuredProperties.find(p => p.id === id);
  
  if (!property) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-20">
          <p className="text-white text-xl">Property not found</p>
        </div>
        <Footer />
      </main>
    );
  }

  // Mock gallery images
  const galleryImages = [
    property.image,
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    'https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=800',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
  ];

  const similarProperties = featuredProperties.filter(p => p.id !== id).slice(0, 3);

  return (
    <main>
      <Navbar />
      
      {/* Property Header */}
      <section className="pt-32 pb-12 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white" style={{fontWeight: 300, letterSpacing: '0.05em'}}>
                {property.title}
              </h1>
              <p className="text-gray-400 flex items-center text-sm tracking-wider">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {property.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-5xl md:text-6xl font-serif text-white mb-4" style={{fontWeight: 300}}>
                {property.price}
              </p>
              <div className="flex gap-3">
                <a href="/gallery" className="btn-secondary text-xs px-6 py-3">VIEW GALLERY</a>
                <a href="/book-visit" className="btn-primary text-xs px-6 py-3">BOOK A VISIT</a>
              </div>
            </div>
          </div>

          {/* Image Gallery - Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 mb-8">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                className="relative h-80 overflow-hidden cursor-pointer hover:opacity-75 transition-opacity border border-white/10"
                onClick={() => setActiveImageIndex(idx)}
              >
                <Image
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Image Gallery - Mobile Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 mb-8">
            <div className="flex gap-4" style={{width: 'max-content'}}>
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx}
                  className="relative h-64 w-[85vw] shrink-0 overflow-hidden cursor-pointer hover:opacity-75 transition-opacity border border-white/10"
                  onClick={() => setActiveImageIndex(idx)}
                >
                  <Image
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-16 px-4 bg-luxury-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Quick Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 p-8 bg-luxury-black border border-white/10">
                <div className="text-center py-4">
                  <p className="text-5xl md:text-6xl font-serif text-white mb-3" style={{fontWeight: 300}}>{property.beds}</p>
                  <p className="text-gray-400 text-xs tracking-widest uppercase" style={{fontWeight: 300}}>Bedrooms</p>
                </div>
                <div className="text-center py-4 sm:border-l sm:border-r border-white/10">
                  <p className="text-5xl md:text-6xl font-serif text-white mb-3" style={{fontWeight: 300}}>{property.baths}</p>
                  <p className="text-gray-400 text-xs tracking-widest uppercase" style={{fontWeight: 300}}>Bathrooms</p>
                </div>
                <div className="text-center py-4">
                  <p className="text-5xl md:text-6xl font-serif text-white mb-3" style={{fontWeight: 300}}>{property.sqft}</p>
                  <p className="text-gray-400 text-xs tracking-widest uppercase" style={{fontWeight: 300}}>Square Feet</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-12">
                <h2 className="text-3xl font-serif mb-4 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
                  PROPERTY DESCRIPTION
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="mb-12">
                <h2 className="text-3xl font-serif mb-6 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
                  PREMIUM AMENITIES
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center text-gray-300">
                      <svg className="w-5 h-5 text-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div>
                <h2 className="text-3xl font-serif mb-6 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
                  LOCATION
                </h2>
                <div className="bg-luxury-black h-64 flex items-center justify-center">
                  <p className="text-gray-400">Map Integration Available</p>
                </div>
              </div>
            </div>

            {/* Contact Agent Form */}
            <div className="lg:col-span-1">
              <div className="bg-luxury-black p-6 md:p-8 md:sticky md:top-24 border border-white/10">
                <h3 className="text-2xl font-serif mb-6 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
                  CONTACT AGENT
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      <section className="py-20 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif mb-12 text-center text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
            SIMILAR PROPERTIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Map similar properties with area prop from sqft */}
            {similarProperties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} area={prop.sqft} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
