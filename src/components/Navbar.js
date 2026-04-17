"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRole } from "@/components/RoleProvider";

export default function Navbar() {
  const { setIsModalOpen, role } = useRole();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Products', href: '/catalog' },
    { name: 'Smart Match', href: '/smart-match', highlight: true },
    { name: 'Vendors', href: '/vendors' },
    { name: 'Daily Rates', href: '/rates' },
    { name: 'Services', href: '/service-partners' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 print:hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          
          {/* Brand & Mode Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 mr-6">
              <span className="text-2xl font-black bg-gradient-to-r from-navy to-glass-blue bg-clip-text text-transparent tracking-tighter">
                AmalGus
              </span>
            </Link>
            
            <div className="hidden xl:flex items-center gap-4">
              <div className="h-4 w-px bg-gray-200"></div>
              {role && (
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Account:</span>
                  <span className="text-[10px] font-black uppercase text-navy tracking-tight">{role}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
          
          {/* Main Navigation (Desktop) */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`${link.highlight ? 'text-glass-blue font-black flex items-center gap-2' : 'text-gray-500 hover:text-navy font-bold'} text-sm tracking-tight transition-colors whitespace-nowrap`}
              >
                {link.highlight && <span className="w-1.5 h-1.5 bg-glass-blue rounded-full"></span>}
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Section */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-[10px] font-black uppercase text-gray-400 hover:text-navy transition-colors tracking-[0.2em] hidden md:block border-b border-gray-100 hover:border-navy pb-1"
            >
              Switch Role
            </button>
            
            <div className="hidden sm:flex items-center gap-4">
              <button className="text-sm font-bold text-gray-600 hover:text-navy transition-colors">SignIn</button>
              <Link href="/estimate" className="bg-navy text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-glass-blue hover:text-navy transition-all shadow-lg hover:shadow-glass-blue/20">
                Get Quotes
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-navy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute top-20 left-0 w-full shadow-2xl animate-in slide-in-from-top duration-300 overflow-hidden">
          <div className="px-4 py-8 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`px-4 py-3 rounded-xl ${link.highlight ? 'bg-glass-blue/5 text-glass-blue' : 'text-navy'} font-black text-lg`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
              <button 
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-gray-400 font-bold uppercase tracking-widest text-xs"
              >
                Switch Role ({role || 'None'})
              </button>
              <div className="flex gap-4 px-4">
                <button className="flex-1 py-4 bg-gray-50 rounded-xl font-bold text-navy">SignIn</button>
                <Link 
                  href="/estimate" 
                  className="flex-1 py-4 bg-navy text-white rounded-xl font-bold text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Quotes
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
