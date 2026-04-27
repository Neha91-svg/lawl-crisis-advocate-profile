# Crisis Advocate Profile

A MERN stack application with a React (Vite) frontend and a Node.js/Express backend, configured for easy deployment on Vercel.

## Project Structure

- `client/`: Frontend React application powered by Vite.
- `server/`: Backend Node.js/Express API.
- `vercel.json`: Configuration for unified deployment on Vercel.

## Features

- **React + Vite**: Fast and modern frontend setup.
- **Express API**: Robust backend with a test route.
- **Vercel Ready**: Pre-configured for monorepo deployment.
- **CORS Configured**: Ready for frontend-backend communication.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Neha91-svg/lawl-crisis-advocate-profile.git
   cd lawl-crisis-advocate-profile
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

### Running Locally

1. **Start the Backend:**
   ```bash
   cd server
   npm start
   ```
   The backend will run on `http://localhost:5000`.

2. **Start the Frontend:**
   ```bash
   cd client
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

### Deployment

This project is configured for Vercel. To deploy:

1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the `vercel.json` and deploy both the frontend and backend.

## API Routes

- `GET /api/test`: Returns a JSON message confirming the backend is reachable.
- `GET /api/profile`: Returns detailed professional profile information for the crisis advocate.

## Why the `/api/profile` route?

The `/api/profile` route is a core component of this application for several reasons:

1.  **Centralized Data Management**: By serving profile details from a dedicated API endpoint, we ensure that the frontend always displays the most up-to-date information without requiring manual updates to the UI code.
2.  **Scalability**: As the application grows, this route can be easily modified to fetch data from a database (like MongoDB) rather than being hardcoded, allowing for dynamic profile updates.
3.  **Separation of Concerns**: Keeping profile logic in the backend allows the frontend to focus purely on presentation, following the standard MERN architecture.
4.  **Integration Ready**: This JSON structure makes it easy for other services or mobile applications to consume the advocate's professional data in a standardized format.

## License

MIT
