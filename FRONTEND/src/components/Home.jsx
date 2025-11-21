import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const backgroundStyle = {
  minHeight: '100vh',
  width: '100%',
  backgroundImage: 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  backgroundAttachment: 'fixed', // optional for parallax effect
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  minHeight: '100vh',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  zIndex: 0,
};

const contentStyle = {
  position: 'relative',
  zIndex: 1,
};

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div style={backgroundStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
