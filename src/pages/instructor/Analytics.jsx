import React from 'react';
import { TrendingUp, BarChart3, PieChart, Calendar } from 'lucide-react';

const PlaceholderCard = ({ title, icon: Icon }) => (
  <div className="bg-white/[0.03] border border-white/5 rounded-[32px] p-8 min-h-[300px] flex flex-col items-center justify-center gap-4 group hover:border-white/10 transition-all">
    <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/10 group-hover:text-primary-pink group-hover:scale-110 transition-all">
      <Icon size={40} />
    </div>
    <div className="text-center">
      <h3 className="text-white font-bold text-lg">{title} Dashboard</h3>
      <p className="text-white/30 text-xs mt-1 uppercase tracking-widest font-bold">Data visualization incoming</p>
    </div>
  </div>
);

const Analytics = () => {
  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white italic">Analytics & Reports</h1>
          <p className="text-white/40 mt-1">Deep dive into your sales, engagement, and performance data.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all">
          <Calendar size={14} /> Last 30 Days
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PlaceholderCard title="Revenue Growth" icon={TrendingUp} />
        <PlaceholderCard title="Student Engagement" icon={BarChart3} />
        <PlaceholderCard title="Content Distribution" icon={PieChart} />
        <PlaceholderCard title="Traffic Sources" icon={BarChart3} />
      </div>
    </div>
  );
};

export default Analytics;
