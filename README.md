# lawl-crisis-advocate-profile

### A system for crisis-ready professional advocacy

I built this project to solve a specific, high-stakes problem: **immediate legal trust**. In India, finding a lawyer in a crisis isn't the hard part—finding one you can trust instantly, while you're under pressure, is. This platform is a professional profile designed to bridge that gap by combining verified credentials with real-time external data.

## 1. Project Overview
This isn't just a static resume. It’s an integrated profile page for an advocate that aggregates data from multiple sources to prove credibility. A user can land on this page during a legal emergency, verify the advocate’s current standing, check nearby legal resources, and request a consultation—all in under a minute.

The focus here wasn't on adding a hundred features, but on making the core ones extremely reliable and fast.

## 2. Problem Statement
Legal access in India is often slowed down by a massive "trust gap." Most online lawyer directories are cluttered with outdated info or paid advertisements. In a crisis, you don't have time to browse. You need:
- **Instant proof of activity** (Live news/updates).
- **Contextual help** (Where are the nearest legal centers?).
- **A direct line of communication** that doesn't get lost in an email inbox.

Existing platforms feel like phonebooks. This is designed to feel like a command center for a client in need.

## 3. System Design Philosophy
I followed a few core principles while architecting this:
- **Aggregation over Redundancy**: Instead of managing a separate database for news or locations, the backend aggregates from source-of-truth APIs (News API, OpenStreetMap).
- **The "One Shot" Frontend**: The frontend is designed to get the most important data in its first few requests. I wanted to avoid "waterfall" loading where the page jumps around for 10 seconds.
- **Resilience as a Default**: I assume external APIs will fail. The system is built to handle `401`, `429`, or `500` errors from dependencies without breaking the user's experience.

## 4. Deep Dive into Features
- Professional Profile Page (React + custom CSS)
- Live data from external APIs (News API & OpenStreetMap)
- Interactive mapping using Leaflet (No API keys required)
- Backend API aggregation using Express

### Professional Profile Page
Built with React and custom CSS. I avoided frameworks like Tailwind or Bootstrap here because I wanted complete control over the "trust aesthetic." It uses a dark-themed, minimalist design that feels serious and professional.

### Live Data Aggregation
The backend pulls from:
- **News API**: To show the advocate is active in their field.
- **OpenStreetMap (Overpass API)**: Instead of proprietary maps, I used OSM to fetch nearby legal offices.
    - **Why?**: This was a deliberate choice to keep the project truly open-source and free to run. It removes the friction of "API Key setup" for anyone testing the project locally.

### Interactive Mapping (Leaflet)
I integrated **Leaflet** on the frontend to render the geographic data.
- **Lightweight**: Leaflet has a much smaller footprint than Google Maps.
- **Privacy & Freedom**: Using OSM ensures that user location data isn't being funneled into a massive proprietary ad network, aligning with the "crisis advocacy" ethics.

### Parallel API Fetching (`Promise.all`)
In the backend, I don't fetch news and then fetch locations. That would take too long. I fire both requests simultaneously. If one takes 200ms and the other 500ms, the whole operation takes 500ms, not 700ms. It’s a small detail that makes the API feel much snappier.

### Per-API Caching with TTL
I implemented in-memory caching because hitting external APIs on every page load is expensive and slow.
- **News**: 10-minute TTL. News doesn't change every second, but it should feel "today."
- **Locations**: 1-hour TTL. Legal centers don't move. Caching them longer saves on API costs and speeds up the response.

### Progressive Loading & Skeletons
No one likes a full-screen spinning wheel. I built skeleton components that mimic the page layout. The hero section (basic info) loads first because it's stored in our DB, and the "heavier" sections (News/Maps) pop in as the cache or API returns data.

### Partial Failure Handling
If the News API is down, the News section just shows a clean "Data Temporarily Unavailable" message with a retry button. The rest of the page remains fully interactive. The system treats a partial failure as a UI state, not a system crash.

### Consult Request Form & MongoDB
A standard but strictly validated form. It captures the user’s name, phone, and issue. I limited the issue description to 300 characters to ensure the advocate gets concise summaries, not rambling essays.

### Unique Booking References
Every submission generates a `REF-XXXXXX` ID. This is generated on the server using a prefix and a random number. It gives the user a sense of "I have a ticket now," which is psychologically important in a legal crisis.

### Rate Limiting
I added a limit of 3 requests per hour per IP. This is a basic safety measure to prevent bot spam or malicious users from flooding the database. It’s enforced at the Express level.

## 5. API Design
The `/api/profile` route is the heart of the system. I chose a unified JSON response structure because it simplifies the frontend logic. Instead of handling five different loading states for five different endpoints, the frontend gets one comprehensive object. 

## 6. Caching Strategy
The tradeoff here is Freshness vs. Performance. In a crisis advocacy context, performance wins. A user won't care if a news article is 8 minutes old, but they will care if the page takes 4 seconds to load. The TTL values reflect this priority.

## 7. Failure Handling Strategy
Each API call is wrapped in a try/catch block within the `Promise.all`. If one fails, it returns `null` for that specific field. The frontend checks `if (!data)` and renders the fallback component. The page "degrades gracefully" rather than "breaking."

## 8. Rate Limiting Design
I used an in-memory store for rate limiting. 
**The Honesty Bit:** Since it’s in-memory, if the server restarts, the limits reset. For a production-grade engineering contest project, this is a reasonable tradeoff. In a massive scale-up, I’d move this to Redis.

## 9. Frontend Design Decisions
I went with **Pure CSS**. No frameworks.
Why? Because every byte matters. I used CSS variables for a consistent design system (colors, spacing, typography) and `backdrop-filter` for that modern glassmorphism effect. The focus was on **readability**. Legal terms are hard enough; the UI shouldn't make them harder.

## 10. Known Limitations
- **In-Memory Cache**: It doesn't persist across restarts.
- **Single Server**: Not designed for horizontal scaling yet (session/cache issues).
- **Hardcoded Coordinates**: The map currently defaults to New Delhi if geolocation isn't provided.

## 11. Future Improvements
- **Redis Integration**: To make caching and rate limiting persistent and shared across server instances.
- **Real-time Notifications**: Adding Socket.io to alert the advocate instantly when a "High Priority" request comes in.
- **Document Upload**: A secure way for users to attach 1-2 critical documents to their initial request.

## 12. Conclusion
This project was an exercise in building for the real world. It shows that you don't need a hundred microservices to build something robust—you just need a thoughtful backend that handles external dependencies with care and a frontend that respects the user's time and stress levels.

---
*Built with the MERN stack for the [Engineering Contest Name/Context]*
