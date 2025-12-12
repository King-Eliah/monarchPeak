'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUpload({ value, onChange, label = 'Upload Image', className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      {label && <label className="block text-gray-400 text-sm mb-2">{label}</label>}
      
      <div className="space-y-3">
        {/* Preview */}
        {value && (
          <div className="relative w-full h-48 bg-luxury-black border border-white/10 rounded overflow-hidden">
            <Image src={value} alt="Preview" fill sizes="400px" className="object-cover" />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full hover:bg-red-700 transition-colors"
            >
              ×
            </button>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex gap-2">
          <label className="flex-1 bg-white/10 border border-white/10 text-white px-4 py-2 rounded cursor-pointer hover:bg-white/20 transition-colors text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
            {uploading ? 'Uploading...' : 'Choose Image'}
          </label>
          
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste URL"
            className="flex-1 bg-luxury-black border border-white/10 text-white px-4 py-2 rounded focus:outline-none focus:border-white/30"
          />
        </div>
      </div>
    </div>
  );
}
