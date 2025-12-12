'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Link from 'next/link';

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => {
        // Filter only visible agents
        const visibleAgents = data.filter((a: any) => a.visible !== false);
        setAgents(visibleAgents);
      })
      .catch(() => setAgents([]));
  }, []);

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
            OUR SPECIALISTS
          </h1>
          <p className={`text-sm text-gray-400 max-w-3xl mx-auto tracking-widest transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{fontWeight: 300}}>
            DEDICATED PROFESSIONALS COMMITTED TO EXCELLENCE
          </p>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-16 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.map((agent, index) => (
              <div key={agent.id} className={`bg-luxury-charcoal border border-white/10 overflow-hidden group hover:shadow-2xl hover:shadow-white/10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{transitionDelay: `${index * 100}ms`}}>
                <div className="relative h-96 overflow-hidden">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="text-xl font-serif text-white mb-2 tracking-wider" style={{fontWeight: 400}}>
                    {agent.name}
                  </h3>
                  <p className="text-white/60 mb-6 text-xs tracking-widest" style={{fontWeight: 300}}>{agent.role.toUpperCase()}</p>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed" style={{fontWeight: 300}}>{agent.bio}</p>
                  
                  <div className="space-y-3 mb-6 text-xs">
                    <p className="text-gray-400 flex items-center">
                      <svg className="w-3 h-3 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span style={{fontWeight: 300}}>{agent.phone}</span>
                    </p>
                    <p className="text-gray-400 flex items-center">
                      <svg className="w-3 h-3 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span style={{fontWeight: 300}}>{agent.email}</span>
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-6 grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-serif text-white" style={{fontWeight: 300}}>
                        {agent.rating ? agent.rating.toFixed(1) : '5.0'}
                      </p>
                      <p className="text-xs text-gray-400 tracking-widest mt-1" style={{fontWeight: 300}}>RATING</p>
                    </div>
                    <div>
                      <p className="text-2xl font-serif text-white" style={{fontWeight: 300}}>
                        {agent.propertiesSold || agent.properties || '50+'}
                      </p>
                      <p className="text-xs text-gray-400 tracking-widest mt-1" style={{fontWeight: 300}}>SOLD</p>
                    </div>
                  </div>

                  <Link href={`/agents/${agent.id}`} className="btn-secondary w-full mt-6 block text-center">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-luxury-black border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
            BEGIN YOUR JOURNEY
          </h2>
          <a href="/contact" className="btn-primary">
            SCHEDULE CONSULTATION
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
