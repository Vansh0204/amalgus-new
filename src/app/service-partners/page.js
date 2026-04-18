"use client";
import { useState } from 'react';
import { servicePartners } from '@/data/servicePartners';
import { useToast } from '@/components/ToastProvider';

export default function ServicePartnersPage() {
  const { showToast } = useToast();
  const [filterCity, setFilterCity] = useState("");
  const [filterType, setFilterType] = useState("");

  const cities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad"];
  const types = ["Installer", "Measurement", "Glazing Contractor", "AMC Provider"];

  const filtered = servicePartners.filter(p => {
    return (!filterCity || p.city === filterCity) && 
           (!filterType || p.type === filterType);
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl font-black text-navy mb-4 tracking-tight leading-tight">Expert Service Partners</h1>
          <p className="text-gray-500 text-sm sm:text-lg max-w-2xl mx-auto px-2">Verified professionals for measuring, installing, and maintaining your glass projects.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <select 
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm font-bold text-navy outline-none focus:ring-2 focus:ring-glass-blue min-w-[200px]"
          >
            <option value="">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm font-bold text-navy outline-none focus:ring-2 focus:ring-glass-blue min-w-[200px]"
          >
            <option value="">All Services</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((partner) => (
            <div key={partner.id} className="bg-white p-8 rounded-[40px] border border-gray-100 hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-navy/5 text-navy rounded-2xl flex items-center justify-center text-2xl font-black border border-navy/10">
                  {partner.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(partner.rating) ? 'fill-current' : 'text-gray-200'}>★</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{partner.rating} Rating</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-black text-navy">{partner.name}</h3>
                <span className="text-green-500 text-xl" title="Verified Partner">✓</span>
              </div>
              
              <p className="text-glass-blue font-bold text-sm mb-4">{partner.type} • {partner.experience} yrs exp</p>
              
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Serves: {partner.city}
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {partner.specializations.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-50 text-[10px] uppercase font-black text-gray-400 rounded-full border border-gray-100">
                    {tag}
                  </span>
                ))}
              </div>

              <button 
                onClick={() => showToast(`Service request sent to ${partner.name}!`)}
                className="w-full bg-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-glass-blue hover:text-navy transition-all shadow-lg"
              >
                Request Service
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
