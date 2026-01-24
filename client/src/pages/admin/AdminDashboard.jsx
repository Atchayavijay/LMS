import React from 'react';
    import { Users, UserCheck, BookOpen, TrendingUp, ShieldAlert } from 'lucide-react';
    
    const StatCard = ({ label, value, icon: Icon, color, trend }) => (
      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all group">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-500 shadow-lg shadow-${color}-500/5`}>
            <Icon size={24} />
          </div>
          {trend && (
            <span className="flex items-center gap-1 text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-lg">
              <TrendingUp size={12} /> {trend}
            </span>
          )}
        </div>
        <h3 className="text-white/40 text-sm font-medium mb-1">{label}</h3>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
      </div>
    );
    
    const AdminDashboard = () => {
      // These would eventually come from the API
      const stats = [
        { label: 'Total Users', value: '1,284', icon: Users, color: 'blue', trend: '+12%' },
        { label: 'Active Instructors', value: '42', icon: UserCheck, color: 'purple', trend: '+5%' },
        { label: 'Total Courses', value: '156', icon: BookOpen, color: 'pink', trend: '+18%' },
        { label: 'Security Alerts', value: '0', icon: ShieldAlert, color: 'green' },
      ];
    
      return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header>
            <h1 className="text-3xl font-bold text-white tracking-tight italic">Platform Overview</h1>
            <p className="text-white/40 mt-1 font-medium">Welcome back, Admin. Here's what's happening today.</p>
          </header>
    
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
    
          {/* Quick Actions or Recent Activity Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8">
              <h2 className="text-xl font-bold text-white mb-6">Recent Platform Activity</h2>
              <div className="space-y-6">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-primary-purple/20 group-hover:text-primary-purple transition-all">
                        <Users size={18} />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-bold text-white/80 group-hover:text-white">New user registration</p>
                        <p className="text-xs text-white/30">User #4829 joined the platform</p>
                      </div>
                      <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest leading-none">2m ago</span>
                   </div>
                 ))}
              </div>
              <button className="w-full mt-10 py-3 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-white/40 hover:text-white hover:bg-white/10 transition-all">
                View All Activity
              </button>
            </div>
    
            <div className="bg-gradient-to-br from-primary-purple/10 to-transparent border border-primary-purple/10 rounded-[32px] p-8 flex flex-col justify-center text-center">
               <div className="w-20 h-20 rounded-3xl bg-primary-purple/20 flex items-center justify-center mx-auto mb-6 text-primary-purple shadow-2xl shadow-primary-purple/30 border border-primary-purple/20">
                  <ShieldAlert size={40} />
               </div>
               <h3 className="text-2xl font-bold text-white mb-3">System Health: Optima</h3>
               <p className="text-white/40 max-w-xs mx-auto mb-8 font-medium italic">"The infrastructure is performing at peak efficiency. No immediate actions required."</p>
               <div className="flex justify-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20">Active</span>
                  <span className="px-3 py-1 rounded-full bg-white/5 text-white/40 text-[10px] font-black uppercase tracking-widest border border-white/5">v1.2.0</span>
               </div>
            </div>
          </div>
        </div>
      );
    };
    
    export default AdminDashboard;
