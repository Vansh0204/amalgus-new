import { dailyRates } from '@/data/dailyRates';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(dailyRates);
}
