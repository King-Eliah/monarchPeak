'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check (you can change this password)
    if (password === 'monarchpeak2025') {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-luxury-charcoal border border-white/10 p-8">
        <h1 className="text-3xl font-serif text-white mb-8 text-center" style={{fontWeight: 300}}>
          Admin Login
        </h1>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-luxury-black border border-white/20 text-white px-4 py-3 focus:outline-none focus:border-white/40"
              placeholder="Enter admin password"
            />
          </div>
          
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}
          
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>
        
        <p className="text-gray-500 text-xs mt-6 text-center">
          Default password: monarchpeak2025
        </p>
      </div>
    </div>
  );
}
