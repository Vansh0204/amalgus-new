import { servicePartners } from '@/data/servicePartners';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const type = searchParams.get('type');

  let filtered = servicePartners;

  if (city) {
    filtered = filtered.filter(p => p.city.toLowerCase() === city.toLowerCase());
  }

  if (type) {
    filtered = filtered.filter(p => p.type.toLowerCase().includes(type.toLowerCase()));
  }

  return NextResponse.json(filtered);
}
