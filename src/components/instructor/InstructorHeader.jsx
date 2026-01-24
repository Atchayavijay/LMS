import React from 'react';
import { useSelector } from 'react-redux';
import { Search, Bell, Mail, User } from 'lucide-react';

const InstructorHeader = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="h-20 bg-[#0c091a]/50 backdrop-blur-md border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex-grow max-w-md">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary-pink transition-colors" />
          <input 
            type="text" 
            placeholder="Search students, courses, assignments..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-12 pr-6 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-primary-pink/30 focus:bg-white/[0.05] transition-all"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all">
          <Mail size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary-pink rounded-full border-2 border-[#0c091a]"></span>
        </button>
        <button className="relative p-2 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary-purple rounded-full border-2 border-[#0c091a]"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-4 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-none">{user?.name || 'Instructor Name'}</p>
            <p className="text-[11px] text-white/40 uppercase tracking-widest mt-1">Instructor</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-pink to-primary-purple p-[1px]">
            <div className="w-full h-full rounded-xl bg-[#0c091a] flex items-center justify-center">
              <User size={20} className="text-white/70" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default InstructorHeader;
