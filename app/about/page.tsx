'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CountUp from '@/components/CountUp';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Animation hooks for testimonials
  const testimonial1 = useScrollAnimation();
  const testimonial2 = useScrollAnimation();
  const testimonial3 = useScrollAnimation();
  const testimonial4 = useScrollAnimation();
  const testimonial5 = useScrollAnimation();
  const testimonial6 = useScrollAnimation();
  
  // Animation hooks for core principles
  const principle1 = useScrollAnimation();
  const principle2 = useScrollAnimation();
  const principle3 = useScrollAnimation();
  const principle4 = useScrollAnimation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main>
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920"
            alt="About Us"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className={`text-5xl md:text-7xl font-serif mb-6 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{fontWeight: 300, letterSpacing: '0.1em'}}>
            OUR STORY
          </h1>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-32 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-3xl md:text-4xl font-serif mb-8 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
                REDEFINING LUXURY
              </h2>
              <div className="space-y-6 text-gray-300 text-sm leading-loose" style={{fontWeight: 300}}>
                <p>
                  Founded in 2008, MonarchPeak has established itself as Ghana&apos;s premier luxury real estate agency. 
                  We specialize in connecting discerning clients with the most exclusive properties in Accra&apos;s most 
                  prestigious neighborhoods.
                </p>
                <p>
                  Our journey began with a simple mission: to redefine luxury real estate in West Africa. Today, we&apos;re 
                  proud to have helped hundreds of clients find their dream homes and investment properties.
                </p>
                <p>
                  With over 15 years of experience, our team combines local expertise with international standards, 
                  ensuring every client receives white-glove service throughout their real estate journey.
                </p>
              </div>
            </div>
            
            <div className={`relative h-[500px] lg:h-[600px] overflow-hidden transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800"
                alt="Luxury Property"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 px-4 bg-luxury-charcoal border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-20 text-center">
            <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-7xl font-serif text-white mb-6" style={{fontWeight: 300}}>
                <CountUp end={500} suffix="+" />
              </div>
              <p className="text-xs text-gray-400 tracking-widest" style={{fontWeight: 300}}>LUXURY HOMES SOLD</p>
            </div>
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-7xl font-serif text-white mb-6" style={{fontWeight: 300}}>
                <CountUp end={15} suffix="+" />
              </div>
              <p className="text-xs text-gray-400 tracking-widest" style={{fontWeight: 300}}>YEARS OF EXCELLENCE</p>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-7xl font-serif text-white mb-6" style={{fontWeight: 300}}>
                <CountUp end={30} suffix="+" />
              </div>
              <p className="text-xs text-gray-400 tracking-widest" style={{fontWeight: 300}}>INDUSTRY AWARDS</p>
            </div>
          </div>
          
          {/* Mobile Grid */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-12 text-center">
            <div className={`transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-7xl font-serif text-white mb-6" style={{fontWeight: 300}}>
                <CountUp end={500} suffix="+" />
              </div>
              <p className="text-xs text-gray-400 tracking-widest" style={{fontWeight: 300}}>LUXURY HOMES SOLD</p>
            </div>
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-7xl font-serif text-white mb-6" style={{fontWeight: 300}}>
                <CountUp end={15} suffix="+" />
              </div>
              <p className="text-xs text-gray-400 tracking-widest" style={{fontWeight: 300}}>YEARS OF EXCELLENCE</p>
            </div>
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-7xl font-serif text-white mb-6" style={{fontWeight: 300}}>
                <CountUp end={30} suffix="+" />
              </div>
              <p className="text-xs text-gray-400 tracking-widest" style={{fontWeight: 300}}>INDUSTRY AWARDS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="relative py-32 px-4 bg-luxury-charcoal overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920"
            alt="Luxury Property Background"
            fill
            className="object-cover brightness-[0.25]"
            priority
            unoptimized
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
              CLIENT TESTIMONIALS
            </h2>
            <p className="text-gray-400 text-sm" style={{fontWeight: 300}}>What our clients say about us</p>
          </div>
          
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Desktop Grid - All testimonials */}
            {/* Testimonial 1 */}
            <div ref={testimonial1.elementRef} className={`bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 ${testimonial1.isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="mb-6">
                <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                &quot;Working with MonarchPeak was an exceptional experience. Their attention to detail and commitment to finding us the perfect home was outstanding. We couldn&apos;t be happier with our new luxury residence.&quot;
              </p>
              <div className="border-t border-white/10 pt-6">
                <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>KWAME OSEI</p>
                <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>CEO, Tech Innovations Ghana</p>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div ref={testimonial2.elementRef} className={`bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 ${testimonial2.isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
              <div className="mb-6">
                <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                &quot;Professional, knowledgeable, and truly dedicated to their clients. The team at MonarchPeak made our property search seamless and stress-free. Highly recommended for anyone seeking luxury properties in Accra.&quot;
              </p>
              <div className="border-t border-white/10 pt-6">
                <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>AMARA MENSAH</p>
                <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>Investment Banker</p>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div ref={testimonial3.elementRef} className={`bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 ${testimonial3.isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
              <div className="mb-6">
                <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                &quot;The level of service exceeded all expectations. From the initial consultation to closing, every step was handled with professionalism and care. Our dream home became a reality thanks to their expertise.&quot;
              </p>
              <div className="border-t border-white/10 pt-6">
                <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>DAVID ADJEI</p>
                <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>Entrepreneur</p>
              </div>
            </div>
            
            {/* Testimonial 4 */}
            <div ref={testimonial4.elementRef} className={`bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 ${testimonial4.isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <div className="mb-6">
                <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                &quot;MonarchPeak delivered beyond what we imagined. Their market knowledge and negotiation skills secured us an incredible property at the best value. Truly the best in the business.&quot;
              </p>
              <div className="border-t border-white/10 pt-6">
                <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>SOPHIA ANKRAH</p>
                <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>Medical Director</p>
              </div>
            </div>
            
            {/* Testimonial 5 */}
            <div ref={testimonial5.elementRef} className={`bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 ${testimonial5.isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
              <div className="mb-6">
                <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                &quot;Exceptional service from start to finish. The team understood exactly what we were looking for and presented options that perfectly matched our criteria. A truly five-star experience.&quot;
              </p>
              <div className="border-t border-white/10 pt-6">
                <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>MICHAEL BOATENG</p>
                <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>Finance Executive</p>
              </div>
            </div>
            
            {/* Testimonial 6 */}
            <div ref={testimonial6.elementRef} className={`bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 ${testimonial6.isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.5s'}}>
              <div className="mb-6">
                <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                &quot;Their dedication to client satisfaction is unmatched. Every question was answered promptly, and they went above and beyond to ensure a smooth transaction. We are thrilled with our investment.&quot;
              </p>
              <div className="border-t border-white/10 pt-6">
                <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>GRACE OWUSU</p>
                <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>Real Estate Investor</p>
              </div>
            </div>
          </div>
          
          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-6 pb-4" style={{width: 'max-content'}}>
              {/* Testimonial 1 */}
              <div className="bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 w-[85vw] flex-shrink-0">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                  &quot;Working with MonarchPeak was an exceptional experience. Their attention to detail and commitment to finding us the perfect home was outstanding. We couldn&apos;t be happier with our new luxury residence.&quot;
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>KWAME OSEI</p>
                  <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>CEO, Tech Innovations Ghana</p>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 w-[85vw] flex-shrink-0">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                  &quot;Professional, knowledgeable, and truly dedicated to their clients. The team at MonarchPeak made our property search seamless and stress-free. Highly recommended for anyone seeking luxury properties in Accra.&quot;
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>AMARA MENSAH</p>
                  <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>Investment Banker</p>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 w-[85vw] flex-shrink-0">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                  &quot;The level of service exceeded all expectations. From the initial consultation to closing, every step was handled with professionalism and care. Our dream home became a reality thanks to their expertise.&quot;
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>DAVID ADJEI</p>
                  <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>Entrepreneur</p>
                </div>
              </div>
              
              {/* Testimonial 4 */}
              <div className="bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 w-[85vw] flex-shrink-0">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                  &quot;MonarchPeak delivered beyond what we imagined. Their market knowledge and negotiation skills secured us an incredible property at the best value. Truly the best in the business.&quot;
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>SOPHIA ANKRAH</p>
                  <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>Medical Director</p>
                </div>
              </div>
              
              {/* Testimonial 5 */}
              <div className="bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 w-[85vw] flex-shrink-0">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                  &quot;Exceptional service from start to finish. The team understood exactly what we were looking for and presented options that perfectly matched our criteria. A truly five-star experience.&quot;
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>MICHAEL BOATENG</p>
                  <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>Finance Executive</p>
                </div>
              </div>
              
              {/* Testimonial 6 */}
              <div className="bg-luxury-black/60 backdrop-blur-sm border border-white/10 p-8 w-[85vw] flex-shrink-0">
                <div className="mb-6">
                  <svg className="w-8 h-8 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-300 text-sm mb-6 leading-relaxed" style={{fontWeight: 300}}>
                  &quot;Their dedication to client satisfaction is unmatched. Every question was answered promptly, and they went above and beyond to ensure a smooth transaction. We are thrilled with our investment.&quot;
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white font-serif text-sm mb-1" style={{fontWeight: 400}}>GRACE OWUSU</p>
                  <p className="text-gray-500 text-xs" style={{fontWeight: 300}}>Real Estate Investor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-32 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
              CORE PRINCIPLES
            </h2>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div ref={principle1.elementRef} className={`text-center p-8 border border-white/10 transition-all duration-500 hover:border-white/30 ${principle1.isVisible ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif mb-3 tracking-wider text-white" style={{fontWeight: 400}}>INTEGRITY</h3>
              <p className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: 300}}>Transparent and honest in every transaction</p>
            </div>
            
            <div ref={principle2.elementRef} className={`text-center p-8 border border-white/10 transition-all duration-500 hover:border-white/30 ${principle2.isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif mb-3 tracking-wider text-white" style={{fontWeight: 400}}>EXCELLENCE</h3>
              <p className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: 300}}>Exceeding expectations in service quality</p>
            </div>
            
            <div ref={principle3.elementRef} className={`text-center p-8 border border-white/10 transition-all duration-500 hover:border-white/30 ${principle3.isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif mb-3 tracking-wider text-white" style={{fontWeight: 400}}>CLIENT-FIRST</h3>
              <p className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: 300}}>Your needs are our top priority</p>
            </div>
            
            <div ref={principle4.elementRef} className={`text-center p-8 border border-white/10 transition-all duration-500 hover:border-white/30 ${principle4.isVisible ? 'animate-slide-in-left' : 'opacity-0'}`} style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif mb-3 tracking-wider text-white" style={{fontWeight: 400}}>INNOVATION</h3>
              <p className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: 300}}>Embracing modern real estate solutions</p>
            </div>
          </div>
          
          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-6" style={{width: 'max-content'}}>
              <div className="text-center p-8 border border-white/10 w-[80vw] flex-shrink-0">
                <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif mb-3 tracking-wider text-white" style={{fontWeight: 400}}>INTEGRITY</h3>
                <p className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: 300}}>Transparent and honest in every transaction</p>
              </div>
              
              <div className="text-center p-8 border border-white/10 w-[80vw] flex-shrink-0">
                <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif mb-3 tracking-wider text-white" style={{fontWeight: 400}}>EXCELLENCE</h3>
                <p className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: 300}}>Exceeding expectations in service quality</p>
              </div>
              
              <div className="text-center p-8 border border-white/10 w-[80vw] flex-shrink-0">
                <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif mb-3 tracking-wider text-white" style={{fontWeight: 400}}>CLIENT-FIRST</h3>
                <p className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: 300}}>Your needs are our top priority</p>
              </div>
              
              <div className="text-center p-8 border border-white/10 w-[80vw] flex-shrink-0">
                <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-serif mb-3 tracking-wider text-white" style={{fontWeight: 400}}>INNOVATION</h3>
                <p className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: 300}}>Embracing modern real estate solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 bg-luxury-charcoal border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
            BEGIN YOUR JOURNEY
          </h2>
          <a href="/contact" className="btn-primary">
            CONNECT WITH US
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
