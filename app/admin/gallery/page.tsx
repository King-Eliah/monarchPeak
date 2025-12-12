'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import MultiImageUpload from '@/components/MultiImageUpload';
import ImageUpload from '@/components/ImageUpload';
import { Search, Filter, Grid3x3, List, Eye, EyeOff } from 'lucide-react';

interface GalleryImage {
  id: string;
  image: string;
  url?: string;
  title: string;
  category?: string;
  description?: string;
  visible?: boolean;
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    image: '',
    title: '',
    category: 'Exteriors',
    description: '',
    visible: true
  });
  const [bulkImages, setBulkImages] = useState<string[]>([]);
  const [bulkCategory, setBulkCategory] = useState('Exteriors');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const categories = ['Exteriors', 'Interiors', 'Pools', 'Bedrooms', 'Kitchens', 'Gardens', 'Living Rooms'];

  const loadImages = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      setImages(data);
    } catch (error: unknown) {
      console.error('Failed to load gallery:', error);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleBulkUpload = async () => {
    if (bulkImages.length === 0) return;

    try {
      for (const imageUrl of bulkImages) {
        await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: imageUrl,
            title: `${bulkCategory} Image`,
            category: bulkCategory,
            description: '',
            visible: true
          })
        });
      }

      await loadImages();
      setBulkImages([]);
      setShowForm(false);
    } catch (error: unknown) {
      console.error('Failed to upload images:', error);
      alert('Failed to upload images');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/gallery/${editingId}` : '/api/gallery';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await loadImages();
        resetForm();
      }
    } catch (error: unknown) {
      console.error('Failed to save image:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadImages();
      }
    } catch (error: unknown) {
      console.error('Failed to delete image:', error);
    }
  };

  const toggleVisibility = async (id: string, currentVisible: boolean) => {
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !currentVisible })
      });
      if (res.ok) await loadImages();
    } catch (error: unknown) {
      console.error('Failed to toggle visibility:', error);
    }
  };

  const handleBulkAction = async (action: 'show' | 'hide' | 'delete') => {
    if (selectedIds.length === 0) return;
    
    if (action === 'delete' && !confirm(`Delete ${selectedIds.length} images?`)) return;
    
    try {
      await Promise.all(selectedIds.map(id => {
        if (action === 'delete') {
          return fetch(`/api/gallery/${id}`, { method: 'DELETE' });
        } else {
          return fetch(`/api/gallery/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visible: action === 'show' })
          });
        }
      }));
      await loadImages();
      setSelectedIds([]);
    } catch (error: unknown) {
      console.error('Bulk action failed:', error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredImages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredImages.map(img => img.id));
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setFormData({
      image: image.image || image.url || '',
      title: image.title,
      category: image.category || 'Exteriors',
      description: image.description || '',
      visible: image.visible !== false
    });
    setEditingId(image.id);
    setShowForm(true);
    setBulkImages([]);
  };

  const resetForm = () => {
    setFormData({
      image: '',
      title: '',
      category: 'Exteriors',
      description: '',
      visible: true
    });
    setEditingId(null);
    setShowForm(false);
    setBulkImages([]);
  };

  // Filter and search logic
  const filteredImages = images.filter(img => {
    const matchesSearch = img.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         img.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || img.category === filterCategory;
    const matchesVisibility = visibilityFilter === 'all' || 
                             (visibilityFilter === 'visible' && img.visible !== false) ||
                             (visibilityFilter === 'hidden' && img.visible === false);
    return matchesSearch && matchesCategory && matchesVisibility;
  });

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header */}
      <div className="bg-luxury-charcoal border-b border-white/10">
        <div className="px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-white" style={{fontWeight: 300}}>
              Gallery Management
            </h1>
            <p className="text-gray-400 text-sm mt-1">Upload and organize gallery images for your website</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-luxury-black px-6 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Image'}
          </button>
        </div>
      </div>

      <div className="px-8 py-8">
        {/* Search, Filters & Actions */}
        {!showForm && (
          <div className="mb-8 space-y-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-luxury-charcoal border border-white/10 text-white pl-10 pr-4 py-2 focus:outline-none focus:border-white/30"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-luxury-charcoal border border-white/10 text-white pl-10 pr-4 py-2 focus:outline-none focus:border-white/30 min-w-[150px]"
                >
                  <option value="All">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
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
                  className={`px-4 py-2 flex items-center gap-2 ${viewMode === 'grid' ? 'bg-white text-luxury-black' : 'text-white hover:bg-white/10'}`}
                >
                  <Grid3x3 className="w-4 h-4" /> Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-4 py-2 flex items-center gap-2 ${viewMode === 'table' ? 'bg-white text-luxury-black' : 'text-white hover:bg-white/10'}`}
                >
                  <List className="w-4 h-4" /> Table
                </button>
              </div>
            </div>

            {selectedIds.length > 0 && (
              <div className="bg-luxury-charcoal border border-white/10 p-4 flex items-center gap-4">
                <span className="text-white text-sm">{selectedIds.length} selected</span>
                <button
                  onClick={() => handleBulkAction('show')}
                  className="bg-green-600 text-white px-4 py-2 text-sm hover:bg-green-700 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" /> Show
                </button>
                <button
                  onClick={() => handleBulkAction('hide')}
                  className="bg-yellow-600 text-white px-4 py-2 text-sm hover:bg-yellow-700 flex items-center gap-2"
                >
                  <EyeOff className="w-4 h-4" /> Hide
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
              {editingId ? 'Edit Image' : 'Upload Images to Gallery'}
            </h2>
            
            {editingId ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-sm mb-2">Image</label>
                  <ImageUpload
                    value={formData.image || ''}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Upload Image"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-white/30"
                      placeholder="Luxury Villa Interior"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-white/30"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Description</label>
                  <textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-white/30"
                    placeholder="Optional description"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-white text-luxury-black px-6 py-2 hover:bg-gray-200 transition-colors"
                  >
                    Update Image
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-luxury-black border border-white/10 text-white px-6 py-2 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Category for All Images</label>
                  <select
                    value={bulkCategory}
                    onChange={(e) => setBulkCategory(e.target.value)}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-white/30"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Upload Multiple Images (up to 20)</label>
                  <MultiImageUpload
                    value={bulkImages}
                    onChange={setBulkImages}
                    label="Click or drag images here"
                    maxImages={20}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBulkUpload}
                    disabled={bulkImages.length === 0}
                    className="bg-white text-luxury-black px-6 py-2 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Upload {bulkImages.length} Image{bulkImages.length !== 1 ? 's' : ''}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-luxury-black border border-white/10 text-white px-6 py-2 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Images Display */}
        {!showForm && (
          <>
            {filteredImages.length === 0 ? (
              <p className="text-gray-400 text-center py-12">No images found.</p>
            ) : viewMode === 'table' ? (
              <div className="bg-luxury-charcoal border border-white/10 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-left">
                        <input type="checkbox" checked={selectedIds.length === filteredImages.length} onChange={toggleSelectAll} className="w-4 h-4" />
                      </th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Image</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Title</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Category</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Visible</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredImages.map((image) => (
                      <tr key={image.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(image.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds([...selectedIds, image.id]);
                              } else {
                                setSelectedIds(selectedIds.filter(id => id !== image.id));
                              }
                            }}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="p-4">
                          <div className="w-16 h-16 relative">
                            {(image.image || image.url) && (
                              <Image src={image.image || image.url || ''} alt={image.title} fill sizes="64px" className="object-cover" />
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-white text-sm">{image.title}</td>
                        <td className="p-4 text-gray-400 text-sm">{image.category}</td>
                        <td className="p-4">
                          <button
                            onClick={() => toggleVisibility(image.id, image.visible !== false)}
                            className={`px-3 py-1 text-xs ${image.visible !== false ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                          >
                            {image.visible !== false ? 'Visible' : 'Hidden'}
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(image)} className="border border-white/10 text-white px-3 py-1 hover:bg-white/5 text-xs">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(image.id)} className="border border-red-600 text-red-600 px-3 py-1 hover:bg-red-600/10 text-xs">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map((image) => (
                  <div key={image.id} className="bg-luxury-charcoal border border-white/10 overflow-hidden group relative">
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(image.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds([...selectedIds, image.id]);
                          } else {
                            setSelectedIds(selectedIds.filter(id => id !== image.id));
                          }
                        }}
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        onClick={() => toggleVisibility(image.id, image.visible !== false)}
                        className={`px-2 py-1 text-xs ${image.visible !== false ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                      >
                        {image.visible !== false ? 'Visible' : 'Hidden'}
                      </button>
                    </div>
                    <div className="relative aspect-square overflow-hidden">
                      {(image.image || image.url) && (
                        <Image src={image.image || image.url || ''} alt={image.title} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button onClick={() => handleEdit(image)} className="bg-white text-luxury-black px-4 py-2 text-sm hover:bg-gray-200">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(image.id)} className="bg-red-600 text-white px-4 py-2 text-sm hover:bg-red-700">
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium text-sm mb-1">{image.title}</h3>
                      {image.category && <p className="text-gray-400 text-xs">{image.category}</p>}
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
