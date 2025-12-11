'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
  };

  return (
    <form onSubmit={handleSearch} className="bg-luxury-charcoal/90 backdrop-blur-sm p-6 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-luxury-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white"
          >
            <option value="">Select Location</option>
            <option value="airport-hills">Airport Hills</option>
            <option value="east-legon">East Legon</option>
            <option value="cantonments">Cantonments</option>
            <option value="ridge">Ridge</option>
            <option value="labone">Labone</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full bg-luxury-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white"
          >
            <option value="">Any Price</option>
            <option value="0-500000">$0 - $500k</option>
            <option value="500000-1000000">$500k - $1M</option>
            <option value="1000000-2000000">$1M - $2M</option>
            <option value="2000000+">$2M+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Property Type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-luxury-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white"
          >
            <option value="">All Types</option>
            <option value="mansion">Mansion</option>
            <option value="penthouse">Penthouse</option>
            <option value="villa">Villa</option>
            <option value="estate">Estate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Bedrooms</label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-luxury-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-white"
          >
            <option value="">Any</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <button type="submit" className="btn-primary w-full md:w-auto">
          Search Properties
        </button>
      </div>
    </form>
  );
}
