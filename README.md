# Lawl Crisis Advocate Profile

A high-performance, robust professional profile platform designed for immediate legal trust during crises. 

## 📖 Overview

In high-stakes situations, finding a lawyer isn't the primary challenge—finding a verified, active, and trustworthy advocate instantly is. The **Crisis Advocate Profile** bridges this "trust gap" by aggregating real-time external data alongside verified credentials. 

This platform serves as a command center for clients in need, providing instant proof of an advocate's recent activity, identifying contextual legal resources nearby, and offering a direct line of communication, all loaded progressively to ensure an uninterrupted experience.

---

## ✨ Key Features & Implementations

### 1. Premium Law Firm UI (Light Theme)
- **What**: Completely overhauled the experimental dark mode into a pristine, professional "Law Firm Light" theme. 
- **Why**: Professionalism in law starts with clarity. The light theme provides better readability and a more established, trustworthy aesthetic for legal consultation.
- **How**: Utilized custom CSS variables and hand-written CSS (no frameworks) to create a high-contrast, clean layout with premium soft shadows and precise spacing.

### 2. Rich News & External Data Integration
- **What**: Upgraded the News API integration to fetch high-resolution images, full descriptions, and source tags.
- **Why**: To provide users with a "Live" feel. Seeing recent, relevant news articles with visual thumbnails builds immediate confidence in the advocate's active engagement in their field.
- **How**: Refactored the backend service layer to map additional fields from the NewsAPI and created a dedicated responsive `news-grid` on the frontend.

### 3. Professional Consultation Flow
- **What**: Redesigned the consultation request form into a modern, grid-based layout with a dedicated success feedback state.
- **Why**: Reducing friction is key during a crisis. A clean, organized form makes it easier for users to provide details, and a clear success state (with reference IDs) provides psychological closure.
- **How**: Implemented a responsive form grid and a "Success State" component that generates a tracking reference ID and provides clear next-step instructions.

### 4. Interactive Geolocation & Resource Centers
- **What**: Integrated Leaflet Maps with real-time data from the Overpass API to show nearby legal resource centers.
- **Why**: Clients in a crisis often need immediate local resources. Showing nearby centers on a map relative to the advocate's office provides vital context.
- **How**: Used `react-leaflet` for the map interface and custom API services to fetch and cache nearby data, ensuring fast loads even with complex geographic queries.

### 5. Secure JWT Authentication & MVC Architecture
- **What**: Implemented a full user authentication system and refactored the backend into a clean MVC pattern.
- **Why**: Security and scalability. Using JWTs ensures user data remains private, and the MVC structure allows for easy maintenance as the platform grows.
- **How**: Created dedicated controllers for Auth and Profiles, and used `bcryptjs` for secure password storage.

### 6. Performance & Security Optimizations
- **Smart Caching**: Implemented `node-cache` with TTLs specific to data sensitivity (10m for news, 60m for map data) to reduce API overhead and latency.
- **Resilient Parallelism**: Uses `Promise.allSettled` for concurrent API fetching. This ensures that even if a third-party service like NewsAPI is down, the core advocate profile still loads perfectly.
- **Adaptive Rate Limiting**: Protects the consultation form from automated abuse with IP-based throttling and transparent "Retry-After" feedback.
- **Progressive Hydration**: Integrated Skeleton UI components to maintain a high-perceived performance during data fetching.

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
