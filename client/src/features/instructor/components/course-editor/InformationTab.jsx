import React from 'react';
import { Upload, ImageIcon, Edit2, Trash2 } from 'lucide-react';
import SettingToggle from './shared/SettingToggle';
import { Button, Card } from '../../../../components/ui';

/**
 * Information tab for course metadata and settings
 */
const InformationTab = ({ 
    courseDetails, 
    setCourseDetails, 
    fileInputRef, 
    setActiveFileUploadType,
    handleSave 
}) => {
    return (
        <div className="space-y-10 animate-in slide-in-from-right-4 duration-500 pb-20">
            {/* Setup Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <h1 className="text-2xl font-black text-white italic">Set-up your course</h1>
                <Button 
                    onClick={() => handleSave()}
                    variant="secondary"
                    className="px-8 py-2.5 rounded-lg text-white/40 text-sm font-bold border border-white/10 hover:bg-white/20 transition-all font-satoshi"
                >
                    Save changes
                </Button>
            </div>

            <div className="space-y-10">
                {/* Title Section */}
                <div className="space-y-3">
                    <label className="text-[17px] font-bold text-white/90">Title*</label>
                    <input 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 outline-none focus:border-primary-pink transition-all font-bold" 
                        placeholder="Add a course title..."
                        value={courseDetails.title}
                        onChange={(e) => setCourseDetails({ ...courseDetails, title: e.target.value })}
                    />
                </div>

                {/* Description Card */}
                <div className="space-y-3">
                    <label className="text-[17px] font-bold text-white/90">Description*</label>
                    <Card className="rounded-2xl overflow-hidden">
                        <div className="flex items-center gap-4 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                            <select className="bg-transparent text-white/60 text-sm font-bold outline-none cursor-pointer">
                                <option>Normal</option>
                            </select>
                            <div className="w-px h-4 bg-white/10" />
                            <div className="flex items-center gap-3">
                                <span className="text-white/40 font-bold cursor-pointer hover:text-white transition-colors">B</span>
                                <span className="text-white/40 font-bold italic cursor-pointer hover:text-white transition-colors">I</span>
                                <span className="text-white/40 underline cursor-pointer hover:text-white transition-colors">U</span>
                            </div>
                            <div className="w-px h-4 bg-white/10" />
                            <div className="flex items-center gap-3 text-white/40">
                                <Edit2 size={16} className="cursor-pointer hover:text-white transition-colors" />
                                <Trash2 size={16} className="cursor-pointer hover:text-white transition-colors" />
                            </div>
                        </div>
                        <textarea 
                            rows={3} 
                            className="w-full bg-transparent px-6 py-4 text-white placeholder:text-white/10 outline-none resize-none font-medium" 
                            placeholder="Add a description here..."
                            value={courseDetails.description}
                            onChange={(e) => setCourseDetails({ ...courseDetails, description: e.target.value })}
                        />
                    </Card>
                </div>

                {/* Image Upload Sections */}
                <div className="space-y-12">
                    {/* Cover Image */}
                    <div className="space-y-4">
                        <label className="text-[17px] font-bold text-white/90">Cover image*</label>
                        <div className="flex items-center gap-10">
                            <Card className="w-[480px] aspect-[16/10] rounded-3xl flex items-center justify-center border-2 border-dashed border-white/5 overflow-hidden">
                                {courseDetails.image ? (
                                    <img src={courseDetails.image} alt="Cover" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/10">
                                        <ImageIcon size={32} />
                                    </div>
                                )}
                            </Card>
                            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                                <div className="space-y-1 text-center">
                                    <p className="text-[13px] text-white/40 font-medium tracking-tight">Upload cover image here.</p>
                                    <p className="text-[13px] text-white/40 font-medium tracking-tight">Recommended size: <span className="text-white/60 italic font-bold">750px X 422px (.jpg, .jpeg, .gif, or .png)</span>.</p>
                                </div>
                                <Button 
                                    onClick={() => { setActiveFileUploadType('course-cover'); fileInputRef.current.click(); }}
                                    variant="secondary"
                                    className="px-10 py-3 rounded-xl text-white/90 text-sm font-bold flex items-center gap-3 active:scale-95 h-auto"
                                >
                                    <Upload size={18} className="text-white/40" /> {courseDetails.image ? 'Change Cover' : 'Upload Cover'}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Video Thumbnail */}
                    <div className="space-y-4">
                        <label className="text-[17px] font-bold text-white/90">Default video thumbnail</label>
                        <div className="flex items-center gap-10">
                            <Card className="w-[480px] aspect-[16/10] rounded-3xl flex items-center justify-center border-2 border-dashed border-white/5 overflow-hidden">
                                {courseDetails.thumbnail ? (
                                    <img src={courseDetails.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/10">
                                        <ImageIcon size={32} />
                                    </div>
                                )}
                            </Card>
                            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                                <div className="space-y-1 text-center">
                                    <p className="text-[13px] text-white/40 font-medium tracking-tight">Upload your default video chapter thumbnail image here.</p>
                                    <p className="text-[13px] text-white/40 font-medium tracking-tight">Recommended size: <span className="text-white/60 italic font-bold">750px X 422px (.jpg, .jpeg, .gif, or .png)</span>.</p>
                                    <p className="text-[11px] text-white/20 font-bold mt-2 uppercase tracking-tight">This image will be used as the default thumbnail for all future video chapters.</p>
                                </div>
                                <Button 
                                    onClick={() => { setActiveFileUploadType('course-thumbnail'); fileInputRef.current.click(); }}
                                    variant="secondary"
                                    className="px-10 py-3 rounded-xl text-white/90 text-sm font-bold flex items-center gap-3 active:scale-95 h-auto"
                                >
                                    <Upload size={18} className="text-white/40" /> {courseDetails.thumbnail ? 'Change thumbnail' : 'Upload thumbnail'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Sections */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h2 className="text-lg font-black text-white/40 italic">Settings</h2>
                        <div className="space-y-6">
                            {/* Validity Setting with Days Selector */}
                            <Card className="p-6 space-y-4 rounded-2xl">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1 flex-1">
                                        <h3 className="text-[15px] font-black text-white">Validity</h3>
                                        <p className="text-[12px] text-white/40 font-medium">Select how long your customers can view your course.</p>
                                    </div>
                                    <div 
                                        onClick={() => setCourseDetails({ ...courseDetails, validity: !courseDetails.validity })}
                                        className={`relative w-12 h-6 rounded-full transition-all cursor-pointer ${courseDetails.validity ? 'bg-primary-pink' : 'bg-white/10'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${courseDetails.validity ? 'translate-x-6' : ''}`} />
                                    </div>
                                </div>
                                
                                {/* Validity Days Selector - Only shown when validity is enabled */}
                                {courseDetails.validity && (
                                    <div className="pt-4 border-t border-white/10 space-y-4 animate-in slide-in-from-top-2">
                                        <div className="flex items-center gap-4">
                                            <input 
                                                type="range"
                                                min="1"
                                                max="365"
                                                value={courseDetails.validityDays || 30}
                                                onChange={(e) => setCourseDetails({ ...courseDetails, validityDays: parseInt(e.target.value) })}
                                                className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer 
                                                    [&::-webkit-slider-thumb]:appearance-none 
                                                    [&::-webkit-slider-thumb]:w-4 
                                                    [&::-webkit-slider-thumb]:h-4 
                                                    [&::-webkit-slider-thumb]:rounded-full 
                                                    [&::-webkit-slider-thumb]:bg-primary-pink
                                                    [&::-webkit-slider-thumb]:cursor-pointer
                                                    [&::-webkit-slider-thumb]:shadow-lg"
                                            />
                                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 min-w-[120px]">
                                                <input 
                                                    type="number"
                                                    min="1"
                                                    max="365"
                                                    value={courseDetails.validityDays || 30}
                                                    onChange={(e) => {
                                                        const days = parseInt(e.target.value);
                                                        if (days >= 1 && days <= 365) {
                                                            setCourseDetails({ ...courseDetails, validityDays: days });
                                                        }
                                                    }}
                                                    className="w-16 bg-transparent text-white font-bold text-sm outline-none text-center"
                                                />
                                                <span className="text-[11px] font-black text-white/40 uppercase">Days</span>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-white/30 font-medium">
                                            Students will have access to this course for <span className="text-primary-pink font-bold">{courseDetails.validityDays || 30} days</span> from their enrollment date.
                                        </p>
                                    </div>
                                )}
                            </Card>
                            
                            <SettingToggle 
                                title="Show as locked" 
                                description="Show this course as locked to customers of other courses." 
                                value={courseDetails.showAsLocked}
                                onChange={(val) => setCourseDetails({ ...courseDetails, showAsLocked: val })}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-lg font-black text-white/40 italic">Engagement</h2>
                        <div className="space-y-4">
                            <SettingToggle 
                                title="Disable QnA" 
                                description="Your customers won't be able to ask questions on your course." 
                                value={courseDetails.disableQnA}
                                onChange={(val) => setCourseDetails({ ...courseDetails, disableQnA: val })}
                            />
                            <SettingToggle 
                                title="Disable comments" 
                                description="Your customers won't be able to comment on your course." 
                                value={courseDetails.disableComments}
                                onChange={(val) => setCourseDetails({ ...courseDetails, disableComments: val })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformationTab;
