import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="relative mb-12">
        <div className="text-[12rem] font-black text-gray-50 opacity-10 select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-9xl group hover:scale-110 transition-transform duration-500 cursor-default">
            🪟
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-1 bg-red-500/20 blur shadow-lg rotate-45"></div>
          </div>
        </div>
      </div>
      
      <h1 className="text-4xl font-black text-navy mb-4">Glass Shattered!</h1>
      <p className="text-gray-500 max-w-md mx-auto mb-10 text-lg">
        The page you are looking for has been moved or doesn't exist. Let's find you a solid alternative.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          href="/"
          className="bg-navy text-white px-8 py-4 rounded-xl font-bold hover:bg-glass-blue hover:text-navy transition-all shadow-xl"
        >
          Return Home
        </Link>
        <Link 
          href="/catalog"
          className="bg-white text-navy border border-gray-100 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
        >
          Browse Catalog
        </Link>
      </div>
    </div>
  );
}
