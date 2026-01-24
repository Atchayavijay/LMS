import React from 'react';
    import { useSelector } from 'react-redux';
    import { Bell, Search, User } from 'lucide-react';
    
    const AdminHeader = () => {
      const { user } = useSelector((state) => state.auth);
    
      return (
        <header className="h-20 border-b border-white/5 bg-[#0c091a]/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/5 w-96 transition-all focus-within:border-primary-purple/50 focus-within:bg-white/10 group">
            <Search className="w-4 h-4 text-white/40 group-focus-within:text-primary-purple transition-colors" />
            <input 
              type="text" 
              placeholder="Search data, users, applications..." 
              className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30 w-full"
            />
          </div>
    
          <div className="flex items-center gap-6">
            <button className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-pink rounded-full border-2 border-[#0c091a]"></span>
            </button>
    
            <div className="flex items-center gap-3 pl-6 border-l border-white/10 text-right">
              <div className="hidden md:block">
                <p className="text-sm font-bold text-white tracking-wide">{user?.userName || 'Admin'}</p>
                <p className="text-[10px] text-primary-purple font-bold uppercase tracking-widest">Platform Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-purple to-indigo-600 flex items-center justify-center text-white font-bold border border-white/10 shadow-lg shadow-primary-purple/20">
                {user?.userName ? user.userName.charAt(0) : <User size={18} />}
              </div>
            </div>
          </div>
        </header>
      );
    };
    
    export default AdminHeader;
