# AmalGus Backend API

This backend is integrated into the Next.js application using **App Router Route Handlers**.

## 🚀 Base URL
Local: `http://localhost:3000/api`

## 🛠 Endpoints

### 1. Products
- **GET** `/api/products`
  - Query Params: `type`, `thickness`, `application`, `minPrice`, `maxPrice`
- **GET** `/api/products/:id`
  - Returns product info + real-time **vendor comparison**.

### 2. Market Intelligence
- **GET** `/api/rates`
  - Returns today's market indices and pricing trends.
- **POST** `/api/smart-match`
  - Body: `{ "query": "string" }`
  - Returns recommended glass types with expert reasoning.

### 3. Business Tools
- **POST** `/api/estimate`
  - Body: `{ "glassTypeId": id, "width": mm, "height": mm, "quantity": n, "role": "string", "selectedAlliedIds": [] }`
  - Returns a detailed breakdown of costs, discounts, and GST.
- **POST** `/api/quote-request`
  - Body: `{ "customerName": "...", "phone": "...", "glassType": "...", ... }`
  - **Persistence**: Currently saves to `src/data/quote_requests.json`.

### 4. Partner Network
- **GET** `/api/vendors`
  - Query Params: `glassType`, `city`
- **GET** `/api/service-partners`
  - Query Params: `city`, `type`

### 5. Utilities
- **GET** `/api/health`
  - Service monitoring endpoint.

## 🗄 Database Schema
For the prototype, data is served from the `src/data/` directory. For production:
1. **PostgreSQL/Supabase**: Recommended for `glass_products`, `vendors`, and `quote_requests`.
2. **Environment Variables**: Add `DATABASE_URL` and `OPENAI_API_KEY` to your `.env` file.

## 🛑 Error Handling
All endpoints return standard HTTP status codes:
- `200 OK`: Success
- `400 Bad Request`: Validation error
- `404 Not Found`: Resource missing
- `500 Server Error`: Unexpected failure
