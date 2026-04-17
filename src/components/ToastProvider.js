"use client";
import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-24 right-8 z-[200] space-y-4 pointer-events-none print:hidden">
        {toasts.map((t) => (
          <div 
            key={t.id}
            className={`px-6 py-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-right-10 duration-300 pointer-events-auto ${
              t.type === 'success' ? 'bg-navy text-white border-glass-blue' : 'bg-red-50 text-red-600 border-red-100'
            }`}
          >
            <span className="text-xl">{t.type === 'success' ? '✅' : '❌'}</span>
            <span className="font-bold text-sm tracking-tight">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
