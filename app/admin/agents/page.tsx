'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUpload from '@/components/ImageUpload';

interface Agent {
  id: string;
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
  bio?: string;
  visible?: boolean;
}

export default function AdminAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Agent>>({
    name: '',
    role: '',
    image: '',
    email: '',
    phone: '',
    bio: '',
    visible: true
  });

  const loadAgents = async () => {
    try {
      const res = await fetch('/api/agents');
      const data = await res.json();
      setAgents(data);
    } catch (error: unknown) {
      console.error('Failed to load agents:', error);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId ? `/api/agents/${editingId}` : '/api/agents';
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        await loadAgents();
        resetForm();
      }
    } catch (error: unknown) {
      console.error('Failed to save agent:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;

    try {
      const res = await fetch(`/api/agents/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadAgents();
      }
    } catch (error: unknown) {
      console.error('Failed to delete agent:', error);
    }
  };

  const handleEdit = (agent: Agent) => {
    setFormData(agent);
    setEditingId(agent.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      image: '',
      email: '',
      phone: '',
      bio: '',
      visible: true
    });
    setEditingId(null);
    setShowForm(false);
  };

  const toggleVisibility = async (id: string, currentVisible: boolean) => {
    try {
      const res = await fetch(`/api/agents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !currentVisible })
      });
      if (res.ok) await loadAgents();
    } catch (error: unknown) {
      console.error('Failed to toggle visibility:', error);
    }
  };

  const handleBulkAction = async (action: 'show' | 'hide' | 'delete') => {
    if (selectedIds.length === 0) return;
    
    if (action === 'delete' && !confirm(`Delete ${selectedIds.length} agents?`)) return;
    
    try {
      await Promise.all(selectedIds.map(id => {
        if (action === 'delete') {
          return fetch(`/api/agents/${id}`, { method: 'DELETE' });
        } else {
          return fetch(`/api/agents/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visible: action === 'show' })
          });
        }
      }));
      await loadAgents();
      setSelectedIds([]);
    } catch (error: unknown) {
      console.error('Bulk action failed:', error);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAgents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAgents.map(a => a.id));
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVisibility = visibilityFilter === 'all' || 
                             (visibilityFilter === 'visible' && agent.visible !== false) ||
                             (visibilityFilter === 'hidden' && agent.visible === false);
    return matchesSearch && matchesVisibility;
  });

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header */}
      <div className="bg-luxury-charcoal border-b border-white/10">
        <div className="px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-white" style={{fontWeight: 300}}>
              Agents Management
            </h1>
            <p className="text-gray-400 text-sm mt-1">Manage your team members</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white text-luxury-black px-6 py-2 hover:bg-gray-200 transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Agent'}
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
                  placeholder="Search by name or role..."
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
              {editingId ? 'Edit Agent' : 'Add New Agent'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <ImageUpload
                value={formData.image || ''}
                onChange={(image) => setFormData({...formData, image})}
                label="Agent Photo"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    placeholder="Senior Luxury Property Consultant"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="w-full bg-luxury-black border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-white/30 h-24"
                  placeholder="Agent biography..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-white text-luxury-black px-8 py-2 hover:bg-gray-200 transition-colors"
                >
                  {editingId ? 'Update Agent' : 'Create Agent'}
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

        {/* Agents List */}
        {!showForm && (
          <>
            {filteredAgents.length === 0 ? (
              <p className="text-gray-400 text-center py-12">No agents found.</p>
            ) : viewMode === 'table' ? (
              /* Table View */
              <div className="bg-luxury-charcoal border border-white/10 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === filteredAgents.length}
                          onChange={toggleSelectAll}
                          className="w-4 h-4"
                        />
                      </th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Image</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Name</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Role</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Email</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Phone</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Visible</th>
                      <th className="p-4 text-left text-gray-400 text-sm font-normal">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAgents.map((agent) => (
                      <tr key={agent.id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="p-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(agent.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedIds([...selectedIds, agent.id]);
                              } else {
                                setSelectedIds(selectedIds.filter(id => id !== agent.id));
                              }
                            }}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="p-4">
                          <div className="w-16 h-16 relative">
                            {agent.image && (
                              <Image src={agent.image} alt={agent.name} fill sizes="64px" className="object-cover" />
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-white text-sm">{agent.name}</td>
                        <td className="p-4 text-gray-400 text-sm">{agent.role}</td>
                        <td className="p-4 text-gray-400 text-sm">{agent.email}</td>
                        <td className="p-4 text-gray-400 text-sm">{agent.phone}</td>
                        <td className="p-4">
                          <button
                            onClick={() => toggleVisibility(agent.id, agent.visible !== false)}
                            className={`px-3 py-1 text-xs ${agent.visible !== false ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                          >
                            {agent.visible !== false ? 'Visible' : 'Hidden'}
                          </button>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(agent)}
                              className="border border-white/10 text-white px-3 py-1 hover:bg-white/5 text-xs"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(agent.id)}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                  <div key={agent.id} className="bg-luxury-charcoal border border-white/10 p-6 relative">
                    <div className="absolute top-4 left-4 z-10">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(agent.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds([...selectedIds, agent.id]);
                          } else {
                            setSelectedIds(selectedIds.filter(id => id !== agent.id));
                          }
                        }}
                        className="w-4 h-4"
                      />
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <button
                        onClick={() => toggleVisibility(agent.id, agent.visible !== false)}
                        className={`px-3 py-1 text-xs ${agent.visible !== false ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                      >
                        {agent.visible !== false ? 'Visible' : 'Hidden'}
                      </button>
                    </div>
                    <div className="w-full h-48 relative mb-4">
                      <Image src={agent.image} alt={agent.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-xl font-serif text-white mb-1" style={{fontWeight: 300}}>
                      {agent.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{agent.role}</p>
                    <div className="text-gray-400 text-sm space-y-1 mb-4">
                      <p>{agent.email}</p>
                      <p>{agent.phone}</p>
                    </div>
                    {agent.bio && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">{agent.bio}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(agent)}
                        className="flex-1 border border-white/10 text-white px-4 py-2 hover:bg-white/5 transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(agent.id)}
                        className="border border-red-600 text-red-600 px-4 py-2 hover:bg-red-600/10 transition-colors text-sm"
                      >
                        Delete
                      </button>
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
