import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-xl font-bold text-gray-900 mb-4 block">AmalGus</span>
            <p className="text-gray-500 max-w-sm">
              The world's first B2B2C marketplace dedicated to glass and allied products. Bridging the gap between manufacturers, traders, and consumers.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-blue-600 transition-colors">Browse Glass</Link></li>
              <li><Link href="/allied" className="hover:text-blue-600 transition-colors">Allied Products</Link></li>
              <li><Link href="/vendors" className="hover:text-blue-600 transition-colors">Find Vendors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/help" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
              <li><Link href="/legal" className="hover:text-blue-600 transition-colors">Legal Info</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AmalGus. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
