'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import Dropdown from '@/components/Dropdown';
import Image from 'next/image';
import { featuredProperties } from '@/lib/data';
import { useState, useEffect } from 'react';

export default function PropertiesPage() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBeds, setSelectedBeds] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Filter properties based on selected criteria
  const filteredProperties = featuredProperties.filter((property) => {
    // Location filter
    if (selectedLocation && property.location.toLowerCase().replace(/\s+/g, '-') !== selectedLocation) {
      return false;
    }

    // Price range filter
    if (selectedPriceRange) {
      const price = parseInt(property.price.replace(/[$,]/g, ''));
      if (selectedPriceRange === '0-500000' && price > 500000) return false;
      if (selectedPriceRange === '500000-1000000' && (price < 500000 || price > 1000000)) return false;
      if (selectedPriceRange === '1000000-2000000' && (price < 1000000 || price > 2000000)) return false;
      if (selectedPriceRange === '2000000+' && price < 2000000) return false;
    }

    // Property type filter
    if (selectedType && !property.title.toLowerCase().includes(selectedType)) {
      return false;
    }

    // Bedrooms filter
    if (selectedBeds && property.beds < parseInt(selectedBeds)) {
      return false;
    }

    return true;
  });

  return (
    <main>
      <Navbar />
      
      {/* Header */}
      <section className="relative pt-32 pb-20 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl font-serif mb-6 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{fontWeight: 300, letterSpacing: '0.1em'}}>
            CURATED ESTATES
          </h1>
          <p className={`text-sm text-gray-400 tracking-widest transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{fontWeight: 300}}>
            EXCLUSIVE COLLECTION OF PREMIUM RESIDENCES
          </p>
        </div>
      </section>

      {/* Properties Grid with Filters */}
      <section className="py-16 px-4 bg-luxury-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-luxury-charcoal p-8 border border-white/10 sticky top-28">
                <h3 className="text-sm font-serif mb-8 text-white tracking-widest" style={{fontWeight: 300, letterSpacing: '0.15em'}}>
                  REFINE SEARCH
                </h3>
                
                <div className="space-y-6">
                  <Dropdown
                    label="LOCATION"
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                    placeholder="All Locations"
                    options={[
                      { value: '', label: 'All Locations' },
                      { value: 'airport-hills', label: 'Airport Hills' },
                      { value: 'east-legon', label: 'East Legon' },
                      { value: 'cantonments', label: 'Cantonments' },
                      { value: 'ridge', label: 'Ridge' },
                      { value: 'labone', label: 'Labone' },
                    ]}
                  />

                  <Dropdown
                    label="PRICE RANGE"
                    value={selectedPriceRange}
                    onChange={setSelectedPriceRange}
                    placeholder="Any Price"
                    options={[
                      { value: '', label: 'Any Price' },
                      { value: '0-500000', label: '$0 - $500k' },
                      { value: '500000-1000000', label: '$500k - $1M' },
                      { value: '1000000-2000000', label: '$1M - $2M' },
                      { value: '2000000+', label: '$2M+' },
                    ]}
                  />

                  <Dropdown
                    label="PROPERTY TYPE"
                    value={selectedType}
                    onChange={setSelectedType}
                    placeholder="All Types"
                    options={[
                      { value: '', label: 'All Types' },
                      { value: 'mansion', label: 'Mansion' },
                      { value: 'penthouse', label: 'Penthouse' },
                      { value: 'villa', label: 'Villa' },
                      { value: 'estate', label: 'Estate' },
                    ]}
                  />

                  <Dropdown
                    label="BEDROOMS"
                    value={selectedBeds}
                    onChange={setSelectedBeds}
                    placeholder="Any"
                    options={[
                      { value: '', label: 'Any' },
                      { value: '3', label: '3+' },
                      { value: '4', label: '4+' },
                      { value: '5', label: '5+' },
                      { value: '6', label: '6+' },
                    ]}
                  />

                  <button 
                    onClick={() => {
                      setSelectedLocation('');
                      setSelectedPriceRange('');
                      setSelectedType('');
                      setSelectedBeds('');
                    }}
                    className="btn-secondary w-full"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-400">
                  Showing <span className="text-white font-semibold">{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <PropertyCard key={property.id} {...property} />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-20">
                    <p className="text-gray-400 text-lg mb-4">No properties match your criteria</p>
                    <button 
                      onClick={() => {
                        setSelectedLocation('');
                        setSelectedPriceRange('');
                        setSelectedType('');
                        setSelectedBeds('');
                      }}
                      className="btn-primary"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center gap-2 flex-wrap">
                <button className="px-6 py-3 bg-transparent border border-white/20 text-white text-xs tracking-widest hover:bg-white hover:text-luxury-black transition-all duration-500" style={{fontWeight: 300}}>
                  PREVIOUS
                </button>
                <button className="px-6 py-3 bg-white text-luxury-black text-xs tracking-widest border border-white" style={{fontWeight: 500}}>
                  1
                </button>
                <button className="px-6 py-3 bg-transparent border border-white/20 text-white text-xs tracking-widest hover:bg-white hover:text-luxury-black transition-all duration-500" style={{fontWeight: 300}}>
                  2
                </button>
                <button className="px-6 py-3 bg-transparent border border-white/20 text-white text-xs tracking-widest hover:bg-white hover:text-luxury-black transition-all duration-500" style={{fontWeight: 300}}>
                  3
                </button>
                <button className="px-6 py-3 bg-transparent border border-white/20 text-white text-xs tracking-widest hover:bg-white hover:text-luxury-black transition-all duration-500" style={{fontWeight: 300}}>
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
