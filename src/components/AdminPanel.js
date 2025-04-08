import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'capvalis_blog_posts';

const AdminPanel = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'Market Analysis',
    author: '',
    date: new Date().toISOString().split('T')[0],
    content: '',
    imageUrl: 'https://images.moneycontrol.com/static-mcnews/2025/02/20250219011951_IPO-main-pic.jpg?impolicy=website&width=770&height=431',
    source: '',
    sourceUrl: '',
    relatedPosts: []
  });
  const [relatedPost, setRelatedPost] = useState({ title: '', url: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      // Add default post if no posts exist
      const defaultPost = {
        id: uuidv4(),
        title: 'Spinaroo Commercial IPO closes with 1.49 times subscription',
        category: 'IPO News',
        author: 'Moneycontrol News',
        date: '2025-04-03',
        content: "Spinaroo Commercial's initial public offering closed with 1.49 times subscription on April 3, backed by support from the retail and non-institutional investors.\n\nThe company that manufactures aluminum foil containers and paper cups & plates along with offering paper cup-related machinery is raising Rs 10.17 crore via maiden public issue at a price of Rs 51 per share.\n\nInvestors have subscribed for 29.78 lakh equity shares during March 28-April 3 compared to the offer size of 19.94 lakh shares via 605 applications, the subscription data on the BSE showed.\n\nNon-institutional investors topped subscription numbers, buying 1.94 times their reserved portion, while the allotted quota of retail investors was subscribed 1.2 times.\n\nWest Bengal-based Spinaroo Commercial will finalise the IPO share allotment by April 4, and the trading in its equity shares will commence on the BSE SME effective April 8.\n\nThe company is going to spend Rs 7.12 crore out of net IPO proceeds mainly for working capital requirements, and Rs 2 crore for general corporate expenses.\n\nFinshore Management Services acted as the sole merchant banker for the issue.",
        imageUrl: 'https://images.moneycontrol.com/static-mcnews/2025/02/20250219011951_IPO-main-pic.jpg?impolicy=website&width=770&height=431',
        source: 'Moneycontrol',
        sourceUrl: 'https://www.moneycontrol.com/news/business/ipo/spinaroo-commercial-ipo-closes-with-1-49-times-subscription-with-retail-non-institutional-investors-support-12984134.html',
        relatedPosts: [
          { title: 'Trump tariffs to impact growth of Indian medical devices exports', url: '#' },
          { title: 'Indian startups began to walk despite the system; to fly they need support', url: '#' }
        ]
      };
      setPosts([defaultPost]);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([defaultPost]));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRelatedPostChange = (e) => {
    const { name, value } = e.target;
    setRelatedPost(prev => ({ ...prev, [name]: value }));
  };

  const addRelatedPost = () => {
    if (!relatedPost.title.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      relatedPosts: [...prev.relatedPosts, { ...relatedPost }]
    }));
    
    setRelatedPost({ title: '', url: '' });
  };

  const removeRelatedPost = (index) => {
    setFormData(prev => ({
      ...prev,
      relatedPosts: prev.relatedPosts.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newPost = {
      ...formData,
      id: formData.id || uuidv4(),
      date: formData.date || new Date().toISOString().split('T')[0]
    };
    
    let updatedPosts;
    if (isEditing) {
      updatedPosts = posts.map(post => post.id === newPost.id ? newPost : post);
      setPosts(updatedPosts);
    } else {
      updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
    }
    
    // Save to local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPosts));
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event('localStorageChange'));
    
    // Reset form
    setFormData({
      id: '',
      title: '',
      category: 'Market Analysis',
      author: '',
      date: new Date().toISOString().split('T')[0],
      content: '',
      imageUrl: 'https://images.moneycontrol.com/static-mcnews/2025/02/20250219011951_IPO-main-pic.jpg?impolicy=website&width=770&height=431',
      source: '',
      sourceUrl: '',
      relatedPosts: []
    });
    setIsEditing(false);
  };

  const deletePost = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedPosts));
      
      // Dispatch a custom event to notify other components
      window.dispatchEvent(new Event('localStorageChange'));
    }
  };

  const editPost = (id) => {
    const postToEdit = posts.find(post => post.id === id);
    if (postToEdit) {
      setFormData(postToEdit);
      setIsEditing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const viewInNewsletter = () => {
    // This URL might need to be adjusted based on your routing configuration
    window.open('#/newsletter', '_blank');
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#111] to-[#000] pt-28 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Blog Admin Panel</h1>
          <p className="text-xl text-gray-400 mb-6">
            Create, edit, and manage your blog posts for the Capvalis newsletter.
          </p>
          
          <button 
            onClick={viewInNewsletter}
            className="inline-flex items-center px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            Preview Newsletter
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Enhanced post creation form */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#151515] to-[#0c0c0c] rounded-2xl shadow-xl border border-gray-800/50 sticky top-28 overflow-hidden">
              {/* Form header with status indicator */}
              <div className="bg-gradient-to-r from-indigo-900/30 to-transparent border-b border-gray-800/50 px-6 py-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${isEditing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                  <h2 className="text-2xl font-semibold text-white">
                    {isEditing ? 'Edit Post' : 'Create New Post'}
                  </h2>
                </div>
                <p className="text-gray-400 text-xs mt-1">
                  {isEditing ? 'Update an existing post' : 'Fill in the details to create a new blog post'}
                </p>
              </div>
              
              {/* Image preview section */}
              <div className="relative">
                <div className="h-48 w-full overflow-hidden">
                  {formData.imageUrl ? (
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.moneycontrol.com/static-mcnews/2025/02/20250219011951_IPO-main-pic.jpg?impolicy=website&width=770&height=431';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-900">
                      <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 text-white">
                    <span className="bg-black/50 text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                      Featured image
                    </span>
                    <h3 className="font-medium text-lg mt-2 max-w-xs truncate">{formData.title || 'Untitled Post'}</h3>
                    {formData.author && (
                      <p className="text-sm text-gray-300 mt-1">By {formData.author}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  {/* Title input with character count */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                        Title <span className="text-red-400">*</span>
                      </label>
                      <span className="text-xs text-gray-500">{formData.title.length}/100</span>
                    </div>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      maxLength="100"
                      className="w-full px-4 py-3 bg-[#232323] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter a compelling title"
                    />
                  </div>
                  
                  {/* Category and date in a row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                        Category <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-[#232323] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                        >
                          <option value="Market Analysis">Market Analysis</option>
                          <option value="IPO News">IPO News</option>
                          <option value="Trading Strategies">Trading Strategies</option>
                          <option value="Investment Opportunities">Investment Opportunities</option>
                          <option value="Risk Management">Risk Management</option>
                          <option value="Tech Insights">Tech Insights</option>
                          <option value="Regulatory Updates">Regulatory Updates</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                        Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-[#232323] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Author input */}
                  <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-2">
                      Author <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="author"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-10 bg-[#232323] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Author name"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image URL with preview badge */}
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
                      Image URL
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-10 bg-[#232323] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="https://example.com/image.jpg"
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      {formData.imageUrl && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 bg-indigo-500/30 text-indigo-300 rounded-full">
                          Preview above
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Content textarea with character count and markdown hint */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label htmlFor="content" className="block text-sm font-medium text-gray-300">
                        Content <span className="text-red-400">*</span>
                      </label>
                      <span className="text-xs text-gray-500">{formData.content.length} characters</span>
                    </div>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      required
                      rows="8"
                      className="w-full px-4 py-3 bg-[#232323] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Your article content here..."
                    ></textarea>
                    <p className="mt-1 text-xs text-gray-500">
                      Use blank lines to separate paragraphs.
                    </p>
                  </div>
                  
                  {/* Source information in a group */}
                  <div className="bg-gray-900/30 p-4 rounded-xl border border-gray-800/50">
                    <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                      </svg>
                      Source Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="source" className="block text-xs font-medium text-gray-400 mb-1">
                          Source Name
                        </label>
                        <input
                          type="text"
                          id="source"
                          name="source"
                          value={formData.source}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-[#232323] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                          placeholder="e.g. Moneycontrol"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="sourceUrl" className="block text-xs font-medium text-gray-400 mb-1">
                          Source URL
                        </label>
                        <input
                          type="url"
                          id="sourceUrl"
                          name="sourceUrl"
                          value={formData.sourceUrl}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-[#232323] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Related posts section with improved UI */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-300 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                        </svg>
                        Related Posts
                      </h4>
                      <span className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-400">
                        {formData.relatedPosts.length} added
                      </span>
                    </div>
                    
                    <div className="flex space-x-2 mb-3">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={relatedPost.title}
                          onChange={handleRelatedPostChange}
                          name="title"
                          className="w-full px-3 py-2 bg-[#232323] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                          placeholder="Related post title"
                        />
                      </div>
                      <div className="w-24">
                        <input
                          type="url"
                          value={relatedPost.url}
                          onChange={handleRelatedPostChange}
                          name="url"
                          className="w-full px-3 py-2 bg-[#232323] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                          placeholder="URL"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={addRelatedPost}
                        disabled={!relatedPost.title.trim()}
                        className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center ${
                          relatedPost.title.trim() 
                            ? 'bg-indigo-600 hover:bg-indigo-500 text-white' 
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                        Add
                      </button>
                    </div>
                    
                    {formData.relatedPosts.length > 0 && (
                      <div className="max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                        <ul className="space-y-2">
                          {formData.relatedPosts.map((related, index) => (
                            <li key={index} className="flex justify-between items-center p-2 bg-gray-800/50 rounded-lg group hover:bg-gray-800 transition-colors">
                              <div className="flex items-center overflow-hidden">
                                <span className="w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 text-xs mr-2">
                                  {index + 1}
                                </span>
                                <span className="text-sm text-gray-300 truncate">{related.title}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeRelatedPost(index)}
                                className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  {/* Form buttons with improved UI */}
                  <div className="pt-4 flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 py-3 px-4 rounded-xl text-white text-base font-medium bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center"
                    >
                      {isEditing ? (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                          </svg>
                          Update Post
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                          </svg>
                          Create Post
                        </>
                      )}
                    </button>
                    
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({
                            id: '',
                            title: '',
                            category: 'Market Analysis',
                            author: '',
                            date: new Date().toISOString().split('T')[0],
                            content: '',
                            imageUrl: 'https://images.moneycontrol.com/static-mcnews/2025/02/20250219011951_IPO-main-pic.jpg?impolicy=website&width=770&height=431',
                            source: '',
                            sourceUrl: '',
                            relatedPosts: []
                          });
                          setIsEditing(false);
                        }}
                        className="flex-1 py-3 px-4 rounded-xl text-white text-base font-medium bg-gray-700 hover:bg-gray-600 transition-all duration-300 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {/* Post management */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-[#151515] to-[#0c0c0c] rounded-2xl p-6 shadow-xl border border-gray-800/50 mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                  <h2 className="text-2xl font-semibold text-white">Manage Posts</h2>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-[#232323] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Search posts..."
                  />
                  <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
              
              {posts.length === 0 ? (
                <div className="text-center py-10 bg-gray-900/30 rounded-xl border border-gray-800/30">
                  <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <p className="text-gray-400 mb-4">No posts found. Create your first post!</p>
                  <button
                    onClick={() => document.getElementById('title').focus()}
                    className="px-4 py-2 bg-indigo-600/80 text-white rounded-lg hover:bg-indigo-500/80 transition-colors inline-flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Create Post
                  </button>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-10 bg-gray-900/30 rounded-xl border border-gray-800/30">
                  <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <p className="text-gray-400 mb-2">No posts match your search.</p>
                  <p className="text-gray-500 text-sm">Try adjusting your search terms</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map(post => (
                    <div key={post.id} className="p-4 border border-gray-800 rounded-xl bg-black/20 hover:bg-black/30 transition-colors group">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-900 border border-gray-800">
                            <img 
                              src={post.imageUrl || "https://images.moneycontrol.com/static-mcnews/2025/02/20250219011951_IPO-main-pic.jpg?impolicy=website&width=770&height=431"} 
                              alt={post.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.moneycontrol.com/static-mcnews/2025/02/20250219011951_IPO-main-pic.jpg?impolicy=website&width=770&height=431';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium truncate group-hover:text-indigo-400 transition-colors">{post.title}</h3>
                            <div className="flex flex-wrap items-center text-sm text-gray-400 mt-1 gap-2">
                              <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">
                                {post.category}
                              </span>
                              <span className="flex items-center text-xs">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                {new Date(post.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center text-xs">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                {post.author}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                              {post.content.split('\n')[0]}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4 md:mt-0">
                          <button
                            onClick={() => editPost(post.id)}
                            className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors"
                            title="Edit post"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={viewInNewsletter}
                            className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors"
                            title="View in newsletter"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                            title="Delete post"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Post stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#151515] to-[#0c0c0c] rounded-2xl p-6 shadow-xl border border-gray-800/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400 text-sm font-medium">Total Posts</h3>
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div className="mt-2">
                  <p className="text-3xl font-bold text-white">{posts.length}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#151515] to-[#0c0c0c] rounded-2xl p-6 shadow-xl border border-gray-800/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400 text-sm font-medium">Latest Post</h3>
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="mt-2">
                  <p className="text-white font-medium truncate">
                    {posts.length > 0 ? 
                      [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))[0].title 
                      : 'No posts yet'}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {posts.length > 0 ? 
                      new Date([...posts].sort((a, b) => new Date(b.date) - new Date(a.date))[0].date).toLocaleDateString() 
                      : '-'}
                  </p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-[#151515] to-[#0c0c0c] rounded-2xl p-6 shadow-xl border border-gray-800/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-400 text-sm font-medium">Top Category</h3>
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                </div>
                <div className="mt-2">
                  {posts.length > 0 ? (
                    <p className="text-xl font-bold text-white">
                      {Object.entries(
                        posts.reduce((acc, post) => {
                          acc[post.category] = (acc[post.category] || 0) + 1;
                          return acc;
                        }, {})
                      )
                        .sort((a, b) => b[1] - a[1])[0][0]}
                    </p>
                  ) : (
                    <p className="text-xl font-bold text-white">-</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom scrollbar styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 31, 31, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(107, 114, 128, 0.7);
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;