"use client";
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ToastProvider';
import { getLocalMatch, getAiMatch } from '@/data/matchLogic';

const sampleQueries = [
  "I need glass for my bathroom shower area.",
  "Looking for soundproof glass for a quiet office cabin.",
  "Safe glass for a 5th-floor balcony railing.",
  "Heat resistant glass for a south-facing exterior facade.",
  "Sky-blue back painted glass for my kitchen backsplash.",
  "Need privacy for my conference room partition."
];

export default function SmartMatchPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [matchType, setMatchType] = useState(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (!loading && query && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [results, loading]);

  const handleMatch = async (inputQuery = query) => {
    if (!inputQuery.trim()) return;
    
    setLoading(true);
    setResults([]);
    
    // Try local rule-based match first
    const localResults = getLocalMatch(inputQuery);
    
    if (localResults.length > 0) {
      setResults(localResults);
      setMatchType('local');
      setLoading(false);
    } else {
      // Fallback to AI
      const aiResults = await getAiMatch(inputQuery);
      if (aiResults) {
        setResults(aiResults);
        setMatchType('ai');
      } else {
        setResults([]);
        setMatchType(null);
      }
      setLoading(false);
    }
  };

  const handleSampleClick = (q) => {
    setQuery(q);
    handleMatch(q);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-6">
            AI-Powered Recommendations
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-navy mb-6 tracking-tight leading-tight">
            Find Your <span className="text-glass-blue">Perfect Glass</span> in Seconds
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Describe your project, safety concerns, or aesthetic needs in plain English, and our smart engine will recommend the technical specs you need.
          </p>
        </div>

        {/* Search Input Section */}
        <div className="relative mb-12 flex flex-col items-center">
          <textarea 
            className="w-full p-6 sm:p-8 text-lg sm:text-xl bg-gray-50 border-2 border-gray-100 rounded-[24px] sm:rounded-[32px] focus:ring-4 focus:ring-glass-blue/20 focus:border-glass-blue outline-none transition-all shadow-sm h-48 sm:h-56 resize-none placeholder:text-gray-300"
            placeholder="e.g. I want safe glass for my staircase railing..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleMatch();
              }
            }}
          />
          <button 
            onClick={() => handleMatch()}
            disabled={loading}
            className="mt-4 sm:absolute sm:bottom-6 sm:right-6 w-full sm:w-auto bg-navy text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-glass-blue hover:text-navy transition-all shadow-xl disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              <>
                Find Best Glass
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* Sample Queries */}
        <div className="mb-16">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Try these examples</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
            {sampleQueries.map((q, i) => (
              <button 
                key={i}
                onClick={() => handleSampleClick(q)}
                className="px-4 py-2 bg-white border border-gray-100 rounded-full text-xs font-medium text-gray-600 hover:border-glass-blue hover:text-glass-blue transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div ref={resultsRef} className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 scroll-mt-28">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-bold text-navy">Recommended Solutions</h2>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${matchType === 'ai' ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'}`}>
                {matchType === 'ai' ? '✨ Deep AI Match' : '✔️ Expert Rule Match'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((result, i) => (
                <div key={i} className="glass-card p-8 rounded-[32px] border border-gray-100 hover:shadow-2xl transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-glass-blue/5 blur-2xl rounded-full"></div>
                  
                  <h3 className="text-2xl font-black text-navy mb-4 group-hover:text-glass-blue transition-colors">
                    {result.name}
                  </h3>
                  
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">
                    "{result.reason}"
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Thickness</p>
                      <p className="font-bold text-navy">{result.thickness}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Market Rate</p>
                      <p className="font-bold text-navy">{result.priceRange}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      showToast(`Saving ${result.name} to your session...`);
                      router.push(`/catalog?search=${encodeURIComponent(result.name)}`);
                    }}
                    className="w-full bg-navy text-white py-4 rounded-xl font-bold hover:bg-glass-blue hover:text-navy transition-all shadow-lg"
                  >
                    Get Quote from Verified Vendors
                  </button>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-blue-50/50 rounded-2xl mt-8 text-center border border-blue-100/50">
              <p className="text-xs text-blue-600 font-medium">
                Note: These recommendations are based on standard architectural practices. Always consult with a structural engineer for load-bearing installations.
              </p>
            </div>
          </div>
        )}

        {/* Fallback for no results */}
        {!loading && query && results.length === 0 && (
          <div ref={resultsRef} className="text-center py-12 scroll-mt-28">
            <div className="text-4xl mb-4">🤔</div>
            <h3 className="text-xl font-bold text-navy mb-2">We couldn't find a perfect match.</h3>
            <p className="text-gray-500">Try rephrasing your requirement or contact our human experts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
