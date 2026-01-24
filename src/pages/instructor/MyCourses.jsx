import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, Edit2, Eye, LayoutGrid, List as ListIcon, BookOpen } from 'lucide-react';
import Button from '../../components/ui/Button';

const MyCourses = () => {
  const navigate = useNavigate();
  const { courses } = useSelector((state) => state.courses);
  const [viewMode, setViewMode] = React.useState('grid');

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-[32px] bg-white/[0.02]">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-white/20">
        <BookOpen size={40} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">No courses created yet</h3>
      <p className="text-white/40 max-w-md mb-8">
        Start sharing your knowledge with the world. Create your first course to get started.
      </p>
      <Button onClick={() => navigate('/instructor-dashboard/create-course')} className="flex items-center gap-2 px-8">
        <Plus size={20} /> Create Your First Course
      </Button>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white italic">My Courses</h1>
          <p className="text-white/40 mt-1">Manage, edit and monitor your existing curriculum.</p>
        </div>
        {courses.length > 0 && (
          <Button onClick={() => navigate('/instructor-dashboard/create-course')} className="flex items-center gap-2">
            <Plus size={18} /> Create New Course
          </Button>
        )}
      </div>

      {courses.length > 0 && (
        <div className="flex flex-col md:flex-row gap-4 justify-between bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input 
              type="text" 
              placeholder="Search courses..."
              className="w-full bg-white/[0.03] border border-white/5 rounded-full pl-12 pr-6 py-2 text-sm text-white focus:outline-none focus:border-primary-pink/30 transition-all placeholder:text-white/20"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex bg-white/[0.03] border border-white/5 rounded-full p-1">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
              >
                <ListIcon size={16} />
              </button>
            </div>
            <select className="bg-white/[0.03] border border-white/5 rounded-full px-4 py-2 text-white/60 text-xs font-bold focus:outline-none focus:border-primary-pink/30 uppercase tracking-widest cursor-pointer">
              <option>Recent First</option>
              <option>Oldest First</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>
      )}

      {courses.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
          {courses.map((course) => (
            <div key={course.id} className={`bg-white/[0.03] border border-white/5 rounded-[32px] overflow-hidden group hover:border-white/10 transition-all ${viewMode === 'list' ? 'flex gap-6 p-4' : ''}`}>
              <div className={`${viewMode === 'list' ? 'w-64 h-36 rounded-2xl flex-shrink-0' : 'aspect-video'} bg-white/5 relative flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-pink/10 to-primary-purple/10" />
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white/10 font-bold italic text-4xl select-none">COURSE</span>
                )}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-xl bg-black/40 backdrop-blur-md text-white hover:text-primary-pink transition-all">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
              
              <div className={`${viewMode === 'list' ? 'flex-grow flex flex-col' : 'p-6'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={clsx(
                    "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tighter",
                    course.status === 'Published' ? "bg-green-400/10 text-green-400" : "bg-white/10 text-white/40"
                  )}>
                    {course.status}
                  </span>
                  <span className="text-white font-bold text-sm tracking-tight">${course.price}</span>
                </div>
                
                <h3 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-primary-pink transition-colors line-clamp-1">
                  {course.title}
                </h3>

                <div className="flex items-center gap-4 text-white/40 text-[11px] font-medium uppercase tracking-wider mb-4">
                  <span>{course.sections} Sections</span>
                  <span className="w-1 h-1 bg-white/20 rounded-full" />
                  <span>{course.lectures} Lectures</span>
                </div>
                
                {viewMode === 'list' && <div className="flex-grow" />}

                <div className={`flex items-center justify-between pt-4 border-t border-white/5 ${viewMode === 'list' ? 'mt-auto' : ''}`}>
                  <div className="flex gap-4">
                    <div className="flex flex-col">
                      <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest">Students</span>
                      <span className="text-white font-bold text-sm">{course.students}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest">Rating</span>
                      <span className="text-white font-bold text-sm">⭐ {course.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <Button variant="secondary" className="flex-grow h-10 text-xs">
                    <Edit2 size={12} className="mr-2" /> Edit Course
                  </Button>
                  <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper for conditional classes
function clsx(...args) {
  return args.filter(Boolean).join(' ');
}

export default MyCourses;
