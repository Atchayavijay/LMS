import React from 'react';
import { useSelector } from 'react-redux';
import { Users, BookOpen, DollarSign, BarChart3, PlusCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import CourseStatsTable from '../../features/instructor/components/CourseStatsTable';

const InstructorDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const stats = [
    { label: 'Total Students', value: '1,284', icon: Users, color: 'text-blue-400' },
    { label: 'Active Courses', value: '12', icon: BookOpen, color: 'text-primary-pink' },
    { label: 'Total Revenue', value: '$14,250', icon: DollarSign, color: 'text-green-400' },
    { label: 'Instructor Rating', value: '4.9/5', icon: BarChart3, color: 'text-primary-purple' },
  ];

  const dummyCourses = [
    { name: 'Advanced Node.js Architecture', enrollments: 432, revenue: 2160 },
    { name: 'React Performance at Scale', enrollments: 128, revenue: 1540 },
    { name: 'UI Transformation Masterclass', enrollments: 94, revenue: 890 },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white italic">
            Instructor Panel: {user?.name || 'Expert'}
          </h1>
          <p className="text-white/50 mt-2">Manage your curriculum and monitor student progress.</p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Create New Course
        </Button>
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
        {/* Course Performance Table Component */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white">Your Courses</h2>
          <CourseStatsTable courses={dummyCourses} />
        </div>

        {/* Recent Reviews/Feed */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Student Feedback</h2>
          <div className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-primary-pink font-bold">5.0 ⭐⭐⭐⭐⭐</span>
                  <span className="text-white/30">12h ago</span>
                </div>
                <p className="text-white/80 text-sm italic">"The way you explain complex concepts like microservices is just amazing. Thank you!"</p>
                <p className="text-white/40 text-xs">By Sarah J.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
