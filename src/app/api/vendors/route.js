import { vendors } from '@/data/vendors';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const glassType = searchParams.get('glassType');
  const city = searchParams.get('city');

  let filtered = vendors;

  if (glassType) {
    filtered = filtered.filter(v => v.glassType.toLowerCase().includes(glassType.toLowerCase()));
  }

  if (city) {
    filtered = filtered.filter(v => v.city.toLowerCase() === city.toLowerCase());
  }

  return NextResponse.json(filtered);
}
