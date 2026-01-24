import React from 'react';
import { useSelector } from 'react-redux';
import { BookOpen, CheckCircle, Clock, Trophy } from 'lucide-react';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    { label: 'In Progress', value: '4', icon: Clock, color: 'text-primary-pink' },
    { label: 'Completed', value: '12', icon: CheckCircle, color: 'text-green-400' },
    { label: 'Certificates', value: '8', icon: Trophy, color: 'text-primary-purple' },
    { label: 'Total Hours', value: '156', icon: BookOpen, color: 'text-blue-400' },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-white italic">
          Welcome back, {user?.name || 'Scholar'}
        </h1>
        <p className="text-white/50 mt-2">Pick up right where you left off and keep building your future.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/[0.03] border border-white/5 p-6 rounded-[24px] backdrop-blur-sm hover:border-white/10 transition-all group">
            <div className={`p-3 rounded-xl bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-white/40 text-sm font-medium uppercase tracking-tight">{stat.label}</p>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Active Courses */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white">Currently Learning</h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-pink/5 blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <span className="text-primary-pink text-sm font-bold uppercase">Continuing</span>
              <h3 className="text-2xl font-bold text-white mt-2">Advanced Tailwind Styling & Micro-animations</h3>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Module 4: Framer Motion Masterclass</span>
                  <span className="text-white">65%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[65%] h-full bg-gradient-to-r from-primary-pink to-primary-purple" />
                </div>
              </div>
              <div className="mt-8">
                <Button>Resume Lesson</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Activity/Recommendations */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Achievements</h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6">
            <ul className="space-y-6">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-primary-purple/10 flex items-center justify-center border border-primary-purple/20">
                    <Trophy className="w-5 h-5 text-primary-purple" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">React Architect Level {i}</p>
                    <p className="text-white/40 text-[12px]">Earned 2 days ago</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
