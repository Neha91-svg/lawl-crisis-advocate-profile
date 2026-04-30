# LexConnect: A High-Performance Advocate Discovery & Risk Analysis Platform

LexConnect isn't just another directory of profiles; it’s a mission-critical platform designed to bridge the gap between legal crises and expert resolution. Built with a "reliability-first" mindset, it combines modern web engineering with robust backend aggregation to provide users with a trustworthy, real-time interface for finding and consulting with top-tier advocates.

---

## 🏗️ The Engineering Blueprint

### R1 | Pure CSS & Design Autonomy
**Why?** In an era of Tailwind and Bootstrap, UI frameworks often lead to bloated bundles and "cookie-cutter" designs. I chose **100% hand-written CSS** to achieve total control over the design system, ensuring every pixel aligns with the professional, trust-focused aesthetic required for legal tech.
**How?** I implemented a custom-built responsive grid using CSS Flexbox and Grid. The UI is fluid across **360px (mobile), 768px (tablet), and 1280px (desktop)**, utilizing a modular "CSS Variables" approach for consistent theming and lightning-fast rendering.

### R2 | Real-World Context (Live APIs)
**Why?** Static profiles are dead data. A user looking for a lawyer needs context—latest legal news affecting their case and nearby physical resources.
**How?** Integrated the **News API** for dynamic legal updates and a **Location API** for nearby centers. This ensures the platform feels "alive" and provides immediate value beyond just a phone number.

### R3 | The Aggregation Layer (Performance at Scale)
**Why?** Frontend performance dies when making multiple sequential API calls. 
**How?** Built a dedicated **Aggregation Controller** in Node.js. When a profile is requested:
1. The backend triggers calls to the Database, News API, and Map API **in parallel** using `Promise.allSettled`.
2. Even if the Map API is slow or the News API fails, the user still gets the Profile data immediately.
3. **Caching Strategy:** Implemented TTL-based caching using `node-cache` to reduce external API hits and bypass rate limits.

### R4 | Progressive Loading & Failure Resilience
**Why?** A full-page spinner is a UX failure. 
**How?** The UI uses **Skeleton Loaders** and partial-render logic. If an external service fails, the specific section (e.g., "Related News") renders a graceful fallback UI instead of crashing the entire page. This "Graceful Degradation" ensures the core experience—viewing the advocate—is never blocked.

### R5 | Consultation System & Security
**Why?** Legal platforms are prime targets for spam. 
**How?** 
- **Validation:** Dual-layer validation (Regex on frontend, strict schema check on backend).
- **Reference Tracking:** Every request generates a unique `REF-ID` stored in MongoDB.
- **Rate Limiting:** Implemented IP-based limiting (3 requests/hour) to prevent bot-driven spam, using an in-memory store for high performance.

---

## 🤖 The "Plus One": AI Legal Risk Analyzer

Beyond the requirements, I built an **AI-powered assistant** to solve the "I don't know if I need a lawyer" problem.

### Features:
- **Intelligent Risk Scoring:** Uses rule-based keyword intelligence to analyze user queries and categorize risk (Low/Medium/High).
- **Voice Input (Accessibility):** Integrated the **Web Speech API** allowing users in crisis to describe their situation hands-free.
- **Multi-Language Support:** Integrated a translation layer that detects and translates inputs (e.g., Hindi) to English before analysis, ensuring inclusivity.
- **Automated Routing:** Suggests the specific specialization needed and provides a direct link to filtered advocates.

---

## 🎨 Design Philosophy
- **Trust-Centered Layout:** High-contrast typography and a clean blue/white palette.
- **Visual Hierarchy:** Essential info (Name, Spec) first; supporting info (Credentials, News) later.
- **Originality:** Zero templates. Every card, button, and transition was designed specifically for the LexConnect brand.

---

## ⚡ Technical Stack
- **Frontend:** React.js, Context API, React Router v6.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose).
- **Caching:** Node-cache.
- **APIs:** News API, Web Speech API, Google Translate API.

---

## 🚧 Challenges & Solutions
- **Challenge:** Managing parallel async calls where some might fail.
- **Solution:** Switched from `Promise.all` to `Promise.allSettled` to prevent "all-or-nothing" failures.
- **Challenge:** Building a premium UI without component libraries.
- **Solution:** Created a modular CSS design system from scratch, utilizing BEM naming conventions for maintainability.

---

## 📦 Setup & Installation

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd crisis-advocate-profile
   npm install && cd client && npm install
   ```

2. **Environment Variables (.env)**
   Create a `.env` in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   NEWS_API_KEY=your_key
   JWT_SECRET=your_secret
   ```

3. **Run Platform**
   ```bash
   # Server (Terminal 1)
   cd server && npm start
   
   # Client (Terminal 2)
   cd client && npm run dev
   ```

---

## 🏆 Why LexConnect?
LexConnect demonstrates that "simple" projects can have "complex" engineering. By focusing on **Aggregation Layers, TTL Caching, and Progressive Loading**, I’ve built a platform that isn't just a UI—it’s a scalable, resilient system designed for real-world legal crisis management.

**Built with ❤️ and ☕ by a Senior Full-Stack Engineer.**
