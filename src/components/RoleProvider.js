"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedRole = localStorage.getItem('amalgus-role');
    if (!savedRole) {
      setIsModalOpen(true);
    } else {
      setRole(savedRole);
    }

    const handleOpenModal = () => setIsModalOpen(true);
    const switcher = document.getElementById('role-switcher');
    if (switcher) switcher.addEventListener('click', handleOpenModal);

    return () => {
      if (switcher) switcher.removeEventListener('click', handleOpenModal);
    };
  }, []);

  const changeRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('amalgus-role', newRole);
    setIsModalOpen(false);
  };

  return (
    <RoleContext.Provider value={{ role, changeRole, setIsModalOpen }}>
      {children}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-xl" />
          <div className="bg-white rounded-[48px] p-12 max-w-4xl w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-500">
            <h2 className="text-4xl font-black text-navy text-center mb-4">Welcome to AmalGus</h2>
            <p className="text-gray-500 text-center mb-12 text-lg">Help us customize your experience. Who are you?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { id: 'Homeowner', title: 'Homeowner', icon: '🏠', desc: 'Renovating my home' },
                { id: 'Architect', title: 'Architect', icon: '📐', desc: 'Designing projects' },
                { id: 'Builder', title: 'Builder', icon: '🏗️', desc: 'Constructing sites' },
                { id: 'Dealer', title: 'Dealer', icon: '🤝', desc: 'Factory procurement' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => changeRole(r.id)}
                  className="p-8 bg-gray-50 rounded-3xl border-2 border-transparent hover:border-glass-blue hover:bg-white hover:shadow-2xl transition-all group text-left"
                >
                  <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{r.icon}</div>
                  <h3 className="text-xl font-bold text-navy mb-2">{r.title}</h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
