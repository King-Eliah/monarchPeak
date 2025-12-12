'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUpload from '@/components/ImageUpload';

interface HeroSlide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  order: number;
  visible?: boolean;
}

export default function AdminHero() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<HeroSlide>>({
    image: '',
    title: '',
    subtitle: '',
    order: 1,
    visible: true
  });

  const loadSlides = async () => {
    try {
      const res = await fetch('/api/hero');
      const data = await res.json();
      setSlides(data.sort((a: HeroSlide, b: HeroSlide) => a.order - b.order));
    } catch (error: unknown) {
      console.error('Failed to load slides:', error);
    }
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/hero/${editingId}` : '/api/hero';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await loadSlides();
        resetForm();
      }
    } catch (error: unknown) {
      console.error('Failed to save slide:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;

    try {
      const res = await fetch(`/api/hero/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadSlides();
      }
    } catch (error: unknown) {
      console.error('Failed to delete slide:', error);
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setFormData(slide);
    setEditingId(slide.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      image: '',
      title: '',
      subtitle: '',
      order: slides.length + 1,
      visible: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleVisibility = async (id: string, currentVisible: boolean) => {
    try {
      const res = await fetch(`/api/hero/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !currentVisible })
      });
      if (res.ok) await loadSlides();
    } catch (error: unknown) {
      console.error('Failed to toggle visibility:', error);
    }
  };

  const handleBulkAction = async (action: 'show' | 'hide' | 'delete') => {
    if (selectedIds.length === 0) return;
    
    if (action === 'delete' && !confirm(`Delete ${selectedIds.length} slides?`)) return;
    
    try {
      await Promise.all(selectedIds.map(id => {
        if (action === 'delete') {
          return fetch(`/api/hero/${id}`, { method: 'DELETE' });
        } else {
          return fetch(`/api/hero/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visible: action === 'show' })
          });
        }
      }));
      await loadSlides();
      setSelectedIds([]);
    } catch (error: unknown) {
      console.error('Bulk action failed:', error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSlides.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSlides.map(s => s.id));
    }
  };

  const filteredSlides = slides.filter(slide => {
    const matchesSearch = slide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         slide.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVisibility = visibilityFilter === 'all' || 
                             (visibilityFilter === 'visible' && slide.visible !== false) ||
                             (visibilityFilter === 'hidden' && slide.visible === false);
    return matchesSearch && matchesVisibility;
  });

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header */}
      <div className="bg-luxury-charcoal border-b border-white/10">
        <div className="px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-white" style={{fontWeight: 300}}>
              Hero Slideshow
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage homepage hero background images</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-luxury-black px-6 py-2 hover:bg-gray-200 transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Slide'}
          </button>
        </div>
      </div>

      <div className="px-8 py-8">
        {/* Search, Filters & Actions */}
        {!showForm && (
          <div className="mb-8 space-y-4">
            {/* Search & View Toggle */}
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by title or subtitle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-luxury-charcoal border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                />
              </div>
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
                  className={`px-4 py-2 ${viewMode === 'grid' ? 'bg-white text-luxury-black' : 'text-white hover:bg-white/10'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 ${viewMode === 'table' ? 'bg-white text-luxury-black' : 'text-white hover:bg-white/10'}`}
                >
                  Table
                </button>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedIds.length > 0 && (
              <div className="bg-luxury-charcoal border border-white/10 p-4 flex items-center gap-4">
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
              {editingId ? 'Edit Slide' : 'Add New Slide'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <ImageUpload
                value={formData.image || ''}
                onChange={(image) => setFormData({...formData, image})}
                label="Hero Background Image"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    placeholder="Discover Your Dream Home"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                  placeholder="Luxury Real Estate in Ghana's Most Exclusive Locations"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-white text-luxury-black px-8 py-2 hover:bg-gray-200 transition-colors"
                >
                  {editingId ? 'Update Slide' : 'Add Slide'}
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

        {/* Slides List */}
        {!showForm && (
          <>
            {filteredSlides.length === 0 ? (
              <p className="text-gray-400 text-center py-12">No slides found.</p>
            ) : viewMode === 'table' ? (
              /* Table View */
              <div className="bg-luxury-charcoal border border-white/10 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === filteredSlides.length}
                          onChange={toggleSelectAll}
                          className="w-4 h-4"
                        />
                      </th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Image</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Title</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Subtitle</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Order</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Visible</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSlides.map((slide) => (
                      <tr key={slide.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(slide.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds([...selectedIds, slide.id]);
                              } else {
                                setSelectedIds(selectedIds.filter(id => id !== slide.id));
                              }
                            }}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="p-4">
                          <div className="w-24 h-16 relative">
                            {slide.image && (
                              <Image src={slide.image} alt={slide.title} fill sizes="96px" className="object-cover" />
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-white text-sm">{slide.title}</td>
                        <td className="p-4 text-gray-400 text-sm max-w-md truncate">{slide.subtitle}</td>
                        <td className="p-4 text-gray-400 text-sm">#{slide.order}</td>
                        <td className="p-4">
                          <button
                            onClick={() => toggleVisibility(slide.id, slide.visible !== false)}
                            className={`px-3 py-1 text-xs ${slide.visible !== false ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                          >
                            {slide.visible !== false ? 'Visible' : 'Hidden'}
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(slide)}
                              className="border border-white/10 text-white px-3 py-1 hover:bg-white/5 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(slide.id)}
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
            ) : (
              /* Grid View */
              <div className="space-y-4">
                {filteredSlides.map((slide) => (
                  <div key={slide.id} className="bg-luxury-charcoal border border-white/10 overflow-hidden flex gap-6 p-6 relative">
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(slide.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds([...selectedIds, slide.id]);
                          } else {
                            setSelectedIds(selectedIds.filter(id => id !== slide.id));
                          }
                        }}
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={() => toggleVisibility(slide.id, slide.visible !== false)}
                        className={`px-3 py-1 text-xs ${slide.visible !== false ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                      >
                        {slide.visible !== false ? 'Visible' : 'Hidden'}
                      </button>
                    </div>
                    <div className="relative w-64 h-40 shrink-0">
                      {slide.image && (
                        <Image src={slide.image} alt={slide.title} fill sizes="256px" className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Slide #{slide.order}</p>
                          <h3 className="text-xl font-serif text-white mb-1" style={{fontWeight: 300}}>
                            {slide.title}
                          </h3>
                          <p className="text-gray-400 text-sm">{slide.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleEdit(slide)}
                          className="border border-white/10 text-white px-4 py-2 hover:bg-white/5 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(slide.id)}
                          className="border border-red-600 text-red-600 px-4 py-2 hover:bg-red-600/10 transition-colors text-sm"
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
