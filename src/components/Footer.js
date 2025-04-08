import React from 'react';

const TestimonialCard = ({ quote, author, position }) => {
  return (
    <div className="bg-gray-900 bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 relative">
      <div className="absolute top-4 left-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
      <p className="text-gray-300 italic mt-6 mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center text-blue-400 font-bold">
          {author.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="text-white font-medium">{author}</p>
          <p className="text-gray-400 text-sm">{position}</p>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 relative">
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center tracking-tight">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <TestimonialCard 
              quote="Capvalis transformed my approach to trading. The AI insights helped me achieve a 43% return in just 8 months."
              author="Michael K."
              position="Retail Investor"
            />
            <TestimonialCard 
              quote="The educational resources are outstanding. As a beginner, I went from knowing nothing to executing profitable trades in weeks."
              author="Sarah L."
              position="New Trader"
            />
            <TestimonialCard 
              quote="The community aspect is invaluable. Connecting with other serious traders has accelerated my learning curve dramatically."
              author="David R."
              position="Professional Trader"
            />
          </div>
        </div>
        
        <div className="mt-20 border-t border-gray-800 pt-10">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xl font-medium mb-4">Have questions? We're here to help.</h3>
            
            <div className="mt-6 mb-6">
              <a href="mailto:support@capvalis.com" className="text-2xl text-blue-400 font-semibold hover:text-blue-300 transition-colors">
                support@capvalis.com
              </a>
            </div>
            
            <div className="text-gray-400 text-sm mb-8">
              <p className="mb-1">ABHIV CONSULTANCY LLP</p>
              <p className="mb-1">2-A, Shankar Purwa, Kalyanpur, Bahadurpur, Lucknow</p>
              <a href="tel:+919266971199" className="text-gray-400 hover:text-gray-300 transition-colors">+91 9266971199</a>
            </div>
            
            <div className="flex space-x-6 mb-10">
              <a href="https://twitter.com/capvalis" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/capvalis" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a href="https://instagram.com/capvalis" className="text-gray-400 hover:text-blue-400 transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            
            <div className="pt-5 border-t border-gray-800 w-full text-center">
              <div className="inline-flex items-center flex-wrap justify-center">
                <span className="mr-3 text-gray-500 text-sm">© 2024 Capvalis. All Rights Reserved</span>
                <span className="text-gray-600 mx-2">|</span>
                <span className="ml-3 text-gray-500 text-sm">Last Updated: 30-11-2024</span>
              </div>
              <div className="mt-4 flex justify-center space-x-4 text-sm">
                <a href="/privacy-policy" className="text-gray-500 hover:text-gray-400 transition-colors">Privacy Policy</a>
                <a href="/terms-of-service" className="text-gray-500 hover:text-gray-400 transition-colors">Terms of Service</a>
                <a href="/cookie-policy" className="text-gray-500 hover:text-gray-400 transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 