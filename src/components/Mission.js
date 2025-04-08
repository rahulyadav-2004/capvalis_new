import React, { useState, useEffect } from 'react';

const MissionCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900/70 to-gray-900/30 backdrop-blur-md rounded-2xl p-8 border border-gray-800/50 hover:border-indigo-800/50 transition-all duration-300 shadow-xl group">
      <div className="bg-indigo-500 bg-opacity-10 w-14 h-14 flex items-center justify-center rounded-xl mb-6 group-hover:bg-opacity-20 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">{title}</h3>
      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{description}</p>
    </div>
  );
};

const Mission = () => {
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
    <div className="bg-black py-20 relative min-h-screen">
      {/* Darker background with subtle gradient */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#030812] to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#040918] to-black"></div>
      
      {/* Radial gradient - subtle */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-radial-gradient opacity-20"></div>
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
              boxShadow: star.size > 1.8 ? `0 0 ${star.size}px rgba(255, 255, 255, 0.5)` : 'none',
              zIndex: 0,
            }}
          ></div>
        ))}
      </div>
      
      {/* Glowing orb effects */}
      <div className="absolute -top-40 right-1/4 w-96 h-96 bg-indigo-600 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Our Mission</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We're dedicated to transforming the way you invest through technology, education, and community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <MissionCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
              </svg>
            }
            title="Integrating Technology with Trading"
            description="Our platform combines advanced AI with automating trading strategies using software engineering and AI, analyzing market patterns faster than human perception."
          />
          
          <MissionCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            }
            title="Improving Financial Literacy"
            description="We offer easy-to-understand courses for beginners enhancing their portfolio health, providing skills that transform financial decision-making."
          />
          
          <MissionCard 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            }
            title="Building Trading Community"
            description="Exclusive forums, trading societies and recruitment drives to connect traders to grow together in a collaborative ecosystem of shared insights."
          />
        </div>
      </div>
      
      {/* CSS for animations and gradients */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.8; }
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle at center, rgba(20, 30, 80, 0.1) 0%, rgba(10, 15, 40, 0.05) 20%, rgba(5, 10, 30, 0.02) 50%, rgba(0, 0, 0, 0) 70%);
        }
      `}</style>
    </div>
  );
};

export default Mission;