import { glassProducts } from '@/data/glassProducts';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const type = searchParams.get('type');
  const thickness = searchParams.get('thickness');
  const application = searchParams.get('application');
  const minPrice = parseFloat(searchParams.get('minPrice')) || 0;
  const maxPrice = parseFloat(searchParams.get('maxPrice')) || Infinity;

  let filtered = glassProducts.filter(p => {
    const matchesType = !type || p.name.toLowerCase().includes(type.toLowerCase());
    const matchesThickness = !thickness || p.thickness === thickness;
    const matchesApp = !application || p.application.toLowerCase().includes(application.toLowerCase());
    const matchesPrice = p.priceMin >= minPrice && p.priceMax <= maxPrice;
    
    return matchesType && matchesThickness && matchesApp && matchesPrice;
  });

  return NextResponse.json(filtered);
}
