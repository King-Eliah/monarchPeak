'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, Users, MessageSquare, Image as ImageIcon } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: string;
  type: string;
  beds: number;
  location: string;
}

interface Inquiry {
  id: string;
  submittedAt: string;
  status: string;
}

interface Booking {
  id: string;
  submittedAt: string;
  status: string;
}


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    properties: 0,
    agents: 0,
    testimonials: 0,
    gallery: 0
  });

  const [properties, setProperties] = useState<Property[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [props, agents, testimonials, gallery, contacts, bookingsData] = await Promise.all([
          fetch('/api/properties').then(r => r.json()),
          fetch('/api/agents').then(r => r.json()),
          fetch('/api/testimonials').then(r => r.json()),
          fetch('/api/gallery').then(r => r.json()),
          fetch('/api/contact').then(r => r.json()),
          fetch('/api/bookings').then(r => r.json())
        ]);

        setStats({
          properties: props.length,
          agents: agents.length,
          testimonials: testimonials.length,
          gallery: gallery.length
        });

        setProperties(props);
        setInquiries(contacts || []);
        setBookings(bookingsData || []);
      } catch (error: unknown) {
        console.error('Failed to load stats:', error);
      }
    };

    loadStats();
  }, []);

  // Calculate actionable analytics
  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);

  const recentInquiries = inquiries.filter(inq => 
    new Date(inq.submittedAt) >= last30Days
  );
  const recentBookings = bookings.filter(book => 
    new Date(book.submittedAt) >= last30Days
  );

  // Inquiry trend data (last 7 days)
  const inquiryTrendData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const dayInquiries = inquiries.filter(inq => {
      const inqDate = new Date(inq.submittedAt);
      return inqDate.toDateString() === date.toDateString();
    }).length;
    
    const dayBookings = bookings.filter(book => {
      const bookDate = new Date(book.submittedAt);
      return bookDate.toDateString() === date.toDateString();
    }).length;
    
    return { date: dayStr, inquiries: dayInquiries, bookings: dayBookings };
  });

  // Portfolio value metrics
  const portfolioValue = properties.reduce((sum, prop) => {
    const priceStr = prop.price.replace(/[$,\s]/g, '');
    let price = 0;
    if (priceStr.includes('M')) {
      price = parseFloat(priceStr.replace('M', '')) * 1000000;
    } else if (priceStr.includes('K')) {
      price = parseFloat(priceStr.replace('K', '')) * 1000;
    }
    return sum + price;
  }, 0);

  const avgPropertyPrice = properties.length > 0 ? portfolioValue / properties.length : 0;

  // Properties by location
  const locationData = properties.reduce((acc: { location: string; count: number }[], prop) => {
    const existing = acc.find(item => item.location === prop.location);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ location: prop.location, count: 1 });
    }
    return acc;
  }, []).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Header */}
      <div className="bg-luxury-charcoal border-b border-white/10">
        <div className="px-8 py-6">
          <h1 className="text-3xl font-serif text-white" style={{fontWeight: 300}}>
            Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">Analytics and insights for your luxury real estate portfolio</p>
        </div>
      </div>

      {/* Dashboard */}
      <div className="p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-luxury-charcoal border border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Properties</span>
              <Home className="w-5 h-5 text-gold-500" />
            </div>
            <p className="text-3xl font-serif text-white" style={{fontWeight: 300}}>{stats.properties}</p>
            <p className="text-xs text-gray-500 mt-1">Active listings</p>
          </div>

          <div className="bg-luxury-charcoal border border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Agents</span>
              <Users className="w-5 h-5 text-gold-500" />
            </div>
            <p className="text-3xl font-serif text-white" style={{fontWeight: 300}}>{stats.agents}</p>
            <p className="text-xs text-gray-500 mt-1">Team members</p>
          </div>

          <div className="bg-luxury-charcoal border border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Testimonials</span>
              <MessageSquare className="w-5 h-5 text-gold-500" />
            </div>
            <p className="text-3xl font-serif text-white" style={{fontWeight: 300}}>{stats.testimonials}</p>
            <p className="text-xs text-gray-500 mt-1">Client reviews</p>
          </div>

          <div className="bg-luxury-charcoal border border-white/10 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Gallery</span>
              <ImageIcon className="w-5 h-5 text-gold-500" />
            </div>
            <p className="text-3xl font-serif text-white" style={{fontWeight: 300}}>{stats.gallery}</p>
            <p className="text-xs text-gray-500 mt-1">Images uploaded</p>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Lead Generation Trend */}
          <div className="bg-luxury-charcoal border border-white/10 p-6 lg:col-span-2">
            <h2 className="text-xl font-serif text-white mb-6" style={{fontWeight: 300}}>
              Lead Generation (Last 7 Days)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={inquiryTrendData}>
                <defs>
                  <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B7355" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B7355" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#999"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#999"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff' 
                  }} 
                />
                <Area type="monotone" dataKey="inquiries" stroke="#D4AF37" fillOpacity={1} fill="url(#colorInquiries)" name="Contact Forms" />
                <Area type="monotone" dataKey="bookings" stroke="#8B7355" fillOpacity={1} fill="url(#colorBookings)" name="Visit Bookings" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Properties by Location */}
          <div className="bg-luxury-charcoal border border-white/10 p-6">
            <h2 className="text-xl font-serif text-white mb-6" style={{fontWeight: 300}}>
              Top Locations
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis type="number" stroke="#999" style={{ fontSize: '12px' }} />
                <YAxis 
                  type="category"
                  dataKey="location" 
                  stroke="#999"
                  style={{ fontSize: '12px' }}
                  width={120}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1A1A1A', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff' 
                  }} 
                />
                <Bar dataKey="count" fill="#D4AF37" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Portfolio Metrics */}
          <div className="bg-luxury-charcoal border border-white/10 p-6">
            <h2 className="text-xl font-serif text-white mb-6" style={{fontWeight: 300}}>
              Portfolio Value
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-gray-400 text-sm mb-2">Total Portfolio Value</p>
                <p className="text-3xl font-serif text-white" style={{fontWeight: 300}}>
                  ${(portfolioValue / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Average Property Price</p>
                <p className="text-3xl font-serif text-white" style={{fontWeight: 300}}>
                  ${(avgPropertyPrice / 1000).toFixed(0)}K
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-2">Leads (Last 30 Days)</p>
                <p className="text-3xl font-serif text-white" style={{fontWeight: 300}}>
                  {recentInquiries.length + recentBookings.length}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {recentInquiries.length} contacts, {recentBookings.length} bookings
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
