import React from 'react';
import { Search, Filter, Mail, MoreHorizontal, User } from 'lucide-react';

const Students = () => {
  const students = [
    { name: 'Sarah Johnson', email: 'sarah.j@example.com', courses: 3, progress: '78%', lastActive: '2h ago' },
    { name: 'Michael Chen', email: 'm.chen@example.com', courses: 1, progress: '42%', lastActive: '5h ago' },
    { name: 'Alex Rivera', email: 'arivera@example.com', courses: 5, progress: '95%', lastActive: 'Yesterday' },
    { name: 'Emma Watson', email: 'e.watson@example.com', courses: 2, progress: '12%', lastActive: '3d ago' },
    { name: 'David Smith', email: 'd.smith@example.com', courses: 2, progress: '60%', lastActive: 'Just now' },
  ];

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-white italic">Students</h1>
        <p className="text-white/40 mt-1">Manage your student community and track individual progress.</p>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white/[0.02] border border-white/5 p-4 rounded-3xl">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            className="w-full bg-[#0c091a]/50 border border-white/5 rounded-full pl-12 pr-6 py-2.5 text-sm text-white focus:outline-none focus:border-primary-pink/30 transition-all"
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 rounded-full bg-white/5 text-white/50 text-xs font-bold hover:text-white transition-all">
            <Filter size={14} /> Filter By Course
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-pink text-white text-xs font-bold hover:opacity-90 transition-all shadow-lg shadow-primary-pink/10">
            Export List
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white/[0.03] border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-8 py-5 text-white/30 text-[11px] font-bold uppercase tracking-widest">Student</th>
              <th className="px-8 py-5 text-white/30 text-[11px] font-bold uppercase tracking-widest text-center">Courses</th>
              <th className="px-8 py-5 text-white/30 text-[11px] font-bold uppercase tracking-widest text-center">Avg. Progress</th>
              <th className="px-8 py-5 text-white/30 text-[11px] font-bold uppercase tracking-widest text-center">Last Active</th>
              <th className="px-8 py-5 text-white/30 text-[11px] font-bold uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {students.map((student, i) => (
              <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:scale-110 group-hover:bg-primary-pink/10 group-hover:text-primary-pink transition-all">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm leading-none">{student.name}</p>
                      <p className="text-white/30 text-[11px] mt-1">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="bg-white/5 text-white/70 text-xs font-bold px-3 py-1 rounded-full border border-white/5">
                    {student.courses} Courses
                  </span>
                </td>
                <td className="px-8 py-5">
                   <div className="max-w-[120px] mx-auto space-y-1.5">
                     <div className="flex justify-between text-[10px] text-white/40 font-bold uppercase tracking-tighter">
                       <span>Progress</span>
                       <span>{student.progress}</span>
                     </div>
                     <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-primary-pink rounded-full" style={{ width: student.progress }} />
                     </div>
                   </div>
                </td>
                <td className="px-8 py-5 text-center text-white/60 text-xs font-medium">
                  {student.lastActive}
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                      <Mail size={16} />
                    </button>
                    <button className="p-2 rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
