import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/layout/Footer';

/**
 * Common Layout for public and logged-in views.
 * Uses <main> to wrap the dynamic content from routes.
 */
const MainLayout = ({ children, showFooter = true }) => {
  return (
    <div className="min-h-screen bg-[#090C03] flex flex-col font-satoshi selection:bg-primary-pink/30 relative">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
