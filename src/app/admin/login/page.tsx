/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, User, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Requirement: Logic for 30-day password rotation
  // In a real app, this date comes from your database
  const lastPasswordChange = new Date("2026-03-01"); 
  const daysSinceChange = Math.floor((new Date().getTime() - lastPasswordChange.getTime()) / (1000 * 3600 * 24));
  const isExpired = daysSinceChange > 30;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call to check the two authorized users
    setTimeout(() => {
      setIsLoading(false);
      
      // Basic mock validation for your two users
      const authorizedUsers = ["admin_muriuki", "manager_muthiga"];
      
      if (authorizedUsers.includes(username.toLowerCase()) && password === "Muthiga2026!") {
        // Store session (In production, use a secure Cookie or JWT)
        localStorage.setItem("admin_user", username);
        router.push("/admin");
      } else {
        setError("Invalid credentials. Access restricted to authorized personnel.");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-10 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-lg">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white italic">Muthiga Garden</h2>
          <p className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mt-1">Authorized Personnel Only</p>
        </div>

        <div className="p-10">
          {isExpired && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex gap-3 text-amber-700 animate-pulse">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-[10px] font-black uppercase leading-tight">
                Security Policy: Password expired ({daysSinceChange} days). Update required upon login.
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 text-red-500 text-xs font-bold rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                  placeholder="e.g. admin_muriuki"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Verify Identity"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <Link href="/" className="text-xs font-bold text-slate-400 hover:text-blue-600 transition">
              ← Return to Resort Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}