# **🏛️ LexConnect — Trust-Centric Advocate Profile Platform**

LexConnect is a high-performance legal tech platform designed to bridge the gap between users in crisis and verified legal experts. Built with a focus on system resilience, inclusivity, and real-time decision support.

🚀 What This Project Solves

In legal emergencies, users often:
- Don’t know which type of lawyer they need.
- Face language or accessibility barriers.
- Lack real-time context on laws and nearby resources.

LexConnect addresses this by combining a robust MERN backend with intelligent frontend features.

🧠 Core Engineering Pillars

✅ R1 — Profile Page (React + Pure CSS)
The frontend is built using React with 100% hand-written CSS.
- No Tailwind, Bootstrap, or component libraries.
- Features: Full name, designation, specialization, credentials (card layout), work history timeline, and a responsive contact section.
- Why? Ensures complete layout control and zero reliance on prebuilt abstractions.
- Responsiveness: Fluid transition across 360px (mobile), 768px (tablet), and 1280px (desktop).

✅ R2 — Live External APIs
Integrated for real-time situational awareness:
- News API: Fetches specialization-aware legal news to provide situational context.
- OpenStreetMap (Overpass API): Uses coordinate-based queries to map nearby legal aid centers.
- Why? Static data fails in a crisis; dynamic data builds user trust through relevance.

✅ R3 — Backend Aggregation & NDJSON Streaming
- Aggregation: Calls multiple APIs (DB + News + Map) in parallel using `Promise.allSettled`.
- NDJSON Streaming: Profile content streams immediately while external data fetches in the background, preventing UI blocking.
- Caching: Implemented TTL-based caching (`node-cache`) to balance data freshness with API rate limits.

✅ R4 — Progressive Loading & Resilience
- Approach: No full-page loaders; each section (Profile, News, Maps) renders independently using Skeleton Loaders.
- Failure Handling: Partial failure architecture ensures that if one API fails, the rest of the page remains fully functional with graceful fallbacks.

✅ R5 — Consultation & Security
- System: Stored in MongoDB with unique REF-ID generation.
- Security: IP-based Rate Limiting (3 requests/hour) to protect against spam.
- Validation: Strict server-side regex and length validation for all inputs.

🤖 Advanced AI & Accessibility (Beyond Requirements)

1. AI Legal Risk Analyzer
- Logic: Rule-based keyword intelligence categorizes cases (Low/Medium/High) and suggests next steps.
- Accessibility: Integrated Voice-to-Text Input (Web Speech API) for hands-free problem description.
- Multi-Language Support: Auto-translation layer (Hindi/Global support) ensures inclusivity for non-English speakers.

2. Personalized User Ecosystem
- My Consultations: A private, authenticated dashboard for users to track their consultation history and status.
- Resource Hub: A library of verified legal guides and crisis documentation checklists.

🏗️ System Architecture
User → React Frontend (with Streaming Reader)
  ↓
Express Backend (Aggregation Controller)
  ↓
Parallel Execution (Promise.allSettled) → [ MongoDB | News API | Overpass API ]
  ↓
Unified NDJSON Stream → Dynamic UI Updates

🎨 Design Philosophy
- Trust-First: High-contrast typography and a clean, authoritative color palette.
- Originality: Custom design patterns optimized for legal workflows, not copied from social networks.

⚡ Key Features
- 🔍 Dynamic Directory: Real-time, case-insensitive search and specialization filtering.
- 🎤 Voice Input: Hands-free crisis description via Web Speech API.
- 🌍 Global Reach: Auto-translation for multi-lingual accessibility.
- 📡 Live Updates: Aggregated real-time news and location mapping.
- 📞 Smart Consultation: Validated booking with secure reference IDs.
- 🛡️ Resilience: Independent loading states with skeleton fallbacks.

🚧 Challenges & Solutions
- Handling Async Bottlenecks: Solved via NDJSON streaming to prevent slow APIs from blocking the core profile.
- API Reliability: Implemented `Promise.allSettled` to avoid "fail-fast" behavior in parallel calls.
- Accessibility: Overcame the "typing barrier" for users in panic by implementing voice-to-text.

📦 Setup Instructions
1. Clone Repository
git clone https://github.com/Neha91-svg/lawl-crisis-advocate-profile.git
cd crisis-advocate-profile

2. Install Dependencies
# Root & Backend
npm install
# Frontend
cd client && npm install

3. Environment Variables (.env)
In the /server directory:
PORT=5000
MONGO_URI=your_mongodb_uri
NEWS_API_KEY=your_news_api_key
JWT_SECRET=your_secret_key

4. Run Platform
# In /server
npm start
# In /client
npm run dev

🏆 Why This Project Stands Out
LexConnect demonstrates a deep understanding of production-grade system design. It prioritizes data resilience through streaming and aggregation, user accessibility through AI and voice, and architectural stability through partial failure handling. It is more than a profile platform—it is a mission-critical decision support system.

Built with ❤️ and ☕ by a Senior Full-Stack Engineer.le backend
AI assistance

LexConnect becomes more than a profile viewer —
it becomes a decision support system.