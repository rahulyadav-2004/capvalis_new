import React, { useState, useEffect } from 'react';
import freeTrial from '../assets/freeTrial.png';

const Hero = () => {
  const [hoverButton, setHoverButton] = useState(false);
  const [stars, setStars] = useState([]);
  
  // Generate stars for the background
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      const starCount = 200; // Number of stars
      
      for (let i = 0; i < starCount; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100, // % position
          y: Math.random() * 100, // % position
          size: Math.random() * 2 + 1, // Size between 1-3px
          opacity: Math.random() * 0.7 + 0.3, // Opacity between 0.3-1
          blinkDelay: Math.random() * 20, // Random delay for blinking
          blinkDuration: Math.random() * 4 + 2, // Random duration between 2-6s
        });
      }
      
      setStars(starArray);
    };
    
    generateStars();
  }, []);
  
  return (
    <div className="bg-black text-white min-h-screen flex items-center relative overflow-hidden">
      {/* Gradient background with blue center similar to image */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#050a20] to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#070d25] to-black"></div>
      
      {/* Radial gradient for blue center glow - positioned toward bottom */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-radial-gradient opacity-30"></div>
      </div>
      
      {/* Randomly blinking stars - behind orbital rings */}
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
              boxShadow: star.size > 1.8 ? `0 0 ${star.size}px rgba(255, 255, 255, 0.5)` : 'none',
              zIndex: 0,
            }}
          ></div>
        ))}
      </div>
      
      {/* 2D Animated Rings - Positioned even lower */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        {/* Ring system centered much lower in the viewport */}
        <div className="absolute inset-x-0 bottom-0 h-[80vh]" style={{ transform: 'translateY(40%)' }}>
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Purely 2D concentric rings */}
            {[...Array(8)].map((_, i) => {
              const size = 50 + (i * 45);
              const duration = 100 + (i * 20);
              const direction = i % 2 === 0 ? 'clockwise' : 'counter-clockwise';
              const opacity = 0.15 - (i * 0.015);
              const delay = i * -5;
              const borderWidth = i === 0 ? 2 : 1;
              
              return (
                <div 
                  key={i}
                  className={`absolute rounded-full ring-element ${direction === 'clockwise' ? 'animate-spin-slow' : 'animate-spin-reverse'}`}
                  style={{
                    width: `${size}vh`, 
                    height: `${size}vh`,
                    borderWidth: `${borderWidth}px`,
                    borderStyle: 'solid',
                    borderColor: `rgba(99, 102, 241, ${opacity})`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                    boxShadow: i < 3 ? `0 0 10px rgba(99, 102, 241, ${opacity})` : 'none',
                  }}
                />
              );
            })}
            
            {/* Inner pulsing ring */}
            <div 
              className="absolute rounded-full animate-pulse-ring" 
              style={{
                width: '30vh',
                height: '30vh',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'rgba(129, 140, 248, 0.3)',
                boxShadow: '0 0 15px rgba(129, 140, 248, 0.15)',
              }}
            />
            
            {/* Glowing particle dots along rings */}
            {[...Array(16)].map((_, i) => {
              const ring = Math.floor(i / 4); // Distribute particles across 4 rings
              const distance = 75 + (ring * 60); // Place particles on different rings
              const angle = ((i % 4) / 4) * 360; // Space particles evenly around each ring
              const size = 2 + (Math.random() * 2);
              const duration = 4 + (Math.random() * 3);
              const delay = i * 0.3;
              
              return (
                <div 
                  key={`particle-${i}`}
                  className="absolute rounded-full bg-indigo-300 animate-particle"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: `rotate(${angle}deg) translateX(${distance}px)`,
                    boxShadow: `0 0 ${size * 2}px rgba(129, 140, 248, 0.6)`,
                    animationDuration: `${duration}s`,
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            })}
            
            {/* Ring segments/arcs for the second ring */}
            {[...Array(4)].map((_, i) => {
              const angle = (i * 90);
              const arcLength = 60; // 60 degree arc
              
              return (
                <div 
                  key={`arc-${i}`}
                  className="absolute animate-spin-medium"
                  style={{
                    width: '120vh',
                    height: '120vh',
                    borderRadius: '50%',
                    borderWidth: '0',
                    borderStyle: 'solid',
                    borderColor: 'transparent',
                    borderTopWidth: '1.5px',
                    borderTopColor: 'rgba(99, 102, 241, 0.3)',
                    transform: `rotate(${angle + 20}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0, ${50 + arcLength/2}% 0, 50% 50%)`,
                    boxShadow: '0 0 8px rgba(99, 102, 241, 0.2)',
                    animationDuration: '80s',
                    animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-20 pb-10 relative z-10 w-full h-screen flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center h-full">
          {/* Center aligned text content - Larger sizes */}
          <div className="w-full max-w-6xl text-center">
            <h5 className="text-indigo-400 font-medium mb-4 tracking-wider uppercase text-lg md:text-xl">Exclusive Investment Access</h5>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 md:mb-10">
              <span className="text-white">A Smarter Investment</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-600">
                For The Future.
              </span>
            </h1>
            
            <p className="text-gray-300 text-xl md:text-2xl mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed">
              Capvalis blends cutting-edge technology with actionable insights to help you analyze trends, 
              predict opportunities, execute smarter trades and optimize your portfolio with data that 
              works as hard as you do to stay ahead of the curve.
            </p>
            
            <p className="text-gray-400 mb-10 md:mb-12 text-xl md:text-2xl font-medium tracking-wide">
              Stop Guessing and Start Investing Smarter.
            </p>
          </div>
          
          {/* Free Trial Image as Button - Slightly larger */}
          <div className="mt-6 flex justify-center">
            <button 
              type="button"
              className={`bg-transparent border-0 p-0 cursor-pointer transition-all duration-300 focus:outline-none ${hoverButton ? 'scale-105' : ''}`}
              onMouseEnter={() => setHoverButton(true)}
              onMouseLeave={() => setHoverButton(false)}
              onClick={() => window.location.href = '/signup'}
              aria-label="Start free trial"
            >
              <img 
                src={freeTrial} 
                alt="Start Free Trial" 
                className={`transition-all duration-300 ${hoverButton ? 'drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]' : ''}`}
                style={{ height: '56px' }}
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* CSS for animations and gradients */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes spin-medium {
          from { transform: rotate(var(--start-angle)); }
          to { transform: rotate(calc(var(--start-angle) + var(--direction) * 360deg)); }
        }
        
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        
        @keyframes particle-pulse {
          0%, 100% { opacity: 0.6; transform: var(--transform) scale(1); }
          50% { opacity: 1; transform: var(--transform) scale(1.8); }
        }
        
        .animate-spin-slow {
          animation: spin-slow var(--duration, 120s) linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse var(--duration, 100s) linear infinite;
        }
        
        .animate-spin-medium {
          --start-angle: var(--angle, 0deg);
          --direction: var(--dir, 1);
          animation: spin-medium var(--duration, 60s) linear infinite;
        }
        
        .animate-pulse-ring {
          animation: pulse-ring 8s ease-in-out infinite;
        }
        
        .animate-particle {
          --transform: rotate(var(--angle)) translateX(var(--distance));
          animation: particle-pulse var(--duration, 5s) ease-in-out infinite var(--delay, 0s);
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle at center, rgba(20, 30, 80, 0.15) 0%, rgba(10, 15, 40, 0.08) 20%, rgba(5, 10, 30, 0.03) 50%, rgba(0, 0, 0, 0) 70%);
        }
        
        .ring-element {
          background: transparent;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Hero;