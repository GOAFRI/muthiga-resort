/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useMemo } from "react";
import { 
  LayoutDashboard, 
  LogOut, 
  Image as ImageIcon, 
  Search, 
  XCircle, 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCcw
} from "lucide-react";
import Link from "next/link";

// 1. Requirement: Visible Columns (ID, Guest, Dates, Count, Amount, Status)
const INITIAL_BOOKINGS = [
  { id: "MGR-9901", guest: "John Kamau", phone: "0712345678", room: "Riverside Executive", checkIn: "2026-04-22", checkOut: "2026-04-25", guests: 2, amount: 2200, status: "Confirmed" },
  { id: "MGR-9902", guest: "Sarah Wanjiku", phone: "0722333444", room: "Garden Villa", checkIn: "2026-04-23", checkOut: "2026-04-24", guests: 1, amount: 800, status: "Confirmed" },
  // Generate mock data to test Requirement: 10 per page
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `MGR-88${i}`,
    guest: `Guest ${i + 3}`,
    phone: `07000000${i}`,
    room: i % 2 === 0 ? "Deluxe Twin" : "Riverside Executive",
    checkIn: "2026-04-28",
    checkOut: "2026-04-30",
    guests: (i % 3) + 1,
    amount: 1600 + (i * 100),
    status: "Confirmed"
  }))
];

export default function AdminDashboard() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [activeTab, setActiveTab] = useState("reservations");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  // Requirement: 10 per page
  const itemsPerPage = 10;

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => 
      b.guest.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [bookings, searchQuery]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const currentItems = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Requirement: Admin edit/cancel booking logic
  const handleCancel = (id: string) => {
    const confirmCancel = confirm("Warning: Cancelling will make the room available. A 50% penalty applies to the refund. Proceed?");
    if (confirmCancel) {
      setBookings(prev => prev.map(b => 
        b.id === id ? { ...b, status: "Cancelled (50% Refund Due)" } : b
      ));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Requirement: Log out button */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col p-8 fixed h-full shadow-2xl">
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold italic text-blue-400">Muthiga Admin</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">System Online</span>
          </div>
        </div>

        <nav className="space-y-3 flex-1">
          <button onClick={() => setActiveTab("reservations")} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition ${activeTab === 'reservations' ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800'}`}>
            <LayoutDashboard size={20} /> <span className="font-bold">Reservations</span>
          </button>
          <button onClick={() => setActiveTab("gallery")} className={`w-full flex items-center gap-4 p-4 rounded-2xl transition ${activeTab === 'gallery' ? 'bg-blue-600 shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800'}`}>
            <ImageIcon size={20} /> <span className="font-bold">Gallery Management</span>
          </button>
        </nav>

        <Link href="/admin/login" className="flex items-center gap-4 p-4 text-slate-500 hover:text-red-400 transition font-bold border-t border-slate-800 pt-6">
          <LogOut size={20} /> Logout
        </Link>
      </aside>

      {/* Main Content Area */}
      <main className="ml-72 flex-1 p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-slate-900 capitalize">{activeTab}</h1>
            <p className="text-slate-500 mt-1">Real-time oversight of Muthiga Garden Resort</p>
          </div>
          
          <div className="flex gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search Reference..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 transition w-64 shadow-sm" 
              />
            </div>
            {activeTab === 'gallery' && (
              <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
                <Plus size={20} /> Add Photos
              </button>
            )}
          </div>
        </header>

        {activeTab === "reservations" ? (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                  <th className="px-8 py-5 text-left">Booking Ref</th>
                  <th className="px-8 py-5 text-left">Guest / Contact</th>
                  <th className="px-8 py-5 text-left">Stay Duration</th>
                  <th className="px-8 py-5 text-center">Guests</th>
                  <th className="px-8 py-5 text-left">Total Amount</th>
                  <th className="px-8 py-5 text-left">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {currentItems.map((booking) => (
                  <tr key={booking.id} className="hover:bg-blue-50/30 transition">
                    <td className="px-8 py-6 font-bold text-blue-600">{booking.id}</td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-slate-900">{booking.guest}</div>
                      <div className="text-xs text-slate-400">{booking.phone}</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold text-slate-700">{booking.checkIn}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">to {booking.checkOut}</div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600">{booking.guests}</span>
                    </td>
                    <td className="px-8 py-6 font-bold text-slate-900">Ksh {booking.amount.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${booking.status.includes('Cancelled') ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                        {booking.status.includes('Cancelled') ? <XCircle size={12} /> : <CheckCircle2 size={12} />}
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {!booking.status.includes('Cancelled') && (
                        <button 
                          onClick={() => handleCancel(booking.id)}
                          className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Cancel Booking"
                        >
                          <RefreshCcw size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Requirement: 10 per page pagination controls */}
            <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
              <p className="text-xs font-bold text-slate-400">
                Showing <span className="text-slate-900">{currentItems.length}</span> of {filteredBookings.length} bookings
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 bg-white rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center px-4 text-xs font-bold text-slate-500">
                  Page {currentPage} of {totalPages}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-white rounded-xl border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 text-slate-300">
              <ImageIcon size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Gallery Management</h3>
            <p className="text-slate-500 max-w-xs mt-2">Requirement: Capability to add or remove resort photos from the landing page.</p>
            <button className="mt-8 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition">
              Upload New Media
            </button>
          </div>
        )}
      </main>
    </div>
  );
}