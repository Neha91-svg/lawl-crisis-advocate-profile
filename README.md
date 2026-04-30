# Lawl Crisis Advocate Profile

A high-performance, robust professional profile platform designed for immediate legal trust during crises. 

## 📖 Overview

In high-stakes situations, finding a lawyer isn't the primary challenge—finding a verified, active, and trustworthy advocate instantly is. The **Crisis Advocate Profile** bridges this "trust gap" by aggregating real-time external data alongside verified credentials. 

This platform serves as a command center for clients in need, providing instant proof of an advocate's recent activity, identifying contextual legal resources nearby, and offering a direct line of communication, all loaded progressively to ensure an uninterrupted experience.

---

## ✨ Key Features & Implementations

### 1. Dynamic Routing & Scalable Directory
- **What**: Transitioned from a crowded single-page layout to a dedicated `/advocates` routing flow. The dashboard highlights only top-featured advocates, while the full directory features real-time search and category filtering.
- **Why**: As the platform scales to hundreds of advocates, a clean dashboard ensures users aren't overwhelmed, while the dedicated directory provides powerful tools to find exactly who they need.

### 2. Secure JWT Authentication
- **What**: Implemented a robust authentication flow using `bcryptjs` for password hashing and `jsonwebtoken` for secure session management. Features include registration, login, and protected API routes.
- **Why**: Security is paramount in legal tech. Users need secure, authenticated sessions to manage sensitive consultation requests and personal data without fear of interception.

### 3. Dynamic MongoDB Data & Faker Seeding
- **What**: Replaced static memory arrays with a strict Mongoose `Profile` schema. Integrated `@faker-js/faker` via a standalone `seed.js` script to instantly generate 25+ highly realistic advocate profiles.
- **Why**: Hardcoded data doesn't reflect real-world scenarios. By seamlessly seeding the database with realistic data, we can accurately test frontend search, CSS grid scaling, and overall backend performance under a production-like load.

### 4. Parallel Processing & Resiliency
- **What**: Upgraded the backend data aggregation to utilize `Promise.allSettled()` instead of sequential or strict parallel fetching. 
- **Why**: Third-party APIs (like OpenStreetMap or News) can be unreliable. If a third-party service times out, `Promise.allSettled()` guarantees the core advocate profile still loads instantly, gracefully degrading the UI rather than crashing the server.

### 5. Strict Rate Limiting & API Defense
- **What**: Fortified the `/api/consultation` endpoint with IP-based rate limiting (locked at 3 requests per hour). It intercepts abuse by returning a precise `429 Too Many Requests` JSON response equipped with a standard `Retry-After` HTTP header.
- **Why**: To stop automated spam bots from flooding advocates' inboxes, while providing transparent, developer-friendly feedback to legitimate users who simply clicked too many times.

### 6. High-Performance Caching
- **What**: Implemented strict `node-cache` TTL rules tailored per-source (News data is cached for 10 minutes; Map data for 60 minutes).
- **Why**: Drastically lowers third-party API costs, circumvents strict external rate limits (like Overpass API), and ensures lightning-fast load times for subsequent visitors.

### 7. Progressive Loading & Skeleton UI
- **What**: Heavier modules display sleek skeleton loaders while data fetches asynchronously. 
- **Why**: Eliminates frustrating loading spinners and "waterfall" rendering. The UI remains fully interactive and responsive from millisecond one.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, React Router DOM, Vite, Custom Vanilla CSS, React-Leaflet
- **Backend**: Node.js, Express.js, JSONWebToken, BcryptJS
- **Database**: MongoDB (Mongoose)
- **External Integrations**: NewsAPI, OpenStreetMap (Overpass API), Faker-JS
- **Architecture**: RESTful MVC Architecture, In-Memory Caching

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB connection string
- NewsAPI Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd lawl-crisis-advocate-profile
   ```

2. **Setup the Server & Database:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   NEWS_API_KEY=your_news_api_key
   ```
   *Optional: Seed the database with fake profiles to test the UI!*
   ```bash
   node seed.js
   ```
   Start the server:
   ```bash
   npm start
   ```

3. **Setup the Client:**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   Start the frontend:
   ```bash
   npm run dev
   ```

4. **View the Application:**
   Open `http://localhost:5174` in your browser.

---

## 🔮 Future Roadmap

- **Persistent Caching**: Migrate from in-memory caching to **Redis** for distributed deployments.
- **Real-Time Alerts**: Implement **Socket.io** to notify advocates instantly of high-priority requests.
- **Document Management**: Allow secure, encrypted uploads of critical legal documents alongside consultation requests.

---

*Designed and developed as a robust, crisis-ready solution for the modern legal environment.*
