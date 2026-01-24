import React from 'react';
import { Users, MessageSquare, CheckCircle2, Star, AlertCircle, Calendar, ChevronDown, Search, Inbox } from 'lucide-react';
import { Card, Input } from '../../../../components/ui';

/**
 * ChatBot Analytics tab for monitoring AI interactions and performance
 */
const ChatBotAnalyticsTab = () => {
    return (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-20 font-satoshi">
            <div className="space-y-1">
                <h1 className="text-2xl font-black text-white italic">ChatBot Analytics</h1>
                <p className="text-[12px] text-white/40 font-medium">Monitor your chatbot performance and user interactions</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { label: 'Total Users', value: '0', icon: Users, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
                    { label: 'Total Questions', value: '0', icon: MessageSquare, color: 'text-green-500', bgColor: 'bg-green-500/10' },
                    { label: 'Satisfied Conversations', value: '0', total: '0', icon: CheckCircle2, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
                    { label: 'Satisfaction Rate', value: '0%', icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
                    { label: 'Unsatisfied Conversations', value: '0', icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-500/10' }
                ].map((stat) => (
                    <Card key={stat.label} className="p-6 space-y-3 rounded-2xl">
                        <span className="text-[13px] font-bold text-white/60">{stat.label}</span>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                                <stat.icon size={20} />
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</span>
                                {stat.total && <span className="text-white/20 text-sm font-bold">/ {stat.total}</span>}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Card className="p-8 space-y-6 rounded-[24px]">
                {/* Filters */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-white/[0.03] border border-white/5 rounded-xl px-4 py-3 gap-3">
                        <span className="text-xs font-bold text-white/20">Start Date</span>
                        <span className="text-white/10">—</span>
                        <span className="text-xs font-bold text-white/20">End Date</span>
                        <Calendar size={16} className="text-white/20 ml-2" />
                    </div>
                    <div className="relative">
                        <select className="appearance-none bg-white/[0.03] border border-white/5 rounded-xl pl-4 pr-10 py-3 text-xs font-bold text-white/60 focus:outline-none focus:border-orange-500/30 transition-all cursor-pointer min-w-[160px]">
                            <option>All Questions</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                    </div>
                    <div className="relative flex-1">
                        <Input 
                            placeholder="Search questions or users.."
                            className="pl-12 bg-white/[0.03] border-white/5 rounded-xl text-xs font-medium focus:border-orange-500/30"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" size={18} />
                    </div>
                </div>

                {/* Chat Questions Card */}
                <div className="bg-black/20 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="flex items-center gap-2 px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                        <MessageSquare size={16} className="text-orange-500/60" />
                        <h2 className="text-sm font-black text-white italic">Chat Questions (0)</h2>
                    </div>

                    <div className="grid grid-cols-4 bg-white/[0.01] px-6 py-4 text-[10px] font-black text-white/20 uppercase tracking-widest border-b border-white/5">
                        <div>Subscriber</div>
                        <div>Question</div>
                        <div>Bot Answer</div>
                        <div className="text-right">Date & Time</div>
                    </div>

                    <div className="py-24 flex flex-col items-center justify-center space-y-4">
                        <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/10">
                            <Inbox size={32} />
                        </div>
                        <p className="text-[13px] text-white/20 font-bold italic uppercase tracking-widest">No Data</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ChatBotAnalyticsTab;

