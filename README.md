# Lawl Crisis Advocate Profile

A high-performance, robust professional profile platform designed for immediate legal trust during crises. 

## 📖 Overview

In high-stakes situations, finding a lawyer isn't the primary challenge—finding a verified, active, and trustworthy advocate instantly is. The **Crisis Advocate Profile** bridges this "trust gap" by aggregating real-time external data alongside verified credentials. 

This platform serves as a command center for clients in need, providing instant proof of an advocate's recent activity, identifying contextual legal resources nearby, and offering a direct line of communication, all loaded progressively to ensure an uninterrupted experience.

---

## ✨ Key Features

### 1. Unified Professional Profile
- **Purpose**: Acts as the central hub for an advocate's verifiable information.
- **Details**: Built with React and a custom dark-themed CSS system for a serious, "trust-first" aesthetic. Avoids heavy styling frameworks to prioritize speed and complete design control.

### 2. Live Data Aggregation
- **Purpose**: Proves the advocate is actively practicing and provides contextual information.
- **Details**: Instead of static databases, the backend dynamically fetches:
  - **News API**: Displays the latest news related to the advocate's field to prove current engagement.
  - **OpenStreetMap (Overpass API)**: Locates nearby legal offices and resources based on the user's crisis location, ensuring privacy by avoiding proprietary ad-network mapping services.

### 3. Interactive Geolocation (Leaflet Integration)
- **Purpose**: Provides visual context for nearby legal centers.
- **Details**: Utilizes Leaflet, a lightweight open-source mapping library. This removes the need for costly proprietary API keys and guarantees that user location data remains private.

### 4. High-Performance API & Caching
- **Purpose**: Ensures the page loads instantly, even on slow connections.
- **Details**:
  - **Parallel Fetching**: Uses `Promise.all` to fetch multiple external APIs simultaneously, reducing total request time.
  - **Smart In-Memory Caching**: News data is cached for 10 minutes, and geographic data for 1 hour. This drastically lowers API costs and ensures lightning-fast load times for subsequent visitors.

### 5. Progressive Loading & Skeleton UI
- **Purpose**: Eliminates frustrating loading spinners and "waterfall" rendering.
- **Details**: Core profile data loads immediately, while heavier modules (like maps and news) display sleek skeleton loaders. The UI remains fully interactive even if external APIs take longer to resolve.

### 6. Resilient Failure Handling
- **Purpose**: Guarantees the platform never breaks due to third-party outages.
- **Details**: If an external API (like News or Maps) goes down or rate-limits the server, the system gracefully degrades. It displays a clean "Data Temporarily Unavailable" message for that specific section while keeping the rest of the profile fully operational.

### 7. Secure Consult Request System
- **Purpose**: Provides a direct, reliable communication line.
- **Details**: A highly validated submission form limits input to concise descriptions, preventing spam. Each successful submission generates a unique `REF-XXXXXX` tracking ID, providing psychological assurance to the user that their request has been logged.

### 8. Built-in Security & Rate Limiting
- **Purpose**: Protects the platform from automated spam and abuse.
- **Details**: Enforces strict IP-based rate limiting (e.g., 3 consult requests per hour) directly at the Express middleware layer.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Custom Vanilla CSS, React-Leaflet
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **External Integrations**: NewsAPI, OpenStreetMap (Overpass API)
- **Architecture**: RESTful API, In-Memory Caching

---

## 🚀 System Architecture & Design Philosophy

1. **Aggregation over Redundancy**: Avoids storing duplicate data by fetching truth directly from reliable external sources.
2. **The "One Shot" Frontend**: The backend aggregates all necessary profile data into a single, unified JSON response at the `/api/profile` endpoint, simplifying frontend logic and reducing network requests.
3. **Graceful Degradation**: Built under the assumption that external dependencies *will* fail. Partial failures are treated as UI states, not system crashes.

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

2. **Setup the Server:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NEWS_API_KEY=your_news_api_key
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
   Open `http://localhost:5173` in your browser.

---

## 🔮 Future Roadmap

- **Persistent Caching**: Migrate from in-memory caching to **Redis** for distributed deployments.
- **Real-Time Alerts**: Implement **Socket.io** to notify advocates instantly of high-priority requests.
- **Document Management**: Allow secure, encrypted uploads of critical legal documents alongside consultation requests.

---

*Designed and developed as a robust, crisis-ready solution for the modern legal environment.*
