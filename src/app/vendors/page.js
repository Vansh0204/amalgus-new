"use client";
import { useState } from 'react';
import { vendors } from '@/data/vendors';
import { glassProducts } from '@/data/glassProducts';
import { useToast } from '@/components/ToastProvider';

export default function VendorsPage() {
  const { showToast } = useToast();
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState("");

  const cities = [...new Set(vendors.map(v => v.city))];
  const glassTypes = [...new Set(vendors.map(v => v.glassType))];

  const filteredVendors = vendors.filter(v => {
    return (!filterCity || v.city === filterCity) && 
           (!filterType || v.glassType === filterType);
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-navy mb-4 text-center md:text-left">Verified Factory Partners</h1>
          <p className="text-gray-500 text-lg max-w-2xl text-center md:text-left">
            Direct access to India's most reliable glass fabricators and processing units, vetted for quality and lead times.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 px-1">Filter by City</label>
            <select 
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy"
            >
              <option value="">All Regions</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 px-1">Glass Specialization</label>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy"
            >
              <option value="">All Glass Types</option>
              {glassTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVendors.map((vendor) => (
            <div key={vendor.id} className="bg-white p-8 rounded-[32px] border border-gray-100 hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center text-white text-xl font-black">
                  {vendor.vendorName.charAt(0)}
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 mb-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-black text-navy">{vendor.rating}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Rating</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-glass-blue transition-colors">
                {vendor.vendorName}
              </h3>
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {vendor.city}, India
              </p>

              <div className="flex items-center gap-2 mb-8">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full">
                  {vendor.glassType} Specialist
                </span>
              </div>

              <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Avg Lead Time</p>
                  <p className="font-bold text-navy">{vendor.deliveryDays} Days</p>
                </div>
                <button 
                  onClick={() => showToast(`Portfolio request sent to ${vendor.vendorName}!`)}
                  className="bg-navy text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-glass-blue hover:text-navy transition-all shadow-md"
                >
                  Request Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-32 bg-white rounded-3xl border border-gray-100">
            <h3 className="text-2xl font-bold text-navy mb-2">No vendors found in this region</h3>
            <p className="text-gray-500">Try expanding your search parameters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
