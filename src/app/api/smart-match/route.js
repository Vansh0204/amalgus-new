import { glassProducts } from '@/data/glassProducts';
import { NextResponse } from 'next/server';

const matchingRules = [
  { keywords: ['shower', 'bathroom', 'wet area', 'water'], type: "Toughened", thickness: "8mm", reason: "Toughened glass is safety-standard for wet areas and highly resistant to thermal stress." },
  { keywords: ['soundproof', 'acoustic', 'office cabin', 'noise', 'quiet'], type: "Laminated", thickness: "10mm", reason: "PVB lamination provides excellent acoustic insulation and safety for interior partitions." },
  { keywords: ['balcony', 'railing', 'height', 'safety', 'staircase'], type: "Laminated", thickness: "12mm", reason: "High-thickness laminated glass ensures structural integrity and prevents falling in case of breakage." },
  { keywords: ['energy', 'heat', 'south facing', 'facade', 'insulation'], type: "Low-E Glass", thickness: "6mm (DGU)", reason: "Low-E coating reflects heat while allowing light, making it ideal for energy-efficient facades." },
  { keywords: ['kitchen', 'backsplash', 'color', 'decorative'], type: "Back-Painted", thickness: "8mm", reason: "Lacquered glass provides a vibrant, easy-to-clean, and heat-resistant surface for kitchens." },
  { keywords: ['privacy', 'conference', 'partition', 'frosted'], type: "Frosted", thickness: "6mm", reason: "Acid-etched frosted glass provides visual privacy while maintaining a high level of light transmission." },
  { keywords: ['window', 'exterior', 'commercial', 'curtain wall'], type: "DGU/IGU", thickness: "6+12+6mm", reason: "Double glazing provides superior thermal and sound insulation for external building envelopes." }
];

export async function POST(request) {
  try {
    const { query } = await request.json();
    const tokens = query.toLowerCase().split(/\W+/);
    const matches = [];

    matchingRules.forEach(rule => {
      const score = rule.keywords.reduce((acc, kw) => acc + (tokens.includes(kw) ? 1 : 0), 0);
      if (score > 0) {
        const product = glassProducts.find(p => p.name.includes(rule.type) || rule.type.includes(p.name));
        matches.push({
          ...rule,
          name: `${rule.type} Glass`,
          priceRange: product ? `₹${product.priceMin} - ₹${product.priceMax}` : "₹Variable",
          score
        });
      }
    });

    const finalMatches = matches.sort((a, b) => b.score - a.score).slice(0, 2);

    // Placeholder for AI Fallback if needed (can call OpenAI from server side securely here)
    if (finalMatches.length === 0 && process.env.OPENAI_API_KEY) {
      // Server-side AI logic...
    }

    return NextResponse.json(finalMatches);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 });
  }
}
