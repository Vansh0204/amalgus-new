"use client";
import { useState, useMemo, useEffect } from 'react';
import { glassProducts } from '@/data/glassProducts';
import { alliedProducts } from '@/data/alliedProducts';
import { useToast } from '@/components/ToastProvider';

export default function EstimatePage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    glassTypeId: glassProducts[0]?.id || 1,
    width: 1000,
    height: 1000,
    quantity: 1,
    role: 'Homeowner',
    selectedAllied: []
  });

  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const selectedGlass = useMemo(() => 
    glassProducts.find(p => p.id === parseInt(formData.glassTypeId))
  , [formData.glassTypeId]);

  const calculations = useMemo(() => {
    if (!selectedGlass) return null;
    const sqft = (formData.width * formData.height) / 92903.04;
    const totalSqft = sqft * formData.quantity;
    const midPrice = (selectedGlass.priceMin + selectedGlass.priceMax) / 2;
    const basePrice = midPrice * totalSqft;
    const discountMap = { 'Builder': 0.12, 'Dealer': 0.18, 'Architect': 0.08, 'Homeowner': 0 };
    const discountRate = discountMap[formData.role] || 0;
    const discountAmount = basePrice * discountRate;
    let alliedCost = 0;
    formData.selectedAllied.forEach(id => {
      const product = alliedProducts.find(p => p.id === id);
      if (product.name === 'UPVC Frame') alliedCost += 350 * totalSqft;
      else if (product.name === 'Structural Silicone') alliedCost += 450 * formData.quantity;
      else alliedCost += 2500 * formData.quantity;
    });
    const netAmount = basePrice - discountAmount + alliedCost;
    const gst = netAmount * 0.18;
    const total = netAmount + gst;
    return {
      sqftPerPanel: sqft.toFixed(2),
      totalSqft: totalSqft.toFixed(2),
      basePrice: Math.round(basePrice),
      discountAmount: Math.round(discountAmount),
      alliedCost: Math.round(alliedCost),
      gst: Math.round(gst),
      total: Math.round(total),
      ratePerSqft: midPrice
    };
  }, [formData, selectedGlass]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const id = parseInt(value);
      setFormData(prev => ({
        ...prev,
        selectedAllied: checked 
          ? [...prev.selectedAllied, id] 
          : prev.selectedAllied.filter(x => x !== id)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePrint = () => {
    showToast("Generating professional estimate PDF...");
    setTimeout(() => window.print(), 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 print:bg-white print:pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/3 space-y-8 print:hidden">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-navy mb-8">Estimate Parameters</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-2">Glass Type</label>
                  <select name="glassTypeId" value={formData.glassTypeId} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy">
                    {glassProducts.map(p => <option key={p.id} value={p.id}>{p.name} ({p.thickness})</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">Width (mm)</label>
                    <input type="number" name="width" value={formData.width} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy"/>
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase text-gray-400 mb-2">Height (mm)</label>
                    <input type="number" name="height" value={formData.height} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy"/>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-2">Quantity (Panels)</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-glass-blue font-bold text-navy"/>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-2">Customer Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Homeowner', 'Architect', 'Builder', 'Dealer'].map(role => (
                      <button key={role} onClick={() => setFormData(prev => ({ ...prev, role }))} className={`py-3 px-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${formData.role === role ? 'bg-navy text-white border-navy' : 'bg-white text-gray-400 border-gray-100'}`}>{role}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-gray-400 mb-4">Allied Products</label>
                  <div className="space-y-3">
                    {alliedProducts.map(product => (
                      <label key={product.id} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" value={product.id} checked={formData.selectedAllied.includes(product.id)} onChange={handleInputChange} className="w-5 h-5 rounded border-gray-300 text-glass-blue focus:ring-glass-blue cursor-pointer" />
                        <span className="text-sm font-bold text-gray-600 group-hover:text-navy">{product.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 print:shadow-none print:border-none">
              <div className="bg-navy p-12 text-white flex justify-between items-start">
                <div><div className="text-3xl font-black mb-2 tracking-tighter">AmalGus Estimate</div><p className="text-glass-blue text-sm font-bold uppercase tracking-widest">Architectural Glass Solution</p></div>
                <div className="text-right"><p className="text-xs text-gray-400 uppercase font-medium">Issue Date</p><p className="font-bold">{currentDate || "--/--/----"}</p></div>
              </div>
              <div className="p-12 space-y-12">
                <div className="overflow-x-auto no-scrollbar -mx-6 sm:mx-0">
                  <table className="w-full text-left min-w-[500px]">
                    <thead><tr className="border-b-2 border-gray-100 text-[10px] font-black uppercase text-gray-400 tracking-widest"><th className="pb-4 sm:px-0">Material Description</th><th className="pb-4 sm:px-0">Qty</th><th className="pb-4 sm:px-0">Rate (₹/sqft)</th><th className="pb-4 text-right sm:px-0">Total (₹)</th></tr></thead>
                    <tbody className="divide-y divide-gray-50">
                      <tr className="group">
                        <td className="py-6 sm:px-0"><p className="font-black text-navy text-base sm:text-lg">{selectedGlass?.name} Glass</p><p className="text-[10px] sm:text-xs text-gray-500">{formData.width}mm x {formData.height}mm | {calculations?.totalSqft} sq.ft total</p><p className="text-[10px] sm:text-xs text-gray-500 uppercase mt-1">Config: {selectedGlass?.thickness} • {selectedGlass?.process}</p></td>
                        <td className="py-6 sm:px-0 font-bold text-navy">{formData.quantity}</td><td className="py-6 sm:px-0 font-bold text-navy">₹{calculations?.ratePerSqft}</td><td className="py-6 text-right sm:px-0 font-black text-navy text-base sm:text-lg">₹{calculations?.basePrice}</td>
                      </tr>
                      {formData.selectedAllied.length > 0 && (
                        <tr><td className="py-6 sm:px-0" colSpan="3"><p className="font-bold text-navy">Selected Allied Products</p><p className="text-xs text-gray-500">{formData.selectedAllied.map(id => alliedProducts.find(p => p.id === id).name).join(', ')}</p></td><td className="py-6 text-right sm:px-0 font-bold text-navy">₹{calculations?.alliedCost}</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end pt-8">
                  <div className="w-full md:w-80 space-y-4">
                    <div className="flex justify-between text-sm text-gray-500"><span>Subtotal</span><span className="font-bold text-navy">₹{calculations?.basePrice + calculations?.alliedCost}</span></div>
                    {calculations?.discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-green-600 font-bold bg-green-50 px-4 py-2 rounded-lg"><span>{formData.role} Discount</span><span>- ₹{calculations?.discountAmount}</span></div>
                    )}
                    <div className="flex justify-between text-sm text-gray-500 border-t border-gray-50 pt-4"><span>GST (18%)</span><span className="font-bold text-navy">₹{calculations?.gst}</span></div>
                    <div className="flex justify-between text-2xl font-black text-navy border-t-2 border-navy pt-4"><span>Grand Total</span><span className="text-glass-blue underline decoration-navy underline-offset-8">₹{calculations?.total}</span></div>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl"><p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Legal Disclaimer</p><p className="text-xs text-gray-500 italic">Rates are indicative and subject to change based on actual site measurements. Final quote issued by vendor after physical inspection.</p></div>
                <div className="flex flex-col sm:flex-row gap-4 pt-12 print:hidden">
                  <button onClick={handlePrint} className="flex-1 bg-white border-2 border-navy text-navy px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-navy hover:text-white transition-all flex items-center justify-center gap-3">Download Estimate</button>
                  <button onClick={() => setShowModal(true)} className="flex-1 bg-glass-blue text-navy px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-3">Request Formal Quote</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h3 className="text-3xl font-black text-navy mb-4">Finalize Quote</h3>
            <p className="text-gray-500 mb-8">Enter your details for our expert to schedule a site measurement.</p>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); showToast("Formal request sent to 3 local factories!"); setShowModal(false); }}>
              <div><label className="block text-[10px] font-black uppercase text-gray-400 mb-2">Full Name</label><input required className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-glass-blue font-bold" /></div>
              <div><label className="block text-[10px] font-black uppercase text-gray-400 mb-2">WhatsApp Number</label><input required className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-glass-blue font-bold" /></div>
              <button type="submit" className="w-full bg-navy text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-glass-blue">Send Fast Request</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
