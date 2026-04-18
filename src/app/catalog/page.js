"use client";
import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { glassProducts } from '@/data/glassProducts';
import { useToast } from '@/components/ToastProvider';
import ProductSkeleton from '@/components/ProductSkeleton';

function CatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();
  const [filters, setFilters] = useState({
    type: "",
    thickness: "",
    application: "",
  });

  useEffect(() => {
    const q = searchParams.get('search');
    if (q) {
      setSearchQuery(decodeURIComponent(q));
    }
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchParams]);

  const uniqueThickness = [...new Set(glassProducts.map(p => p.thickness))];
  const uniqueApplications = [...new Set(glassProducts.map(p => p.application))];

  const filteredProducts = useMemo(() => {
    return glassProducts.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = !filters.type || p.name === filters.type;
      const matchesThickness = !filters.thickness || p.thickness === filters.thickness;
      const matchesApp = !filters.application || p.application === filters.application;
      
      return matchesSearch && matchesType && matchesThickness && matchesApp;
    });
  }, [searchQuery, filters]);

  const toggleFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? "" : value
    }));
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-navy mb-6 text-center lg:text-left">Glass Solutions Catalog</h1>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Search glass types..." 
                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-glass-blue outline-none transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden w-full md:w-auto px-6 py-4 bg-navy text-white rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 pb-20">
          <aside className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-72 space-y-10 order-2 lg:order-1 bg-white lg:bg-transparent p-6 lg:p-0 rounded-3xl shadow-xl lg:shadow-none border border-gray-100 lg:border-none`}>
            <div>
              <h3 className="text-lg font-extrabold text-navy mb-6 uppercase tracking-widest text-sm">Glass Category</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                {glassProducts.map(p => (
                  <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-glass-blue focus:ring-glass-blue cursor-pointer" 
                      checked={filters.type === p.name}
                      onChange={() => toggleFilter('type', p.name)}
                    />
                    <span className="text-gray-600 font-medium group-hover:text-navy transition-colors text-sm">{p.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-navy mb-6 uppercase tracking-widest text-sm">Thickness</h3>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                {uniqueThickness.map(t => (
                  <label key={t} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-glass-blue focus:ring-glass-blue cursor-pointer" 
                      checked={filters.thickness === t}
                      onChange={() => toggleFilter('thickness', t)}
                    />
                    <span className="text-gray-600 font-medium group-hover:text-navy transition-colors text-sm">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-navy p-6 rounded-3xl text-white">
              <h4 className="font-bold mb-2">Expert Consultation?</h4>
              <p className="text-xs text-gray-400 mb-4 opacity-80">Our technical team is available 9am-6pm IST.</p>
              <button onClick={() => showToast("Callback scheduled! Our expert will call between 9am-6pm IST.")} className="w-full bg-glass-blue text-navy py-3 rounded-xl font-bold text-sm">Request Callback</button>
            </div>
          </aside>

          <main className="flex-1 order-1 lg:order-2">
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-500 font-medium tracking-tight">
                {isLoading ? "Fetching catalog..." : <>Showing <span className="text-navy font-bold">{filteredProducts.length}</span> results</>}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {isLoading ? (
                [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <div 
                    key={p.id} 
                    onClick={() => router.push(`/catalog/${p.id}`)}
                    className="glass-card rounded-[32px] overflow-hidden group hover:shadow-2xl transition-all flex flex-col h-full bg-white cursor-pointer"
                  >
                    <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                      {p.imageIcon}
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-glass-blue transition-colors leading-tight">
                        {p.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-4">{p.thickness} • {p.process}</p>
                      <p className="text-sm text-gray-500 mb-6 flex-1 line-clamp-2">Best for: {p.application}</p>
                      <div className="pt-6 border-t border-gray-50 flex justify-between items-center">
                        <div className="text-navy">
                          <span className="text-xs font-medium uppercase text-gray-400 block mb-1 underline decoration-glass-blue decoration-2 underline-offset-4">Index Rate</span>
                          <span className="text-xl font-black italic">₹{p.priceMin} - {p.priceMax}</span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            showToast(`Added quote request for ${p.name}`);
                          }}
                          className="bg-navy text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-glass-blue hover:text-navy transition-all shadow-md relative z-10"
                        >
                          Get Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <div className="text-4xl mb-4">💎</div>
                  <p className="text-gray-500 font-bold italic">No glass found matching your criteria.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-24 text-center">Loading Catalog...</div>}>
      <CatalogContent />
    </Suspense>
  )
}
