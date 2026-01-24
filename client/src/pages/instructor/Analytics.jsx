import React from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, Clock, ArrowUpRight } from 'lucide-react';

const Analytics = () => {
  const stats = [
    { label: 'Enrollment Rate', value: '45.8%', icon: TrendingUp, color: 'text-green-400', trend: '+5.2%' },
    { label: 'Course Completion', value: '72%', icon: CheckCircle, color: 'text-primary-pink', trend: '+1.4%' },
    { label: 'Average Watch Time', value: '18.5m', icon: Clock, color: 'text-primary-purple', trend: '-2%' },
    { label: 'Student Satisfaction', value: '4.8/5', icon: Star, color: 'text-amber-400', trend: '0.0' },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-white italic">Analytics</h1>
        <p className="text-white mt-1">Deep dive into your course performance and student behavior.</p>
      </header>

      {/* Analytics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-[28px] backdrop-blur-sm hover:border-white/10 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <span className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'} px-2 py-1 rounded-full uppercase tracking-widest`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-white text-[11px] font-bold uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[32px] min-h-[400px] flex flex-col justify-center items-center text-center">
             <div className="w-16 h-16 rounded-3xl bg-primary-pink/10 flex items-center justify-center text-primary-pink mb-4">
                <BarChart3 size={32} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Revenue Growth</h3>
             <p className="text-muted-white max-w-xs">Visualization for your revenue over time will appear here.</p>
        </div>

        <div className="bg-white/[0.03] border border-white/5 p-8 rounded-[32px] min-h-[400px] flex flex-col justify-center items-center text-center">
             <div className="w-16 h-16 rounded-3xl bg-primary-purple/10 flex items-center justify-center text-primary-purple mb-4">
                <Users size={32} />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">Engagement Metrics</h3>
             <p className="text-muted-white max-w-xs">Detailed student engagement and activity charts are being prepared.</p>
        </div>
      </div>
    </div>
  );
};

// Helper Icons
const CheckCircle = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);

const Star = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);

export default Analytics;
