import React from 'react';
    import { NavLink } from 'react-router-dom';
    import { useDispatch } from 'react-redux';
    import { 
      LayoutDashboard, 
      Users, 
      Settings, 
      LogOut,
      ChevronLeft,
      ChevronRight,
      ShieldCheck,
      UserCheck
    } from 'lucide-react';
    import { logout } from '../../features/auth/store/authSlice';
    import { clsx } from 'clsx';
    import { twMerge } from 'tailwind-merge';
    
    const MenuItem = ({ to, icon: Icon, label, isCollapsed }) => (
      <NavLink
        to={to}
        end={to === '/admin-dashboard'}
        className={({ isActive }) => twMerge(
          clsx(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
            isActive 
              ? "bg-primary-purple text-white shadow-lg shadow-primary-purple/20 font-bold" 
              : "text-white/60 hover:text-white hover:bg-white/5 font-medium"
          )
        )}
      >
        <Icon className={clsx("w-5 h-5 flex-shrink-0", !isCollapsed && "group-hover:scale-110 transition-transform")} />
        {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
      </NavLink>
    );
    
    const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
      const dispatch = useDispatch();
    
      const menuItems = [
        { to: '/admin-dashboard', icon: LayoutDashboard, label: 'Overview' },
        { to: '/admin-dashboard/instructors', icon: UserCheck, label: 'Instructors' },
        { to: '/admin-dashboard/users', icon: Users, label: 'Users' },
        { to: '/admin-dashboard/settings', icon: Settings, label: 'Settings' },
      ];
    
      const handleLogout = () => {
        dispatch(logout());
      };
    
      return (
        <aside 
          className={twMerge(
            clsx(
              "h-screen sticky top-0 bg-[#0c091a] border-r border-white/5 flex flex-col transition-all duration-300 z-50",
              isCollapsed ? "w-20" : "w-64"
            )
          )}
        >
          {/* Sidebar Header */}
          <div className="p-6 flex items-center justify-between mb-2">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-purple to-indigo-600 flex items-center justify-center font-bold text-white italic">A</div>
                <span className="text-xl font-bold text-white italic tracking-tight">Admin</span>
              </div>
            )}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
    
          {/* Navigation Items */}
          <nav className="flex-grow px-3 space-y-1">
            {menuItems.map((item) => (
              <MenuItem 
                key={item.to} 
                {...item} 
                isCollapsed={isCollapsed} 
              />
            ))}
          </nav>
    
          {/* Logout Button */}
          <div className="p-3 mt-auto">
            <button
              onClick={handleLogout}
              className={twMerge(
                clsx(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 font-medium group",
                  isCollapsed && "justify-center"
                )
              )}
            >
              <LogOut className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
    
          {/* Admin Badge */}
          {!isCollapsed && (
            <div className="m-4 p-4 rounded-2xl bg-gradient-to-br from-primary-purple/10 to-indigo-600/10 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck size={14} className="text-primary-purple" />
                <p className="text-[11px] text-white/40 uppercase tracking-widest font-bold">System Status</p>
              </div>
              <p className="text-xs text-white/70 leading-relaxed italic truncate">All systems operational.</p>
            </div>
          )}
        </aside>
      );
    };
    
    export default AdminSidebar;
