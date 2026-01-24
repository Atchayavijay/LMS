import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  BookOpen, 
  GripHorizontal, 
  ChevronDown,
  Eye,
  FileText,
  Copy,
  Trash2,
  Loader2,
} from 'lucide-react';

// UI Components
import { Button, Card, Badge } from '../../components/ui';

// Feature Components
import InitializeCourseModal from '../../features/courses/components/InitializeCourseModal';

// Store
import { 
    fetchInstructorCourses, 
    deleteCourse, 
    cloneCourse, 
    createCourse 
} from '../../features/courses/store/courseSlice';

/**
 * MyCourses Page
 * Displays instructor's courses with management options.
 */
const MyCourses = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { courses, loading } = useSelector((state) => state.courses);
    
    // UI State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCourseId, setActiveCourseId] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        dispatch(fetchInstructorCourses());
    }, [dispatch]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setActiveCourseId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCreateCourse = async (data) => {
        setIsCreating(true);
        try {
            const response = await dispatch(createCourse({ 
                title: data.title,
                status: 'Draft',
                chapters: [],
                price: 0
            })).unwrap();
            
            setIsModalOpen(false);
            navigate(`/instructor-dashboard/edit-course/${response._id}`);
        } catch (err) {
            alert("Failed to create course: " + err);
        } finally {
            setIsCreating(false);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            dispatch(deleteCourse(id));
            setActiveCourseId(null);
        }
    };

    const handleClone = (id) => {
        dispatch(cloneCourse(id));
        setActiveCourseId(null);
    };

    // Component: Empty State View
    const EmptyView = () => (
        <Card className="flex flex-col items-center justify-center py-20 text-center border-dashed mt-8">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-white/20">
                <BookOpen size={40} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No courses created yet</h3>
            <p className="text-white/40 max-w-sm mb-8">
                Start sharing your knowledge. Create your first course to get started.
            </p>
            <Button 
                onClick={() => setIsModalOpen(true)} 
                variant="primary"
                size="lg"
                className="rounded-xl flex items-center gap-2"
            >
                <Plus size={20} /> Create Your First Course
            </Button>
        </Card>
    );

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 font-satoshi relative">
            {/* Header Section */}
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <h1 className="text-[32px] font-bold text-white tracking-tight italic">Courses</h1>
                <div className="flex items-center gap-4">
                    <button className="text-white/60 hover:text-white text-sm font-bold transition-all mr-4">
                        Comments
                    </button>
                    <button className="bg-black border border-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-white/5 transition-all flex items-center gap-2">
                        <GripHorizontal size={18} /> Reorder courses
                    </button>
                    <Button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white border-none px-8 py-2.5 rounded-xl h-auto"
                    >
                        <Plus size={20} /> Create
                    </Button>
                </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="flex items-center gap-4 w-full">
                <div className="relative flex-grow">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                    <input 
                        type="text" 
                        placeholder="search by course title or description"
                        className="w-full bg-white/[0.02] border border-orange-500/20 rounded-xl pl-14 pr-6 py-3.5 text-sm text-white focus:outline-none focus:border-orange-500/50 transition-all placeholder:text-white/20 shadow-inner"
                    />
                </div>
                <div className="w-auto min-w-[140px] relative">
                    <button className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-3.5 text-sm font-medium text-white/60 flex items-center justify-between group hover:border-white/20 transition-all">
                        Course <ChevronDown size={16} className="text-white/20 group-hover:text-white/50" />
                    </button>
                </div>
            </div>

            {/* Grid Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                    <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Loading Courses...</p>
                </div>
            ) : courses.length === 0 ? (
                <EmptyView />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    {courses.map((course) => (
                        <Card key={course._id} hoverable className="flex flex-col shadow-xl">
                            {/* Thumbnail Container */}
                            <div className="aspect-[16/9] bg-white/[0.05] relative p-4 flex items-center justify-center overflow-hidden border-b border-white/5">
                                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0] opacity-80 flex items-center justify-center p-8 relative overflow-hidden">
                                    {course.thumbnail ? (
                                        <img src={course.thumbnail} alt={course.title} className="absolute inset-0 w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/10 blur-3xl rounded-full" />
                                            <svg width="100%" height="100%" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="20" cy="20" r="10" fill="white" fillOpacity="0.2"/>
                                                <circle cx="100" cy="60" r="15" fill="white" fillOpacity="0.2"/>
                                                <path d="M0 80C30 50 90 50 120 80H0Z" fill="white" fillOpacity="0.1"/>
                                            </svg>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Course Info */}
                            <div className="p-6 relative">
                                <div className="mb-3">
                                    <Badge variant={course.status === 'Published' ? 'success' : 'default'}>
                                        {course.status || 'DRAFT'}
                                    </Badge>
                                </div>
                                
                                <h3 className="text-white font-bold text-xl mb-1 tracking-tight truncate leading-tight">
                                    {course.title}
                                </h3>

                                <p className="text-white/30 text-xs mb-8 flex items-center gap-1.5">
                                    {course.chapters?.length || 0} sections <span className="text-white/10">•</span> {course.lectures || 0} lectures
                                </p>

                                <div className="flex gap-2 relative">
                                    <button 
                                        onClick={() => navigate(`/instructor-dashboard/edit-course/${course._id}`)}
                                        className="flex-grow bg-[#E5E5E5] hover:bg-white text-black h-11 rounded-xl text-sm font-bold transition-all shadow-md active:scale-[0.98]"
                                    >
                                        Edit course
                                    </button>
                                    
                                    <div className="relative">
                                        <button 
                                            onClick={() => setActiveCourseId(activeCourseId === course._id ? null : course._id)}
                                            className={`h-11 w-11 flex items-center justify-center rounded-xl transition-all border ${activeCourseId === course._id ? 'bg-white/20 text-white border-white/20' : 'bg-white/5 text-white/40 border-white/5'}`}
                                        >
                                            <MoreVertical size={20} />
                                        </button>

                                        {/* Course Actions Dropdown */}
                                        {activeCourseId === course._id && (
                                            <div 
                                               ref={dropdownRef}
                                               className="absolute bottom-full right-0 mb-3 w-56 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-hidden z-[60] border border-gray-100 animate-in slide-in-from-bottom-2 duration-200"
                                            >
                                                <div className="py-2">
                                                    <button className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                                        <Eye size={18} className="text-gray-400" /> View as customer
                                                    </button>
                                                    <button className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                                        <FileText size={18} className="text-gray-400" /> Course overview
                                                    </button>
                                                    <button 
                                                        onClick={() => handleClone(course._id)}
                                                        className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <Copy size={18} className="text-gray-400" /> Clone course
                                                    </button>
                                                    <div className="h-px bg-gray-100 my-1 mx-4" />
                                                    <button 
                                                        onClick={() => handleDelete(course._id)}
                                                        className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 size={18} /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Externalized Creation Modal */}
            <InitializeCourseModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onContinue={handleCreateCourse}
                isCreating={isCreating}
            />
        </div>
    );
};

export default MyCourses;
