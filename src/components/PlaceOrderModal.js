"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';

export default function PlaceOrderModal({ product }) {
  const { showToast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    width: 1200,
    height: 2400,
    quantity: 1,
    notes: '',
  });

  const sqft = ((form.width * form.height) / 92903.04).toFixed(2);
  const totalSqft = (sqft * form.quantity).toFixed(2);
  const midPrice = (product.priceMin + product.priceMax) / 2;
  const estimatedTotal = Math.round(midPrice * totalSqft * 1.18); // incl. GST

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date();
    const newOrder = {
      id: `AMG-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      product: product.name,
      specs: `${product.thickness} | ${form.width}mm × ${form.height}mm`,
      qty: parseInt(form.quantity),
      total: estimatedTotal,
      status: 'Processing',
      vendor: 'Pending Assignment',
      eta: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      notes: form.notes,
      isNew: true,
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('amalgus-orders') || '[]');
    localStorage.setItem('amalgus-orders', JSON.stringify([newOrder, ...existing]));

    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      showToast(`Order ${newOrder.id} placed successfully!`);
      router.push('/orders');
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-glass-blue text-navy py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-lg"
      >
        Place Order
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/70 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          <div className="bg-white rounded-[40px] p-10 max-w-lg w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Place Order</p>
                <h3 className="text-2xl font-black text-navy tracking-tight">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.thickness} • {product.process}</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Width (mm)</label>
                  <input
                    type="number" name="width" value={form.width} onChange={handleChange} min="100" max="6000" required
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Height (mm)</label>
                  <input
                    type="number" name="height" value={form.height} onChange={handleChange} min="100" max="6000" required
                    className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Quantity (Panels)</label>
                <input
                  type="number" name="quantity" value={form.quantity} onChange={handleChange} min="1" max="500" required
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy"
                />
              </div>

              {/* Live Estimate Preview */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-3">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Live Estimate Preview</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Area</span>
                  <span className="font-bold text-navy">{totalSqft} sq.ft</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rate (mid-range)</span>
                  <span className="font-bold text-navy">₹{midPrice}/sq.ft</span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-200 pt-3">
                  <span className="text-gray-500 font-bold">Est. Total (incl. GST)</span>
                  <span className="font-black text-navy text-lg">₹{estimatedTotal.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Special Notes (optional)</label>
                <textarea
                  name="notes" value={form.notes} onChange={handleChange} rows="2" placeholder="e.g. Delivery to 3rd floor, no elevator"
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy resize-none"
                />
              </div>

              <p className="text-[10px] text-gray-400 italic">
                * This is a sample order. Vendor will confirm within 24 hours with exact pricing after site measurement.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-navy text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-glass-blue hover:text-navy transition-all shadow-xl disabled:opacity-60"
              >
                {isSubmitting ? 'Placing Order...' : 'Confirm Order →'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
