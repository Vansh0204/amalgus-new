import Link from 'next/link';

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-8 right-8 z-[100] print:hidden">
      <Link 
        href="/estimate"
        className="group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-navy text-white shadow-2xl transition-all hover:w-64"
      >
        <div className="absolute inset-0 bg-glass-blue translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        <div className="flex items-center gap-3 relative z-10 px-4">
          <svg className="h-8 w-8 shrink-0 group-hover:text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span className="hidden whitespace-nowrap font-black uppercase tracking-widest text-sm text-white group-hover:text-navy group-hover:block">
            Get Instant Estimate
          </span>
        </div>
      </Link>
    </div>
  );
}
