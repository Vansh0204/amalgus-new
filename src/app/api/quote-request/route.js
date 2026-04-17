import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'src/data/quote_requests.json');

// Initialize DB file if not exists
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Basic Validation
    if (!data.customerName || !data.phone || !data.glassType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newRequest = {
      id: Date.now(),
      ...data,
      created_at: new Date().toISOString()
    };

    // Simulate DB Save
    const currentData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    currentData.push(newRequest);
    fs.writeFileSync(DB_PATH, JSON.stringify(currentData, null, 2));

    return NextResponse.json({ success: true, message: 'Quote request saved successfully', requestId: newRequest.id });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  const currentData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  return NextResponse.json(currentData);
}
