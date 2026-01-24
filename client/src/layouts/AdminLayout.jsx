import React, { useState } from 'react';
    import { Outlet } from 'react-router-dom';
    import AdminSidebar from '../components/admin/AdminSidebar';
    import AdminHeader from '../components/admin/AdminHeader';
    
    const AdminLayout = () => {
      const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    
      return (
        <div className="min-h-screen bg-[#0c091a] flex font-satoshi selection:bg-primary-purple/30">
          {/* Sidebar Navigation */}
          <AdminSidebar 
            isCollapsed={isSidebarCollapsed} 
            setIsCollapsed={setIsSidebarCollapsed} 
          />
    
          <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
            {/* Fixed Top Header */}
            <AdminHeader />
    
            {/* Dynamic Content Area */}
            <main className="flex-grow overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.03),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(51,102,255,0.03),transparent_40%)]">
              <div className="p-8">
                <Outlet />
              </div>
            </main>
            
            {/* Design background decoration */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-purple/5 blur-[150px] -z-10 pointer-events-none rounded-full" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] -z-10 pointer-events-none rounded-full" />
          </div>
        </div>
      );
    };
    
    export default AdminLayout;
