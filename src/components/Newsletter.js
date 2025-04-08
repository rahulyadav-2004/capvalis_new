import React, { useState, useEffect } from 'react';

const Newsletter = ({ posts }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [interests, setInterests] = useState({
    marketAnalysis: false,
    tradingStrategies: false,
    investmentOpportunities: false,
    riskManagement: false,
    techInsights: false,
    regulatoryUpdates: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInterestChange = (interest) => {
    setInterests(prev => ({
      ...prev,
      [interest]: !prev[interest]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111] to-[#000] pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Article content - Left side */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Capvalis Investment Insights</h1>
            <p className="text-xl text-gray-400 mb-10">
              Latest insights, analysis, and strategies from our investment experts.
            </p>
            
            {posts && posts.length > 0 ? (
              <div className="space-y-10">
                {posts.map((post, index) => (
                  <div key={post.id} className="bg-gradient-to-br from-[#151515] to-[#0c0c0c] rounded-2xl overflow-hidden shadow-xl border border-gray-800/50">
                    {/* Article header with image */}
                    <div className="relative">
                      <img 
                        src={post.imageUrl || "https://images.moneycontrol.com/static-mcnews/2025/02/20250219011951_IPO-main-pic.jpg?impolicy=website&width=770&height=431"}
                        alt={post.title}
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                        <span className="px-3 py-1 bg-indigo-500/80 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-3 inline-block">
                          {post.category}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                          {post.title}
                        </h2>
                      </div>
                    </div>
                    
                    {/* Article content */}
                    <div className="p-6 md:p-8">
                      <div className="flex items-center text-gray-400 text-sm mb-6">
                        <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="mx-2">•</span>
                        <span>{post.author}</span>
                      </div>
                      
                      <div className="prose prose-invert prose-lg max-w-none">
                        {post.content.split('\n').map((paragraph, i) => (
                          paragraph.trim() ? (
                            <p key={i} className="text-gray-300 my-4 leading-relaxed">
                              {paragraph}
                            </p>
                          ) : null
                        ))}
                      </div>
                      
                      {/* Related stories */}
                      {post.relatedPosts && post.relatedPosts.length > 0 && (
                        <div className="mt-10 pt-6 border-t border-gray-800">
                          <h3 className="text-white text-xl font-semibold mb-4">Related Stories</h3>
                          <ul className="space-y-4">
                            {post.relatedPosts.map((related, i) => (
                              <li key={i}>
                                <a href="#" className="text-indigo-400 hover:text-indigo-300 flex items-start">
                                  <span className="text-indigo-400 mr-2">→</span>
                                  <span>{related.title}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Source attribution */}
                      {post.source && (
                        <div className="mt-8 text-gray-400 text-sm">
                          <p>Source: <a href={post.sourceUrl} className="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener noreferrer">{post.source}</a></p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gradient-to-br from-[#151515] to-[#0c0c0c] rounded-2xl overflow-hidden shadow-xl border border-gray-800/50">
                {/* Default article header with image */}
                <div className="relative">
                  <img 
                    src="https://images.moneycontrol.com/static-mcnews/2025/02/20250219011951_IPO-main-pic.jpg?impolicy=website&width=770&height=431"
                    alt="IPO Market"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="px-3 py-1 bg-indigo-500/80 backdrop-blur-sm rounded-full text-white text-xs font-medium mb-3 inline-block">
                      IPO News
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      Spinaroo Commercial IPO closes with 1.49 times subscription
                    </h2>
                  </div>
                </div>
                
                {/* Default article content */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center text-gray-400 text-sm mb-6">
                    <span>April 3, 2025</span>
                    <span className="mx-2">•</span>
                    <span>Moneycontrol News</span>
                  </div>
                  
                  <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Spinaroo Commercial's initial public offering closed with 1.49 times subscription on April 3, backed by support from the retail and non-institutional investors.
                    </p>
                    
                    <p className="text-gray-300 my-4 leading-relaxed">
                      The company that manufactures aluminum foil containers and paper cups & plates along with offering paper cup-related machinery is raising Rs 10.17 crore via maiden public issue at a price of Rs 51 per share.
                    </p>
                    
                    <p className="text-gray-300 my-4 leading-relaxed">
                      Investors have subscribed for 29.78 lakh equity shares during March 28-April 3 compared to the offer size of 19.94 lakh shares via 605 applications, the subscription data on the BSE showed.
                    </p>
                    
                    <p className="text-gray-300 my-4 leading-relaxed">
                      Non-institutional investors topped subscription numbers, buying 1.94 times their reserved portion, while the allotted quota of retail investors was subscribed 1.2 times.
                    </p>
                    
                    <p className="text-gray-300 my-4 leading-relaxed">
                      West Bengal-based Spinaroo Commercial will finalise the IPO share allotment by April 4, and the trading in its equity shares will commence on the BSE SME effective April 8.
                    </p>
                    
                    <p className="text-gray-300 my-4 leading-relaxed">
                      The company is going to spend Rs 7.12 crore out of net IPO proceeds mainly for working capital requirements, and Rs 2 crore for general corporate expenses.
                    </p>
                    
                    <p className="text-gray-300 my-4 leading-relaxed">
                      Finshore Management Services acted as the sole merchant banker for the issue.
                    </p>
                  </div>
                  
                  {/* Related stories */}
                  <div className="mt-10 pt-6 border-t border-gray-800">
                    <h3 className="text-white text-xl font-semibold mb-4">Related Stories</h3>
                    <ul className="space-y-4">
                      <li>
                        <a href="#" className="text-indigo-400 hover:text-indigo-300 flex items-start">
                          <span className="text-indigo-400 mr-2">→</span>
                          <span>Trump tariffs to impact growth of Indian medical devices exports</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-indigo-400 hover:text-indigo-300 flex items-start">
                          <span className="text-indigo-400 mr-2">→</span>
                          <span>Indian startups began to walk despite the system; to fly they need support</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Source attribution */}
                  <div className="mt-8 text-gray-400 text-sm">
                    <p>Source: <a href="https://www.moneycontrol.com/news/business/ipo/spinaroo-commercial-ipo-closes-with-1-49-times-subscription-with-retail-non-institutional-investors-support-12984134.html" className="text-indigo-400 hover:text-indigo-300" target="_blank" rel="noopener noreferrer">Moneycontrol</a></p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Newsletter subscription - Right side */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#141414] to-[#0c0c0c] rounded-2xl p-6 shadow-xl border border-gray-800/50 sticky top-28">
              {!submitted ? (
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-white">Subscribe to Our Newsletter</h2>
                  <p className="text-gray-400 mb-6">
                    Join thousands of investors and traders receiving our weekly insights on market trends, investment opportunities, and advanced trading strategies.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-[#232323] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                      />
                      {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-300">Select your areas of interest</p>
                      
                      <div className="space-y-3">
                        {[
                          { id: 'marketAnalysis', label: 'Market Analysis' },
                          { id: 'tradingStrategies', label: 'Trading Strategies' },
                          { id: 'investmentOpportunities', label: 'Investment Opportunities' },
                          { id: 'riskManagement', label: 'Risk Management' },
                          { id: 'techInsights', label: 'Tech Insights' },
                          { id: 'regulatoryUpdates', label: 'Regulatory Updates' }
                        ].map((interest) => (
                          <label key={interest.id} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={interests[interest.id]}
                              onChange={() => handleInterestChange(interest.id)}
                              className="h-4 w-4 text-indigo-500 rounded border-gray-700 focus:ring-indigo-500"
                            />
                            <span className="text-gray-300 text-sm">{interest.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-3 px-4 rounded-xl text-white text-base font-medium ${
                          loading
                            ? 'bg-indigo-700 cursor-not-allowed'
                            : 'bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40'
                        } transition-all duration-300`}
                      >
                        {loading ? (
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        ) : (
                          'Subscribe Now'
                        )}
                      </button>
                      <p className="mt-3 text-xs text-gray-500 text-center">
                        By subscribing, you agree to our <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 mb-4">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Thank You!</h3>
                  <p className="text-gray-400 mb-4">
                    You've successfully subscribed to our newsletter.
                  </p>
                  <button 
                    onClick={() => {setSubmitted(false); setEmail('');}} 
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
                  >
                    Subscribe with another email
                  </button>
                </div>
              )}
            </div>
            
            {/* Market updates widget */}
            <div className="mt-8 bg-gradient-to-br from-[#141414] to-[#0c0c0c] rounded-2xl p-6 shadow-xl border border-gray-800/50">
              <h3 className="text-lg font-medium mb-4 text-white">Market Updates</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sensex</span>
                  <div className="flex items-center text-green-400">
                    <span>73,158.24</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    <span className="ml-1">0.32%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Nifty</span>
                  <div className="flex items-center text-green-400">
                    <span>22,217.45</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                    </svg>
                    <span className="ml-1">0.28%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">USD/INR</span>
                  <div className="flex items-center text-red-400">
                    <span>83.45</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                    <span className="ml-1">0.15%</span>
                  </div>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-800">
                  <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center justify-between">
                    <span>View all market data</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .prose p {
          margin-top: 1.25em;
          margin-bottom: 1.25em;
        }
      `}</style>
    </div>
  );
};

export default Newsletter; 