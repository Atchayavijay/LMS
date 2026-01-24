import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  LayoutDashboard, FileText, Video, Settings, ChevronLeft, Save, 
  Upload, Image as ImageIcon, CheckCircle, AlertCircle
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { addCourse, updateCourse, setActiveCourse } from '../../features/courses/store/courseSlice';

// --- Sub-Components (will extract later) ---

const CourseInformation = ({ data, onChange }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <FileText size={20} className="text-primary-pink" />
          Basic Details
        </h3>
        
        <div className="space-y-6">
          <Input 
            label="Course Title" 
            value={data.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="e.g. Master the art of UI Design" 
          />
          
          <div className="space-y-2">
            <label className="text-white text-[15px] font-normal ml-1">Short Description</label>
            <textarea 
              rows={4}
              value={data.description || ''}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="Give a brief summary of what students will learn..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-3 px-6 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-white text-[15px] font-normal ml-1">Category</label>
              <select 
                value={data.category || ''}
                onChange={(e) => onChange('category', e.target.value)}
                className="w-full bg-white/[0.05] border border-white/10 rounded-full py-3 px-6 text-white text-[14px] focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">Select Category</option>
                <option value="Web Development">Web Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Mobile Apps">Mobile Apps</option>
                <option value="Data Science">Data Science</option>
              </select>
            </div>
            <Input 
              label="Price ($)" 
              type="number" 
              value={data.price || ''}
              onChange={(e) => onChange('price', parseFloat(e.target.value))}
              placeholder="49.99" 
            />
          </div>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <ImageIcon size={20} className="text-primary-purple" />
          Course Media
        </h3>
        
        <div className="space-y-4">
            <p className="text-white font-bold text-sm tracking-tight px-1">Thumbnail</p>
            <div className="w-full aspect-video rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-primary-pink/30 hover:bg-white/[0.02] transition-all cursor-pointer group relative overflow-hidden">
              {data.thumbnail ? (
                <img src={data.thumbnail} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-primary-pink group-hover:scale-110 transition-all">
                    <Upload size={28} />
                  </div>
                  <div className="text-center">
                    <p className="text-white/60 text-sm font-bold">Click to upload thumbnail</p>
                    <p className="text-white/30 text-xs mt-1">1280x720 (16:9) recommended</p>
                  </div>
                </>
              )}
            </div>
          </div>
      </div>
    </div>
  );
};


import { Trash2, Edit2, Plus, ChevronDown, ChevronUp, FileCode, PlayCircle } from 'lucide-react';

const CurriculumBuilder = ({ data, onChange }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addSection = () => {
    const newSection = {
      id: Date.now(),
      title: 'New Section',
      lectures: []
    };
    onChange('curriculum', [...(data.curriculum || []), newSection]);
    setExpandedSections(prev => ({ ...prev, [newSection.id]: true }));
  };

  const deleteSection = (sectionId) => {
    onChange('curriculum', data.curriculum.filter(s => s.id !== sectionId));
  };

  const updateSectionTitle = (id, newTitle) => {
    const updated = data.curriculum.map(s => 
      s.id === id ? { ...s, title: newTitle } : s
    );
    onChange('curriculum', updated);
  };

  const addLecture = (sectionId, type = 'video') => {
    const updated = data.curriculum.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          lectures: [...s.lectures, { id: Date.now(), title: 'New Lecture', type }]
        };
      }
      return s;
    });
    onChange('curriculum', updated);
  };

  const deleteLecture = (sectionId, lectureId) => {
    const updated = data.curriculum.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          lectures: s.lectures.filter(l => l.id !== lectureId)
        };
      }
      return s;
    });
    onChange('curriculum', updated);
  };

  const updateLectureTitle = (sectionId, lectureId, newTitle) => {
    const updated = data.curriculum.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          lectures: s.lectures.map(l => l.id === lectureId ? { ...l, title: newTitle } : l)
        };
      }
      return s;
    });
    onChange('curriculum', updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
         <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Video size={20} className="text-primary-pink" />
            Curriculum
         </h3>
         <Button onClick={addSection} className="flex items-center gap-2 text-xs h-9">
            <Plus size={16} /> Add Section
         </Button>
      </div>

      <div className="space-y-4">
        {(data.curriculum || []).length === 0 && (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
             <p className="text-white/40 mb-4">No sections added yet.</p>
             <Button variant="secondary" onClick={addSection}>Start Adding Content</Button>
          </div>
        )}

        {(data.curriculum || []).map((section, index) => (
          <div key={section.id} className="bg-white/[0.03] border border-white/5 rounded-2xl overflow-hidden transition-all">
            <div className="p-4 flex items-center gap-4 bg-white/[0.02] border-b border-white/5">
              <button 
                onClick={() => toggleSection(section.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 text-white/40 transition-all"
              >
                {expandedSections[section.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              <div className="flex-grow flex flex-col">
                <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest mb-1">Section {index + 1}</span>
                <input 
                  type="text" 
                  value={section.title}
                  onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                  className="bg-transparent text-white font-bold text-lg focus:outline-none focus:border-b border-primary-pink/50 w-full"
                />
              </div>

              <div className="flex items-center gap-2">
                 <button onClick={() => deleteSection(section.id)} className="p-2 text-white/20 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                 </button>
              </div>
            </div>

            {expandedSections[section.id] && (
              <div className="p-4 bg-black/20 space-y-3">
                 {section.lectures.map((lecture, lIndex) => (
                   <div key={lecture.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40">
                         {lecture.type === 'video' ? <PlayCircle size={16} /> : <FileCode size={16} />}
                      </div>
                      <div className="flex-grow">
                        <input 
                          type="text" 
                          value={lecture.title}
                          onChange={(e) => updateLectureTitle(section.id, lecture.id, e.target.value)}
                          className="bg-transparent text-white text-sm font-medium focus:outline-none w-full"
                        />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                         <button onClick={() => deleteLecture(section.id, lecture.id)} className="text-white/20 hover:text-red-400">
                            <Trash2 size={14} />
                         </button>
                      </div>
                   </div>
                 ))}

                 <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => addLecture(section.id, 'video')}
                      className="flex-grow py-3 rounded-xl border border-dashed border-white/10 text-white/40 text-xs font-bold hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={14} /> Add Video
                    </button>
                    <button 
                      onClick={() => addLecture(section.id, 'file')}
                      className="flex-grow py-3 rounded-xl border border-dashed border-white/10 text-white/40 text-xs font-bold hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={14} /> Add Resource
                    </button>
                 </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---

const CreateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);

  const [activeTab, setActiveTab] = useState('information');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    thumbnail: null,
    status: 'Draft',
    sections: 0,
    lectures: 0,
    curriculum: []
  });

  // Load existing data if editing
  useEffect(() => {
    if (id) {
      const course = courses.find(c => c.id === parseInt(id));
      if (course) {
        setFormData(course);
        dispatch(setActiveCourse(course));
      }
    }
  }, [id, courses, dispatch]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (id) {
      dispatch(updateCourse({ id: parseInt(id), ...formData }));
    } else {
      dispatch(addCourse(formData));
    }
    navigate('/instructor-dashboard/my-courses');
  };

  const tabs = [
    { id: 'information', label: 'Information', icon: FileText },
    { id: 'curriculum', label: 'Curriculum', icon: Video },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/instructor-dashboard/my-courses')}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white italic">
              {id ? 'Edit Course' : 'Create New Course'}
            </h1>
            <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
              {formData.title || 'Untitled Course'}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="px-6 text-xs">Preview</Button>
          <Button onClick={handleSave} className="flex items-center gap-2 px-6">
            <Save size={18} /> Save Changes
          </Button>
        </div>
      </div>

      <div className="flex gap-8 flex-grow overflow-hidden">
        {/* Sidebar Navigation */}
        <div className="w-64 flex-shrink-0 flex flex-col gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all text-left group ${
                activeTab === tab.id 
                  ? 'bg-white/10 text-white' 
                  : 'hover:bg-white/5 text-white/40 hover:text-white'
              }`}
            >
              <tab.icon size={20} className={activeTab === tab.id ? 'text-primary-pink' : 'text-white/40 group-hover:text-white transition-colors'} />
              <div className="flex flex-col">
                <span className="text-sm font-bold">{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="text-[10px] text-primary-pink/80 font-medium">Active Section</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar">
          {activeTab === 'information' && (
            <CourseInformation data={formData} onChange={handleInputChange} />
          )}
          {activeTab === 'curriculum' && (
            <CurriculumBuilder data={formData} onChange={handleInputChange} />
          )}
          {activeTab === 'settings' && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-white/[0.03] border border-white/5 rounded-3xl p-8">
                   <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Settings size={20} className="text-primary-pink" />
                      Course Settings
                   </h3>
                   
                   <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl mb-6">
                      <div className="flex flex-col">
                         <span className="text-white font-bold text-lg">Course Status</span>
                         <span className="text-white/40 text-sm">Your course is currently {formData.status}.</span>
                      </div>
                      <button 
                        onClick={() => handleInputChange('status', formData.status === 'Published' ? 'Draft' : 'Published')}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                          formData.status === 'Published' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/20' 
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'
                        }`}
                      >
                         {formData.status === 'Published' ? 'Published' : 'Draft'}
                      </button>
                   </div>

                   <hr className="border-white/5 my-6" />

                   <div className="flex items-center justify-between p-4 border border-red-500/20 bg-red-500/5 rounded-2xl">
                      <div className="flex flex-col">
                         <span className="text-red-400 font-bold text-lg">Delete Course</span>
                         <span className="text-red-400/60 text-sm">This action cannot be undone.</span>
                      </div>
                      <button 
                         className="px-6 py-2 rounded-xl bg-red-500/10 text-red-500 font-bold text-sm hover:bg-red-500/20 transition-all flex items-center gap-2"
                      >
                         <Trash2 size={16} /> Delete Forever
                      </button>
                   </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
