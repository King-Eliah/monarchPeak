'use client';

import { useEffect, useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating?: number;
  image?: string;
  visible?: boolean;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    text: '',
    rating: 5,
    image: '',
    visible: true
  });

  const loadTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (error: unknown) {
      console.error('Failed to load testimonials:', error);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/testimonials/${editingId}` : '/api/testimonials';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await loadTestimonials();
        resetForm();
      }
    } catch (error: unknown) {
      console.error('Failed to save testimonial:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadTestimonials();
      }
    } catch (error: unknown) {
      console.error('Failed to delete testimonial:', error);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setFormData(testimonial);
    setEditingId(testimonial.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      text: '',
      rating: 5,
      image: '',
      visible: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleVisibility = async (id: string, currentVisible: boolean) => {
    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !currentVisible })
      });
      if (res.ok) await loadTestimonials();
    } catch (error: unknown) {
      console.error('Failed to toggle visibility:', error);
    }
  };

  const handleBulkAction = async (action: 'show' | 'hide' | 'delete') => {
    if (selectedIds.length === 0) return;
    
    if (action === 'delete' && !confirm(`Delete ${selectedIds.length} testimonials?`)) return;
    
    try {
      await Promise.all(selectedIds.map(id => {
        if (action === 'delete') {
          return fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
        } else {
          return fetch(`/api/testimonials/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visible: action === 'show' })
          });
        }
      }));
      await loadTestimonials();
      setSelectedIds([]);
    } catch (error: unknown) {
      console.error('Bulk action failed:', error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredTestimonials.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredTestimonials.map(t => t.id));
    }
  };

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVisibility = visibilityFilter === 'all' || 
                             (visibilityFilter === 'visible' && testimonial.visible !== false) ||
                             (visibilityFilter === 'hidden' && testimonial.visible === false);
    return matchesSearch && matchesVisibility;
  });

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header */}
      <div className="bg-luxury-charcoal border-b border-white/10">
        <div className="px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-white" style={{fontWeight: 300}}>
              Testimonials Management
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage client reviews and feedback</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-luxury-black px-6 py-2 hover:bg-gray-200 transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Testimonial'}
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
                  placeholder="Search by name, role, or content..."
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
              {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Client Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Role/Title</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    placeholder="CEO, Company Name"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-2">Image URL (Optional)</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Testimonial</label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                  className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30 h-32"
                  placeholder="Client testimonial text..."
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-white text-luxury-black px-8 py-2 hover:bg-gray-200 transition-colors"
                >
                  {editingId ? 'Update Testimonial' : 'Create Testimonial'}
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

        {/* Testimonials List */}
        {!showForm && (
          <>
            {filteredTestimonials.length === 0 ? (
              <p className="text-gray-400 text-center py-12">No testimonials found.</p>
            ) : viewMode === 'table' ? (
              /* Table View */
              <div className="bg-luxury-charcoal border border-white/10 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === filteredTestimonials.length}
                          onChange={toggleSelectAll}
                          className="w-4 h-4"
                        />
                      </th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Name</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Role</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Testimonial</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Visible</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTestimonials.map((testimonial) => (
                      <tr key={testimonial.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(testimonial.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds([...selectedIds, testimonial.id]);
                              } else {
                                setSelectedIds(selectedIds.filter(id => id !== testimonial.id));
                              }
                            }}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="p-4 text-white text-sm">{testimonial.name}</td>
                        <td className="p-4 text-gray-400 text-sm">{testimonial.role}</td>
                        <td className="p-4 text-gray-400 text-sm max-w-md truncate">{testimonial.text}</td>
                        <td className="p-4">
                          <button
                            onClick={() => toggleVisibility(testimonial.id, testimonial.visible !== false)}
                            className={`px-3 py-1 text-xs ${testimonial.visible !== false ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                          >
                            {testimonial.visible !== false ? 'Visible' : 'Hidden'}
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(testimonial)}
                              className="border border-white/10 text-white px-3 py-1 hover:bg-white/5 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(testimonial.id)}
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
              /* Grid View - Card Layout */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-luxury-charcoal border border-white/10 p-6 relative">
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(testimonial.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds([...selectedIds, testimonial.id]);
                          } else {
                            setSelectedIds(selectedIds.filter(id => id !== testimonial.id));
                          }
                        }}
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={() => toggleVisibility(testimonial.id, testimonial.visible !== false)}
                        className={`px-2 py-1 text-xs ${testimonial.visible !== false ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                      >
                        {testimonial.visible !== false ? 'Visible' : 'Hidden'}
                      </button>
                    </div>
                    <div className="pt-8">
                      <h3 className="text-lg font-serif text-white mb-1" style={{fontWeight: 300}}>
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{testimonial.role}</p>
                      <p className="text-gray-300 text-sm mb-6 line-clamp-4">{testimonial.text}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(testimonial)}
                          className="flex-1 border border-white/10 text-white px-3 py-2 hover:bg-white/5 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
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
