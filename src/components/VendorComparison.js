"use client";
import { useState, useMemo } from 'react';
import { useToast } from '@/components/ToastProvider';

export default function VendorComparison({ vendors, basePrice }) {
  const { showToast } = useToast();
  const [sortKey, setSortKey] = useState('price');

  const vendorList = useMemo(() => {
    const list = vendors.map(v => ({
      ...v,
      finalPrice: Math.round(basePrice * (1 + v.priceVariation / 100))
    }));

    return list.sort((a, b) => {
      if (sortKey === 'price') return a.finalPrice - b.finalPrice;
      if (sortKey === 'rating') return b.rating - a.rating;
      if (sortKey === 'delivery') return a.deliveryDays - b.deliveryDays;
      return 0;
    });
  }, [vendors, basePrice, sortKey]);

  return (
    <section className="mt-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-navy mb-2">Vendor Price Comparison</h2>
          <p className="text-gray-500 text-sm">Compare real-time quotes from verified factory partners in your region.</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-xl">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Sort by:</span>
          {['price', 'rating', 'delivery'].map(key => (
            <button
              key={key}
              onClick={() => setSortKey(key)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                sortKey === key ? 'bg-navy text-white' : 'text-gray-500 hover:text-navy'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-navy">
            <tr className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              <th className="px-8 py-5">Vendor Name</th>
              <th className="px-8 py-5">Location</th>
              <th className="px-8 py-5">Price (/sqft)</th>
              <th className="px-8 py-5">Rating</th>
              <th className="px-8 py-5">Est. Delivery</th>
              <th className="px-8 py-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {vendorList.map((vendor, i) => (
              <tr key={vendor.id} className={`group hover:bg-gray-50 transition-colors ${i === 0 ? 'bg-blue-50/30' : ''}`}>
                <td className="px-8 py-6 font-bold text-navy">
                  <div className="flex items-center gap-3">
                    {vendor.vendorName}
                    {i === 0 && (
                      <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-tighter ring-1 ring-green-200">
                        Best Value
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6 text-sm text-gray-500">{vendor.city}</td>
                <td className="px-8 py-6 font-black text-navy text-lg">
                  ₹{vendor.finalPrice}
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="font-bold text-navy">{vendor.rating}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-medium text-gray-600">
                  {vendor.deliveryDays} Days
                </td>
                <td className="px-8 py-6 text-right">
                  <button 
                    onClick={() => showToast(`Quote request sent to ${vendor.vendorName}!`)}
                    className="bg-white border border-gray-200 px-6 py-2 rounded-lg text-xs font-bold text-navy hover:bg-navy hover:text-white transition-all shadow-sm"
                  >
                    Get Quote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
