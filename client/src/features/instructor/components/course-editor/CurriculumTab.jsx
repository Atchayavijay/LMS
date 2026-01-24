import React, { useState } from 'react';
import { Plus, Trash2, Upload, Cloud, Play, Headphones, ImageIcon, FileText, FileQuestion, Link as LinkIcon, FileEdit, X, PlayCircle, Edit2, ChevronDown, CheckCircle2, MoreVertical } from 'lucide-react';
import ContentTypeIcon from './shared/ContentTypeIcon';
import { Button, Card, Badge } from '../../../../components/ui';

/**
 * Curriculum tab for creating and organizing course content (sections and chapters)
 */
const CurriculumTab = ({ 
    sections, 
    onAddSection, 
    onAddChapter, 
    onDeleteSection, 
    onDeleteChapter, 
    onUpdateChapter, 
    onTriggerContent, 
    expandedChapterId, 
    setExpandedChapterId, 
    selectionChapterId, 
    setSelectionChapterId, 
    isSaving 
}) => {
    const [isAddingSection, setIsAddingSection] = useState(false);
    const [newSectionTitle, setNewSectionTitle] = useState('');

    const handleSaveSection = () => {
        if (newSectionTitle.trim()) {
            onAddSection(newSectionTitle);
            setNewSectionTitle('');
            setIsAddingSection(false);
        }
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 text-white">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-[28px] font-black text-white tracking-tight">Create your content</h2>
                <Button 
                    variant="secondary"
                    className="px-5 py-2.5 rounded-lg bg-primary-pink/10 text-primary-pink text-sm font-bold border border-primary-pink/20 hover:bg-primary-pink/20 transition-colors flex items-center gap-2 h-auto"
                >
                    <Upload size={18} /> Upload to Kattran Cloud
                </Button>
            </div>

            <Card className="bg-primary-purple/10 p-4 flex items-center justify-between border-primary-purple/20 mb-10 rounded-xl">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary-purple text-white rounded-full"><PlayCircle size={20} /></div>
                    <p className="text-sm font-bold text-violet-200 flex items-center gap-2 italic">Video walkthrough <span className="text-primary-purple/40 mx-2">|</span> <span className="font-medium text-violet-400 not-italic">Learn how to create a course</span></p>
                </div>
                <button className="text-violet-400 text-xs font-black uppercase tracking-widest hover:text-violet-300 transition-colors">Watch</button>
            </Card>

            <div className="space-y-12">
                {sections.map((section) => (
                    <div key={section._id || section.id} className="space-y-6">
                        <div className="flex items-center justify-between group">
                            <div className="bg-black text-white px-10 py-2.5 font-black text-[15px] shadow-lg" style={{ clipPath: 'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)' }}>
                                {section.title}
                            </div>
                            <button onClick={() => onDeleteSection(section._id || section.id)} className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-white/20 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                        </div>

                        <div className="space-y-6 pl-4 border-l-2 border-white/5 ml-4">
                            {section.chapters?.map((chapter, index) => {
                                const chId = chapter._id || chapter.id;
                                const isExpanded = expandedChapterId === chId;
                                const isSelectionMode = selectionChapterId === chId;

                                return (
                                    <div key={chId} className="relative">
                                        <div className={`group flex items-center gap-6 p-5 rounded-[20px] transition-all cursor-pointer ${isExpanded ? 'bg-white/10 shadow-2xl scale-[1.02] border border-white/10' : 'bg-white/5 hover:bg-white/[0.08] border border-transparent'}`}
                                             onClick={() => setExpandedChapterId(isExpanded ? null : chId)}>
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20 font-black italic">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-white text-[17px] tracking-tight">{chapter.title}</h3>
                                                    {chapter.type && <CheckCircle2 size={14} className="text-green-500" />}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge className="px-2 py-0.5 text-[9px]">
                                                        {chapter.type ? chapter.type : 'Empty Chapter'}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <button onClick={(e) => { e.stopPropagation(); onDeleteChapter(chId); }} className="p-2.5 rounded-xl bg-white/5 text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100">
                                                    <Trash2 size={18} />
                                                </button>
                                                <div className={`p-2.5 rounded-xl transition-all ${isExpanded ? 'bg-orange-500 text-white' : 'bg-white/5 text-white/20 group-hover:text-white/40'}`}>
                                                    <ChevronDown size={20} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                                </div>
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <Card className="mt-4 p-8 border-white/10 rounded-[32px] animate-in slide-in-from-top-4 duration-300">
                                                <div className="flex items-center justify-between mb-8">
                                                    <h4 className="text-[13px] font-black text-white/40 uppercase tracking-widest italic">Chapter Content</h4>
                                                    <button className="text-[11px] font-black text-primary-pink hover:text-pink-300 flex items-center gap-2 uppercase">
                                                        <Plus size={14} /> Add Resource
                                                    </button>
                                                </div>
                                                
                                                {chapter.type ? (
                                                    <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl group/item">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-14 h-14 rounded-2xl bg-primary-pink/10 flex items-center justify-center text-primary-pink">
                                                                <PlayCircle size={28} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-sm font-bold text-white tracking-tight">{chapter.type.toUpperCase()} Content attached</p>
                                                                <p className="text-[11px] font-medium text-white/20 italic">Last updated: Just now</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-all">
                                                            <button className="p-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"><Edit2 size={18} /></button>
                                                            <button className="p-3 rounded-xl hover:bg-red-500/10 text-white/40 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                                                            <button className="p-3 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all"><MoreVertical size={18} /></button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="relative overflow-hidden w-full h-80 rounded-[32px] border-2 border-dashed border-white/5 bg-white/[0.01] transition-all hover:bg-white/[0.02] hover:border-white/10 group cursor-pointer"
                                                         onClick={() => setSelectionChapterId(chId)}>
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                                                            <div className="relative">
                                                                <div className="w-20 h-20 rounded-[24px] bg-primary-pink/10 flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
                                                                    <Plus size={32} className="text-primary-pink" />
                                                                </div>
                                                                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] border-2 border-obsidian" />
                                                                <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-pink-500/40" />
                                                            </div>
                                                            <div className="text-center space-y-2">
                                                                <h4 className="text-lg font-black text-white italic tracking-tight">Add content to your chapter</h4>
                                                                <p className="text-[12px] font-bold text-white/20 italic">Videos, Quizzes, Articles or Audio files</p>
                                                            </div>
                                                        </div>

                                                        {isSelectionMode && (
                                                            <div className="absolute inset-0 bg-obsidian p-10 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300 z-10">
                                                                <button onClick={(e) => { e.stopPropagation(); setSelectionChapterId(null); }} className="absolute top-6 right-8 text-white/20 hover:text-white transition-colors">
                                                                    <X size={20} />
                                                                </button>
                                                                <p className="text-[15px] font-bold text-white/90 mb-10 text-center tracking-tight italic">Select the main type of content. Files and links can be added as resources.</p>
                                                                <div className="flex items-center gap-6 justify-center w-full">
                                                                    <ContentTypeIcon onClick={() => onTriggerContent('resource', chId)} Icon={Cloud} color="text-primary-pink" bgColor="bg-white/5 border-primary-pink/20" label="Upload Cloud" />
                                                                    <ContentTypeIcon onClick={() => onTriggerContent('video', chId)} Icon={Play} color="text-white" bgColor="bg-[#D85B7D] border-[#D85B7D]/50" label="Video" />
                                                                    <ContentTypeIcon onClick={() => onTriggerContent('audio', chId)} Icon={Headphones} color="text-white" bgColor="bg-[#F39C12] border-[#F39C12]/50" label="Audio" />
                                                                    <ContentTypeIcon onClick={() => onTriggerContent('image', chId)} Icon={ImageIcon} color="text-white" bgColor="bg-[#2980B9] border-[#2980B9]/50" label="Image" />
                                                                    <ContentTypeIcon onClick={() => onTriggerContent('resource', chId)} Icon={FileText} color="text-white" bgColor="bg-[#E74C3C] border-[#E74C3C]/50" label="PDF" text="PDF" />
                                                                    <ContentTypeIcon onClick={() => onTriggerContent('quiz', chId)} Icon={FileQuestion} color="text-white" bgColor="bg-[#27AE60] border-[#27AE60]/50" label="Quiz" />
                                                                    <ContentTypeIcon onClick={() => onTriggerContent('resource', chId)} Icon={LinkIcon} color="text-white" bgColor="bg-[#3498DB] border-[#3498DB]/50" label="Link" />
                                                                    <div className="w-px h-10 bg-white/5 mx-2 flex-shrink-0" />
                                                                    <ContentTypeIcon onClick={() => onTriggerContent('article', chId)} Icon={FileEdit} color="text-white" bgColor="bg-[#2C3E50] border-[#2C3E50]/50" label="Article" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </Card>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        
                            <button onClick={() => onAddChapter(section._id || section.id)}
                                    className="ml-10 flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/[0.02] border border-dashed border-white/5 text-white/20 hover:text-primary-pink hover:border-primary-pink/20 hover:bg-primary-pink/5 transition-all text-[13px] font-black italic uppercase tracking-wider">
                                <Plus size={18} /> Add Chapter
                            </button>
                        </div>
                    ))}
                </div>

                <div className="pt-10 border-t border-white/5">
                    {isAddingSection ? (
                        <div className="flex items-center gap-4 animate-in slide-in-from-left-4">
                            <input 
                                autoFocus
                                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 outline-none focus:border-primary-pink transition-all font-bold" 
                                placeholder="Type section title..."
                                value={newSectionTitle}
                                onChange={(e) => setNewSectionTitle(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSaveSection()}
                            />
                            <Button 
                                onClick={handleSaveSection} 
                                className="px-8 py-4 bg-primary-pink text-white rounded-2xl font-black italic hover:bg-primary-pink/90 transition-all shadow-lg shadow-primary-pink/20 h-auto"
                            >
                                Add Section
                            </Button>
                            <button onClick={() => setIsAddingSection(false)} className="p-4 rounded-2xl bg-white/5 text-white/20 hover:text-white transition-all"><X size={24} /></button>
                        </div>
                    ) : (
                        <button onClick={() => setIsAddingSection(true)} className="w-full py-10 rounded-[32px] border-2 border-dashed border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all group">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white/10 group-hover:scale-110 group-hover:text-primary-pink transition-all duration-500">
                                    <Plus size={32} />
                                </div>
                                <span className="text-lg font-black text-white italic tracking-tight opacity-20 group-hover:opacity-100 transition-opacity">Add new section</span>
                            </div>
                        </button>
                    )}
            </div>
        </div>
    );
};

export default CurriculumTab;
