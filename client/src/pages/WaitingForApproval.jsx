import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/store/authSlice';
import Button from '../components/ui/Button';
import { Clock, CheckCircle, LogOut } from 'lucide-react';

const WaitingForApproval = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const isRejected = user?.status === 'rejected';

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#0c091a] flex items-center justify-center p-4">
             <div className="max-w-md w-full bg-white/[0.03] border border-white/5 rounded-[32px] p-8 text-center">
                 <div className={`w-20 h-20 ${isRejected ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'} rounded-full flex items-center justify-center mx-auto mb-6 ${!isRejected && 'animate-pulse'}`}>
                     {isRejected ? <span className="text-4xl">✕</span> : <Clock size={40} />}
                 </div>
                 <h1 className="text-2xl font-bold text-white mb-2">{isRejected ? 'Application Rejected' : 'Application Received'}</h1>
                 <p className="text-white/60 mb-8">
                     {isRejected 
                        ? "Unfortunately, your instructor application has been rejected. Please contact support for more information."
                        : "Your instructor application is under review. You will receive an email once your account is approved."
                     }
                     <br/><br/>
                     Status: <span className={`${isRejected ? 'text-red-400' : 'text-yellow-400'} font-bold uppercase tracking-wider text-xs`}>
                        {isRejected ? 'Rejected' : 'Pending Approval'}
                     </span>
                 </p>
                 
                 <div className="bg-white/5 rounded-xl p-4 mb-8 text-left">
                     <h4 className="text-white font-bold text-sm mb-2">Next Steps:</h4>
                     <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-xs text-white/60 line-through decoration-white/30">
                            <CheckCircle size={14} className="text-green-500" />
                            Submit Enrollment Form
                        </li>
                        <li className="flex items-center gap-2 text-xs text-yellow-400 font-bold">
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-yellow-400 animate-pulse bg-yellow-400/20" />
                            Admin Review (In Progress)
                        </li>
                        <li className="flex items-center gap-2 text-xs text-white/40">
                            <div className="w-3.5 h-3.5 rounded-full border border-white/10" />
                            Access Instructor Dashboard
                        </li>
                     </ul>
                 </div>

                 <div className="border-t border-white/5 pt-6">
                    <button 
                        onClick={handleLogout}
                        className="text-white/40 text-xs hover:text-white transition-colors flex items-center gap-2 mx-auto"
                    >
                        <LogOut size={14} /> Log Out
                    </button>
                 </div>
             </div>
        </div>
    );
};

export default WaitingForApproval;
