'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function BookVisitPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    propertyInterest: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error('Booking submission error:', err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main>
        <Navbar />
        <section className="min-h-screen flex items-center justify-center bg-luxury-black px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <svg className="w-20 h-20 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif mb-6 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
              VISIT SCHEDULED
            </h1>
            <p className="text-gray-300 mb-8 text-sm leading-relaxed" style={{fontWeight: 300}}>
              Thank you for your interest in MonarchPeak. Our team will contact you shortly to confirm your visit details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/" className="btn-primary">
                RETURN HOME
              </a>
              <a href="/properties" className="btn-secondary">
                VIEW PROPERTIES
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      
      {/* Header */}
      <section className="relative pt-32 pb-20 px-4 bg-luxury-black">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif mb-6 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
            BOOK A VISIT
          </h1>
          <p className="text-sm text-gray-400 tracking-widest" style={{fontWeight: 300}}>
            SCHEDULE YOUR PRIVATE TOUR
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 px-4 bg-luxury-black">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-gray-300 text-sm leading-relaxed" style={{fontWeight: 300}}>
              Experience the pinnacle of luxury living with a personalized tour of our exclusive properties. 
              Our expert team will guide you through every detail and answer all your questions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-xs text-gray-400 tracking-widest mb-3" style={{fontWeight: 300}}>
                  FIRST NAME *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-luxury-charcoal border border-white/10 text-white px-6 py-4 focus:outline-none focus:border-white/30 transition-colors text-sm"
                  style={{fontWeight: 300}}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs text-gray-400 tracking-widest mb-3" style={{fontWeight: 300}}>
                  LAST NAME *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-luxury-charcoal border border-white/10 text-white px-6 py-4 focus:outline-none focus:border-white/30 transition-colors text-sm"
                  style={{fontWeight: 300}}
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-xs text-gray-400 tracking-widest mb-3" style={{fontWeight: 300}}>
                  EMAIL *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-luxury-charcoal border border-white/10 text-white px-6 py-4 focus:outline-none focus:border-white/30 transition-colors text-sm"
                  style={{fontWeight: 300}}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs text-gray-400 tracking-widest mb-3" style={{fontWeight: 300}}>
                  PHONE NUMBER *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-luxury-charcoal border border-white/10 text-white px-6 py-4 focus:outline-none focus:border-white/30 transition-colors text-sm"
                  style={{fontWeight: 300}}
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preferredDate" className="block text-xs text-gray-400 tracking-widest mb-3" style={{fontWeight: 300}}>
                  PREFERRED DATE *
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-luxury-charcoal border border-white/10 text-white px-6 py-4 focus:outline-none focus:border-white/30 transition-colors text-sm"
                  style={{fontWeight: 300}}
                />
              </div>
              <div>
                <label htmlFor="preferredTime" className="block text-xs text-gray-400 tracking-widest mb-3" style={{fontWeight: 300}}>
                  PREFERRED TIME *
                </label>
                <div className="relative">
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full bg-luxury-charcoal border border-white/10 text-white px-6 py-4 focus:outline-none focus:border-white/30 transition-colors text-sm appearance-none cursor-pointer"
                    style={{fontWeight: 300}}
                  >
                    <option value="">Select a time</option>
                    <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
                    <option value="evening">Evening (3:00 PM - 6:00 PM)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Interest */}
            <div>
              <label htmlFor="propertyInterest" className="block text-xs text-gray-400 tracking-widest mb-3" style={{fontWeight: 300}}>
                PROPERTY OF INTEREST
              </label>
              <div className="relative">
                <select
                  id="propertyInterest"
                  name="propertyInterest"
                  value={formData.propertyInterest}
                  onChange={handleChange}
                  className="w-full bg-luxury-charcoal border border-white/10 text-white px-6 py-4 focus:outline-none focus:border-white/30 transition-colors text-sm appearance-none cursor-pointer"
                  style={{fontWeight: 300}}
                >
                  <option value="">Select a property</option>
                  <option value="Airport Residential Estate">Airport Residential Estate</option>
                  <option value="East Legon Heights">East Legon Heights</option>
                  <option value="Cantonments Villa">Cantonments Villa</option>
                  <option value="Ridge Mansion">Ridge Mansion</option>
                  <option value="Labone Penthouse">Labone Penthouse</option>
                  <option value="Other">Other / General Tour</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-xs text-gray-400 tracking-widest mb-3" style={{fontWeight: 300}}>
                ADDITIONAL REQUESTS OR QUESTIONS
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-luxury-charcoal border border-white/10 text-white px-6 py-4 focus:outline-none focus:border-white/30 transition-colors text-sm resize-none"
                style={{fontWeight: 300}}
                placeholder="Let us know if you have any specific requirements or questions..."
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-6 py-4 text-sm">
                Failed to submit booking. Please try again.
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button 
                type="submit" 
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SUBMITTING...' : 'SCHEDULE VISIT'}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-32 px-4 bg-luxury-charcoal border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif mb-3 tracking-wider text-white" style={{fontWeight: 400}}>FLEXIBLE SCHEDULING</h3>
              <p className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: 300}}>
                Tours available 7 days a week, including evenings and weekends
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif mb-3 tracking-wider text-white" style={{fontWeight: 400}}>EXPERT GUIDANCE</h3>
              <p className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: 300}}>
                Personalized tours with our experienced luxury property specialists
              </p>
            </div>
            
            <div>
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-serif mb-3 tracking-wider text-white" style={{fontWeight: 400}}>PRIVACY ASSURED</h3>
              <p className="text-gray-400 text-xs leading-relaxed" style={{fontWeight: 300}}>
                Private, confidential tours tailored to your preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
