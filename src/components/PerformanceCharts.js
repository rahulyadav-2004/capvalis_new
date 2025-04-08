import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceCharts = () => {
  const [stars, setStars] = useState([]);
  const [activeChart, setActiveChart] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  
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

  // Update the firstHalfData with the exact values from the image, fixing Feb 2024 value
  const firstHalfData = [
    { month: 'Dec 2023', value: 3500 },
    { month: 'Jan 2024', value: 5000 },
    { month: 'Feb 2024', value: 2000 }, // Updated to 2000 instead of 0
    { month: 'Mar 2024', value: 16000 }
  ];

  // Second half data
  const secondHalfData = [
    { month: 'Jul', value: 22.5 },
    { month: 'Aug', value: 25.8 },
    { month: 'Sep', value: 21.3 },
    { month: 'Oct', value: 16.9 },
    { month: 'Nov', value: 26.2 },
    { month: 'Dec', value: 32.8 }
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-3 rounded-md border border-gray-700 text-xs">
          <p className="font-medium">{`${payload[0].payload.month}: +${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Animation for charts on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveChart('both');
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Update the ValueChart component to match the theme of other charts
  const ValueChart = () => {
    return (
      <div 
        className="bg-gradient-to-br from-gray-900/90 to-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-800/80 shadow-xl hover:border-indigo-800/50 transition-all duration-500"
        onMouseEnter={() => setActiveChart('value')}
        onMouseLeave={() => setActiveChart('both')}
      >
        <h3 className="text-white text-lg font-medium mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          Q1 2024 Revenue
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={firstHalfData}
              margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <YAxis 
                tickFormatter={(value) => `${value/1000}k`}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                domain={[0, 18000]}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                  border: '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '4px',
                  color: 'white'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="url(#colorGradientGreen)" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="colorGradientGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  // Add this new data for Q2 2024 graph (from the second image)
  const q2Data = [
    { month: 'Apr 2024', value: 15000 },
    { month: 'May 2024', value: 22000 },
    { month: 'Jun 2024', value: 18000 },
    { month: 'Jul 2024', value: 33000 }
  ];

  // Add a new chart component for the Q2 data
  const Q2Chart = () => {
    return (
      <div 
        className="bg-gradient-to-br from-gray-900/90 to-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-800/80 shadow-xl hover:border-indigo-800/50 transition-all duration-500"
        onMouseEnter={() => setActiveChart('q2')}
        onMouseLeave={() => setActiveChart('both')}
      >
        <h3 className="text-white text-lg font-medium mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
            <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
          </svg>
          Q2 2024 Performance
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={q2Data}
              margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis 
                dataKey="month" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              />
              <YAxis 
                tickFormatter={(value) => `${value/1000}k`}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                domain={[0, 35000]}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 24, 39, 0.95)', 
                  border: '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '4px',
                  color: 'white'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="url(#colorGradientGreen2)" 
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <defs>
                <linearGradient id="colorGradientGreen2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black text-white py-20 relative min-h-screen">
      {/* Darker background with less blue */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#030812] to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#040918] to-black"></div>
      
      {/* Radial gradient - more subtle */}
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Performance Charts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Value Chart from image - Q1 2024 */}
          <ValueChart />
          
          {/* New Q2 2024 chart */}
          <Q2Chart />
        </div>

        {/* Stats Row - Interactive with better visibility */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-800/80 hover:border-indigo-800/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10">
            <h3 className="text-3xl sm:text-4xl font-bold text-white flex items-end">
              <span className="relative overflow-hidden">
                <span className="animate-count-up" data-value="58.66">58.66</span>
                <span className="text-cyan-400">%</span>
              </span>
            </h3>
            <p className="text-gray-300 mt-2 uppercase text-xs font-medium">Profitability Percentage</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-900/20 to-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-indigo-800/50 shadow-lg shadow-indigo-900/10 hover:border-indigo-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30">
            <h3 className="text-3xl sm:text-4xl font-bold text-white flex items-end">
              <span className="relative overflow-hidden">
                <span className="animate-count-up" data-value="67">{'>'}67</span>
                <span className="text-indigo-400">%</span>
              </span>
            </h3>
            <p className="text-gray-300 mt-2 uppercase text-xs font-medium">Annual Return</p>
          </div>
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-900/80 backdrop-blur-md rounded-2xl p-8 border border-gray-800/80 hover:border-indigo-800/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10">
            <h3 className="text-3xl sm:text-4xl font-bold text-white flex items-end">
              <span className="relative overflow-hidden">
                <span className="animate-count-up" data-value="8.5">{'>'}8.5</span>
                <span className="text-cyan-400">%</span>
              </span>
            </h3>
            <p className="text-gray-300 mt-2 uppercase text-xs font-medium">Monthly Return</p>
          </div>
        </div>
      </div>
      
      {/* CSS for animations and gradients */}
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes shine {
          0% { opacity: 0; transform: translateX(-100%); }
          20% { opacity: 0.1; }
          100% { opacity: 0; transform: translateX(100%); }
        }
        
        .animate-shine {
          animation: shine 1.5s ease-in-out infinite;
        }
        
        .bg-radial-gradient {
          background: radial-gradient(circle at center, rgba(20, 30, 80, 0.1) 0%, rgba(10, 15, 40, 0.05) 20%, rgba(5, 10, 30, 0.02) 50%, rgba(0, 0, 0, 0) 70%);
        }
        
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-count-up {
          animation: countUp 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PerformanceCharts;