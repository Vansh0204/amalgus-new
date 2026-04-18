import { glassProducts } from '@/data/glassProducts';

const matchingRules = [
  {
    keywords: ['shower', 'bathroom', 'wet area', 'water'],
    type: "Toughened",
    thickness: "8mm",
    reason: "Toughened glass is safety-standard for wet areas and highly resistant to thermal stress."
  },
  {
    keywords: ['soundproof', 'acoustic', 'office cabin', 'noise', 'quiet'],
    type: "Laminated",
    thickness: "10mm",
    reason: "PVB lamination provides excellent acoustic insulation and safety for interior partitions."
  },
  {
    keywords: ['balcony', 'railing', 'height', 'safety', 'staircase', 'ledge'],
    type: "Laminated",
    thickness: "12mm",
    reason: "High-thickness laminated glass ensures structural integrity and prevents falling in case of breakage."
  },
  {
    keywords: ['energy', 'heat', 'south facing', 'facade', 'insulation', 'solar'],
    type: "Low-E Glass",
    thickness: "6mm (DGU)",
    reason: "Low-E coating reflects heat while allowing light, making it ideal for energy-efficient facades."
  },
  {
    keywords: ['kitchen', 'backsplash', 'color', 'decorative', 'wall'],
    type: "Back-Painted",
    thickness: "8mm",
    reason: "Lacquered glass provides a vibrant, easy-to-clean, and heat-resistant surface for kitchens."
  },
  {
    keywords: ['privacy', 'conference', 'partition', 'frosted', 'cabin'],
    type: "Frosted",
    thickness: "6mm",
    reason: "Acid-etched frosted glass provides visual privacy while maintaining a high level of light transmission."
  },
  {
    keywords: ['window', 'exterior', 'commercial', 'curtain wall', 'shop'],
    type: "DGU/IGU",
    thickness: "6+12+6mm",
    reason: "Double glazing provides superior thermal and sound insulation for external building envelopes."
  },
  {
    keywords: ['mirror', 'reflection', 'grooming', 'gym'],
    type: "Reflective",
    thickness: "6mm",
    reason: "Reflective coating provides mirror-like properties and heat reduction for modern architecture."
  }
];

export function getLocalMatch(input) {
  const tokens = input.toLowerCase().split(/\W+/);
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

  return matches.sort((a, b) => b.score - a.score).slice(0, 2);
}

export async function getAiMatch(input) {
  const apiKey = process.env.NEXT_PUBLIC_GROQ_KEY || process.env.NEXT_PUBLIC_OPENAI_KEY;
  if (!apiKey || apiKey.includes('your_')) {
    console.warn("AI Matching skipped: Please set NEXT_PUBLIC_GROQ_KEY in your .env file.");
    return null;
  }

  const productList = glassProducts.map(p => `${p.name} (${p.thickness}, ₹${p.priceMin}-${p.priceMax})`).join(', ');

  try {
    const isGroq = apiKey.startsWith('gsk_');
    const endpoint = isGroq 
      ? 'https://api.groq.com/openai/v1/chat/completions' 
      : 'https://api.openai.com/v1/chat/completions';
    
    const model = isGroq ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini';

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: "system",
            content: `You are a glass industry expert. Based on the user requirement, recommend the best glass type from this list: [${productList}]. If the user's query is completely unrelated to glass, construction, or building materials (e.g., "hello", "how are you"), respond ONLY with {"error": "irrelevant"}. Otherwise, respond ONLY in JSON: { "recommendation": "name", "reason": "1-sentence reasoning", "thickness": "suggested thickness", "priceRange": "range from list" }`
          },
          {
            role: "user",
            content: input
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("AI API Error:", data);
      return null;
    }

    if (!data.choices || data.choices.length === 0 || !data.choices[0].message) {
      console.error("Malformed AI response:", data);
      return null;
    }

    const result = JSON.parse(data.choices[0].message.content);
    
    if (result.error) {
       return null;
    }

    return [{
      name: result.recommendation || "Custom Glass Solution",
      reason: result.reason || "Matched based on your specific requirements.",
      thickness: result.thickness || "Standard",
      priceRange: result.priceRange || "₹Variable"
    }];
  } catch (error) {
    console.error("AI Match Exception:", error);
    return null;
  }
}
