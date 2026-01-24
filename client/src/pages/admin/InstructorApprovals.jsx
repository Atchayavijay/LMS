import React, { useEffect, useState } from 'react';
    import { useDispatch } from 'react-redux';
    import { approveInstructor } from '../../features/auth/store/authSlice';
    import apiClient from '../../api/apiClient';
    import { CheckCircle, XCircle, Clock, FileText, Linkedin, Globe, Search, Filter } from 'lucide-react';
    import Button from '../../components/ui/Button';
    
    const InstructorApprovals = () => {
        const dispatch = useDispatch();
        const [instructors, setInstructors] = useState([]);
        const [loading, setLoading] = useState(true);
        const [searchTerm, setSearchTerm] = useState('');
    
        const fetchPendingInstructors = async () => {
            try {
                const response = await apiClient.get('/users?status=pending_approval');
                if (response.data.success) {
                    setInstructors(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch instructors", error);
            } finally {
                setLoading(false);
            }
        };
    
        useEffect(() => {
            fetchPendingInstructors();
        }, []);
    
        const handleAction = async (userId, action) => {
            try {
                await dispatch(approveInstructor({ userId, action })).unwrap();
                fetchPendingInstructors();
            } catch (error) {
                console.error(`Failed to ${action} instructor`, error);
            }
        };
    
        const filteredInstructors = instructors.filter(ins => 
            ins.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ins.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
        );
    
        return (
            <div className="space-y-8 animate-in fade-in duration-500">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Instructor Approvals</h1>
                        <p className="text-white/40 mt-1">Review and manage professional instructor applications.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                            <input 
                                type="text" 
                                placeholder="Search applicants..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-primary-purple transition-all w-64"
                            />
                        </div>
                        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-white transition-all">
                            <Filter size={18} />
                        </button>
                    </div>
                </header>
    
                <section>
                     <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                             <Clock size={16} />
                        </div>
                        <h2 className="text-lg font-bold text-white uppercase tracking-wider">Pending Applications</h2>
                        <span className="bg-primary-purple/20 text-primary-purple px-2.5 py-0.5 rounded-full text-xs font-bold">{instructors.length}</span>
                     </div>
    
                     {loading ? (
                         <div className="grid grid-cols-1 gap-6">
                             {[1, 2].map(i => (
                                 <div key={i} className="h-64 bg-white/[0.02] border border-white/5 rounded-2xl animate-pulse" />
                             ))}
                         </div>
                     ) : filteredInstructors.length === 0 ? (
                         <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-16 text-center">
                             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 text-white/20">
                                <CheckCircle size={32} />
                             </div>
                             <h3 className="text-xl font-bold text-white mb-2">Queue is Clear!</h3>
                             <p className="text-white/40 max-w-xs mx-auto">All instructor applications have been processed. Great job!</p>
                         </div>
                     ) : (
                         <div className="grid grid-cols-1 gap-6">
                             {filteredInstructors.map((user) => (
                                 <ApplicationCard key={user._id} user={user} onAction={handleAction} />
                             ))}
                         </div>
                     )}
                </section>
            </div>
        );
    };
    
    const ApplicationCard = ({ user, onAction }) => {
        const { enrollmentData } = user;
        return (
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:border-primary-purple/30 hover:bg-white/[0.04] transition-all duration-300 group">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* User Info Capsule */}
                    <div className="lg:w-1/4">
                        <div className="flex items-center gap-4 mb-6">
                             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-purple/20 to-indigo-600/20 flex items-center justify-center text-primary-purple font-bold text-2xl border border-primary-purple/20 shadow-lg shadow-primary-purple/5">
                                 {user.userName.charAt(0)}
                             </div>
                             <div>
                                 <h3 className="font-bold text-lg text-white group-hover:text-primary-purple transition-colors">{user.userName}</h3>
                                 <p className="text-white/40 text-[13px] break-all">{user.userEmail}</p>
                             </div>
                        </div>
                        <div className="space-y-4 pt-6 border-t border-white/5">
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-white/40">Applied On</span>
                                <span className="text-white/80 font-medium">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-[13px]">
                                <span className="text-white/40">Target Role</span>
                                <span className="text-primary-pink font-bold uppercase tracking-tighter">Instructor</span>
                            </div>
                        </div>
                    </div>
    
                    {/* Content Area */}
                    <div className="lg:w-2/4 space-y-6 lg:px-8 lg:border-l lg:border-white/5">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                <span className="text-white/30 text-[10px] uppercase tracking-widest font-black block mb-2">Experience</span>
                                <p className="text-sm font-bold text-white/90">{enrollmentData?.experience || 'N/A'}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                <span className="text-white/30 text-[10px] uppercase tracking-widest font-black block mb-2">Expertise</span>
                                <p className="text-sm font-bold text-white/90">{enrollmentData?.expertise || 'N/A'}</p>
                            </div>
                        </div>
                        
                        <div className="bg-black/20 p-5 rounded-2xl border border-white/5 relative overflow-hidden group/bio">
                            <span className="text-white/30 text-[10px] uppercase tracking-widest font-black block mb-3">Applicant Bio</span>
                            <p className="text-sm text-white/70 leading-relaxed italic">
                                "{enrollmentData?.bio || 'No bio provided for this applicant.'}"
                            </p>
                            <div className="absolute top-0 right-0 p-3 text-white/5 group-hover/bio:text-white/20 transition-colors">
                                <FileText size={40} />
                            </div>
                        </div>
    
                        <div className="flex flex-wrap gap-4 pt-2">
                            {enrollmentData?.linkedin && (
                                <a href={`https://${enrollmentData.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-bold hover:bg-blue-500/20 transition-all">
                                    <Linkedin size={14} /> LinkedIn
                                </a>
                            )}
                            {enrollmentData?.website && (
                                 <a href={`https://${enrollmentData.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-pink/10 text-primary-pink text-xs font-bold hover:bg-primary-pink/20 transition-all">
                                    <Globe size={14} /> Portfolio
                                </a>
                            )}
                            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 text-white/40 text-xs font-bold hover:bg-white/10 hover:text-white transition-all">
                                <FileText size={14} /> Resume (PDF)
                            </button>
                        </div>
                    </div>
    
                    {/* Action Center */}
                    <div className="lg:w-1/4 flex flex-col justify-center gap-4 lg:pl-8 lg:border-l lg:border-white/5">
                         <div className="text-center mb-4">
                            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black mb-1">Decision Required</p>
                            <div className="w-12 h-1 bg-primary-purple/30 mx-auto rounded-full"></div>
                         </div>
                         <Button 
                            onClick={() => onAction(user._id, 'approve')}
                            className="bg-primary-purple hover:bg-indigo-600 text-white border-none h-12 rounded-xl font-bold shadow-lg shadow-primary-purple/20 flex items-center justify-center gap-2"
                         >
                             <CheckCircle size={18} /> Approve
                         </Button>
                         <button
                            onClick={() => onAction(user._id, 'reject')}
                            className="h-12 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 text-sm font-bold flex items-center justify-center gap-2 transition-all"
                         >
                             <XCircle size={18} /> Reject
                         </button>
                    </div>
                </div>
            </div>
        );
    };
    
    export default InstructorApprovals;
