"use client";
import { useState } from "react";
import { ImagePlus, Trash2, UploadCloud } from "lucide-react";

export default function GalleryManager() {
  const [uploading, setUploading] = useState(false);

  return (
    <div className="p-8 bg-white rounded-[2rem] shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <label className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition">
          <ImagePlus size={18} /> Add New Photo
          <input type="file" className="hidden" accept="image/*" />
        </label>
      </div>

      {/* Grid of Current Photos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-100">
            <img 
              src={`https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=400&sig=${item}`} 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
              alt="Gallery Preview"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <button className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}