"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, ShieldCheck} from "lucide-react"; 
import Link from "next/link"; 
import { Navigation, Clock, PhoneCall } from "lucide-react";
import { 
  Phone, 
  MapPin, 
  Waves, 
  Mountain, 
  Leaf, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  CreditCard 
} from "lucide-react";

// Mock Data - To be replaced by your Django API
const rooms = [
  {
    id: 1,
    name: "Deluxe Riverside Suite",
    price: 8500,
    features: ["King Bed", "River View", "High-speed Wi-Fi"],
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800",
    description: "Listen to the Honi River from your private balcony."
  },
  {
    id: 2,
    name: "Garden Executive Room",
    price: 12000,
    features: ["Private Balcony", "Garden Access", "Mini Bar"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800",
    description: "Nestled in our botanical gardens with a view of Mt. Kenya."
  }
];

interface Room {
  id: number;
  name: string;
  price: number;
  features: string[];
  image: string;
  description: string;
}

const galleryImages = [
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=600",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=600",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600",
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=600",
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [phone, setPhone] = useState("");

  

  // Handle Navbar Background Change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMpesaPayment = () => {
    // Logic for GO.AFRIHUB Daraja API Integration
    alert(`Initiating M-Pesa STK Push for ${selectedRoom} to ${phone}...`);
    setSelectedRoom(null);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. STUNNING NAVBAR */}
      <nav className={`fixed w-full z-50 transition-all duration-500 px-6 py-4 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className={`text-2xl font-serif font-bold tracking-tighter ${isScrolled ? "text-slate-900" : "text-white"}`}>
            MUTHIGA <span className="text-blue-600">GARDEN</span>
          </h1>
          <div className={`hidden md:flex space-x-8 text-sm uppercase tracking-widest font-semibold ${
            isScrolled ? "text-slate-600" : "text-white/80"
          }`}>
            <a href="#about" className="hover:text-blue-500 transition">About</a>
            <a href="#rooms" className="hover:text-blue-500 transition">Rooms</a>
            <a href="#events" className="hover:text-blue-500 transition">Events</a>
            <a href="#location" className="hover:text-blue-500 transition">Location</a>
          </div>
          <Link href="#rooms" scroll={true}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition shadow-lg shadow-blue-500/20 active:scale-95">
             Book Room
          </button>
        </Link>
          <div className="flex items-center gap-4">
  {/* Add this button for Admin Access */}
        <Link href="/admin/login" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-600" title="Admin Login">
          <ShieldCheck size={24} />
        </Link>

        </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1920" 
            alt="Muthiga Resort" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-400 font-mono tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Chaka, Nyeri • Kenya
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif mb-8"
          >
            A Sanctuary for <br /> the Soul.
          </motion.h1>

          {/* QUICK BOOKING BAR */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-2 rounded-2xl shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-2 border border-slate-100"
          >
            <div className="text-left p-4 hover:bg-slate-50 rounded-xl transition cursor-pointer">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Check In</label>
              <input type="date" className="w-full bg-transparent text-slate-800 outline-none font-medium" />
            </div>
            <div className="text-left p-4 hover:bg-slate-50 rounded-xl transition cursor-pointer">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Check Out</label>
              <input type="date" className="w-full bg-transparent text-slate-800 outline-none font-medium" />
            </div>
            <div className="text-left p-4 hover:bg-slate-50 rounded-xl transition cursor-pointer">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Guests</label>
              <select className="w-full bg-transparent text-slate-800 outline-none font-medium">
                <option>1 Adult</option>
                <option>2 Adults</option>
                <option>Family</option>
              </select>
            </div>
            <button className="bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold transition h-full py-4 md:py-0">
              Check Availability
            </button>
          </motion.div>
        </div>
      </section>

      {/* 3. DYNAMIC FEATURES SECTION */}
      <section id="about" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <Waves size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Honi River</h3>
            <p className="text-slate-500 text-sm">Direct access to the tranquil Honi riverbanks for a peaceful morning walk.</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
              <Leaf size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Botanical Gardens</h3>
            <p className="text-slate-500 text-sm">Lush, manicured gardens perfect for events, relaxation, or bird watching.</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
              <Mountain size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Mountain Views</h3>
            <p className="text-slate-500 text-sm">Waking up to the majestic sunrise over Mt. Kenya and the Aberdare range.</p>
          </div>
        </div>
      </section>
          
      {/* 4. ROOMS GALLERY SECTION */}
      <section id="rooms" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Choose Your Stay</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {rooms.map((room) => (
              <motion.div 
                key={room.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                <div className="h-80 overflow-hidden relative">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-5 py-2 rounded-full text-sm font-black text-blue-600 shadow-sm">
                    Ksh {room.price.toLocaleString()} / Night
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold mb-2">{room.name}</h3>
                  <p className="text-slate-500 mb-6 text-sm">{room.description}</p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {room.features.map(f => (
                      <span key={f} className="flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                        <CheckCircle2 size={12} className="mr-1 text-blue-500" /> {f}
                      </span>
                    ))}
                  </div>
                  {/* <button 
                    onClick={() => setSelectedRoom(room)}
                    className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-blue-600 transition flex items-center justify-center gap-2 group"
                  >
                    More Details <ChevronRight size={18} className="group-hover:translate-x-1 transition" />
                  </button> */}
                  <Link href={`/rooms/riverside-suite`}>
                  <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition">
                    More Details
                  </button>
                </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="py-24 px-6 bg-slate-900 text-white overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
      <div>
        <span className="text-blue-400 font-mono tracking-[0.3em] uppercase text-xs">Cultural Nights</span>
        <h2 className="text-4xl md:text-6xl font-serif mt-4">Mugithi & Live Music</h2>
      </div>
      <button className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-bold hover:bg-blue-500 hover:text-white transition shadow-xl shadow-blue-500/10">
        View Full Schedule
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Featured Event: Mugithi Night */}
      <div className="relative group rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]">
  <div className="flex flex-col md:flex-row">
    <div className="md:w-1/2 h-80 md:h-auto overflow-hidden relative">
      {/* High-energy Live Music Visual */}
      <img 
        src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000" 
        alt="Live Band Mugithi Night" 
        className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-90"
      />
      {/* Overlay gradient to blend text */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r" />
    </div>
    
    <div className="md:w-1/2 p-10 flex flex-col justify-center bg-slate-900/80">
      <div className="flex items-center gap-2 bg-blue-600/20 text-blue-400 w-fit px-3 py-1 rounded-lg text-[10px] font-black uppercase mb-4 border border-blue-600/30">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        Live Performance • 30th May
      </div>
      
      <h3 className="text-3xl font-serif mb-4 text-white">Mugithi Festival Night</h3>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
        An electric night featuring Nyeris finest guitarists. Experience traditional 
        Kikuyu rhythm blended with modern folk, accompanied by a special 
        Nyama Choma platter.
      </p>
      
      <div className="flex items-center gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2">
          Book Ticket
        </button>
        <span className="text-slate-500 text-xs font-semibold">Ksh 1,500 Entry</span>
      </div>
    </div>
  </div>
</div>

      {/* Mini Event List */}
      <div className="space-y-4">
        {[
          { title: "Sunday Soul Sessions", date: "Every Sunday", time: "2PM - 6PM" },
          { title: "Rhumba Night", date: "Friday, 15 May", time: "7PM till late" },
          { title: "Jazz in the Garden", date: "Sunday, 24 May", time: "3PM - 7PM" }
        ].map((event, i) => (
          <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition cursor-pointer">
            <div>
              <h4 className="font-bold text-lg">{event.title}</h4>
              <p className="text-slate-500 text-sm">{event.date}</p>
            </div>
            <div className="text-right">
              <span className="text-blue-400 text-xs font-mono">{event.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

<section id="location" className="py-24 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      {/* 1. Address & Contact Info (5 Columns) */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <span className="text-blue-600 font-mono tracking-[0.3em] uppercase text-xs font-bold">Visit Nyeri</span>
          <h2 className="text-4xl font-serif mt-4 text-slate-900 leading-tight">
            Chaka Hidden Gem
          </h2>
          <p className="text-slate-500 mt-6 leading-relaxed">
            Located just outside Nyeri Town in the vibrant Chaka area. We are the perfect 
            stopover for travelers on the Nairobi-Nanyuki highway looking for 
            authentic culture and riverside peace.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200">
              <MapPin size={20} />
            </div>
            <p className="text-sm font-semibold text-slate-700">Chaka-Sagana Road, Nyeri County</p>
          </div>
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-3 bg-slate-900 text-white rounded-xl shadow-lg">
              <Phone size={20} />
            </div>
            <p className="text-sm font-semibold text-slate-700">+254 718 577 070</p>
          </div>
        </div>
      </div>

      {/* 2. The Map (7 Columns) - No API Key Required */}
      <div className="lg:col-span-7 h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          // Centered on Nyeri Town/Chaka area coordinates
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.04386273468!2d36.94165682855581!3d-0.42416045145885065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18285df90aa00001%3A0x29676e6f4770415a!2sNyeri!5e0!3m2!1sen!2ske!4v1713713500000!5m2!1sen!2ske"
        ></iframe>
      </div>

    </div>
  </div>
</section>

      {/* 5. M-PESA PAYMENT MODAL */}
      <AnimatePresence>
        {selectedRoom && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRoom(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedRoom(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition"
              >
                <X />
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CreditCard size={32} />
                </div>
                <h3 className="text-2xl font-bold">Secure Checkout</h3>
                <p className="text-slate-500 text-sm">Booking: {selectedRoom.name}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-2">M-Pesa Number</label>
                  <input 
                    type="tel" 
                    placeholder="0712XXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-2 border-slate-100 rounded-xl p-4 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div className="bg-slate-50 p-4 rounded-xl flex justify-between items-center">
                  <span className="font-medium text-slate-600">Total Due:</span>
                  <span className="text-xl font-black text-slate-900">Ksh {selectedRoom.price.toLocaleString()}</span>
                </div>

                <button 
                  onClick={handleMpesaPayment}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition shadow-lg shadow-green-500/20"
                >
                  Pay via M-Pesa
                </button>
                <p className="text-[10px] text-center text-slate-400 px-6 uppercase tracking-wider">
                  Secure transaction by GO.AFRIHUB Daraja API
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    <section className="py-20 bg-white overflow-hidden border-t border-slate-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-slate-900">Resort Gallery</h2>
        <div className="w-12 h-1 bg-blue-600 mx-auto mt-4"></div>
      </div>

      <div className="relative flex overflow-hidden">
        {/* We use the CSS class defined in globals.css */}
        <div className="animate-marquee-flow flex gap-6">
          {/* We repeat the images to ensure the loop is seamless */}
          {[...galleryImages, ...galleryImages].map((src, index) => (
            <div 
              key={index} 
              className="w-[300px] h-[400px] flex-shrink-0 rounded-[2rem] overflow-hidden shadow-lg"
            >
              <img 
                src={src} 
                alt="Muthiga Resort Scenery" 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* 6. FOOTER */}
      <footer className="bg-slate-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-xl font-serif font-bold mb-6">MUTHIGA GARDEN</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Located in Chaka, Nyeri. Nestled between the Honi River and Aberdare National Park.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contact</h4>
            <div className="space-y-4 text-slate-400 text-sm">
              <p className="flex items-center gap-2"><MapPin size={16} /> Nyeri, Kenya</p>
              <p className="flex items-center gap-2"><Phone size={16} /> +254 718 577 070</p>
            </div>
          </div>
          <div className="md:text-right">
            <p className="text-slate-500 text-xs mb-4">&copy; 2026 Muthiga Garden Resort.</p>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest">Built by GO.AFRIHUB Technologies</p>
          </div>
        </div>
      </footer>
    </main>
  );
}