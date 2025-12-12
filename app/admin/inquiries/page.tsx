'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'contacts' | 'bookings'>('contacts');
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [contactsRes, bookingsRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/bookings')
      ]);
      const contactsData = await contactsRes.json();
      const bookingsData = await bookingsRes.json();
      setContacts(contactsData.reverse());
      setBookings(bookingsData.reverse());
    } catch (error: unknown) {
      console.error('Failed to load data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-luxury-black">
      <div className="border-b border-white/10 bg-luxury-charcoal">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-serif text-white" style={{fontWeight: 300, letterSpacing: '0.1em'}}>
              INQUIRIES & BOOKINGS
            </h1>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`pb-4 px-6 text-sm tracking-wider transition-colors ${
              activeTab === 'contacts'
                ? 'border-b-2 border-white text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            CONTACT FORMS ({contacts.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-4 px-6 text-sm tracking-wider transition-colors ${
              activeTab === 'bookings'
                ? 'border-b-2 border-white text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            VISIT BOOKINGS ({bookings.length})
          </button>
        </div>

        {/* Contact Forms */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                No contact submissions yet.
              </div>
            ) : (
              contacts.map((contact) => (
                <div key={contact.id} className="bg-luxury-charcoal border border-white/10 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-serif text-lg mb-2">{contact.name}</h3>
                      <p className="text-sm text-gray-400">{contact.email}</p>
                      {contact.phone && <p className="text-sm text-gray-400">{contact.phone}</p>}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(contact.submittedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-gray-300 text-sm whitespace-pre-wrap">{contact.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Visit Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                No visit bookings yet.
              </div>
            ) : (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-luxury-charcoal border border-white/10 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-serif text-lg mb-2">
                        {booking.firstName} {booking.lastName}
                      </h3>
                      <p className="text-sm text-gray-400">{booking.email}</p>
                      <p className="text-sm text-gray-400">{booking.phone}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(booking.submittedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Preferred Date</p>
                      <p className="text-white text-sm">{booking.preferredDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Preferred Time</p>
                      <p className="text-white text-sm">{booking.preferredTime}</p>
                    </div>
                  </div>
                  {booking.propertyInterest && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Property Interest</p>
                      <p className="text-white text-sm">{booking.propertyInterest}</p>
                    </div>
                  )}
                  {booking.message && (
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-xs text-gray-500 mb-2">Additional Notes</p>
                      <p className="text-gray-300 text-sm whitespace-pre-wrap">{booking.message}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
