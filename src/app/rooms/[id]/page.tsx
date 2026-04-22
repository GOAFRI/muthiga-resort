/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { ArrowLeft, Check, Smartphone, ShieldCheck, Loader2, PartyPopper, CalendarCheck, Download, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// 1. DATA DICTIONARY - Updated with 800 base and 300 extra guest logic
const roomRegistry: any = {
  "riverside-executive": {
    name: "Riverside Executive",
    basePrice: 800, // Per-head and per-bed base
    extraPersonFee: 300, 
    description: "This suite offers a premium experience with a direct view of the Honi River. Nestled near Kamatongu, it blends business with leisure.",
    features: ['Complimentary Breakfast', 'Riverside Balcony', 'Smart TV', 'Rain Shower'],
    mainImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200"
  },
  "garden-villa": {
    name: "Garden Villa",
    basePrice: 800,
    extraPersonFee: 300,
    description: "Ultimate privacy and luxury within our botanical gardens. Perfect for families experiencing the serenity of Nyeri.",
    features: ['Private Garden Path', 'Outdoor Dining Area', 'Mini Bar', 'Large Bathtub'],
    mainImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200"
  },
  "deluxe-twin": {
    name: "Deluxe Twin Room",
    basePrice: 800,
    extraPersonFee: 300,
    description: "An elegant space featuring two comfortable twin beds. Ideal for colleagues or friends traveling together.",
    features: ['Twin Bed Setup', 'Work Desk', 'Garden View', 'Fast WiFi'],
    mainImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200"
  }
};

export default function RoomDetailsPage() {
  const [isBooking, setIsBooking] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  // New States for Requirements Engineering
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingRef, setBookingRef] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  const params = useParams();
  const roomId = params.id as string;
  const room = roomRegistry[roomId] || roomRegistry["riverside-executive"];

  // --- DYNAMIC CALCULATIONS (Derived State) ---
  let stayNights = 1;
  if (checkIn && checkOut) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    stayNights = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  }

  const extraCost = guests > 1 ? (guests - 1) * room.extraPersonFee : 0;
  const totalPrice = (room.basePrice + extraCost) * stayNights;

  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) return alert("Valid M-Pesa number required.");
    if (!checkIn || !checkOut) return alert("Please select stay dates.");
    
    setPaymentStatus('loading');

    setTimeout(() => {
      const newRef = `MGR-${Math.floor(1000 + Math.random() * 9000)}`;
      const today = new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' });
      
      setBookingRef(newRef);
      setBookingDate(today);
      setPaymentStatus('success');
      
      // TRIGGER AUTOMATIC DOWNLOAD (Mock logic)
      console.log("Downloading Receipt for " + newRef);
      console.log("SMS sent to " + phoneNumber);
    }, 3000); 
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="p-6">
        <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition font-bold">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" /> Back to Home
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 py-10">
        
        {/* Visuals Section */}
        <div className="space-y-6">
          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
            <img src={room.mainImage} className="w-full h-full object-cover" alt={room.name} />
          </div>
          <div className="grid grid-cols-3 gap-4 opacity-50">
            <div className="h-32 rounded-3xl bg-slate-100 overflow-hidden"><img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=400" className="w-full h-full object-cover" /></div>
            <div className="h-32 rounded-3xl bg-slate-100 overflow-hidden"><img src="https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?q=80&w=400" className="w-full h-full object-cover" /></div>
            <div className="h-32 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center font-bold text-slate-400">+4</div>
          </div>
        </div>

        {/* Content & Payment Section */}
        <div className="flex flex-col justify-center">
          {paymentStatus === 'success' ? (
            <div className="bg-emerald-50 p-10 rounded-[3rem] border-2 border-emerald-500 text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                <PartyPopper size={40} />
              </div>
              <h3 className="text-3xl font-serif text-slate-900">Booking Confirmed!</h3>
              <p className="text-slate-600 mt-4 leading-relaxed">
                Confirmation SMS sent to <span className="font-bold">{phoneNumber}</span>. 
                Your digital receipt has been automatically downloaded.
              </p>
              
              <div className="mt-8 p-6 bg-white rounded-2xl border border-emerald-100 space-y-3 text-left">
                <div className="flex justify-between text-sm"><span className="text-slate-400">Ref Number:</span> <span className="font-bold text-slate-900 uppercase">{bookingRef}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Total Guests:</span> <span className="font-bold text-slate-900">{guests}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Duration:</span> <span className="font-bold text-slate-900">{stayNights} Night(s)</span></div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-50"><span className="text-slate-400">Total Paid:</span> <span className="font-bold text-slate-900 text-lg">Ksh {totalPrice.toLocaleString()}</span></div>
              </div>

              <button className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2">
                <Download size={20}/> Download PDF Receipt
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 font-black uppercase tracking-tighter text-sm">Resort Booking</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-slate-400 text-xs font-bold uppercase">Manual Refunds</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6">{room.name}</h1>
              
              <div className="flex items-center gap-4 mb-8 text-3xl font-bold text-slate-900">
                Ksh {room.basePrice} <span className="text-slate-400 text-sm font-normal">/ per night/head</span>
              </div>

              {/* STAY DATES & GUESTS */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Check-In</label>
                  <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl ring-1 ring-slate-200 outline-none focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Check-Out</label>
                  <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full p-3 bg-slate-50 rounded-xl ring-1 ring-slate-200 outline-none focus:ring-blue-500" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Number of Guests</label>
                  <div className="flex items-center gap-4 bg-slate-50 p-1 rounded-xl ring-1 ring-slate-200">
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-12 h-12 bg-white rounded-lg shadow-sm font-bold text-xl active:scale-95 transition">-</button>
                    <div className="flex-1 text-center flex items-center justify-center gap-2">
                        <Users size={18} className="text-slate-400" />
                        <span className="font-bold text-xl">{guests}</span>
                    </div>
                    <button onClick={() => setGuests(guests + 1)} className="w-12 h-12 bg-white rounded-lg shadow-sm font-bold text-xl active:scale-95 transition">+</button>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed mb-8 text-lg">{room.description}</p>

              {!isBooking ? (
                <button 
                  onClick={() => setIsBooking(true)}
                  className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-bold text-xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition active:scale-95"
                >
                  Reserve & Pay Ksh {totalPrice.toLocaleString()}
                </button>
              ) : (
                <div className="bg-white p-8 rounded-[3rem] border-2 border-blue-100 shadow-2xl animate-in fade-in slide-in-from-bottom-6">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-slate-900 text-xl italic text-blue-600">Muthiga Garden Resort</h4>
                    <ShieldCheck className="text-emerald-500" size={32} />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative group">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition" size={20} />
                      <input 
                        type="tel" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="07XX XXX XXX"
                        className="w-full pl-12 pr-4 py-5 rounded-2xl border-none bg-slate-50 ring-2 ring-slate-100 focus:ring-blue-500 outline-none font-bold text-lg transition"
                      />
                    </div>
                    <button 
                      onClick={handlePayment}
                      disabled={paymentStatus === 'loading'}
                      className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {paymentStatus === 'loading' ? (
                        <> <Loader2 className="animate-spin" /> Confirming PIN... </>
                      ) : "Confirm & Send SMS"}
                    </button>
                    <button 
                      onClick={() => setIsBooking(false)}
                      className="w-full text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2 hover:text-red-500 transition"
                    >
                      Cancel Transaction
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}