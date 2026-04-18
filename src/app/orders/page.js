"use client";
import { useState } from 'react';
import Link from 'next/link';

const mockOrders = [
  {
    id: "AMG-2024-0041",
    date: "Apr 15, 2026",
    product: "Toughened Glass",
    specs: "8mm | 1200mm × 2400mm",
    qty: 12,
    total: 38400,
    status: "Delivered",
    vendor: "GlassTech Mumbai",
    eta: "Apr 14, 2026",
  },
  {
    id: "AMG-2024-0038",
    date: "Apr 10, 2026",
    product: "DGU / IGU",
    specs: "24mm | 900mm × 1800mm",
    qty: 6,
    total: 72000,
    status: "In Transit",
    vendor: "Fenesta Delhi",
    eta: "Apr 19, 2026",
  },
  {
    id: "AMG-2024-0035",
    date: "Apr 5, 2026",
    product: "Back-Painted Glass",
    specs: "6mm | 600mm × 900mm",
    qty: 20,
    total: 18000,
    status: "Processing",
    vendor: "Ashtech Bangalore",
    eta: "Apr 22, 2026",
  },
  {
    id: "AMG-2024-0031",
    date: "Mar 28, 2026",
    product: "Frosted Glass",
    specs: "5mm | 1000mm × 2100mm",
    qty: 8,
    total: 12800,
    status: "Delivered",
    vendor: "GlassTech Mumbai",
    eta: "Mar 30, 2026",
  },
  {
    id: "AMG-2024-0027",
    date: "Mar 20, 2026",
    product: "Laminated Glass",
    specs: "10mm | 1500mm × 3000mm",
    qty: 4,
    total: 54000,
    status: "Cancelled",
    vendor: "Gujarat Glass Works",
    eta: "Mar 25, 2026",
  },
  {
    id: "AMG-2024-0022",
    date: "Mar 12, 2026",
    product: "Low-E Glass",
    specs: "6mm | 1200mm × 2400mm",
    qty: 15,
    total: 90000,
    status: "Delivered",
    vendor: "Fenesta Delhi",
    eta: "Mar 18, 2026",
  },
];

const statusConfig = {
  Delivered:  { color: "bg-green-100 text-green-700",  dot: "bg-green-500",  icon: "✓" },
  "In Transit": { color: "bg-blue-100 text-blue-700",  dot: "bg-blue-500",   icon: "⬆" },
  Processing: { color: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500", icon: "⟳" },
  Cancelled:  { color: "bg-red-100 text-red-700",      dot: "bg-red-400",    icon: "✕" },
};

export default function OrdersPage() {
  const [filter, setFilter] = useState("All");
  const statuses = ["All", "Delivered", "In Transit", "Processing", "Cancelled"];

  const filtered = filter === "All" ? mockOrders : mockOrders.filter(o => o.status === filter);

  const totals = {
    orders: mockOrders.length,
    spent: mockOrders.filter(o => o.status !== "Cancelled").reduce((s, o) => s + o.total, 0),
    delivered: mockOrders.filter(o => o.status === "Delivered").length,
    active: mockOrders.filter(o => ["In Transit", "Processing"].includes(o.status)).length,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
            Your Account
          </div>
          <h1 className="text-4xl font-black text-navy tracking-tight">Order History</h1>
          <p className="text-gray-500 mt-2">Track, review, and reorder your glass procurement history.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Orders", value: totals.orders, icon: "📦" },
            { label: "Total Spent", value: `₹${totals.spent.toLocaleString()}`, icon: "💰" },
            { label: "Delivered", value: totals.delivered, icon: "✅" },
            { label: "Active Orders", value: totals.active, icon: "🔄" },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="text-3xl">{stat.icon}</div>
              <div>
                <p className="text-2xl font-black text-navy">{stat.value}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {statuses.map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border-2 transition-all ${
                filter === s ? 'bg-navy text-white border-navy' : 'bg-white text-gray-400 border-gray-100 hover:border-navy hover:text-navy'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-xl overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-[1fr_1fr_80px_120px_140px_120px] px-8 py-4 bg-gray-50 border-b border-gray-100">
            {["Order ID", "Product", "Qty", "Total", "Status", "Action"].map(h => (
              <p key={h} className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{h}</p>
            ))}
          </div>

          <div className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-4xl mb-4">📭</p>
                <p className="font-bold text-navy">No orders in this category</p>
              </div>
            ) : filtered.map(order => {
              const s = statusConfig[order.status];
              return (
                <div key={order.id} className="px-6 py-6 hover:bg-gray-50 transition-colors">
                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{order.id}</p>
                        <p className="font-black text-navy text-lg">{order.product}</p>
                        <p className="text-xs text-gray-500">{order.specs}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${s.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Qty: <strong className="text-navy">{order.qty}</strong></span>
                      <span className="font-black text-navy">₹{order.total.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-3">
                      <Link href="/estimate" className="flex-1 text-center text-xs font-bold py-2 bg-gray-100 text-navy rounded-xl hover:bg-navy hover:text-white transition-all">Reorder</Link>
                      <Link href="/catalog" className="flex-1 text-center text-xs font-bold py-2 border border-gray-200 text-navy rounded-xl hover:border-navy transition-all">View Similar</Link>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-[1fr_1fr_80px_120px_140px_120px] items-center">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 tracking-widest">{order.id}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{order.date} • {order.vendor}</p>
                    </div>
                    <div>
                      <p className="font-bold text-navy">{order.product}</p>
                      <p className="text-[10px] text-gray-500">{order.specs}</p>
                    </div>
                    <p className="font-black text-navy">{order.qty}</p>
                    <p className="font-black text-navy">₹{order.total.toLocaleString()}</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase w-fit ${s.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                      {order.status}
                    </span>
                    <div className="flex gap-2">
                      <Link href="/estimate" className="text-xs font-bold px-3 py-2 bg-navy text-white rounded-xl hover:bg-glass-blue hover:text-navy transition-all">Reorder</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 bg-navy rounded-[32px] p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-black text-xl">Need glass for a new project?</p>
            <p className="text-gray-400 text-sm mt-1">Use Smart Match to find the right product in seconds.</p>
          </div>
          <Link href="/smart-match" className="bg-glass-blue text-navy px-8 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-all whitespace-nowrap">
            Start Smart Match →
          </Link>
        </div>

      </div>
    </div>
  );
}
