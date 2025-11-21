import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-transparent text-gray-300 py-10 px-6 md:px-16 transition-all duration-500">
      {/* Optional overlay to improve contrast against background */}
      <div className="absolute inset-0 bg-black/70 -z-10"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-white mb-4">About Us</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            We craft digital experiences that inspire and engage. Our team is dedicated to building meaningful and impactful web solutions.
          </p>
        </div>

        <div className="hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Home</li>
            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Services</li>
            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Portfolio</li>
            <li className="hover:text-white transition-colors duration-200 cursor-pointer">Contact</li>
          </ul>
        </div>

        <div className="hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200">Twitter</a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-200">Instagram</a>
            <a href="#" className="hover:text-blue-600 transition-colors duration-200">LinkedIn</a>
          </div>
        </div>

        <div className="hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-semibold text-white mb-4">Subscribe</h3>
          <p className="text-sm text-gray-400 mb-4">
            Stay updated with our latest news and offers.
          </p>
          <form className="flex items-center space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-3 py-2 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors duration-300"
            >
              Go
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500 animate-pulse relative z-10">
        © {new Date().getFullYear()} All rights reserved. Crafted with ❤️ using React & TailwindCSS.
      </div>
    </footer>
  );
};

export default Footer;
