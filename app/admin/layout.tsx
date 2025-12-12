'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LayoutDashboard, Home, Users, MessageSquare, Image, Palette, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminAuth') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth && pathname !== '/admin') {
      router.push('/admin');
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    router.push('/admin');
  };

  // Don't show sidebar on login page
  if (pathname === '/admin') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Properties', path: '/admin/properties', icon: Home },
    { name: 'Agents', path: '/admin/agents', icon: Users },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { name: 'Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Hero Slides', path: '/admin/hero', icon: Palette },
    { name: 'Inquiries & Bookings', path: '/admin/inquiries', icon: MessageSquare },
  ];

  return (
    <div className="flex min-h-screen bg-luxury-black">
      {/* Sidebar */}
      <aside className="w-64 bg-luxury-charcoal border-r border-white/10 fixed h-full">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-serif text-white" style={{fontWeight: 300}}>
            MonarchPeak
          </h1>
          <p className="text-gray-400 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded mb-1 transition-all ${
                  pathname === item.path
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded mb-2 text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm"
          >
            <Home className="w-5 h-5" />
            <span>View Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded text-gray-400 hover:bg-white/5 hover:text-white transition-all text-sm w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {children}
      </main>
    </div>
  );
}
