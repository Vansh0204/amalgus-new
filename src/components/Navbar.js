"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRole } from "@/components/RoleProvider";
import { useToast } from "@/components/ToastProvider";

export default function Navbar() {
  const { setIsModalOpen, role, user, setUser, logout } = useRole();
  const { showToast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const navLinks = [
    { name: 'Products', href: '/catalog' },
    { name: 'Smart Match', href: '/smart-match', highlight: true },
    { name: 'Vendors', href: '/vendors' },
    { name: 'Daily Rates', href: '/rates' },
    { name: 'Services', href: '/service-partners' },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    showToast("Authenticating " + email + "...");
    
    setTimeout(() => {
      const newUser = { email, name: email.split('@')[0] };
      setUser(newUser);
      localStorage.setItem('amalgus-user', JSON.stringify(newUser));
      setIsAuthModalOpen(false);
      showToast("Signed in as " + newUser.name, "success");
    }, 800);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 print:hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between h-20 items-center">
          
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

          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-[10px] font-black uppercase text-gray-400 hover:text-navy transition-colors tracking-[0.2em] hidden md:block border-b border-gray-100 hover:border-navy pb-1"
            >
              Switch Role
            </button>
            
            <div className="hidden sm:flex items-center gap-4">
              {user ? (
                <button 
                  onClick={logout}
                  className="text-sm font-bold text-navy hover:text-red-500 transition-colors flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  {user.name} (SignOut)
                </button>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-sm font-bold text-gray-600 hover:text-navy transition-colors"
                >
                  SignIn
                </button>
              )}
              <Link href="/estimate" className="bg-navy text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-glass-blue hover:text-navy transition-all shadow-lg hover:shadow-glass-blue/20">
                Get Quotes
              </Link>
            </div>

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
                {user ? (
                   <button onClick={logout} className="flex-1 py-4 bg-red-50 text-red-600 rounded-xl font-bold">Sign Out</button>
                ) : (
                  <button 
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex-1 py-4 bg-gray-50 rounded-xl font-bold text-navy"
                  >
                    SignIn
                  </button>
                )}
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

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-md" onClick={() => setIsAuthModalOpen(false)}></div>
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl font-black text-navy mb-2 tracking-tighter">Welcome Back</h3>
                <p className="text-gray-500 text-sm">Sign in with your verified credentials</p>
              </div>
              <button onClick={() => setIsAuthModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Market ID / Email</label>
                <input name="email" type="email" required placeholder="name@company.com" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy transition-all" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-widest">Secure PIN</label>
                <input type="password" required placeholder="••••••••" className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy transition-all" />
              </div>
              <button type="submit" className="w-full bg-navy text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-glass-blue shadow-xl">
                Enter Marketplace
              </button>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
