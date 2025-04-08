import React, { useState, useEffect } from 'react';
import logo from '../assets/caplogo.png';

const Header = ({ onNavigate, currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // Change header style when scrolled past 20px
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (page, e) => {
    e.preventDefault();
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-5 left-0 w-full z-50 px-4 sm:px-6 lg:px-8 flex justify-center items-center pointer-events-none">
      {/* Background glow effect - reduced white glow when not scrolled */}
      <div className={`absolute -z-10 w-full max-w-7xl h-12 transition-all duration-500 blur-2xl rounded-full ${
        scrolled ? 'bg-indigo-600/20' : 'bg-white/10'
      }`}></div>
      
      <div className={`rounded-full backdrop-blur-lg transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 shadow-xl shadow-indigo-500/20' 
          : 'bg-black/60 shadow-lg shadow-white/5'
      } flex items-center justify-between px-6 py-3 w-[95%] max-w-7xl mx-auto pointer-events-auto border ${
        scrolled ? 'border-slate-800/30' : 'border-white/5'
      }`}>
        {/* Logo on the left */}
        <div className="flex-shrink-0 flex items-center">
          <a href="/" onClick={(e) => handleNavClick('home', e)}>
            <img src={logo} alt="Capvalis Logo" className="h-6" />
          </a>
        </div>
        
        {/* Centered Navigation */}
        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-10 lg:space-x-16">
            <a 
              href="/" 
              onClick={(e) => handleNavClick('home', e)} 
              className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-indigo-400' : 'text-white hover:text-indigo-400'}`}
            >
              Home
            </a>
            <a 
              href="/about" 
              onClick={(e) => handleNavClick('about', e)} 
              className={`text-sm font-medium transition-colors ${currentPage === 'about' ? 'text-indigo-400' : 'text-white hover:text-indigo-400'}`}
            >
              About
            </a>
            <a 
              href="/courses" 
              onClick={(e) => handleNavClick('courses', e)} 
              className={`text-sm font-medium transition-colors ${currentPage === 'courses' ? 'text-indigo-400' : 'text-white hover:text-indigo-400'}`}
            >
              Courses
            </a>
            <a 
              href="/career" 
              onClick={(e) => handleNavClick('career', e)} 
              className={`text-sm font-medium transition-colors ${currentPage === 'career' ? 'text-indigo-400' : 'text-white hover:text-indigo-400'}`}
            >
              Career
            </a>
            <a 
              href="/newsletter" 
              onClick={(e) => handleNavClick('newsletter', e)} 
              className={`text-sm font-medium transition-colors ${currentPage === 'newsletter' ? 'text-indigo-400' : 'text-white hover:text-indigo-400'}`}
            >
              Newsletter
            </a>
          </div>
        </nav>
        
        {/* Login Button on the right */}
        <div>
          <button 
            onClick={() => onNavigate('login')}
            className={`bg-gradient-to-r ${
              scrolled 
                ? 'from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-indigo-500/20 hover:shadow-indigo-500/40 border-indigo-500/50' 
                : 'from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 shadow-white/20 hover:shadow-white/30 border-white/30'
            } text-white py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:scale-105`}>
            Login
          </button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden ml-4 text-gray-400 hover:text-white focus:outline-none"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 mx-4 rounded-2xl bg-black/90 backdrop-blur-lg shadow-xl shadow-indigo-500/10 pointer-events-auto border border-slate-800/30">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <a 
              href="/" 
              onClick={(e) => handleNavClick('home', e)} 
              className={`block px-3 py-2 text-base font-medium ${currentPage === 'home' ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}`}
            >
              Home
            </a>
            <a 
              href="/about" 
              onClick={(e) => handleNavClick('about', e)}
              className={`block px-3 py-2 text-base font-medium ${currentPage === 'about' ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}`}
            >
              About
            </a>
            <a 
              href="/courses"
              onClick={(e) => handleNavClick('courses', e)}
              className={`block px-3 py-2 text-base font-medium ${currentPage === 'courses' ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}`}
            >
              Courses
            </a>
            <a 
              href="/career"
              onClick={(e) => handleNavClick('career', e)}
              className={`block px-3 py-2 text-base font-medium ${currentPage === 'career' ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}`}
            >
              Career
            </a>
            <a 
              href="/newsletter"
              onClick={(e) => handleNavClick('newsletter', e)}
              className={`block px-3 py-2 text-base font-medium ${currentPage === 'newsletter' ? 'text-indigo-400' : 'text-gray-300 hover:text-white'}`}
            >
              Newsletter
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;