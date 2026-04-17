"use client";
import { dailyRates } from '@/data/dailyRates';
import { glassProducts } from '@/data/glassProducts';

export default function RatesDashboard() {
  const timestamp = "9:00 AM IST, " + new Date().toLocaleDateString();

  // Mock yesterday's rates and trends
  const ratesWithTrends = dailyRates.rates.map((rate, i) => {
    const todayNum = parseInt(rate.rate.split(' - ')[0].replace('₹', ''));
    // Generate a mocked yesterday rate (within +/- 5% of today)
    const diff = (i % 2 === 0 ? 1 : -1) * (i + 2);
    const yesterdayRate = todayNum - diff;
    const changePct = ((todayNum - yesterdayRate) / yesterdayRate * 100).toFixed(1);
    
    return {
      ...rate,
      yesterday: `₹${yesterdayRate}`,
      change: changePct,
      isUp: todayNum > yesterdayRate
    };
  });

  return (
    <div className="min-h-screen bg-white">
      
      {/* Marquee Ticker */}
      <div className="bg-navy py-3 overflow-hidden whitespace-nowrap border-b border-white/10 pt-20">
        <div className="flex animate-marquee gap-10 items-center">
          {[...ratesWithTrends, ...ratesWithTrends].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">{item.name}</span>
              <span className="text-white font-black text-sm">{item.rate.split(' - ')[0]}</span>
              <span className={`text-[10px] font-bold ${item.isUp ? 'text-green-400' : 'text-red-400'}`}>
                {item.isUp ? '▲' : '▼'} {Math.abs(item.change)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 px-2">
          <div>
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4">
              Real-time Market Index
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-navy mb-2 tracking-tight">Daily Glass Pulse</h1>
            <p className="text-gray-500 font-medium text-sm sm:text-base">Official market indices for primary architectural glass grades.</p>
          </div>
          <div className="text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-glass-blue/20 pl-4 md:pl-0 md:pr-4">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Last Updated</p>
            <p className="text-navy font-black text-lg">{timestamp}</p>
          </div>
        </div>

        {/* Rates Table/Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {ratesWithTrends.map((rate, i) => (
            <div key={i} className="glass-card p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between group hover:shadow-2xl transition-all gap-6">
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-110 transition-transform flex-shrink-0">
                  {glassProducts.find(p => p.name === rate.name)?.imageIcon || '💎'}
                </div>
                <div>
                  <h3 className="font-black text-navy text-lg sm:text-xl mb-1">{rate.name}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">Base Category</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                <div className="hidden lg:block">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">Trend</p>
                  <svg className="w-20 h-8 text-gray-200" viewBox="0 0 100 30">
                    <path 
                      d={rate.isUp ? "M0 25 L20 20 L40 22 L60 10 L80 15 L100 5" : "M0 5 L20 15 L40 10 L60 22 L80 20 L100 25"} 
                      fill="none" 
                      stroke={rate.isUp ? "#4ade80" : "#f87171"} 
                      strokeWidth="3" 
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                
                <div className="text-left sm:text-right">
                  <div className="flex items-center sm:justify-end gap-2 mb-1">
                    <span className={`text-[10px] sm:text-xs font-black ${rate.isUp ? 'text-green-500' : 'text-red-500'}`}>
                      {rate.isUp ? '▲' : '▼'} {Math.abs(rate.change)}%
                    </span>
                    <span className="text-[10px] text-gray-300 font-bold">VS YESTERDAY</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-navy">{rate.rate.split(' - ')[0]}</p>
                  <p className="text-[10px] text-gray-400 font-medium">Ex-Factory Price /sq.ft</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 p-8 rounded-3xl border border-gray-100">
          <div className="flex items-start gap-4">
            <div className="text-blue-600 text-2xl">ℹ️</div>
            <div>
              <p className="text-sm font-bold text-navy mb-2 underline decoration-blue-200 underline-offset-4">Market Notice</p>
              <p className="text-sm text-gray-500 max-w-4xl leading-relaxed">
                Rates listed above are indicative wholesale market indices. Actual prices may vary significantly based on the specific factory output, geographic location of the vendor, site logistics, and bulk order quantities. 
                <br/><br/>
                For custom processing (Toughening, Lamination, Edging), additional conversion costs will apply. Always request a formal quote for billable projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
