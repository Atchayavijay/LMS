import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, DollarSign, BarChart3, TrendingUp, ArrowUpRight } from 'lucide-react';
import CourseStatsTable from '../../features/instructor/components/CourseStatsTable';

const Dashboard = () => {
  const navigate = useNavigate();
  const stats = [
    { label: 'Total Students', value: '1,284', icon: Users, color: 'text-blue-400', trend: '+12%' },
    { label: 'Active Courses', value: '12', icon: BookOpen, color: 'text-primary-pink', trend: '+2' },
    { label: 'Total Revenue', value: '$14,250', icon: DollarSign, color: 'text-green-400', trend: '+24%' },
    { label: 'Instructor Rating', value: '4.9/5', icon: BarChart3, color: 'text-primary-purple', trend: '+0.1' },
  ];

  const dummyCourses = [
    { name: 'Advanced Node.js Architecture', enrollments: 432, revenue: 2160 },
    { name: 'React Performance at Scale', enrollments: 128, revenue: 1540 },
    { name: 'UI Transformation Masterclass', enrollments: 94, revenue: 890 },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-white italic">Overview</h1>
        <p className="text-white mt-1">Track your performance and student engagement.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-[28px] backdrop-blur-sm hover:border-white/10 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                <stat.icon size={22} />
              </div>
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded-full uppercase tracking-widest">
                <TrendingUp size={10} /> {stat.trend}
              </span>
            </div>
            <p className="text-white text-[11px] font-bold uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Top Performing Courses</h2>
            <button className="text-primary-pink text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
              View All <ArrowUpRight size={14} />
            </button>
          </div>
          <CourseStatsTable courses={dummyCourses} />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => navigate('/instructor-dashboard/create-course')}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary-pink/30 hover:bg-white/[0.05] transition-all text-left"
            >
              <div className="w-10 h-10 rounded-full bg-primary-pink/10 flex items-center justify-center text-primary-pink">
                <PlusCircle size={20} />
              </div>
              <div>
                <p className="text-white text-sm font-bold">New Course</p>
                <p className="text-muted-white text-[11px]">Draft a new curriculum</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal icon for button
const PlusCircle = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
);

export default Dashboard;
