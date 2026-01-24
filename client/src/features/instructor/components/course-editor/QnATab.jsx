import React from 'react';
import EmptyState from './shared/EmptyState';
import { Card } from '../../../../components/ui';

/**
 * QnA tab for managing student questions
 */
const QnATab = () => {
    return (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-20 font-satoshi">
            <div className="space-y-1">
                <h1 className="text-2xl font-black text-white italic">QnAs</h1>
                <p className="text-[12px] text-white/40 font-medium">List of all the questions on your course</p>
            </div>

            <Card className="rounded-[24px] overflow-hidden">
                <div className="grid grid-cols-5 bg-white/[0.02] border-b border-white/10 px-8 py-4 text-[11px] font-black text-white/20 uppercase tracking-widest">
                    <div>Question</div>
                    <div className="text-center">User</div>
                    <div className="text-center">Chapter</div>
                    <div className="text-center">Created at</div>
                    <div className="text-right">Action</div>
                </div>

                <EmptyState 
                    message="Manage all the questions across different chapters from here"
                />
            </Card>
        </div>
    );
};

export default QnATab;

