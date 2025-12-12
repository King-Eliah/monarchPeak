'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ImageUpload from '@/components/ImageUpload';

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  image: string;
  images: string[];
  type: string;
  features: string[];
  description?: string;
  visible?: boolean;
}

export default function AdminProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    price: '',
    location: '',
    beds: 0,
    baths: 0,
    area: '',
    image: '',
    images: [],
    type: 'Villa',
    features: [],
    description: '',
    visible: true
  });

  const loadProperties = async () => {
    try {
      const res = await fetch('/api/properties');
      const data = await res.json();
      setProperties(data);
    } catch (error: unknown) {
      console.error('Failed to load properties:', error);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/properties/${editingId}` : '/api/properties';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await loadProperties();
        resetForm();
      }
    } catch (error: unknown) {
      console.error('Failed to save property:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadProperties();
      }
    } catch (error: unknown) {
      console.error('Failed to delete property:', error);
    }
  };

  const handleEdit = (property: Property) => {
    setFormData(property);
    setEditingId(property.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      location: '',
      beds: 0,
      baths: 0,
      area: '',
      image: '',
      images: [],
      type: 'Villa',
      features: [],
      description: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const addFeature = (feature: string) => {
    if (feature && !formData.features?.includes(feature)) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), feature]
      });
    }
  };

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features?.filter(f => f !== feature) || []
    });
  };

  const addImage = (url: string) => {
    if (url && !formData.images?.includes(url)) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), url]
      });
    }
  };

  const removeImage = (url: string) => {
    setFormData({
      ...formData,
      images: formData.images?.filter(img => img !== url) || []
    });
  };

  const toggleVisibility = async (id: string, currentVisible: boolean) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !currentVisible })
      });
      if (res.ok) await loadProperties();
    } catch (error: unknown) {
      console.error('Failed to toggle visibility:', error);
    }
  };

  const handleBulkAction = async (action: 'show' | 'hide' | 'delete') => {
    if (selectedIds.length === 0) return;
    
    if (action === 'delete' && !confirm(`Delete ${selectedIds.length} properties?`)) return;
    
    try {
      await Promise.all(selectedIds.map(id => {
        if (action === 'delete') {
          return fetch(`/api/properties/${id}`, { method: 'DELETE' });
        } else {
          return fetch(`/api/properties/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visible: action === 'show' })
          });
        }
      }));
      await loadProperties();
      setSelectedIds([]);
    } catch (error: unknown) {
      console.error('Bulk action failed:', error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProperties.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProperties.map(p => p.id));
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || property.type === filterType;
    const matchesVisibility = visibilityFilter === 'all' || 
                             (visibilityFilter === 'visible' && property.visible !== false) ||
                             (visibilityFilter === 'hidden' && property.visible === false);
    return matchesSearch && matchesType && matchesVisibility;
  });

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header */}
      <div className="bg-luxury-charcoal border-b border-white/10">
        <div className="px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-white" style={{fontWeight: 300}}>
              Properties Management
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage luxury properties on your website</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-luxury-black px-6 py-2 hover:bg-gray-200 transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Property'}
          </button>
        </div>
      </div>

      <div className="px-8 py-8">
        {/* Search, Filters & Actions */}
        {!showForm && (
          <div className="mb-8 space-y-4">
            {/* Search & View Toggle - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by title, location, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-luxury-charcoal border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-luxury-charcoal border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
              >
                <option value="All">All Types</option>
                <option value="Villa">Villa</option>
                <option value="Mansion">Mansion</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Apartment">Apartment</option>
              </select>
              <select
                value={visibilityFilter}
                onChange={(e) => setVisibilityFilter(e.target.value)}
                className="bg-luxury-charcoal border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
              >
                <option value="all">All</option>
                <option value="visible">Visible</option>
                <option value="hidden">Hidden</option>
              </select>
              <div className="flex gap-2 border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 sm:flex-none px-4 py-2 ${viewMode === 'grid' ? 'bg-white text-luxury-black' : 'text-white hover:bg-white/10'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex-1 sm:flex-none px-4 py-2 ${viewMode === 'table' ? 'bg-white text-luxury-black' : 'text-white hover:bg-white/10'}`}
                >
                  Table
                </button>
              </div>
            </div>

            {/* Bulk Actions - Mobile Responsive */}
            {selectedIds.length > 0 && (
              <div className="bg-luxury-charcoal border border-white/10 p-4 flex flex-wrap items-center gap-4">
                <span className="text-white text-sm">{selectedIds.length} selected</span>
                <button
                  onClick={() => handleBulkAction('show')}
                  className="bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700"
                >
                  Show
                </button>
                <button
                  onClick={() => handleBulkAction('hide')}
                  className="bg-yellow-600 text-white px-4 py-2 text-sm hover:bg-yellow-700"
                >
                  Hide
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="bg-red-600 text-white px-4 py-2 text-sm hover:bg-red-700"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedIds([])}
                  className="text-gray-400 px-4 py-2 text-sm hover:text-white"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-luxury-charcoal border border-white/10 p-8 mb-8">
            <h2 className="text-xl font-serif text-white mb-6" style={{fontWeight: 300}}>
              {editingId ? 'Edit Property' : 'Add New Property'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <ImageUpload
                value={formData.image || ''}
                onChange={(image) => setFormData({...formData, image})}
                label="Main Property Image"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Price</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    placeholder="$500,000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                  >
                    <option>Villa</option>
                    <option>Apartment</option>
                    <option>Penthouse</option>
                    <option>Estate</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Bedrooms</label>
                  <input
                    type="number"
                    value={formData.beds}
                    onChange={(e) => setFormData({...formData, beds: parseInt(e.target.value)})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Bathrooms</label>
                  <input
                    type="number"
                    value={formData.baths}
                    onChange={(e) => setFormData({...formData, baths: parseInt(e.target.value)})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Area (sq ft)</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({...formData, area: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    placeholder="3,500"
                    required
                  />
                </div>

              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30 h-24"
                />
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Gallery Images</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    id="newImageUrl"
                    placeholder="Enter image URL"
                    className="flex-1 bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('newImageUrl') as HTMLInputElement;
                      if (input.value) {
                        addImage(input.value);
                        input.value = '';
                      }
                    }}
                    className="bg-white/10 text-white px-4 py-2 hover:bg-white/20"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.images?.map((img, i) => (
                    <div key={i} className="relative group">
                      <div className="w-20 h-20 bg-luxury-black border border-white/10 relative">
                        <Image src={img} alt="" fill className="object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    id="newFeature"
                    placeholder="Enter feature"
                    className="flex-1 bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('newFeature') as HTMLInputElement;
                      if (input.value) {
                        addFeature(input.value);
                        input.value = '';
                      }
                    }}
                    className="bg-white/10 text-white px-4 py-2 hover:bg-white/20"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features?.map((feature, i) => (
                    <div key={i} className="bg-luxury-black border border-white/10 px-3 py-1 text-white text-sm flex items-center gap-2">
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="text-red-500 hover:text-red-400"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-white text-luxury-black px-8 py-2 hover:bg-gray-200 transition-colors"
                >
                  {editingId ? 'Update Property' : 'Create Property'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-white/10 text-white px-8 py-2 hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Properties List */}
        {!showForm && (
          <>
            {filteredProperties.length === 0 ? (
              <p className="text-gray-400 text-center py-12">No properties found.</p>
            ) : viewMode === 'table' ? (
              /* Table View - Mobile Responsive */
              <div className="bg-luxury-charcoal border border-white/10 overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[800px]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === filteredProperties.length}
                          onChange={toggleSelectAll}
                          className="w-4 h-4"
                        />
                      </th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Image</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Title</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Location</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Price</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Type</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Visible</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProperties.map((property) => (
                      <tr key={property.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(property.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds([...selectedIds, property.id]);
                              } else {
                                setSelectedIds(selectedIds.filter(id => id !== property.id));
                              }
                            }}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="p-4">
                          <div className="w-16 h-16 relative">
                            {property.image && (
                              <Image src={property.image} alt={property.title} fill sizes="64px" className="object-cover" />
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-white text-sm">{property.title}</td>
                        <td className="p-4 text-gray-400 text-sm">{property.location}</td>
                        <td className="p-4 text-white text-sm">{property.price}</td>
                        <td className="p-4 text-gray-400 text-sm">{property.type}</td>
                        <td className="p-4">
                          <button
                            onClick={() => toggleVisibility(property.id, property.visible !== false)}
                            className={`px-3 py-1 text-xs ${property.visible !== false ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                          >
                            {property.visible !== false ? 'Visible' : 'Hidden'}
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(property)}
                              className="border border-white/10 text-white px-3 py-1 hover:bg-white/5 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(property.id)}
                              className="border border-red-600 text-red-600 px-3 py-1 hover:bg-red-600/10 text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
              </div>
            ) : (
              /* Grid View - Card Layout */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="bg-luxury-charcoal border border-white/10 overflow-hidden relative">
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(property.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds([...selectedIds, property.id]);
                          } else {
                            setSelectedIds(selectedIds.filter(id => id !== property.id));
                          }
                        }}
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        onClick={() => toggleVisibility(property.id, property.visible !== false)}
                        className={`px-2 py-1 text-xs ${property.visible !== false ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                      >
                        {property.visible !== false ? 'Visible' : 'Hidden'}
                      </button>
                    </div>
                    <div className="relative h-48">
                      {property.image && (
                        <Image src={property.image} alt={property.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-serif text-white mb-2" style={{fontWeight: 300}}>
                        {property.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">{property.location}</p>
                      <p className="text-white text-lg mb-2">{property.price}</p>
                      <div className="flex gap-3 text-gray-400 text-xs mb-4">
                        <span>{property.beds} beds</span>
                        <span>•</span>
                        <span>{property.baths} baths</span>
                        <span>•</span>
                        <span>{property.area}</span>
                      </div>
                      <p className="text-gray-500 text-xs mb-4">{property.type}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(property)}
                          className="flex-1 border border-white/10 text-white px-3 py-2 hover:bg-white/5 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="flex-1 border border-red-600 text-red-600 px-3 py-2 hover:bg-red-600/10 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
