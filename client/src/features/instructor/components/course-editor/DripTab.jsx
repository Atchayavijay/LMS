import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Card, Button, Input } from '../../../../components/ui';

/**
 * Drip scheduling tab for managing content unlock strategies
 */
const DripTab = ({ 
    courseDetails, 
    activeDripType, 
    setActiveDripType 
}) => {
    return (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-20 font-satoshi">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black text-white italic">Drip schedule</h1>
                <Button 
                    variant="primary"
                    className="px-8 py-2 text-xs uppercase tracking-widest font-black h-auto"
                >
                    Save
                </Button>
            </div>

            <div className="space-y-6">
                <div className="space-y-1">
                    <h2 className="text-[17px] font-black text-white italic">Drip type</h2>
                    <p className="text-[12px] text-white/40 font-medium">Select when the content will be unlocked.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        'Student enrolment date',
                        'On a specific date',
                        'By completion',
                        'No drip'
                    ].map((type) => (
                        <button 
                            key={type}
                            onClick={() => setActiveDripType(type)}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                                activeDripType === type 
                                    ? 'bg-primary-pink/10 border-primary-pink/50 text-white' 
                                    : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full border-4 flex items-center justify-center ${activeDripType === type ? 'border-primary-pink bg-obsidian' : 'border-white/10'}`}>
                                    {activeDripType === type && <div className="w-1.5 h-1.5 rounded-full bg-primary-pink" />}
                                </div>
                                <span className="text-xs font-bold leading-none">{type}</span>
                            </div>
                            <HelpCircle size={14} className="opacity-40" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {courseDetails.sections?.map((section, idx) => (
                    <Card key={section._id || idx} className="p-8 space-y-6 rounded-[20px] group hover:border-white/20 transition-all">
                        <div className="space-y-1">
                            <h3 className="text-sm font-black text-white italic">Section {idx + 1}: {section.title}</h3>
                            <p className="text-[11px] font-black text-white/20 uppercase tracking-widest">
                                {section.chapters?.length || 0} Published Chapters
                            </p>
                        </div>

                        <div className="flex items-center gap-4 py-4 px-6 bg-white/[0.02] border border-white/5 rounded-xl w-fit">
                            <span className="text-xs font-bold text-white/40 italic">will be unlocked</span>
                            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg overflow-hidden">
                                <Input 
                                    type="number" 
                                    defaultValue={0}
                                    className="w-16 bg-transparent py-2 text-center text-sm font-black text-primary-pink focus:outline-none border-none focus:ring-0"
                                />
                                <div className="bg-white/5 px-3 py-2 border-l border-white/10 text-[10px] font-black text-white/20 uppercase">
                                    days
                                </div>
                            </div>
                            <span className="text-xs font-bold text-white/40 italic">after enrolment</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default DripTab;

