import { glassProducts } from '@/data/glassProducts';
import { vendors } from '@/data/vendors';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  const product = glassProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const productVendors = vendors.filter(v => v.glassType === product.name);
  
  // Calculate final prices based on base price
  const vendorComparison = productVendors.map(v => ({
    ...v,
    estimatedPrice: Math.round(product.priceMin * (1 + v.priceVariation / 100))
  }));

  return NextResponse.json({ ...product, vendorComparison });
}
