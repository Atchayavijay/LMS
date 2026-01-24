import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import InstructorSidebar from '../components/instructor/InstructorSidebar';
import InstructorHeader from '../components/instructor/InstructorHeader';

/**
 * Enterprise-grade Instructor Layout.
 * Features a collapsible sidebar and a fixed header.
 */
const InstructorLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0c091a] flex font-satoshi selection:bg-primary-pink/30">
      {/* Sidebar Navigation */}
      <InstructorSidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
      />

      <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
        {/* Fixed Top Header */}
        <InstructorHeader />

        {/* Dynamic Content Area */}
        <main className="flex-grow overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(255,51,102,0.03),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.03),transparent_40%)]">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
        
        {/* Optional: Design background decoration */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-pink/5 blur-[150px] -z-10 pointer-events-none rounded-full" />
        <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-primary-purple/5 blur-[150px] -z-10 pointer-events-none rounded-full" />
      </div>
    </div>
  );
};

export default InstructorLayout;
