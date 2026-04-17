import Link from 'next/link';
import { glassProducts } from '@/data/glassProducts';
import { vendors } from '@/data/vendors';
import { notFound } from 'next/navigation';
import VendorComparison from '@/components/VendorComparison';

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = glassProducts.find(p => p.id === parseInt(id));
  
  if (!product) {
    notFound();
  }
  
  const productVendors = vendors.filter(v => v.glassType === product.name);

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12">
          <Link href="/" className="hover:text-navy transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-navy transition-colors">Catalog</Link>
          <span>/</span>
          <span className="text-navy font-bold">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Product Image/Visual Section */}
          <div>
            <div className="aspect-square bg-white rounded-[40px] shadow-xl border border-gray-100 flex items-center justify-center text-[10rem] sticky top-32 ring-1 ring-gray-200">
              {product.imageIcon}
              <div className="absolute bottom-8 right-8">
                <span className="bg-navy text-white px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase">
                  Verified Grade
                </span>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-glass-blue/10 text-glass-blue text-xs font-black uppercase tracking-widest mb-6">
                Category: Architectural Glass
              </div>
              <h1 className="text-5xl font-black text-navy mb-4">{product.name} Glass</h1>
              <p className="text-xl text-gray-500 leading-relaxed">
                Precision-engineered {product.name} glass optimized for {product.application.toLowerCase()}. 
                Featuring {product.process} processing for superior durability and clarity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 border-y border-gray-200 py-10">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Standard Thickness</p>
                <p className="text-2xl font-black text-navy">{product.thickness}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Processing Method</p>
                <p className="text-2xl font-black text-navy">{product.process}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Primary Application</p>
                <p className="text-2xl font-black text-navy">{product.application}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Est. Market Rate</p>
                <p className="text-2xl font-black text-glass-blue italic">₹{product.priceMin}-{product.priceMax}/sq.ft</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-navy mb-6">Key Performance Tags</h3>
              <div className="flex flex-wrap gap-3">
                {product.tags.map(tag => (
                  <span key={tag} className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-gray-600 font-bold text-sm shadow-sm hover:shadow-md transition-shadow">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote Request Card */}
            <div className="bg-navy rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-glass-blue/10 blur-3xl"></div>
              <h3 className="text-2xl font-bold mb-4">Request a Site Measurement</h3>
              <p className="text-gray-400 text-sm mb-8">Get exact pricing from 3 verified local fabricators within 24 hours.</p>
              
              <div className="flex gap-4">
                <Link href="/estimate" className="flex-1 bg-glass-blue text-navy py-4 rounded-xl font-black text-center hover:scale-105 transition-transform flex items-center justify-center">
                  Instant Estimate
                </Link>
                <button className="flex-1 bg-white/10 border border-white/20 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors">
                  Contact Expert
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Comparison Section */}
        <VendorComparison vendors={productVendors} basePrice={product.priceMin} />

        {/* Suggestion Section */}
        <section className="mt-32">
          <h2 className="text-3xl font-black text-navy mb-12 uppercase tracking-tighter">Frequently Paired Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Hardware Fittings', 'Structural Silicone', 'UPVC Frame'].map(item => (
              <div key={item} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-gray-50 rounded-xl mb-4 flex items-center justify-center text-xl">📦</div>
                <h4 className="font-bold text-navy mb-2">{item}</h4>
                <p className="text-sm text-gray-500 mb-6">Optimized for use with {product.name} projects.</p>
                <button className="text-glass-blue font-bold text-sm hover:underline">View Product →</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
