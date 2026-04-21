/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { ArrowLeft, Check, Smartphone, ShieldCheck, Loader2, PartyPopper, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// 1. DATA DICTIONARY - This will eventually be replaced by your Python/Django API
const roomRegistry: any = {
  "riverside-executive": {
    name: "Riverside Executive",
    price: "8,500",
    description: "This suite offers a premium experience with a direct view of the Honi River. Includes a king-sized bed, high-speed fiber internet, and a dedicated workspace for those blending business with leisure.",
    features: ['Complimentary Breakfast', 'Riverside Balcony', 'Smart TV with Netflix', 'Rain Shower'],
    mainImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200"
  },
  "garden-villa": {
    name: "Garden Villa",
    price: "12,000",
    description: "Nestled deep within our botanical gardens, the Villa offers ultimate privacy and luxury. Perfect for families or groups who want to experience the serenity of Nyeri in style.",
    features: ['Private Garden Path', 'Outdoor Dining Area', 'Mini Bar', 'Large Bathtub'],
    mainImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200"
  },
  "deluxe-twin": {
    name: "Deluxe Twin Room",
    price: "6,500",
    description: "An elegant space featuring two comfortable twin beds. Ideal for colleagues or friends traveling together, with all the modern amenities of Muthiga Garden Resort.",
    features: ['Twin Bed Setup', 'Work Desk', 'Garden View', 'Fast WiFi'],
    mainImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200"
  }
};

export default function RoomDetailsPage() {
  const [isBooking, setIsBooking] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  
  // States to prevent "Impure Function" errors during render
  const [bookingRef, setBookingRef] = useState("");
  const [bookingDate, setBookingDate] = useState("");

  const params = useParams();
  const roomId = params.id as string;
  const room = roomRegistry[roomId] || roomRegistry["riverside-executive"];

  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
        return alert("Please enter a valid M-Pesa number");
    }
    
    setPaymentStatus('loading');

    // Simulate API Call to Safaricom STK Push
    setTimeout(() => {
      // We generate these once here so they stay stable in the UI
      const newRef = `MGR-${Math.floor(1000 + Math.random() * 9000)}`;
      const today = new Date().toLocaleDateString('en-KE', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
      
      setBookingRef(newRef);
      setBookingDate(today);
      setPaymentStatus('success');
    }, 3000); 
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="p-6">
        <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition font-bold">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" /> Back to Home
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 py-10">
        
        {/* 1. Visuals Section */}
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

        {/* 2. Content & Payment Section */}
        <div className="flex flex-col justify-center">
          {paymentStatus === 'success' ? (
            /* SUCCESS STATE - Digital Receipt */
            <div className="bg-emerald-50 p-10 rounded-[3rem] border-2 border-emerald-500 text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg">
                <PartyPopper size={40} />
              </div>
              <h3 className="text-3xl font-serif text-slate-900">Booking Confirmed!</h3>
              <p className="text-slate-600 mt-4 leading-relaxed">
                Your reservation for the <span className="font-bold">{room.name}</span> is complete. 
                Keep this receipt for check-in at the resort.
              </p>
              
              <div className="mt-8 p-6 bg-white rounded-2xl border border-emerald-100 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Guest Phone:</span> 
                    <span className="font-bold text-slate-900">{phoneNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Paid Amount:</span> 
                    <span className="font-bold text-slate-900">Ksh {room.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Ref Number:</span> 
                    <span className="font-bold text-slate-900 uppercase">{bookingRef}</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-slate-50">
                    <span className="text-slate-400">Date:</span> 
                    <span className="font-bold text-slate-900">{bookingDate}</span>
                </div>
              </div>

              <Link href="/">
                <button className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition">
                  <CalendarCheck size={20}/> Return to Home
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 font-black uppercase tracking-tighter text-sm">Available Room</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-slate-400 text-xs font-bold">Instant Booking</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6">{room.name}</h1>
              
              <div className="flex items-center gap-4 mb-8 text-3xl font-bold text-slate-900">
                Ksh {room.price} <span className="text-slate-400 text-sm font-normal">/ per night</span>
              </div>

              <p className="text-slate-600 leading-relaxed mb-8 text-lg">{room.description}</p>

              <div className="grid grid-cols-2 gap-y-4 mb-10">
                {room.features.map((item: string) => (
                  <div key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="bg-blue-50 text-blue-600 p-1 rounded-full"><Check size={14} /></div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {!isBooking ? (
                <button 
                  onClick={() => setIsBooking(true)}
                  className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-bold text-xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition active:scale-95"
                >
                  Reserve & Pay with M-Pesa
                </button>
              ) : (
                <div className="bg-white p-8 rounded-[3rem] border-2 border-blue-100 shadow-2xl animate-in fade-in slide-in-from-bottom-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="font-bold text-slate-900 text-xl">M-Pesa Checkout</h4>
                      <p className="text-slate-400 text-xs tracking-widest uppercase font-bold mt-1">Total: Ksh {room.price}</p>
                    </div>
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
                        <> <Loader2 className="animate-spin" /> Requesting PIN... </>
                      ) : "Confirm Payment"}
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