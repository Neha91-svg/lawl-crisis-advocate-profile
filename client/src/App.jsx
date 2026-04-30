import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage';
import AdvocatesList from './pages/AdvocatesList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyConsultations from './pages/MyConsultations';
import ResourceHub from './pages/ResourceHub';

function App() {
  return (
    <>
      <Navbar />
      <div style={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/advocates" element={<AdvocatesList />} />
          <Route path="/advocates/:id" element={<ProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-consultations" element={<MyConsultations />} />
          <Route path="/resources" element={<ResourceHub />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
