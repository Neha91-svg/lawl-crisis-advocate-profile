# LexConnect: Advocate Crisis Response Platform

A production-grade, high-performance MERN stack application designed to provide immediate, verified legal trust and resource mapping for individuals in crisis.

## 📖 Overview

LexConnect bridges the "trust gap" in legal emergencies by providing a unified command center for advocate profiles. Unlike static professional pages, LexConnect aggregates real-time news and geographic resource mapping to prove an advocate's current engagement and local contextual presence.

---

## 🚀 Key Features (Requirement Mapping)

### [R1] Premium Professional Profile
- **Implementation**: Fully hand-written Vanilla CSS layout (no Tailwind/Bootstrap).
- **Details**: Displays verified credentials, specialized designations, work history timeline, and direct contact protocols.
- **Responsiveness**: Precision media queries for **360px** (Mobile), **768px** (Tablet), and **1280px** (Desktop).

### [R2] Real-Time External Intelligence
- **News API**: Dynamically fetches the latest legal developments related to the advocate's specialization to prove active engagement.
- **Map API (Overpass/OpenStreetMap)**: Programmatically locates nearby resource centers (legal aid, courts) relative to the advocate's office.
- **Dynamic Nature**: Data is never stale; it refreshes automatically based on global news cycles and geographic positioning.

### [R3] Node.js High-Performance Aggregation Layer
- **Unified Payload**: The backend acts as a high-performance orchestrator, aggregating profile data and external API results into a single JSON response.
- **Parallel Execution**: Uses `Promise.allSettled` to fetch external APIs concurrently, ensuring that a failure in one service (e.g., News API rate limit) does not block the delivery of core profile data.
- **Network Efficiency**: The frontend performs exactly **one** API call per page, drastically reducing mobile data usage and latency.

### [R4] Progressive Hydration & Resiliency
- **Skeleton UI**: Implemented non-blocking loading states. Users see the core profile layout immediately while heavier data streams fetch in the background.
- **Graceful Degradation**: If an external service fails, LexConnect renders specific "Section Temporarily Unavailable" messages, maintaining a functional UI for all other data points.

### [R5] Secure Consultation Gateway
- **Validation**: Strict dual-layer validation (Client-side regex + Server-side length/format constraints).
- **Data Integrity**: All requests are persisted in MongoDB with a unique, human-readable **Reference ID** (e.g., `REF-123456`).
- **Security**: Enforces an IP-based rate limit of **3 requests per hour** to prevent automated spam and service abuse.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js (Vite), Vanilla CSS (No Libraries), Leaflet.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **External APIs** | NewsAPI, OpenStreetMap (Overpass API), Faker-JS |
| **Optimization** | Node-Cache (TTL-based), Promise.allSettled |

---

## ⚙️ Architecture: The Aggregation Layer

LexConnect utilizes a **"Single-Call Architecture"**. When a profile is requested:
1. The server fetches the primary profile from MongoDB.
2. It extracts the `specialization` and `coordinates`.
3. It spawns two parallel tasks:
   - `fetchNews(specialization)`
   - `fetchNearbyCenters(coordinates)`
4. Using `Promise.allSettled`, it merges the results. If the Map API fails but News succeeds, the user still sees the News.
5. A single unified object is sent to the frontend.

---

## 💾 Caching Strategy (TTL)

To ensure high performance and minimize API costs, LexConnect implements per-source TTL (Time-To-Live) caching:
- **News API**: Cached for **10 minutes** (Balanced freshness for legal updates).
- **Geographic Data**: Cached for **60 minutes** (Resources rarely change position).
- **Mechanism**: Utilizes `node-cache` in the service layer to intercept repeated requests before they hit external endpoints.

---

## 🛠️ Setup & Installation

1. **Clone & Install**:
   ```bash
   git clone <repo-url>
   cd crisis-advocate-profile
   cd server && npm install
   cd ../client && npm install
   ```

2. **Environment Variables (`/server/.env`)**:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NEWS_API_KEY=your_news_api_key
   ```

3. **Database Seeding**:
   ```bash
   cd server && node seed.js
   ```

4. **Run Development Mode**:
   - Server: `cd server && npm start`
   - Client: `cd client && npm run dev`

---

## 🔮 Future Improvements

- **Redis Integration**: Transition from in-memory caching to Redis for distributed horizontal scaling.
- **Push Notifications**: Real-time advocate alerts for high-priority crisis consultations using Socket.io.
- **Audit Logs**: Comprehensive logging of API failures and rate-limit triggers for administrative monitoring.

---

*Designed and engineered for reliability, speed, and trust.*
