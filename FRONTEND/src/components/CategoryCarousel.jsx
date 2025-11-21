import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Graphic Designer",
  "Full Stack JAVA Developer",
  "Python Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div 
      className="relative py-16 text-center"
      style={{ minHeight: '40vh' }}
    >
      {/* Overlay for readability and blur */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <h2 
          className="text-3xl md:text-4xl font-extrabold mb-10 text-white animate-fadeInUp drop-shadow-lg"
          style={{
            textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
            letterSpacing: '0.5px',
            transition: 'color 0.5s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#FFD700')}
          onMouseLeave={e => (e.currentTarget.style.color = 'white')}
        >
          Explore <span style={{ color: '#FFD700' }}>Top Categories</span>
        </h2>

        <Carousel className="w-full overflow-visible relative">
          <CarouselContent className="flex items-center justify-start gap-6 pl-2">
            {categories.map((cat, i) => (
              <CarouselItem 
                key={i} 
                className="flex justify-center min-w-[200px] md:min-w-[240px] lg:min-w-[260px] px-2 opacity-0 animate-slideIn"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationFillMode: 'forwards',
                }}
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="
                    rounded-full
                    px-6 py-3 
                    text-base font-semibold
                    border-2 border-[#FFD700]
                    bg-black/60
                    text-white
                    shadow-lg
                    hover:scale-110 
                    hover:bg-gradient-to-r
                    hover:from-[#FFD700]
                    hover:to-[#6A38C2]
                    hover:text-white
                    transition-all duration-500
                  "
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute top-1/2 left-[-10px] -translate-y-1/2 z-20 bg-[#FFD700]/90 text-gray-800 hover:bg-[#F5C400] transition duration-300 shadow-lg rounded-full w-10 h-10 flex items-center justify-center" />
          <CarouselNext className="absolute top-1/2 right-[-10px] -translate-y-1/2 z-20 bg-[#FFD700]/90 text-gray-800 hover:bg-[#F5C400] transition duration-300 shadow-lg rounded-full w-10 h-10 flex items-center justify-center" />
        </Carousel>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeInUp {
             0% {
               opacity: 0;
               transform: translateY(30px);
             }
             100% {
               opacity: 1;
               transform: translateY(0);
             }
          }

          @keyframes slideIn {
             0% {
               opacity: 0;
               transform: translateY(40px) scale(0.9);
             }
             100% {
               opacity: 1;
               transform: translateY(0) scale(1);
             }
          }

          .animate-fadeInUp {
            animation: fadeInUp 1.2s ease forwards;
          }

          .animate-slideIn {
            animation: slideIn 0.9s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default CategoryCarousel;
