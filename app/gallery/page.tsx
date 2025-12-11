'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type GalleryImage = {
  url: string;
  title: string;
  category: 'Living Room' | 'Kitchen' | 'Bedroom' | 'Bathroom' | 'Exterior' | 'Dining Room';
};

export default function GalleryPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImages, setSelectedImages] = useState<GalleryImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showCounter, setShowCounter] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      setShowCounter(true);
      const timer = setTimeout(() => {
        setShowCounter(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [lightboxOpen, currentImageIndex]);

  const galleryImages: GalleryImage[] = [
    // Living Room
    {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      title: 'Modern Living Space',
      category: 'Living Room'
    },
    {
      url: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200',
      title: 'Contemporary Lounge',
      category: 'Living Room'
    },
    {
      url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200',
      title: 'Elegant Living Area',
      category: 'Living Room'
    },
    {
      url: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200',
      title: 'Luxury Living Suite',
      category: 'Living Room'
    },
    
    // Kitchen
    {
      url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
      title: 'Gourmet Kitchen',
      category: 'Kitchen'
    },
    {
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
      title: 'Modern Culinary Space',
      category: 'Kitchen'
    },
    {
      url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200',
      title: 'Chef\'s Kitchen',
      category: 'Kitchen'
    },
    {
      url: 'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?w=1200',
      title: 'Contemporary Kitchen Design',
      category: 'Kitchen'
    },
    
    // Bedroom
    {
      url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200',
      title: 'Master Bedroom Suite',
      category: 'Bedroom'
    },
    {
      url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200',
      title: 'Luxury Sleeping Quarter',
      category: 'Bedroom'
    },
    {
      url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200',
      title: 'Elegant Bedroom',
      category: 'Bedroom'
    },
    {
      url: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200',
      title: 'Modern Bedroom Design',
      category: 'Bedroom'
    },
    
    // Bathroom
    {
      url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200',
      title: 'Spa-Like Bathroom',
      category: 'Bathroom'
    },
    {
      url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200',
      title: 'Master Bathroom',
      category: 'Bathroom'
    },
    {
      url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200',
      title: 'Luxury Ensuite',
      category: 'Bathroom'
    },
    {
      url: 'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=1200',
      title: 'Modern Bathroom',
      category: 'Bathroom'
    },
    
    // Exterior
    {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
      title: 'Luxury Estate Facade',
      category: 'Exterior'
    },
    {
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      title: 'Modern Architecture',
      category: 'Exterior'
    },
    {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
      title: 'Grand Entrance',
      category: 'Exterior'
    },
    {
      url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200',
      title: 'Architectural Excellence',
      category: 'Exterior'
    },
    
    // Dining Room
    {
      url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200',
      title: 'Formal Dining',
      category: 'Dining Room'
    },
    {
      url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200',
      title: 'Elegant Dining Space',
      category: 'Dining Room'
    },
    {
      url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200',
      title: 'Modern Dining Area',
      category: 'Dining Room'
    },
    {
      url: 'https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=1200',
      title: 'Luxury Dining Room',
      category: 'Dining Room'
    },
  ];

  const categories = ['All', 'Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Exterior', 'Dining Room'];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (images: GalleryImage[], startIndex: number) => {
    setSelectedImages(images);
    setCurrentImageIndex(startIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + selectedImages.length) % selectedImages.length);
  };

  return (
    <main>
      <Navbar />
      
      {/* Header */}
      <section className="relative pt-32 pb-20 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl font-serif mb-6 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{fontWeight: 300, letterSpacing: '0.1em'}}>
            GALLERY
          </h1>
          <p className={`text-sm text-gray-400 tracking-widest transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{fontWeight: 300}}>
            EXPLORE OUR EXCLUSIVE PORTFOLIO
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 px-4 bg-luxury-black border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Filter Buttons */}
          <div className="hidden md:flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 border text-xs tracking-widest transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-white text-luxury-black border-white'
                    : 'bg-transparent text-white border-white/30 hover:border-white/60'
                }`}
                style={{fontWeight: 300}}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
          
          {/* Mobile Horizontal Scroll Filter */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-3 pb-2" style={{width: 'max-content'}}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-3 border text-xs tracking-widest transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-white text-luxury-black border-white'
                      : 'bg-transparent text-white border-white/30'
                  }`}
                  style={{fontWeight: 300}}
                >
                  {category.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, idx) => {
              const categoryImages = galleryImages.filter(img => img.category === image.category);
              const imageIndexInCategory = categoryImages.findIndex(img => img.url === image.url);
              
              return (
                <div 
                  key={idx}
                  className={`relative h-[400px] overflow-hidden group cursor-pointer border border-white/10 opacity-0 ${isVisible ? 'animate-fade-in-scale' : ''}`}
                  style={{animationDelay: `${(idx % 12) * 0.05}s`, animationFillMode: 'forwards'}}
                  onClick={() => openLightbox(categoryImages, imageIndexInCategory)}
                >
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-[0.7] group-hover:brightness-[0.5]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-luxury-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs text-gray-400 mb-2 tracking-widest">{image.category.toUpperCase()}</p>
                    <h3 className="text-xl font-serif text-white" style={{fontWeight: 300, letterSpacing: '0.05em'}}>
                      {image.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2">{categoryImages.length} images in this collection</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && selectedImages.length > 0 && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-luxury-black/95 p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-8 right-8 text-white hover:text-gray-400 transition-colors z-10"
            onClick={closeLightbox}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          {selectedImages.length > 1 && (
            <button
              className="absolute left-8 text-white hover:text-gray-400 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); previousImage(); }}
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image Container */}
          <div className="relative w-full max-w-6xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImages[currentImageIndex].url}
              alt={selectedImages[currentImageIndex].title}
              fill
              className="object-contain"
            />
            <div className={`absolute bottom-0 left-0 right-0 bg-luxury-black/80 p-6 text-center transition-opacity duration-500 ${showCounter ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-xs text-gray-400 mb-2 tracking-widest">
                {selectedImages[currentImageIndex].category.toUpperCase()}
              </p>
              <h3 className="text-2xl font-serif text-white mb-2" style={{fontWeight: 300}}>
                {selectedImages[currentImageIndex].title}
              </h3>
              <p className="text-xs text-gray-400">
                {currentImageIndex + 1} of {selectedImages.length}
              </p>
            </div>
          </div>

          {/* Next Button */}
          {selectedImages.length > 1 && (
            <button
              className="absolute right-8 text-white hover:text-gray-400 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* CTA Section */}
      <section className="py-32 px-4 bg-luxury-charcoal border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
            EXPERIENCE LUXURY IN PERSON
          </h2>
          <p className="text-gray-300 mb-12 text-sm" style={{fontWeight: 300}}>
            Schedule a private tour and discover your dream home
          </p>
          <a href="/book-visit" className="btn-primary">
            BOOK A VISIT
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
