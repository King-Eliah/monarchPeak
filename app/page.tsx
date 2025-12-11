'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import CountUp from '@/components/CountUp';
import { featuredProperties } from '@/lib/data';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function Home() {
  const heroContent = useScrollAnimation();
  const aboutLeft = useScrollAnimation();
  const aboutRight = useScrollAnimation();
  const stats1 = useScrollAnimation();
  const stats2 = useScrollAnimation();
  const stats3 = useScrollAnimation();
  const stats4 = useScrollAnimation();
  const featuredTitle = useScrollAnimation();
  const property1 = useScrollAnimation();
  const property2 = useScrollAnimation();
  const property3 = useScrollAnimation();
  const featuredDesc = useScrollAnimation();
  const beliefsLeft = useScrollAnimation();
  const beliefsRight = useScrollAnimation();
  const ctaSection = useScrollAnimation();

  const heroImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920',
  ];

  return (
    <main className="bg-luxury-black">
      <Navbar />
      
      {/* Hero Section with Horizontal Slideshow */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Sliding Image Container */}
        <div className="absolute inset-0 z-0 flex slideshow-container">
          {heroImages.map((img, idx) => (
            <div key={idx} className="relative min-w-screen h-full">
              <Image
                src={img}
                alt={`Luxury Home ${idx + 1}`}
                fill
                className="object-cover brightness-[0.4]"
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-5 bg-linear-to-r from-luxury-black/80 via-transparent to-luxury-black/60"></div>
        
        {/* Large Text Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-start pl-8 md:pl-16 lg:pl-24 pointer-events-none">
          <h1 className="text-[12rem] md:text-[16rem] lg:text-[20rem] xl:text-[24rem] font-serif text-white/10 leading-none tracking-tight" style={{fontWeight: 300}}>
            MONARCHPEAK
          </h1>
        </div>
        
        {/* Content Panel */}
        <div ref={heroContent.elementRef} className="relative z-20 mx-auto md:ml-auto md:mr-8 lg:mr-16 xl:mr-24 max-w-md opacity-0 animate-fade-in-up px-4 md:px-0" style={{animationFillMode: 'forwards'}}>
          <div className="bg-luxury-black/60 backdrop-blur-sm p-10 border border-white/10">
            <p className="section-title text-white mb-3">HOLISTIC LUXURY</p>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6 text-white" style={{fontWeight: 400}}>
              IN PERFECT<br/>HARMONY
            </h2>
            
            <p className="text-gray-300 leading-relaxed mb-8 text-sm" style={{fontWeight: 300}}>
              Welcome to MonarchPeak, where timeless design, wellness-focused living 
              and cultural enrichment converge in order to create an unparalleled 
              sanctuary of elegance and serenity.
            </p>
            
            <div className="flex items-center text-white text-xs font-medium tracking-widest">
              <span>SCROLL</span>
              <svg className="w-4 h-4 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-8 md:px-16 bg-luxury-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={aboutLeft.elementRef} className="opacity-0 animate-fade-in-up" style={{animationFillMode: 'forwards'}}>
              <p className="section-title text-gray-400 mb-6">(ABOUT)</p>
              <h2 className="large-heading font-serif mb-8" style={{fontWeight: 300}}>
                TIMELESS DESIGN.<br/>
                <span className="italic">WELLNESS-<br/>FOCUSED</span><br/>
                LIVING.
              </h2>
            </div>
            
            <div ref={aboutRight.elementRef} className="opacity-0 animate-slide-in-left" style={{animationFillMode: 'forwards'}}>
              <div className="relative h-96 mb-8 overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800"
                  alt="Interior"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 text-sm" style={{fontWeight: 300}}>
                Every element of MonarchPeak reflects a commitment to excellence. From the timeless 
                elegance of its interiors to its thoughtfully curated amenities, the property embodies 
                a holistic approach to luxury living.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8 text-sm" style={{fontWeight: 300}}>
                Whether you&apos;re seeking a serene retreat, cultural hub, or a space that fosters personal 
                growth, MonarchPeak offers it all.
              </p>
              <a href="/about" className="btn-primary">LEARN MORE</a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-8 md:px-16 bg-luxury-charcoal border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-16">
            <div ref={stats1.elementRef} className="animate-fade-in-up" style={{animationFillMode: 'forwards'}}>
              <div className="text-7xl md:text-8xl font-serif text-white" style={{fontWeight: 300}}>
                <CountUp end={150} suffix="k" className="inline" />
              </div>
              <p className="text-2xl text-gray-400 mb-8" style={{fontWeight: 300}}>sq. ft.</p>
              <p className="text-gray-400 text-sm" style={{fontWeight: 300}}>of meticulously designed<br/>living space.</p>
            </div>
            
            <div ref={stats2.elementRef} className="animate-fade-in-up" style={{animationFillMode: 'forwards'}}>
              <div className="text-7xl md:text-8xl font-serif text-white mb-8" style={{fontWeight: 300}}>
                <CountUp end={60} suffix="%" className="inline" />
              </div>
              <p className="text-gray-400 text-sm" style={{fontWeight: 300}}>green spaces<br/>for tranquility & wellness.</p>
            </div>
            
            <div ref={stats3.elementRef} className="animate-fade-in-up" style={{animationFillMode: 'forwards'}}>
              <div className="text-7xl md:text-8xl font-serif text-white mb-8" style={{fontWeight: 300}}>
                <CountUp end={30} className="inline" />
              </div>
              <p className="text-gray-400 text-sm" style={{fontWeight: 300}}>
                <span className="block animate-slide-in-left" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>exclusive residences,</span>
                <span className="block animate-slide-in-left" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>each tailored for comfort</span>
                <span className="block animate-slide-in-left" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>& elegance.</span>
              </p>
            </div>
            
            <div ref={stats4.elementRef} className="animate-fade-in-up" style={{animationFillMode: 'forwards'}}>
              <h3 className="text-7xl md:text-8xl font-serif text-white mb-8" style={{fontWeight: 300}}>24/7</h3>
              <p className="text-gray-400 text-sm" style={{fontWeight: 300}}>
                <span className="block animate-slide-in-left" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>concierge services, meeting</span>
                <span className="block animate-slide-in-left" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>every need effortlessly.</span>
              </p>
            </div>
          </div>
          
          {/* Mobile Grid */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-12 text-center">
            <div ref={stats1.elementRef} className="animate-fade-in-up" style={{animationFillMode: 'forwards'}}>
              <div className="text-7xl font-serif text-white" style={{fontWeight: 300}}>
                <CountUp end={150} suffix="k" className="inline" />
              </div>
              <p className="text-2xl text-gray-400 mb-8" style={{fontWeight: 300}}>sq. ft.</p>
              <p className="text-gray-400 text-sm" style={{fontWeight: 300}}>of meticulously designed<br/>living space.</p>
            </div>
            
            <div ref={stats2.elementRef} className={`${stats2.isVisible ? 'animate-fade-in-up' : ''}`} style={{animationFillMode: 'forwards'}}>
              <div className="text-7xl font-serif text-white mb-8" style={{fontWeight: 300}}>
                <CountUp end={60} suffix="%" className="inline" />
              </div>
              <p className="text-gray-400 text-sm" style={{fontWeight: 300}}>green spaces<br/>for tranquility & wellness.</p>
            </div>
            
            <div ref={stats3.elementRef} className={`${stats3.isVisible ? 'animate-fade-in-up' : ''}`} style={{animationFillMode: 'forwards'}}>
              <div className="text-7xl font-serif text-white mb-8" style={{fontWeight: 300}}>
                <CountUp end={30} className="inline" />
              </div>
              <p className="text-gray-400 text-sm" style={{fontWeight: 300}}>
                <span className={`block ${stats3.isVisible ? 'animate-slide-in-left' : ''}`} style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>exclusive residences,</span>
                <span className={`block ${stats3.isVisible ? 'animate-slide-in-left' : ''}`} style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>each tailored for comfort</span>
                <span className={`block ${stats3.isVisible ? 'animate-slide-in-left' : ''}`} style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>& elegance.</span>
              </p>
            </div>
            
            <div ref={stats4.elementRef} className={`${stats4.isVisible ? 'animate-fade-in-up' : ''}`} style={{animationFillMode: 'forwards'}}>
              <h3 className="text-7xl font-serif text-white mb-8" style={{fontWeight: 300}}>24/7</h3>
              <p className="text-gray-400 text-sm" style={{fontWeight: 300}}>
                <span className="block animate-slide-in-left" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>concierge services, meeting</span>
                <span className="block animate-slide-in-left" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>every need effortlessly.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-32 px-8 md:px-16 bg-luxury-black">
        <div className="max-w-7xl mx-auto">
          <div ref={featuredTitle.elementRef} className="flex justify-between items-start mb-16 opacity-0 animate-fade-in-up" style={{animationFillMode: 'forwards'}}>
            <div>
              <p className="section-title text-gray-400 mb-4">(OUR PROJECTS)</p>
              <h2 className="large-heading font-serif" style={{fontWeight: 300}}>
                LUMIÈRE DUPLEX<br/>
                <span className="italic">RESIDENCES</span>
              </h2>
            </div>
            <div className="hidden lg:flex gap-2 text-gray-400">
              <span>(1)</span>
              <span>(2)</span>
              <span>(3)</span>
            </div>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-12">
            <div ref={property1.elementRef}>
              <PropertyCard {...featuredProperties[0]} />
            </div>
            <div ref={property2.elementRef}>
              <PropertyCard {...featuredProperties[1]} />
            </div>
            <div ref={property3.elementRef}>
              <PropertyCard {...featuredProperties[2]} />
            </div>
          </div>
          
          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-8 px-8 mb-12">
            <div className="flex gap-6" style={{width: 'max-content'}}>
              <div ref={property1.elementRef} className="w-[85vw] shrink-0">
                <PropertyCard {...featuredProperties[0]} />
              </div>
              <div ref={property2.elementRef} className="w-[85vw] shrink-0">
                <PropertyCard {...featuredProperties[1]} />
              </div>
              <div ref={property3.elementRef} className="w-[85vw] shrink-0">
                <PropertyCard {...featuredProperties[2]} />
              </div>
            </div>
          </div>
          
          <div ref={featuredDesc.elementRef} className="max-w-2xl opacity-0 animate-fade-in-up" style={{animationFillMode: 'forwards'}}>
            <p className="text-gray-300 mb-8 text-sm" style={{fontWeight: 300}}>
              Two-story luxury apartments that features sunlit living spaces, private terraces, 
              and a selection of exclusive amenities.
            </p>
            <a href="/properties" className="btn-secondary">LEARN MORE</a>
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      <section className="py-32 px-8 md:px-16 bg-luxury-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div ref={beliefsLeft.elementRef} className="relative h-[600px] overflow-hidden opacity-0 animate-slide-in-left" style={{animationFillMode: 'forwards'}}>
              <Image
                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200"
                alt="Interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-luxury-charcoal/60"></div>
            </div>
            
            <div ref={beliefsRight.elementRef} className="opacity-0 animate-fade-in-up" style={{animationFillMode: 'forwards'}}>
              <p className="section-title text-gray-400 mb-6">(OUR BELIEFS)</p>
              <h2 className="large-heading font-serif mb-8" style={{fontWeight: 300}}>
                A VISION OF<br/>
                <span className="italic">INSPIRED LIVING</span>
              </h2>
              
              <p className="text-gray-300 leading-relaxed mb-8 text-sm" style={{fontWeight: 300}}>
                To inspire and nurture an enriched lifestyle that harmonizes beauty, wellness, and cultural 
                connection, creating a sanctuary that feels like home.
              </p>
              
              <a href="/gallery" className="btn-primary">VIEW GALLERY</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 px-8 md:px-16 bg-luxury-black">
        <div ref={ctaSection.elementRef} className="max-w-4xl mx-auto text-center opacity-0 animate-fade-in-up" style={{animationFillMode: 'forwards'}}>
          <h2 className="large-heading font-serif mb-8" style={{fontWeight: 300}}>
            DISCOVER YOUR<br/>
            <span className="italic">SANCTUARY</span>
          </h2>
          <p className="text-gray-300 mb-12 text-sm" style={{fontWeight: 300}}>
            Experience the pinnacle of luxury living in Ghana&apos;s most prestigious address
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/gallery" className="btn-primary">
              VIEW GALLERY
            </a>
            <a href="/properties" className="btn-secondary">
              EXPLORE PROPERTIES
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
