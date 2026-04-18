# AmalGus — World's First B2B2C Glass & Allied Products Marketplace 💎

> **"India's Smartest Gateway for Architectural Glass Solutions"**

AmalGus is a niche digital marketplace designed to bridge the structural gap in the **$150–190 Billion global glass construction market**. By connecting Homeowners, Architects, Builders, and Dealers directly with verified manufacturers and service partners, AmalGus brings transparency, speed, and AI-driven precision to a traditionally fragmented, WhatsApp-driven industry.

Built as a prototype in response to the AmalGus assignment brief by **Preetam, Founder of AmalGus Technology**.

![Stack](https://img.shields.io/badge/Framework-Next.js%2015%20App%20Router-black?style=for-the-badge)
![Styling](https://img.shields.io/badge/Styling-Tailwind%20CSS-38BDF8?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Groq%20%2B%20Rule--Based%20Fallback-orange?style=for-the-badge)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge)

---

## 🚀 Live Demo

**[https://amalgus-new.vercel.app](https://amalgus-new.vercel.app)**  

---

## ✅ Assignment Coverage

### Core Requirements (4/4)
| Feature | Implementation |
|---|---|
| **Glass Product Catalog** | Filter by type, thickness (mm), process & application. 10+ glass types with real industry attributes |
| **Smart AI Matcher** | Plain-language query → Groq LLM recommendation, with rule-based fallback for 8+ scenarios |
| **Estimate / Quote Generator** | mm → sq.ft conversion, GST (18%), role-based discounts (Builder 12%, Dealer 18%), allied product add-ons |
| **Responsive UI** | Role-aware design system, mobile-first layout, print-ready PDF estimate |

### Bonus Features (7/7)
| Bonus | Implementation |
|---|---|
| **Multi-vendor comparison** | Sortable vendor table (price, rating, delivery days) on every product detail page |
| **Daily Rate Dashboard** | Live rate index with trend sparklines for 10 glass types |
| **Allied Products** | Cross-sell in estimator (UPVC Frame, Sealant, Hardware Fittings) |
| **Service Partners** | 15+ verified partners, filterable by city & service type |
| **Customer Role Selection** | 4 roles (Homeowner, Architect, Builder, Dealer) — each gets a personalized hero, catalog & CTA |
| **Order History Mock-up** | Full order history page with status filters, stats, and reorder flow |
| **Allied products cross-sell** | Paired products shown on product detail pages |

---

## 🧠 AI Matching — How It Works

The Smart Matcher uses a **two-layer architecture**:
1. **Groq LLM (primary)**: User's plain-language query is sent to `llama3-8b-8192` with a system prompt that knows glass industry terminology, thickness norms, and application-based safety requirements.
2. **Rule-based fallback (secondary)**: If the API is unavailable or rate-limited, a local scoring engine matches queries against 8+ predefined scenarios using keyword analysis, safety flags, and category priorities.

Example queries it handles:
- *"I need glass for my bathroom shower"* → Toughened, 8mm
- *"Soundproof glass for office partition"* → Acoustic Laminated, 8.8mm
- *"External facade of a high-rise building"* → Low-E / Reflective, 6mm+

---

## 🏗 Architecture

```
src/
├── app/
│   ├── page.js              # Role-aware homepage
│   ├── catalog/             # Product listing + detail pages
│   ├── smart-match/         # AI Matcher UI
│   ├── estimate/            # Quote generator with print support
│   ├── orders/              # Order history mock-up
│   ├── rates/               # Daily glass rate dashboard
│   ├── vendors/             # Factory partner directory
│   ├── service-partners/    # Installer / measurement listings
│   └── api/                 # Next.js Route Handlers (backend)
├── components/
│   ├── Navbar.js            # Role-aware responsive navigation
│   ├── RoleProvider.js      # Global role context (localStorage)
│   ├── ToastProvider.js     # Notification system
│   ├── VendorComparison.js  # Sortable vendor table
│   └── ...
└── data/
    ├── glassProducts.js     # 10+ glass types with full specs
    ├── vendors.js           # Mock vendor network
    ├── dailyRates.js        # Simulated market index data
    └── matchLogic.js        # AI + rule-based matching engine
```

---

## 💻 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Vansh0204/amalgus-new.git
cd amalgus-new
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_GROQ_KEY=your_groq_api_key_here
```
> **Note:** The app works without an API key — the rule-based fallback handles all matching scenarios.

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| AI | Groq API (`llama3-8b-8192`) with rule-based fallback |
| State Management | React Context API |
| Deployment | Vercel |

---

## 🏭 Glass Industry Context

This prototype is built with real glass industry knowledge:
- **Custom manufacturing** — once cut, glass cannot be returned. The estimate tool reflects this with clear disclaimers.
- **Daily rate volatility** — the Daily Rates page simulates real market fluctuations.
- **System-based selling** — the estimator bundles glass with allied products (frames, sealants, hardware).
- **Trust-based ecosystem** — vendor ratings and verified badges reflect how B2B glass deals actually work.
- **52 customer types across 9 groups** — simplified into 4 UI roles (Homeowner, Architect, Builder, Dealer).

---

*Developed for the AmalGus Technology Internship Assignment — April 2026.*  
*"We are building something that doesn't exist yet."*
