import React, { useState, useEffect, useRef, useCallback } from 'react';

const CapvalisEd = () => {
  const [stars, setStars] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [activeDataPoint, setActiveDataPoint] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const chartRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Generate stars for the background
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      const starCount = 150;
      
      for (let i = 0; i < starCount; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.7 + 0.3,
          blinkDelay: Math.random() * 20,
          blinkDuration: Math.random() * 4 + 2,
        });
      }
      
      setStars(starArray);
    };
    
    generateStars();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add this data for the chart
  const chartData = [
    { date: 'Jan', value: 35, growth: '+5.2%' },
    { date: 'Feb', value: 32, growth: '-2.8%' },
    { date: 'Mar', value: 34, growth: '+1.9%' },
    { date: 'Apr', value: 30, growth: '-3.1%' },
    { date: 'May', value: 32, growth: '+2.3%' },
    { date: 'Jun', value: 25, growth: '-7.8%' },
    { date: 'Jul', value: 28, growth: '+3.5%' },
    { date: 'Aug', value: 20, growth: '-8.2%' },
    { date: 'Sep', value: 22, growth: '+1.7%' },
    { date: 'Oct', value: 15, growth: '-7.1%' },
    { date: 'Nov', value: 18, growth: '+3.2%' },
    { date: 'Dec', value: 12, growth: '-5.4%' },
    { date: 'Jan', value: 14, growth: '+2.1%' },
    { date: 'Feb', value: 8, growth: '-6.8%' },
    { date: 'Mar', value: 10, growth: '+2.3%' },
    { date: 'Apr', value: 5, growth: '-4.6%' },
    { date: 'May', value: 7, growth: '+2.0%' },
    { date: 'Jun', value: 2, growth: '-5.2%' },
    { date: 'Jul', value: 5, growth: '+3.0%' },
    { date: 'Aug', value: 0, growth: '-5.0%' },
    { date: 'Sep', value: 3, growth: '+3.0%' }
  ];

  // Add these event handler functions
  const handleMouseMove = useCallback((e) => {
    if (!chartRef.current) return;
    
    const rect = chartRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setHoverPosition({ x, y });
    
    // Find closest data point
    const index = Math.min(
      Math.max(0, Math.floor((x / 100) * (chartData.length - 1))),
      chartData.length - 1
    );
    setActiveDataPoint(chartData[index]);
    
  }, [chartData]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsDragging(false);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="bg-black relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#070c1d] to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#040918] to-black opacity-80"></div>
      
      {/* Animated radial gradient */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(120, 120, 255, 0.1) 0%, rgba(10, 10, 60, 0.05) 40%, rgba(0, 0, 0, 0) 70%)`,
          }}
        ></div>
      </div>
      
      {/* Nebula effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-900 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-blue-900 rounded-full blur-[100px]"></div>
        <div className="absolute top-2/3 right-1/4 w-64 h-64 bg-purple-900 rounded-full blur-[100px]"></div>
      </div>
      
      {/* Randomly blinking stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map(star => (
          <div 
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity * 0.7,
              animation: `blink ${star.blinkDuration}s infinite ${star.blinkDelay}s`,
              boxShadow: star.size > 1.8 ? `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.7)` : 'none',
              zIndex: 0,
            }}
          ></div>
        ))}
      </div>
      
      {/* Content - Optimized for both mobile and desktop */}
      <div className="w-full max-w-7xl px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="glass-card rounded-3xl overflow-hidden border border-gray-800/30 shadow-[0_0_50px_rgba(94,104,255,0.1)] backdrop-blur-lg">
            <div className={`p-4 sm:p-6 md:p-8 ${isMobile ? 'max-h-[85vh] overflow-y-auto thin-scrollbar' : ''} relative`}>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 mix-blend-overlay pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 mix-blend-overlay pointer-events-none"></div>
              
              {/* Subtle glow effect on top */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
              
              <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'lg:grid-cols-2 gap-8'} items-center`}>
                {/* Left side - Header - now optimized for mobile */}
                <div>
                  <h2 className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold text-white mb-2 sm:mb-3 tracking-tight`}>
                    <span className="relative">
                      Start Earning as a Beginner
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></span>
                    </span>
                  </h2>
                  <p className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-base md:text-lg'} mb-4 sm:mb-6 max-w-3xl`}>
                    A power-packed trading program designed to take you from a complete beginner to an advanced
                    trader—master strategies, minimize risks, and maximize profits with expert guidance!
                  </p>
                  
                  {/* Mobile optimized features with smaller spacing */}
                  <div className={`space-y-${isMobile ? '2' : '3 md:space-y-4'} mb-4 sm:mb-8`}>
                    {/* Feature Items - More compact for mobile */}
                    <div className="feature-item">
                      <div className={`feature-icon ${isMobile ? 'small-icon' : ''}`}>
                        <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-indigo-400`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 7L13 15L9 11L3 17M21 7H15M21 7V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className={`text-white ${isMobile ? 'text-sm' : 'text-base md:text-lg'} feature-text`}>Potential for upto 127% growth with advanced insights.</p>
                    </div>
                    
                    <div className="feature-item">
                      <div className={`feature-icon ${isMobile ? 'small-icon' : ''}`}>
                        <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-indigo-400`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 5C12 4.44772 12.4477 4 13 4C13.5523 4 14 4.44772 14 5C14 5.55228 13.5523 6 13 6C12.4477 6 12 5.55228 12 5Z" fill="currentColor"/>
                          <path d="M12 19C12 18.4477 12.4477 18 13 18C13.5523 18 14 18.4477 14 19C14 19.5523 13.5523 20 13 20C12.4477 20 12 19.5523 12 19Z" fill="currentColor"/>
                          <path d="M5 12C4.44772 12 4 12.4477 4 13C4 13.5523 4.44772 14 5 14C5.55228 14 6 13.5523 6 13C6 12.4477 5.55228 12 5 12Z" fill="currentColor"/>
                          <path d="M19 12C18.4477 12 18 12.4477 18 13C18 13.5523 18.4477 14 19 14C19.5523 14 20 13.5523 20 13C20 12.4477 19.5523 12 19 12Z" fill="currentColor"/>
                          <path d="M7.05025 7.05025C6.65973 7.44077 6.65973 8.07394 7.05025 8.46446C7.44077 8.85499 8.07394 8.85499 8.46446 8.46446C8.85499 8.07394 8.85499 7.44077 8.46446 7.05025C8.07394 6.65973 7.44077 6.65973 7.05025 7.05025Z" fill="currentColor"/>
                          <path d="M15.5355 15.5355C15.1449 15.926 15.1449 16.5592 15.5355 16.9497C15.926 17.3403 16.5592 17.3403 16.9497 16.9497C17.3403 16.5592 17.3403 15.926 16.9497 15.5355C16.5592 15.1449 15.926 15.1449 15.5355 15.5355Z" fill="currentColor"/>
                          <path d="M7.05025 16.9497C6.65973 16.5592 6.65973 15.926 7.05025 15.5355C7.44077 15.1449 8.07394 15.1449 8.46446 15.5355C8.85499 15.926 8.85499 16.5592 8.46446 16.9497C8.07394 17.3403 7.44077 17.3403 7.05025 16.9497Z" fill="currentColor"/>
                          <path d="M15.5355 8.46446C15.1449 8.07394 15.1449 7.44077 15.5355 7.05025C15.926 6.65973 16.5592 6.65973 16.9497 7.05025C17.3403 7.44077 17.3403 8.07394 16.9497 8.46446C16.5592 8.85499 15.926 8.85499 15.5355 8.46446Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <p className={`text-white ${isMobile ? 'text-sm' : 'text-base md:text-lg'} feature-text`}>Personalized guidance to help master profitable trading techniques.</p>
                    </div>
                    
                    <div className="feature-item">
                      <div className={`feature-icon ${isMobile ? 'small-icon' : ''}`}>
                        <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-indigo-400`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <p className={`text-white ${isMobile ? 'text-sm' : 'text-base md:text-lg'} feature-text`}>Provides real time market data & sentiment indicators.</p>
                    </div>
                  </div>
                  
                  {/* Mobile optimized extra features */}
                  {isMobile && (
                    <div className="mb-4 space-y-2">
                      <div className="feature-item">
                        <div className="feature-icon small-icon">
                          <div className="text-indigo-400 font-bold text-lg">31</div>
                        </div>
                        <p className="text-white text-sm feature-text">Economic Calendar to stay updated on market events.</p>
                      </div>
                      
                      <div className="feature-item">
                        <div className="feature-icon small-icon">
                          <svg className="w-4 h-4 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 8L5 12L9 16M15 8L19 12L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-white text-sm feature-text">Guaranteed refund if we can't make you profitable*.</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Mobile optimized chart */}
                  {isMobile && (
                    <div className="mb-4 mt-2 relative">
                      <div 
                        ref={chartRef}
                        className="rounded-xl h-24 bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur overflow-hidden relative cursor-pointer"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onTouchStart={(e) => {
                          handleMouseEnter();
                          handleMouseMove(e.touches[0]);
                          handleMouseDown();
                        }}
                        onTouchMove={(e) => handleMouseMove(e.touches[0])}
                        onTouchEnd={handleMouseUp}
                      >
                        {/* Chart content remains the same, just smaller dimensions */}
                        <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                          <path
                            d="M0,35 L5,32 L10,34 L15,30 L20,32 L25,25 L30,28 L35,20 L40,22 L45,15 L50,18 L55,12 L60,14 L65,8 L70,10 L75,5 L80,7 L85,2 L90,5 L95,0 L100,3"
                            fill="none"
                            stroke="rgb(99, 102, 241)"
                            strokeWidth="1.5"
                            className="drop-shadow-glow"
                          />
                          <path
                            d="M0,35 L5,32 L10,34 L15,30 L20,32 L25,25 L30,28 L35,20 L40,22 L45,15 L50,18 L55,12 L60,14 L65,8 L70,10 L75,5 L80,7 L85,2 L90,5 L95,0 L100,3 V40 H0 Z"
                            fill="url(#gradient)"
                            opacity="0.2"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.7" />
                              <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          
                          {isHovering && (
                            <line 
                              x1={hoverPosition.x} 
                              y1="0" 
                              x2={hoverPosition.x} 
                              y2="40" 
                              stroke="rgba(255,255,255,0.3)" 
                              strokeWidth="0.5" 
                              strokeDasharray="2,1" 
                            />
                          )}
                        </svg>
                        
                        {/* Data points */}
                        <div className={`absolute left-[65%] bottom-[45%] w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovering && activeDataPoint && activeDataPoint.date === 'Mar' ? 'bg-white scale-150 shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-indigo-500 shadow-glow'}`}></div>
                        <div className={`absolute left-[35%] bottom-[55%] w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovering && activeDataPoint && activeDataPoint.date === 'Jul' ? 'bg-white scale-150 shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-indigo-500 shadow-glow'}`}></div>
                        <div className={`absolute left-[85%] bottom-[35%] w-1.5 h-1.5 rounded-full transition-all duration-300 ${isHovering && activeDataPoint && activeDataPoint.date === 'Dec' ? 'bg-white scale-150 shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-indigo-500 shadow-glow'}`}></div>
                        
                        {/* Mobile optimized timeframe selector */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-0.5">
                          <div className="flex space-x-0.5 bg-gray-900/50 rounded-full px-0.5 py-0.5 text-[6px]">
                            {['1D', '1W', '1M', '3M', 'YTD'].map((timeframe, i) => (
                              <button key={i} className={`px-1.5 py-0.5 rounded-full ${i === 2 ? 'bg-indigo-600 text-white' : 'text-gray-400'}`}>
                                {timeframe}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="w-full md:w-auto">
                    <button className={`cta-button text-center text-white ${isMobile ? 'text-sm py-2.5' : 'text-base md:text-lg py-3'} font-medium px-8 rounded-xl w-full md:w-auto`}>
                      <span className="button-text">Enroll Now</span>
                    </button>
                    <p className="text-xs text-gray-500 mt-2">*Terms and conditions apply.</p>
                  </div>
                </div>
                
                {/* Right side - Desktop only view */}
                {!isMobile && (
                  <div className="hidden lg:block h-full">
                    <div className="h-full flex flex-col justify-center space-y-6 pl-8 border-l border-indigo-800/20">
                      <div className="feature-item">
                        <div className="feature-icon">
                          <div className="text-indigo-400 font-bold text-xl">31</div>
                        </div>
                        <p className="text-white text-base md:text-lg feature-text">Economic Calendar to stay updated on market events.</p>
                      </div>
                      
                      <div className="feature-item">
                        <div className="feature-icon">
                          <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 8L5 12L9 16M15 8L19 12L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="text-white text-base md:text-lg feature-text">Guaranteed refund if we can't make you profitable*.</p>
                      </div>
                      
                      {/* Desktop chart */}
                      <div className="mt-4 relative">
                        <div 
                          ref={chartRef}
                          className="rounded-xl h-32 bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur overflow-hidden relative cursor-pointer"
                          onMouseMove={handleMouseMove}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          onMouseDown={handleMouseDown}
                          onMouseUp={handleMouseUp}
                          onTouchStart={(e) => {
                            handleMouseEnter();
                            handleMouseMove(e.touches[0]);
                            handleMouseDown();
                          }}
                          onTouchMove={(e) => handleMouseMove(e.touches[0])}
                          onTouchEnd={handleMouseUp}
                        >
                          {/* Chart background grid */}
                          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                            {[...Array(20)].map((_, i) => (
                              <div key={i} className="border-t border-l border-indigo-900/20"></div>
                            ))}
                          </div>
                          
                          {/* Simulated chart line */}
                          <div className="absolute left-0 right-0 bottom-0 h-20">
                            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full">
                              <path
                                d="M0,35 L5,32 L10,34 L15,30 L20,32 L25,25 L30,28 L35,20 L40,22 L45,15 L50,18 L55,12 L60,14 L65,8 L70,10 L75,5 L80,7 L85,2 L90,5 L95,0 L100,3"
                                fill="none"
                                stroke="rgb(99, 102, 241)"
                                strokeWidth="1.5"
                                className="drop-shadow-glow"
                              />
                              <path
                                d="M0,35 L5,32 L10,34 L15,30 L20,32 L25,25 L30,28 L35,20 L40,22 L45,15 L50,18 L55,12 L60,14 L65,8 L70,10 L75,5 L80,7 L85,2 L90,5 L95,0 L100,3 V40 H0 Z"
                                fill="url(#gradient)"
                                opacity="0.2"
                              />
                              <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.7" />
                                  <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0" />
                                </linearGradient>
                                <filter id="glow">
                                  <feGaussianBlur stdDeviation="2" result="blur" />
                                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                              </defs>
                              
                              {/* Interactive hover line */}
                              {isHovering && (
                                <line 
                                  x1={hoverPosition.x} 
                                  y1="0" 
                                  x2={hoverPosition.x} 
                                  y2="40" 
                                  stroke="rgba(255,255,255,0.3)" 
                                  strokeWidth="0.5" 
                                  strokeDasharray="2,1" 
                                />
                              )}
                            </svg>
                          </div>
                          
                          {/* Data points */}
                          <div className={`absolute left-[65%] bottom-[45%] w-2 h-2 rounded-full transition-all duration-300 ${isHovering && activeDataPoint && activeDataPoint.date === 'Mar' ? 'bg-white scale-150 shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-indigo-500 shadow-glow'}`}></div>
                          <div className={`absolute left-[35%] bottom-[55%] w-2 h-2 rounded-full transition-all duration-300 ${isHovering && activeDataPoint && activeDataPoint.date === 'Jul' ? 'bg-white scale-150 shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-indigo-500 shadow-glow'}`}></div>
                          <div className={`absolute left-[85%] bottom-[35%] w-2 h-2 rounded-full transition-all duration-300 ${isHovering && activeDataPoint && activeDataPoint.date === 'Dec' ? 'bg-white scale-150 shadow-[0_0_12px_rgba(255,255,255,0.8)]' : 'bg-indigo-500 shadow-glow'}`}></div>
                          
                          {/* Cursor effects */}
                          {isHovering && (
                            <div 
                              className="absolute w-4 h-4 rounded-full border-2 border-white opacity-70 pointer-events-none z-10 translate-x-[-50%] translate-y-[-50%]"
                              style={{ 
                                left: `${hoverPosition.x}%`, 
                                top: `${hoverPosition.y}%`, 
                                transform: 'translate(-50%, -50%)',
                                transition: isDragging ? 'none' : 'transform 0.1s ease-out, width 0.2s, height 0.2s'
                              }}
                            ></div>
                          )}
                          
                          {/* Tooltip */}
                          {isHovering && activeDataPoint && (
                            <div 
                              className="absolute bg-gray-900/90 backdrop-blur-md text-white text-xs rounded px-2 py-1 pointer-events-none z-20 border border-indigo-500/30"
                              style={{ 
                                left: `${Math.min(Math.max(hoverPosition.x, 10), 90)}%`, 
                                bottom: `${100 - hoverPosition.y + 5}%`,
                                transform: 'translateX(-50%)'
                              }}
                            >
                              <div className="font-medium">{activeDataPoint.date}</div>
                              <div className="flex justify-between gap-2">
                                <span>Value:</span>
                                <span className="text-cyan-400">{(40 - activeDataPoint.value) * 2.5}k</span>
                              </div>
                              <div className={`flex justify-between gap-2 ${activeDataPoint.growth.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                <span>Growth:</span>
                                <span>{activeDataPoint.growth}</span>
                              </div>
                            </div>
                          )}
                          
                          {/* Timeframe selector */}
                          <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-1">
                            <div className="flex space-x-1 bg-gray-900/50 rounded-full px-1 py-0.5 text-[8px] backdrop-blur-sm">
                              {['1D', '1W', '1M', '3M', 'YTD'].map((timeframe, i) => (
                                <button key={i} className={`px-2 py-0.5 rounded-full ${i === 2 ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white transition-colors'}`}>
                                  {timeframe}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for advanced UI effects */}
      <style jsx>{`
        /* Star animation */
        @keyframes blink {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.8; }
        }
        
        /* Glass card effect */
        .glass-card {
          background: rgba(17, 24, 39, 0.4);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        /* Feature item styling */
        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.3s ease;
          padding: 0.5rem 0.75rem;
          border-radius: 0.75rem;
          position: relative;
          overflow: hidden;
        }
        
        .feature-item:hover {
          background: rgba(79, 70, 229, 0.1);
          transform: translateX(3px);
        }
        
        .feature-icon {
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(79, 70, 229, 0.15);
          border-radius: 0.5rem;
          box-shadow: 0 0 15px rgba(79, 70, 229, 0.2);
          position: relative;
          z-index: 1;
          flex-shrink: 0;
          border: 1px solid rgba(79, 70, 229, 0.2);
        }
        
        .feature-text {
          position: relative;
          z-index: 1;
        }
        
        /* CTA Button */
        .cta-button {
          background: linear-gradient(90deg, #4f46e5 0%, #6366f1 100%);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
        }
        
        .cta-button:hover {
          background: linear-gradient(90deg, #4338ca 0%, #4f46e5 100%);
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(79, 70, 229, 0.4);
        }
        
        .cta-button:active {
          transform: translateY(1px);
        }
        
        .cta-button:before {
          content: '';
          position: absolute;
          top: 0;
          left: -50%;
          width: 150%;
          height: 100%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateX(-120%) skewX(-20deg);
          transition: transform 0.7s;
        }
        
        .cta-button:hover:before {
          transform: translateX(100%) skewX(-20deg);
        }
        
        .button-text {
          position: relative;
          z-index: 1;
        }
        
        .shadow-glow {
          box-shadow: 0 0 8px rgba(99, 102, 241, 0.6);
        }
        
        .drop-shadow-glow {
          filter: drop-shadow(0 0 4px rgba(99, 102, 241, 0.6));
        }
        
        /* Add these mobile-specific styles */
        .small-icon {
          width: 2rem;
          height: 2rem;
        }
        
        /* Custom scrollbar for mobile */
        .thin-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        
        .thin-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        
        .thin-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 3px;
        }
        
        /* Adjust touch targets for mobile */
        @media (max-width: 767px) {
          .feature-item {
            padding: 0.4rem 0.5rem;
          }
          
          .feature-icon.small-icon {
            border-radius: 0.4rem;
          }
          
          /* Add this meta tag to your HTML head */
          @-moz-document url-prefix() {
            .thin-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgba(99, 102, 241, 0.3) rgba(0, 0, 0, 0.1);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default CapvalisEd;
