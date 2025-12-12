'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import Image from 'next/image';
import { Mail, Phone, Star, Award } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  rating: number;
  propertiesSold: number;
}

export default function AgentDetailPage() {
  const params = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/agents/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setAgent(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching agent:', err);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen bg-luxury-black flex items-center justify-center">
          <p className="text-white text-xl">Loading...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!agent) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen bg-luxury-black flex items-center justify-center">
          <p className="text-white text-xl">Agent not found</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Agent Image */}
            <div className="relative h-[500px] lg:h-[600px] overflow-hidden bg-luxury-charcoal">
              {agent.image && (
                <Image
                  src={agent.image}
                  alt={agent.name || 'Agent'}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>

            {/* Agent Info */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-serif text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
                {agent.name}
              </h1>
              <p className="text-xl text-gray-400" style={{fontWeight: 300}}>
                {agent.role}
              </p>

              {/* Rating & Properties Sold */}
              <div className="flex flex-wrap gap-8 py-6 border-y border-white/10">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  <div>
                    <p className="text-3xl font-serif text-white">{agent.rating ? agent.rating.toFixed(1) : '5.0'}</p>
                    <p className="text-xs text-gray-400 tracking-widest" style={{fontWeight: 300}}>RATING</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-gold" />
                  <div>
                    <p className="text-3xl font-serif text-white">{agent.propertiesSold || 0}+</p>
                    <p className="text-xs text-gray-400 tracking-widest" style={{fontWeight: 300}}>PROPERTIES SOLD</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-300 text-sm leading-relaxed" style={{fontWeight: 300}}>
                {agent.bio}
              </p>

              {/* Contact Info */}
              <div className="space-y-4 pt-6">
                <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm" style={{fontWeight: 300}}>{agent.email}</span>
                </a>
                <a href={`tel:${agent.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm" style={{fontWeight: 300}}>{agent.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-luxury-charcoal">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
              GET IN TOUCH
            </h2>
            <p className="text-gray-400 text-sm" style={{fontWeight: 300}}>
              Contact {agent.name?.split(' ')[0] || 'our agent'} to discuss your property needs
            </p>
          </div>

          <div className="bg-luxury-black p-8 md:p-12 border border-white/10">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
