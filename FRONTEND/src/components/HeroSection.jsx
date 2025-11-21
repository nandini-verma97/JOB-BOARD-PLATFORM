import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const backgroundImage = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section
      className="relative w-full h-[60vh] flex flex-col items-center justify-center px-4 pt-2 mt-0 text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div
        className="relative z-10 flex flex-col gap-6 max-w-4xl mx-auto animate-fadeInUp"
        style={{ animation: 'fadeInUp 1s ease forwards' }}
      >
        <span className="mx-auto px-6 py-2 rounded-full bg-gradient-to-r from-[#DCECFB] to-[#F1E6FF] text-[#1E1E1E] font-semibold shadow-md transform hover:scale-105 transition-transform duration-500">
          No. 1 Job Hunt Website
        </span>




        <h2
          className="text-5xl font-extrabold"
          style={{
            color: 'white',
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
            transition: 'color 0.5s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#FFD700')}
          onMouseLeave={e => (e.currentTarget.style.color = 'white')}
        >
          Step Into Your <span style={{ color: '#FFD700' }}>Dream Career</span>
        </h2>
        <p
          className="text-lg max-w-3xl mx-auto text-gray-200"
          style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.7)' }}
        >
          From first applications to your dream offer, navigate the job market with confidence and land the position you deserve.
        </p>
        <div className="flex w-full max-w-xl shadow-lg border border-gray-300 rounded-full overflow-hidden mx-auto transition-shadow duration-300 hover:shadow-xl focus-within:shadow-xl">
  <input
    type="text"
    placeholder="Find your dream jobs"
    onChange={(e) => setQuery(e.target.value)}
    className="flex-grow px-6 py-[14px] text-lg placeholder:text-gray-400 outline-none border-none focus:ring-0"
  />
  <Button
    onClick={searchJobHandler}
    className="bg-[#FFD700] h-full px-6 flex items-center justify-center rounded-r-full hover:bg-[#F5C400] focus:outline-none focus:ring-2 focus:ring-[#6A38C2]/40 transition-all duration-300 shadow-md hover:shadow-lg"
  >
    <Search className="h-5 w-5 text-gray-800" />
  </Button>
</div>

      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(35px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
