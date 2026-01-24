import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  ArrowLeft, 
  ChevronRight, 
  Layout, 
  BookOpen, 
  Zap, 
  BarChart2, 
  MessageSquare, 
  HelpCircle, 
  FileCheck, 
  Star, 
  Bot,
  Loader2
} from 'lucide-react';
import { Button } from '../../components/ui';
import { updateCourse } from '../../features/courses/store/courseSlice';
import courseService from '../../features/courses/services/courseService';
import { 
    InformationTab, 
    CurriculumTab, 
    DripTab, 
    ReportTab, 
    CommentsTab, 
    QnATab, 
    AssignmentResponsesTab, 
    ReviewsTab, 
    ChatBotAnalyticsTab 
} from '../../features/instructor/components/course-editor';

const CreateCourse = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const isEditMode = !!id;
    
    // UI State
    const [activeTab, setActiveTab] = useState('Curriculum');
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(isEditMode);
    const [expandedChapterId, setExpandedChapterId] = useState(null);
    const [selectionChapterId, setSelectionChapterId] = useState(null);
    const [uploadingChapterId, setUploadingChapterId] = useState(null);
    const fileInputRef = useRef(null);
    const [activeFileUploadType, setActiveFileUploadType] = useState(null);
    const [activeReportSubTab, setActiveReportSubTab] = useState('Course Completion');
    const [activeCommentStatus, setActiveCommentStatus] = useState('All');
    const [activeDripType, setActiveDripType] = useState('Student enrolment date');

    // Data State
    const [courseDetails, setCourseDetails] = useState({
        title: '',
        status: 'Draft',
        description: '',
        subtitle: '',
        price: 0,
        level: 'beginner',
        category: '',
        sections: [],
        image: '',
        thumbnail: '',
        validity: false,
        validityDays: 30,
        showAsLocked: false,
        disableQnA: false,
        disableComments: false
    });

    const loadCourse = async () => {
        try {
            const response = await courseService.getCourseById(id);
            if (response.success) {
                const data = response.data;
                setCourseDetails({
                    ...data,
                    sections: data.sections || []
                });
            }
        } catch (error) {
            console.error("Failed to load course", error);
        } finally {
            setIsLoadingData(false);
        }
    };

    useEffect(() => {
        if (isEditMode) {
            loadCourse();
        }
    }, [id, isEditMode]);

    const handleSave = async (status = null) => {
        // Validate required fields
        if (!courseDetails.title || !courseDetails.title.trim()) {
            alert("Course title is required!");
            return;
        }

        if (!courseDetails.description || !courseDetails.description.trim()) {
            alert("Course description is required!");
            return;
        }

        if (!courseDetails.image) {
            alert("Course cover image is required!");
            return;
        }

        setIsSaving(true);
        try {
            const finalStatus = status || courseDetails.status;
            const payload = { 
                ...courseDetails, 
                status: finalStatus,
                // Ensure all fields are properly formatted
                title: courseDetails.title.trim(),
                description: courseDetails.description.trim(),
            };

            const response = await dispatch(updateCourse({ id, courseData: payload })).unwrap();
            
            if (response.success) {
                alert("✅ Course information saved successfully!");
                // Reload the course to get the latest data
                await loadCourse();
            } else {
                throw new Error(response.message || "Failed to update course");
            }
        } catch (error) {
            console.error("Save error:", error);
            const errorMsg = error.response?.data?.message || error.message || "Unknown error occurred";
            alert("❌ Failed to save course: " + errorMsg);
        } finally {
            setIsSaving(false);
        }
    };

    const addSection = async (title) => {
        try {
            const response = await courseService.createSection({ course: id, title });
            if (response.success) {
                await loadCourse();
            }
        } catch (error) {
            alert("Failed to create section");
        }
    };

    const deleteSection = async (sectionId) => {
        if (window.confirm('Delete this entire section?')) {
            try {
                await courseService.deleteSection(sectionId);
                await loadCourse();
            } catch (error) {
                alert("Failed to delete section");
            }
        }
    };

    const addChapter = async (sectionId) => {
        try {
            const response = await courseService.createChapter({ section: sectionId, title: 'New Chapter' });
            if (response.success) {
                const newChapter = response.data;
                await loadCourse();
                setExpandedChapterId(newChapter._id || newChapter.id);
            }
        } catch (error) {
            alert("Failed to create chapter");
        }
    };

    const updateChapter = async (sectionId, chapterId, updates) => {
        try {
            const updatedSections = courseDetails.sections.map(sec => {
                const secId = sec._id || sec.id;
                if (secId === sectionId) {
                    return {
                        ...sec,
                        chapters: sec.chapters.map(ch => (ch._id || ch.id) === chapterId ? { ...ch, ...updates } : ch)
                    };
                }
                return sec;
            });
            setCourseDetails({ ...courseDetails, sections: updatedSections });
            await courseService.updateChapter(chapterId, updates);
        } catch (error) {
            console.error("Failed to update chapter", error);
        }
    };

    const deleteChapter = async (chapterId) => {
        if (window.confirm('Delete this chapter?')) {
            try {
                await courseService.deleteChapter(chapterId);
                await loadCourse();
            } catch (error) {
                alert("Failed to delete chapter");
            }
        }
    };

    const handleContentTrigger = (type, chapterId) => {
        setActiveFileUploadType(type);
        setUploadingChapterId(chapterId);
        
        // Certain types trigger file explorer
        if (['video', 'audio', 'image', 'resource'].includes(type)) {
            fileInputRef.current?.click();
        } else if (type === 'article') {
            // For now, prompt for article body (premium editor would go here)
            const body = prompt("Enter article content:");
            if (body) finalizeContentCreation(type, chapterId, { body });
        } else if (type === 'quiz') {
             // For now, create a basic quiz
            finalizeContentCreation(type, chapterId, { title: 'New Quiz' });
        }
    };

    const onFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !activeFileUploadType) return;

        try {
            setIsSaving(true);
            const uploadRes = await courseService.uploadMedia(file);
            if (uploadRes.success) {
                const { url } = uploadRes.data;

                // Handle Course Level Uploads (No chapter ID)
                if (activeFileUploadType === 'course-cover') {
                    setCourseDetails(prev => ({ ...prev, image: url }));
                    // Auto-save the course with the new image
                    const payload = { ...courseDetails, image: url };
                    await dispatch(updateCourse({ id, courseData: payload })).unwrap();
                    alert("✅ Cover image uploaded and saved successfully!");
                    await loadCourse();
                    return;
                }
                if (activeFileUploadType === 'course-thumbnail') {
                    setCourseDetails(prev => ({ ...prev, thumbnail: url }));
                    // Auto-save the course with the new thumbnail
                    const payload = { ...courseDetails, thumbnail: url };
                    await dispatch(updateCourse({ id, courseData: payload })).unwrap();
                    alert("✅ Thumbnail uploaded and saved successfully!");
                    await loadCourse();
                    return;
                }

                // Handle Chapter Level Uploads
                if (!uploadingChapterId) return;

                const contentData = {
                    chapter: uploadingChapterId,
                    type: activeFileUploadType,
                    metadata: { fileName: file.name, fileSize: file.size }
                };

                // Add type-specific fields
                if (activeFileUploadType === 'video') contentData.videoUrl = url;
                else if (activeFileUploadType === 'audio') contentData.audioUrl = url;
                else if (activeFileUploadType === 'image') contentData.imageUrl = url;
                else contentData.fileUrl = url;

                await finalizeContentCreation(activeFileUploadType, uploadingChapterId, contentData);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            alert("❌ Upload failed: " + errorMsg);
        } finally {
            setIsSaving(false);
            setUploadingChapterId(null);
            setActiveFileUploadType(null);
            // Reset file input
            if (e.target) e.target.value = '';
        }
    };

    const finalizeContentCreation = async (type, chapterId, data) => {
        try {
            const res = await courseService.createContent(type, { ...data, chapter: chapterId });
            if (res.success) {
                await loadCourse();
                setSelectionChapterId(null);
            }
        } catch (error) {
            console.error("Failed to create content", error);
        }
    };

    const sidebarItems = [
        { label: 'Curriculum', icon: BookOpen },
        { label: 'Information', icon: Layout },
        { label: 'Drip', icon: Zap, badge: 'BETA' },
        { label: 'Report', icon: BarChart2 },
        { label: 'Comments', icon: MessageSquare },
        { label: 'QnA', icon: HelpCircle },
        { label: 'Assignment Responses', icon: FileCheck },
        { label: 'Reviews', icon: Star },
        { label: 'QnA Chatbot', icon: Bot, badge: 'EXPERIMENTAL' },
    ];

    if (isLoadingData) {
        return (
            <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Loading Editor...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-obsidian flex flex-col font-satoshi text-white">
            {/* Hidden File Input for Uploads */}
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={onFileChange}
                accept={
                    activeFileUploadType === 'video' ? 'video/*' :
                    activeFileUploadType === 'audio' ? 'audio/*' :
                    activeFileUploadType === 'image' ? 'image/*' :
                    undefined
                }
            />

            <header className="h-[72px] bg-obsidian border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/instructor-dashboard/my-courses')} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                        <ArrowLeft size={20} className="text-white/60" />
                    </button>
                    <div className="flex items-center gap-3">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-pink to-primary-purple font-black text-xl italic tracking-tighter">Kattran</span>
                        <div className="w-px h-6 bg-white/10 mx-1" />
                        <h1 className="text-[17px] font-bold text-white/90">{courseDetails.title || 'Untitled Course'}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button 
                        onClick={() => handleSave('Draft')} 
                        variant="secondary"
                        className="px-6 h-11 rounded-lg text-white text-sm font-bold border border-white/10 hover:bg-white/10 transition-all font-satoshi"
                    >
                        {isSaving ? 'Saving...' : 'Preview changes'}
                    </Button>
                    <Button 
                        onClick={() => handleSave('Published')} 
                        className="px-8 h-11 rounded-lg bg-primary-pink text-white text-sm font-bold shadow-lg shadow-primary-pink/20 hover:bg-primary-pink/90 transition-all font-bold font-satoshi"
                    >
                        Publish
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                <aside className="w-[300px] bg-obsidian border-r border-white/5 flex flex-col py-4 overflow-y-auto">
                    {sidebarItems.map((item, idx) => (
                        <button key={idx} onClick={() => setActiveTab(item.label)} className={`w-full flex items-center justify-between px-6 py-4 transition-all group ${activeTab === item.label ? 'bg-primary-pink/10' : 'hover:bg-white/5'}`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${activeTab === item.label ? 'bg-primary-pink text-white' : 'bg-white/5 text-white/20 group-hover:text-white/40'}`}>
                                    <item.icon size={20} />
                                </div>
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center gap-2 text-left">
                                        <span className={`text-[15px] font-bold ${activeTab === item.label ? 'text-white' : 'text-white/40'}`}>{item.label}</span>
                                        {item.badge && <span className="text-[8px] font-black bg-primary-pink text-white px-1.5 py-0.5 rounded uppercase tracking-tighter">{item.badge}</span>}
                                    </div>
                                </div>
                            </div>
                            <ChevronRight size={18} className={`${activeTab === item.label ? 'text-white' : 'text-white/10'}`} />
                        </button>
                    ))}
                </aside>

                <main className="flex-1 overflow-y-auto p-12 bg-obsidian">
                    <div className="max-w-5xl mx-auto">
                        {activeTab === 'Curriculum' && (
                            <CurriculumTab 
                                sections={courseDetails.sections} 
                                onAddSection={addSection}
                                onAddChapter={addChapter}
                                onDeleteSection={deleteSection}
                                onDeleteChapter={deleteChapter}
                                onUpdateChapter={updateChapter}
                                onTriggerContent={handleContentTrigger}
                                expandedChapterId={expandedChapterId}
                                setExpandedChapterId={setExpandedChapterId}
                                selectionChapterId={selectionChapterId}
                                setSelectionChapterId={setSelectionChapterId}
                                isSaving={isSaving}
                            />
                        )}
                        {activeTab === 'Information' && (
                            <InformationTab 
                                courseDetails={courseDetails}
                                setCourseDetails={setCourseDetails}
                                fileInputRef={fileInputRef}
                                setActiveFileUploadType={setActiveFileUploadType}
                                handleSave={handleSave}
                            />
                        )}
                        {activeTab === 'Drip' && (
                            <DripTab 
                                courseDetails={courseDetails}
                                activeDripType={activeDripType}
                                setActiveDripType={setActiveDripType}
                            />
                        )}
                        {activeTab === 'Report' && (
                            <ReportTab 
                                activeReportSubTab={activeReportSubTab}
                                setActiveReportSubTab={setActiveReportSubTab}
                            />
                        )}
                        {activeTab === 'Comments' && (
                            <CommentsTab 
                                activeCommentStatus={activeCommentStatus}
                                setActiveCommentStatus={setActiveCommentStatus}
                            />
                        )}
                        {activeTab === 'QnA' && (
                            <QnATab />
                        )}
                        {activeTab === 'Assignment Responses' && (
                            <AssignmentResponsesTab />
                        )}
                        {activeTab === 'Reviews' && (
                            <ReviewsTab />
                        )}
                        {activeTab === 'QnA Chatbot' && (
                            <ChatBotAnalyticsTab />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CreateCourse;
