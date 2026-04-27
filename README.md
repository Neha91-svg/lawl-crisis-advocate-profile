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

## License

MIT
