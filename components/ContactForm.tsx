'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label htmlFor="name" className="block text-xs text-gray-400 mb-3 tracking-widest" style={{fontWeight: 300}}>
          FULL NAME *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-luxury-black border border-white/20 px-4 py-4 text-white text-sm focus:outline-none focus:border-white transition-all duration-300"
          placeholder="John Doe"
          style={{fontWeight: 300}}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs text-gray-400 mb-3 tracking-widest" style={{fontWeight: 300}}>
          EMAIL ADDRESS *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-luxury-black border border-white/20 px-4 py-4 text-white text-sm focus:outline-none focus:border-white transition-all duration-300"
          placeholder="john@example.com"
          style={{fontWeight: 300}}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs text-gray-400 mb-3 tracking-widest" style={{fontWeight: 300}}>
          PHONE NUMBER
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full bg-luxury-black border border-white/20 px-4 py-4 text-white text-sm focus:outline-none focus:border-white transition-all duration-300"
          placeholder="+233 123 456 789"
          style={{fontWeight: 300}}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs text-gray-400 mb-3 tracking-widest" style={{fontWeight: 300}}>
          MESSAGE *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-luxury-black border border-white/20 px-4 py-4 text-white text-sm focus:outline-none focus:border-white transition-all duration-300 resize-none"
          placeholder="Tell us about your requirements..."
          style={{fontWeight: 300}}
        />
      </div>

      {submitStatus === 'success' && (
        <div className="bg-green-900/20 border border-green-500/50 text-green-400 px-4 py-3 text-sm">
          Thank you for your inquiry! We will contact you shortly.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-900/20 border border-red-500/50 text-red-400 px-4 py-3 text-sm">
          Failed to send message. Please try again.
        </div>
      )}

      <button 
        type="submit" 
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
      </button>
    </form>
  );
}
