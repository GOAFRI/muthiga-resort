"use client";
import { BarChart3, Users, BedDouble, CheckCircle } from "lucide-react";
import { LayoutDashboard} from "lucide-react"; // Add LayoutDashboard to imports
import Link from "next/link"; // Import Link for client-side navigation

const historicalBookings = [
  { guest: "Alice W.", room: "Riverside Suite", date: "15 Dec 2025", status: "Paid", amount: "8,500" },
  { guest: "Peter K.", room: "Garden Executive", date: "20 Dec 2025", status: "Paid", amount: "12,000" },
  { guest: "Maina J.", room: "Riverside Suite", date: "24 Dec 2025", status: "Paid", amount: "8,500" },
  { guest: "Sarah O.", room: "Garden Executive", date: "25 Dec 2025", status: "Cancelled", amount: "12,000" },
  { guest: "David M.", room: "Deluxe Twin", date: "28 Dec 2025", status: "Paid", amount: "9,500" },
  { guest: "Grace N.", room: "Riverside Suite", date: "31 Dec 2025", status: "Paid", amount: "8,500" },
  { guest: "James T.", room: "Garden Executive", date: "05 Jan 2025", status: "Paid", amount: "12,000" },
  { guest: "Lucy W.", room: "Deluxe Twin", date: "12 Jan 2025", status: "Paid", amount: "9,500" },
  { guest: "Kevin G.", room: "Riverside Suite", date: "18 Jan 2025", status: "Paid", amount: "8,500" },
  { guest: "Mary A.", room: "Garden Executive", date: "22 Jan 2025", status: "Paid", amount: "12,000" },
  { guest: "Robert C.", room: "Riverside Suite", date: "02 Feb 2025", status: "Cancelled", amount: "8,500" },
  { guest: "Anita R.", room: "Deluxe Twin", date: "10 Feb 2025", status: "Paid", amount: "9,500" },
  { guest: "Samuel L.", room: "Garden Executive", date: "14 Feb 2025", status: "Paid", amount: "12,000" },
  { guest: "Phyllis B.", room: "Riverside Suite", date: "20 Feb 2025", status: "Paid", amount: "8,500" },
  { guest: "Brian U.", room: "Deluxe Twin", date: "01 Mar 2025", status: "Paid", amount: "9,500" },
  { guest: "Faith D.", room: "Garden Executive", date: "05 Mar 2025", status: "Paid", amount: "12,000" },
  { guest: "George H.", room: "Riverside Suite", date: "12 Mar 2025", status: "Paid", amount: "8,500" },
  { guest: "Hannah I.", room: "Deluxe Twin", date: "18 Mar 2025", status: "Paid", amount: "9,500" },
  { guest: "Isaac V.", room: "Garden Executive", date: "25 Mar 2025", status: "Paid", amount: "12,000" },
  { guest: "Joy Q.", room: "Riverside Suite", date: "30 Mar 2025", status: "Paid", amount: "8,500" },
];

export default function AdminDashboard() {
  const stats = [
    { label: "Today's Check-ins", value: "12", icon: Users, color: "text-blue-600" },
    { label: "Available Rooms", value: "8/20", icon: BedDouble, color: "text-emerald-600" },
    { label: "Monthly Revenue", value: "Ksh 420k", icon: BarChart3, color: "text-purple-600" },
    { label: "Pending Payments", value: "4", icon: CheckCircle, color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Resort Manager Dashboard</h1>
            <p className="text-slate-500">Muthiga Garden Resort Admin Panel</p>
          </div>
          <button className="bg-white border border-slate-200 px-6 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition">
            Export Report
          </button>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
              <stat.icon className={`${stat.color} mb-4`} size={28} />
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* RECENT BOOKINGS TABLE */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50">
            <h2 className="text-xl font-bold">Recent Reservations</h2>
          </div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold">
              <tr>
                <th className="px-8 py-4">Guest</th>
                <th className="px-8 py-4">Room</th>
                <th className="px-8 py-4">Check In</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-50">
  {historicalBookings.map((booking, index) => (
    <tr key={index} className="hover:bg-slate-50 transition cursor-pointer group">
      <td className="px-8 py-6 font-bold text-slate-900 group-hover:text-blue-600 transition">
        {booking.guest}
      </td>
      <td className="px-8 py-6 text-slate-600 italic">
        {booking.room}
      </td>
      <td className="px-8 py-6 text-slate-600 font-mono text-xs">
        {booking.date}
      </td>
      <td className="px-8 py-6">
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
          booking.status === 'Paid' 
            ? 'bg-emerald-100 text-emerald-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {booking.status}
        </span>
      </td>
      <td className="px-8 py-6 font-bold text-slate-900">
        Ksh {booking.amount}
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
      <div>
  <h4 className="font-bold mb-6">Internal</h4>
  <ul className="space-y-4 text-slate-400 text-sm">
    <li>
      <Link href="/admin" className="hover:text-blue-400 transition flex items-center gap-2">
        <LayoutDashboard size={14} /> Staff Portal
      </Link>
    </li>
    <li className="hover:text-white cursor-pointer transition">Housekeeping Login</li>
    <li className="hover:text-white cursor-pointer transition">Inventory Management</li>
  </ul>
</div>
    </div>
  );
}