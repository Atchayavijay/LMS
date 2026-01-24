import React from 'react';
import { Search, ChevronRight, Calendar, HelpCircle, RefreshCw, Download, ChevronLeft } from 'lucide-react';
import { Card, Button, Input } from '../../../../components/ui';

/**
 * Assignment Responses tab for tracking student submissions and performance
 */
const AssignmentResponsesTab = () => {
    return (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-20 font-satoshi">
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-black text-white italic">Assignment Responses</h1>
                    <p className="text-[12px] text-white/40 font-medium">Track learner submissions and performance across all course assignments.</p>
                </div>
                <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2 gap-3">
                    <span className="text-xs font-bold text-white/20">Start date</span>
                    <ChevronRight size={14} className="text-white/10" />
                    <span className="text-xs font-bold text-white/20">End date</span>
                    <Calendar size={16} className="text-white/40 ml-2" />
                </div>
            </div>

            {/* Stats Overview */}
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    {[
                        { label: 'Submission Rate', value: '—' },
                        { label: 'Average Score', value: '—' },
                        { label: 'Passing %', value: '—' }
                    ].map((stat) => (
                        <Card key={stat.label} variant="dark" className="p-6 space-y-2 rounded-2xl">
                            <div className="flex items-center gap-2">
                                <span className="text-[13px] font-bold text-white/60">{stat.label}</span>
                                <HelpCircle size={14} className="text-white/20" />
                            </div>
                            <div className="text-2xl font-black text-white italic">{stat.value}</div>
                        </Card>
                    ))}
                </div>
                <div className="grid grid-cols-5 gap-4">
                    <Card variant="dark" className="col-span-3 p-6 space-y-2 rounded-2xl">
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-white/60">Retake %</span>
                            <HelpCircle size={14} className="text-white/20" />
                        </div>
                        <div className="text-2xl font-black text-white italic">—</div>
                    </Card>
                    <Card variant="dark" className="col-span-2 p-6 space-y-2 rounded-2xl">
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-white/60">Drop-off Rate before Submission</span>
                            <HelpCircle size={14} className="text-white/20" />
                        </div>
                        <div className="text-2xl font-black text-white italic">—</div>
                    </Card>
                </div>
            </div>

            <Card className="p-6 space-y-6 rounded-[24px]">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 max-w-md">
                        <div className="relative flex-1">
                            <Input 
                                placeholder="Search by assignment title"
                                className="pl-12 bg-white/[0.03] border-white/5 rounded-xl text-sm font-medium focus:border-orange-500/30"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={18} />
                        </div>
                        <Button 
                            variant="secondary"
                            className="p-2.5 rounded-xl text-white/40 hover:text-white transition-all h-auto"
                        >
                            <RefreshCw size={18} />
                        </Button>
                    </div>
                    <Button 
                        variant="secondary"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-black text-white/40 hover:text-white transition-all uppercase tracking-widest h-auto"
                    >
                        <Download size={14} /> Export CSV
                    </Button>
                </div>

                <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/20">
                    <div className="grid grid-cols-8 bg-white/[0.02] border-b border-white/10 px-6 py-4 text-[10px] font-black text-white/20 uppercase tracking-widest">
                        <div className="col-span-2">Title</div>
                        <div className="text-center">Submissions</div>
                        <div className="text-center">Drop-off Rate</div>
                        <div className="text-center">Avg. Score</div>
                        <div className="text-center">Passing %</div>
                        <div className="text-center">Retaking %</div>
                        <div className="text-right pr-4">Avg. Time</div>
                    </div>

                    <div className="py-20 text-center">
                        <p className="text-[13px] text-white/20 font-bold italic uppercase tracking-widest">No assignments found</p>
                    </div>

                    <div className="border-t border-white/5 px-6 py-4 flex justify-end items-center gap-4">
                        <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/20 hover:text-white disabled:opacity-10" disabled><ChevronLeft size={18} /></button>
                            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-500 text-white text-xs font-black italic">1</span>
                            <button className="p-1.5 rounded-lg hover:bg-white/5 text-white/20 hover:text-white disabled:opacity-10" disabled><ChevronRight size={18} /></button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default AssignmentResponsesTab;

