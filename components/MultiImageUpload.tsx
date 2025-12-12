'use client';

import { useState } from 'react';
import Image from 'next/image';

interface MultiImageUploadProps {
  value: string[];
  onChange: (images: string[]) => void;
  label?: string;
  maxImages?: number;
}

export default function MultiImageUpload({ 
  value = [], 
  onChange, 
  label,
  maxImages = 10 
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < Math.min(files.length, maxImages - value.length); i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          newImages.push(data.url);
        }
      }

      onChange([...value, ...newImages]);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleAddUrl = () => {
    if (urlInput.trim() && value.length < maxImages) {
      onChange([...value, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const handleRemove = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div>
      {label && <label className="block text-gray-400 text-sm mb-2">{label}</label>}
      
      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {value.map((img, idx) => (
            <div key={idx} className="relative aspect-square bg-luxury-black border border-white/10 rounded overflow-hidden group">
              {img && (
                <Image src={img} alt={`Image ${idx + 1}`} fill sizes="200px" className="object-cover" />
              )}
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
              >
                ×
              </button>
              <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Controls */}
      {value.length < maxImages && (
        <div className="space-y-3">
          {/* File Upload */}
          <div className="flex gap-2">
            <label className="flex-1 bg-luxury-black border border-white/10 text-gray-400 px-4 py-3 rounded cursor-pointer hover:bg-white/5 transition-colors text-center">
              {uploading ? 'Uploading...' : `Choose Files (${value.length}/${maxImages})`}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          {/* URL Input */}
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Or paste image URL"
              className="flex-1 bg-luxury-black border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-white/30"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              disabled={!urlInput.trim()}
              className="bg-white text-luxury-black px-6 py-3 rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {value.length >= maxImages && (
        <p className="text-yellow-500 text-sm mt-2">
          Maximum {maxImages} images reached
        </p>
      )}
    </div>
  );
}
