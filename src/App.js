import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PerformanceCharts from './components/PerformanceCharts';
import Mission from './components/Mission';
import CapvalisEd from './components/CapvalisEd';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

const LOCAL_STORAGE_KEY = 'capvalis_blog_posts';
const AUTH_KEY = 'capvalis_admin_auth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [blogPosts, setBlogPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  
  // Check if user is already authenticated
  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY);
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  useEffect(() => {
    const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedPosts) {
      setBlogPosts(JSON.parse(storedPosts));
    }
  }, []);
  
  // Listen for changes in localStorage to update blogPosts
  useEffect(() => {
    const handleStorageChange = () => {
      const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedPosts) {
        setBlogPosts(JSON.parse(storedPosts));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // Update the useEffect hook in App.js to refresh posts when navigating to the newsletter page
  useEffect(() => {
    if (currentPage === 'newsletter') {
      const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedPosts) {
        setBlogPosts(JSON.parse(storedPosts));
      }
    }
  }, [currentPage]);
  
  // Also add this useEffect to listen for the custom localStorageChange event
  useEffect(() => {
    const handleLocalStorageChange = () => {
      const storedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedPosts) {
        setBlogPosts(JSON.parse(storedPosts));
      }
    };
    
    window.addEventListener('localStorageChange', handleLocalStorageChange);
    
    return () => {
      window.removeEventListener('localStorageChange', handleLocalStorageChange);
    };
  }, []);
  
  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true);
      localStorage.setItem(AUTH_KEY, 'true');
      setShowLogin(false);
      setCurrentPage('admin');
    }
  };
  
  const handleNavigate = (page) => {
    if (page === 'login') {
      setShowLogin(true);
    } else {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };
  
  const renderContent = () => {
    if (showLogin) {
      return <Login onLogin={handleLogin} />;
    }
    
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <PerformanceCharts />
            <Mission />
            <CapvalisEd />
          </>
        );
      case 'newsletter':
        return <Newsletter posts={blogPosts} />;
      case 'admin':
        return isAuthenticated ? <AdminPanel /> : <Login onLogin={handleLogin} />;
      default:
        return (
          <>
            <Hero />
            <PerformanceCharts />
            <Mission />
            <CapvalisEd />
          </>
        );
    }
  };
  
  return (
    <div className="App">
      {!showLogin && (
        <Header 
          currentPage={currentPage} 
          onNavigate={handleNavigate} 
        />
      )}
      {renderContent()}
      {!showLogin && <Footer />}
    </div>
  );
}

export default App;
