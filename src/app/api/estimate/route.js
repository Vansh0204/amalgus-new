import { glassProducts } from '@/data/glassProducts';
import { alliedProducts } from '@/data/alliedProducts';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { glassTypeId, width, height, quantity, role, selectedAlliedIds } = await request.json();

    const selectedGlass = glassProducts.find(p => p.id === parseInt(glassTypeId));
    if (!selectedGlass) return NextResponse.json({ error: 'Glass type not found' }, { status: 400 });

    const sqft = (width * height) / 92903.04;
    const totalSqft = sqft * quantity;
    const midPrice = (selectedGlass.priceMin + selectedGlass.priceMax) / 2;
    const basePrice = midPrice * totalSqft;

    const discountMap = { 'Builder': 0.12, 'Dealer': 0.18, 'Architect': 0.08, 'Homeowner': 0 };
    const discountRate = discountMap[role] || 0;
    const discountAmount = basePrice * discountRate;

    let alliedCost = 0;
    const selectedAlliedDetails = [];
    
    if (selectedAlliedIds && Array.isArray(selectedAlliedIds)) {
      selectedAlliedIds.forEach(id => {
        const product = alliedProducts.find(p => p.id === id);
        if (product) {
          let cost = 0;
          if (product.name === 'UPVC Frame') cost = 350 * totalSqft;
          else if (product.name === 'Structural Silicone') cost = 450 * quantity;
          else cost = 2500 * quantity;
          
          alliedCost += cost;
          selectedAlliedDetails.push({ name: product.name, cost: Math.round(cost) });
        }
      });
    }

    const netAmount = basePrice - discountAmount + alliedCost;
    const gst = netAmount * 0.18;
    const total = netAmount + gst;

    return NextResponse.json({
      productName: selectedGlass.name,
      dimensions: `${width}x${height}mm`,
      totalSqft: totalSqft.toFixed(2),
      basePrice: Math.round(basePrice),
      discountAmount: Math.round(discountAmount),
      alliedCost: Math.round(alliedCost),
      alliedDetails: selectedAlliedDetails,
      gst: Math.round(gst),
      total: Math.round(total),
      ratePerSqft: midPrice,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
