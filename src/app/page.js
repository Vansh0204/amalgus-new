"use client";
import Link from "next/link";
import { glassProducts } from "@/data/glassProducts";
import { useRole } from "@/components/RoleProvider";
import { useToast } from "@/components/ToastProvider";
import { dailyRates } from "@/data/dailyRates";

export default function Home() {
  const { role } = useRole();
  const { showToast } = useToast();

  // Role-based content filtering
  const featuredProducts = (role === 'Homeowner') 
    ? glassProducts.filter(p => ['Clear Float', 'Toughened', 'Back-Painted', 'Frosted'].includes(p.name))
    : (role === 'Architect')
    ? glassProducts.filter(p => ['DGU/IGU', 'Low-E Glass', 'Laminated', 'Reflective'].includes(p.name))
    : glassProducts.slice(0, 4);

  return (
    <div className="bg-white">
      {/* Dynamic Hero Section */}
      <section className={`relative pt-20 pb-32 overflow-hidden transition-colors duration-1000 ${
        role === 'Architect' ? 'bg-[#0F172A]' : 
        role === 'Builder' ? 'bg-[#1E293B]' : 
        role === 'Dealer' ? 'bg-[#0A1628]' : 'bg-navy'
      }`}>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-glass-blue/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Text Column */}
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-glass-blue text-sm font-bold mb-8 backdrop-blur-sm uppercase tracking-widest">
              AmalGus for {role || 'Professionals'}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
              {role === 'Homeowner' ? 'Beautiful Glass for Your Dream Home' :
               role === 'Architect' ? 'Design with High-Performance Glass' :
               role === 'Builder' ? 'Scale Your Projects with Reliance' :
               role === 'Dealer' ? 'Factory-Direct Wholesale Portal' :
               'India\'s First Smart Glass Marketplace'}
            </h1>
            
            <p className="text-base md:text-xl text-gray-400 mb-8 md:mb-10 leading-relaxed max-w-2xl">
              {role === 'Homeowner' ? 'Find safe and stylish glass for your windows, showers, and kitchens with expert installation.' :
               role === 'Architect' ? 'Access full technical data sheets, energy performance metrics, and DGU specifications for your designs.' :
               role === 'Builder' ? 'Managed supply chain for large scale projects. Multi-site delivery, credit terms, and bulk logistics.' :
               role === 'Dealer' ? 'Monitor live factory rates, place bulk orders, and manage your inventory with our streamlined wholesale tool.' :
               'Empowering the entire glass ecosystem with AI-driven matching and a seamless B2B2C supply chain.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/catalog" className="bg-glass-blue text-navy px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all text-center">
                {role === 'Dealer' ? 'Check Bulk Rates' : 'Explore Catalog'}
              </Link>
              <Link href="/smart-match" className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all backdrop-blur-md text-center">
                Try AI Matcher
              </Link>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="hidden lg:block relative w-full max-w-md perspective-1000">
            <div className="relative w-full aspect-[4/5] animate-in fade-in zoom-in duration-1000 delay-300">
              {/* Back Layer */}
              <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-md transform rotate-12 translate-x-12 translate-y-6 transition-transform duration-700 hover:rotate-6 hover:translate-x-6 shadow-2xl"></div>
              {/* Middle Layer */}
              <div className="absolute inset-0 bg-glass-blue/10 border border-glass-blue/20 rounded-[40px] backdrop-blur-xl transform -rotate-6 -translate-x-6 translate-y-2 transition-transform duration-700 hover:-rotate-3 hover:-translate-x-3 shadow-2xl"></div>
                {/* Front Main Glass Plate */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 border border-white/30 rounded-[40px] backdrop-blur-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col p-8 transform transition-transform duration-700 hover:scale-105 hover:-translate-y-4">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-glass-blue flex items-center justify-center shadow-lg shadow-glass-blue/20">
                    <svg className="w-7 h-7 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div className="px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
                    Matched
                  </div>
                </div>
                
                {/* Inner Graphic */}
                <div className="flex-1 w-full bg-navy/50 rounded-3xl overflow-hidden mb-6 border border-white/10 relative shadow-inner flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full opacity-90 transition-transform duration-1000 hover:scale-110" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 100 L35 15 L55 45 Z" fill="url(#grad1)" opacity="0.7"/>
                    <path d="M25 100 L45 55 L85 100 Z" fill="url(#grad2)" opacity="0.9"/>
                    <path d="M45 85 L75 25 L100 65 Z" fill="url(#grad1)" opacity="0.6"/>
                    <path d="M10 45 L35 5 L60 35 Z" fill="url(#grad3)" opacity="0.8"/>
                    <defs>
                      <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#0a1628" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="grad2" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#818cf8"/>
                        <stop offset="100%" stopColor="#0a1628" stopOpacity="0.3"/>
                      </linearGradient>
                      <linearGradient id="grad3" x1="1" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#60a5fa"/>
                        <stop offset="100%" stopColor="#0a1628" stopOpacity="0.5"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent opacity-80"></div>
                </div>
                
                <div className="mt-auto">
                  <h3 className="text-2xl font-black text-white mb-1 leading-tight tracking-tight">Smart Thickness<br/>Detection</h3>
                  <p className="text-gray-300/70 text-xs font-medium uppercase tracking-widest">Powered by Groq LLM</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Role-Specific Stats/Notice Bar */}
      <div className="bg-white border-b border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto no-scrollbar pb-2">
            <div className="flex justify-start lg:justify-start gap-12 min-w-max px-2">
              {role === 'Builder' ? (
                <>
                  <div className="flex flex-col"><span className="text-navy font-black text-xl">15 Days</span><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Credit Terms*</span></div>
                  <div className="flex flex-col"><span className="text-navy font-black text-xl">Multi-Site</span><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Delivery Sync</span></div>
                  <div className="flex flex-col"><span className="text-navy font-black text-xl">GST Ready</span><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Invoicing</span></div>
                </>
              ) : role === 'Architect' ? (
                <>
                  <div className="flex flex-col"><span className="text-navy font-black text-xl">CAD/BIM</span><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Ready Files</span></div>
                  <div className="flex flex-col"><span className="text-navy font-black text-xl">Energy Docs</span><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">LEED Support</span></div>
                  <div className="flex flex-col"><span className="text-navy font-black text-xl">Samples</span><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Priority Delivery</span></div>
                </>
              ) : (
                <>
                  <div className="flex flex-col"><span className="text-navy font-black text-xl">52+</span><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Client Types</span></div>
                  <div className="flex flex-col"><span className="text-navy font-black text-xl">Live</span><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Market Rates</span></div>
                  <div className="flex flex-col"><span className="text-navy font-black text-xl">Verified</span><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">Vendor Network</span></div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-navy mb-2">
              {role === 'Homeowner' ? 'Popular for Homes' :
               role === 'Architect' ? 'Technical Essentials' :
               'Featured Solutions'}
            </h2>
            <p className="text-gray-500 font-medium">Specially curated for your {role} needs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Link 
              href={`/catalog/${product.id}`}
              key={product.id} 
              className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center text-7xl group-hover:scale-110 transition-transform">
                {product.imageIcon}
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-navy mb-1">{product.name}</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">{product.thickness} | {product.process}</p>
                {role === 'Architect' && (
                  <button className="w-full py-2 mb-4 border border-dashed border-gray-200 rounded-lg text-[10px] font-black uppercase text-gray-400 hover:bg-glass-blue/5 hover:border-glass-blue hover:text-glass-blue transition-all">
                    Download Spec Sheet
                  </button>
                )}
                {role === 'Builder' && <p className="text-[10px] text-green-600 font-black mb-4 tracking-widest">BULK PRICING AVAILABLE</p>}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-xl font-black text-navy italic">₹{product.priceMin} - {product.priceMax}</span>
                  <span className="text-[10px] font-bold text-gray-400">/sq.ft</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contextual CTA Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[40px] p-12 lg:p-20 shadow-xl border border-gray-100 flex flex-col lg:flex-row items-center gap-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-glass-blue/5 blur-3xl rounded-full"></div>
            <div className="flex-1 space-y-8 relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black text-navy leading-tight">
                {role === 'Homeowner' ? 'Not sure what to choose?' :
                 role === 'Architect' ? 'Need technical consultation?' :
                 role === 'Builder' ? 'Project procurement audit?' :
                 'Looking for wholesale updates?'}
              </h2>
              <p className="text-gray-500 text-lg">
                {role === 'Homeowner' ? 'Our experts can help you select the right glass and hardware for your home safely.' :
                 role === 'Architect' ? 'Schedule a 1-on-1 with our technical glazier for feasibility and performance reviews.' :
                 role === 'Builder' ? 'Get a dedicated procurement manager to audit your BOM and optimize project costs.' :
                 'Get WhatsApp alerts for daily factory rate changes and stock availability.'}
              </p>
              {role === 'Dealer' ? (
                <button 
                  onClick={() => showToast("Subscribed to WhatsApp Price Ticker!", "success")}
                  className="bg-navy text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-glass-blue hover:text-navy transition-all shadow-xl"
                >
                  Subscribe to Ticker
                </button>
              ) : (
                <Link 
                  href="/smart-match"
                  className="bg-navy text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-glass-blue hover:text-navy transition-all shadow-xl inline-block"
                >
                  Talk to Expert
                </Link>
              )}
            </div>
            <div className="w-full lg:w-1/3 aspect-square bg-navy rounded-3xl flex items-center justify-center text-9xl">
              {role === 'Homeowner' ? '🏠' : role === 'Architect' ? '📐' : role === 'Builder' ? '🏗️' : '🤝'}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
