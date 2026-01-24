import React from 'react';
import { Search, Calendar, ChevronRight, FileEdit, Inbox } from 'lucide-react';
import { Card, Button, Input, Badge } from '../../../../components/ui';

/**
 * Comments tab for course discussion management
 */
const CommentsTab = ({ 
    activeCommentStatus, 
    setActiveCommentStatus 
}) => {
    return (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-20 font-satoshi">
            <div className="space-y-1">
                <h1 className="text-2xl font-black text-white italic">Comments</h1>
                <p className="text-[12px] text-white/40 font-medium">List of all the comments on your Courses</p>
            </div>

            <Card className="p-8 space-y-6 rounded-[24px]">
                {/* Filters & Actions Zone */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <Input 
                                placeholder="Search by User details"
                                className="pl-12 bg-white/[0.03] border-white/5 rounded-xl text-sm font-medium focus:border-orange-500/30"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={18} />
                        </div>
                        <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 gap-3">
                            <Calendar size={16} className="text-white/20" />
                            <span className="text-xs font-bold text-white/40">Start date</span>
                            <ChevronRight size={14} className="text-white/10" />
                            <span className="text-xs font-bold text-white/40">End date</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {['All', 'Unread', 'Read'].map((status) => (
                                <button 
                                    key={status}
                                    onClick={() => setActiveCommentStatus(status)}
                                    className={`px-5 py-2 rounded-full text-xs font-black transition-all ${
                                        activeCommentStatus === status 
                                            ? 'bg-orange-500 text-white' 
                                            : 'bg-white/5 text-white/40 hover:bg-white/10'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 text-[11px] font-black text-white/20 hover:text-white transition-all uppercase tracking-widest disabled:opacity-30" disabled>
                                <FileEdit size={14} /> Mark as read
                            </button>
                            <button className="flex items-center gap-2 text-[11px] font-black text-white/20 hover:text-white transition-all uppercase tracking-widest disabled:opacity-30" disabled>
                                <FileEdit size={14} /> Mark as unread
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Table */}
                <div className="border border-white/10 rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-7 bg-white/[0.02] border-b border-white/10 px-6 py-4 text-[10px] font-black text-white/20 uppercase tracking-widest">
                        <div className="w-4 h-4 rounded border border-white/10" />
                        <div>Comment</div>
                        <div>User</div>
                        <div>Course</div>
                        <div>Chapter</div>
                        <div>Created at</div>
                        <div className="text-right">Actions</div>
                    </div>

                    <div className="py-32 flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/10">
                            <Inbox size={32} />
                        </div>
                        <p className="text-[13px] text-white/20 font-bold italic uppercase tracking-widest">No Data</p>
                    </div>
                    
                    <div className="h-1 bg-white/5 w-full" />
                </div>
            </Card>
        </div>
    );
};

export default CommentsTab;

