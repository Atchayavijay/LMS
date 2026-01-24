import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { submitEnrollment } from '../../features/auth/store/authSlice';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
    User, Briefcase, ShieldCheck, Camera, 
    Globe, Linkedin, Github, ExternalLink, 
    Upload, Plus, X, Info, Clock, CheckCircle2,
    ArrowRight, ArrowLeft, Loader2
} from 'lucide-react';
import heroBackground from "../../assets/hero-background.png";

const EnrollmentForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, user } = useSelector((state) => state.auth);
    
    const [step, setStep] = useState(1);
    const [languageInput, setLanguageInput] = useState('');
    const [formData, setFormData] = useState({
        // Step 1
        profilePhoto: null,
        profilePhotoPreview: null,
        bio: '',
        languages: [],
        
        // Step 2
        expertise: '',
        experienceYears: '',
        experienceMonths: '',
        linkedin: '',
        github: '',
        website: '',
        resume: null,
        
        // Step 3
        idProof: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                [field]: file,
                [`${field}Preview`]: field === 'profilePhoto' ? URL.createObjectURL(file) : null
            }));
        }
    };

    const addLanguage = () => {
        if (languageInput.trim() && !formData.languages.includes(languageInput.trim())) {
            setFormData(prev => ({
                ...prev,
                languages: [...prev.languages, languageInput.trim()]
            }));
            setLanguageInput('');
        }
    };

    const removeLanguage = (lang) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.filter(l => l !== lang)
        }));
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct the multi-part data or simplified object for now
        const payload = {
            ...formData,
            experience: `${formData.experienceYears}y ${formData.experienceMonths}m`,
        };
        
        dispatch(submitEnrollment(payload))
            .unwrap()
            .then(() => {
                navigate('/waiting-approval');
            })
            .catch((err) => {
                console.error("Enrollment failed", err);
            });
    };

    const Stepper = () => (
        <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-16 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
            <div 
                className="absolute top-1/2 left-0 h-0.5 bg-primary-pink transition-all duration-500 -translate-y-1/2 z-0" 
                style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            
            {[
                { n: 1, label: 'Basic Info', icon: User },
                { n: 2, label: 'Professional Info', icon: Briefcase },
                { n: 3, label: 'Verification', icon: ShieldCheck }
            ].map((s) => (
                <div key={s.n} className="relative z-10 flex flex-col items-center gap-3">
                    <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                        ${step >= s.n ? 'bg-primary-pink text-white shadow-[0_0_20px_rgba(255,51,102,0.4)]' : 'bg-obsidian border border-white/10 text-muted-white'}
                    `}>
                        {step > s.n ? <CheckCircle2 size={20} /> : <s.icon size={20} />}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${step >= s.n ? 'text-white' : 'text-muted-white'}`}>
                        {s.label}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-obsidian relative overflow-hidden flex flex-col font-satoshi selection:bg-primary-pink/30">
            {/* Background Assets */}
            <img src={heroBackground} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/80 to-obsidian pointer-events-none" />
            
            <main className="relative z-10 flex-grow py-20 px-4 container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white italic mb-3">Trainer Profile Setup</h1>
                    <p className="text-white text-sm">Complete your profile to start teaching on our platform</p>
                </div>

                <Stepper />

                <div className="max-w-3xl mx-auto">
                    <div className="bg-white/[0.03] border border-white/5 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-[0_32px_120px_rgba(0,0,0,0.5)]">
                        
                        {/* STEP 1: BASIC INFO */}
                        {step === 1 && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
                                    
                                    <div className="flex flex-col md:flex-row items-center gap-8 mb-10 p-6 rounded-[32px] bg-white/[0.02] border border-white/5">
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-primary-pink/50">
                                                {formData.profilePhotoPreview ? (
                                                    <img src={formData.profilePhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                                                ) : (
                                                    <Camera className="text-muted-white" size={32} />
                                                ) }
                                            </div>
                                            <label className="absolute bottom-0 right-0 p-2 bg-primary-pink text-white rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform">
                                                <Plus size={16} />
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'profilePhoto')} />
                                            </label>
                                        </div>
                                        <div className="text-center md:text-left flex-grow">
                                            <Button 
                                                variant="outline" 
                                                className="mb-2"
                                                onClick={() => document.querySelector('input[type="file"]').click()}
                                            >
                                                Upload Photo
                                            </Button>
                                            <p className="text-white text-xs">JPG, PNG or GIF. Max 5MB</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-white text-sm font-bold flex items-center gap-2 mb-2">
                                                <User size={16} className="text-primary-pink" /> Bio
                                            </label>
                                            <textarea 
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleChange}
                                                rows={5}
                                                placeholder="Tell us about yourself and your teaching experience..."
                                                className="w-full bg-white/[0.05] border border-white/10 rounded-[28px] py-4 px-6 text-white text-sm placeholder:text-muted-white focus:outline-none focus:border-primary-pink/30 transition-all resize-none"
                                            />
                                            <p className="text-white text-[10px] italic flex items-center gap-1">
                                                <Info size={10} /> Share your passion for teaching and what makes you unique.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-white text-sm font-bold flex items-center gap-2">
                                                <Globe size={16} className="text-primary-pink" /> Languages Known
                                            </label>
                                            <div className="flex gap-3">
                                                <div className="relative flex-grow">
                                                    <Input 
                                                        placeholder="Enter a language (e.g., English, Spanish)" 
                                                        value={languageInput}
                                                        onChange={(e) => setLanguageInput(e.target.value)}
                                                        onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                                                        className="mb-0"
                                                    />
                                                </div>
                                                <Button onClick={addLanguage} className="rounded-full px-6">Add</Button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {formData.languages.map(lang => (
                                                    <span key={lang} className="bg-primary-pink/10 border border-primary-pink/20 text-primary-pink px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 group transition-all hover:bg-primary-pink/20">
                                                        {lang}
                                                        <button onClick={() => removeLanguage(lang)} className="hover:text-white"><X size={12} /></button>
                                                    </span>
                                                ))}
                                                {formData.languages.length === 0 && <span className="text-white text-xs italic">No languages added yet</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/5 flex justify-end">
                                    <Button onClick={nextStep} className="group gap-2 px-8">
                                        Next Step <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: PROFESSIONAL INFO */}
                        {step === 2 && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-bold text-white mb-6">Professional Information</h2>
                                    
                                    <Input 
                                        label="Primary Skill / Expertise" 
                                        name="expertise"
                                        placeholder="e.g. Senior Full Stack Developer"
                                        value={formData.expertise}
                                        onChange={handleChange}
                                        icon={<Briefcase size={18} />}
                                    />

                                    <div className="space-y-4">
                                        <label className="text-white text-sm font-bold flex items-center gap-2">
                                            <Clock size={16} className="text-primary-pink" /> Teaching Experience
                                        </label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <p className="text-white text-[10px] uppercase font-bold tracking-widest ml-1">Years</p>
                                                <Input 
                                                    name="experienceYears"
                                                    type="number"
                                                    placeholder="0"
                                                    value={formData.experienceYears}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-white text-[10px] uppercase font-bold tracking-widest ml-1">Months</p>
                                                <Input 
                                                    name="experienceMonths"
                                                    type="number"
                                                    placeholder="0"
                                                    value={formData.experienceMonths}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <p className="text-white text-[10px] italic flex items-center gap-1">
                                            <Info size={10} /> Include both professional and teaching experience.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-white text-sm font-bold">Social Links</p>
                                        <div className="space-y-4">
                                            <div className="relative group">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white transition-colors group-focus-within:text-primary-pink">
                                                    <Linkedin size={18} />
                                                </div>
                                                <input 
                                                    name="linkedin"
                                                    placeholder="https://linkedin.com/in/yourprofile"
                                                    value={formData.linkedin}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/[0.05] border border-white/10 rounded-full py-3.5 pl-14 pr-6 text-white text-sm focus:outline-none focus:border-primary-pink/30 transition-all"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white transition-colors group-focus-within:text-primary-pink">
                                                    <Github size={18} />
                                                </div>
                                                <input 
                                                    name="github"
                                                    placeholder="https://github.com/yourusername"
                                                    value={formData.github}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/[0.05] border border-white/10 rounded-full py-3.5 pl-14 pr-6 text-white text-sm focus:outline-none focus:border-primary-pink/30 transition-all"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white transition-colors group-focus-within:text-primary-pink">
                                                    <Globe size={18} />
                                                </div>
                                                <input 
                                                    name="website"
                                                    placeholder="https://yourportfolio.com"
                                                    value={formData.website}
                                                    onChange={handleChange}
                                                    className="w-full bg-white/[0.05] border border-white/10 rounded-full py-3.5 pl-14 pr-6 text-white text-sm focus:outline-none focus:border-primary-pink/30 transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-white text-sm font-bold">Resume / CV</p>
                                        <div className="border-2 border-dashed border-white/10 rounded-[32px] p-10 flex flex-col items-center justify-center text-center transition-all hover:bg-white/[0.02] hover:border-primary-pink/30 cursor-pointer relative">
                                            <Upload className="text-muted-white mb-3" size={32} />
                                            <p className="text-white text-sm font-medium">
                                                {formData.resume ? formData.resume.name : <><span className="text-primary-pink">Drop your resume here</span> or browse</> }
                                            </p>
                                            <p className="text-white text-[10px] mt-1">Supported formats: .pdf, .doc, .docx (Max 5MB)</p>
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'resume')} />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/5 flex justify-between">
                                    <button onClick={prevStep} className="text-white hover:text-white flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] transition-colors">
                                        <ArrowLeft size={16} /> Back
                                    </button>
                                    <Button onClick={nextStep} className="group gap-2 px-8">
                                        Next Step <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: VERIFICATION */}
                        {step === 3 && (
                            <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-6">Verification & Status</h2>
                                    
                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest ml-1">
                                                <ShieldCheck size={14} className="text-primary-pink" /> Identity Verification
                                            </div>
                                            <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-1 pb-6 overflow-hidden">
                                                <div className="border-2 border-dashed border-white/10 m-3 rounded-[24px] p-10 flex flex-col items-center justify-center text-center transition-all hover:bg-white/[0.02] hover:border-primary-pink/20 cursor-pointer relative">
                                                    <Upload size={32} className="text-muted-white mb-3" />
                                                    <p className="text-white text-sm font-medium">
                                                        {formData.idProof ? formData.idProof.name : <><span className="text-primary-pink">Drop your ID proof here</span> or browse</> }
                                                    </p>
                                                    <p className="text-white text-[10px] mt-1">Supported formats: .pdf, .jpg, .jpeg, .png (Max 10MB)</p>
                                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'idProof')} />
                                                </div>
                                                <div className="px-6 py-3 bg-white/[0.02] border-t border-white/5 mx-3 rounded-xl">
                                                    <p className="text-white text-[10px] font-medium leading-relaxed">
                                                        Accepted documents: Government-issued ID, Passport, Driver's License, or National ID Card
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white/[0.02] border border-white/5 p-6 rounded-[28px] flex gap-5">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white shrink-0">
                                                <Info size={20} />
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-white font-bold text-xs uppercase tracking-wider">Verification Process</h4>
                                                <ul className="space-y-2">
                                                    {["Our admin team will review your profile within 24-48 hours", "You'll receive an email notification once verified", "Your information is securely stored and handled with care"].map((t, idx) => (
                                                        <li key={idx} className="text-white text-[11px] flex items-start gap-2">
                                                            <div className="w-1 h-1 rounded-full bg-primary-pink mt-1.5" /> {t}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-white text-[10px] font-bold uppercase tracking-widest ml-1">Account Status</p>
                                            <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[32px] relative overflow-hidden group">
                                                 <div className="flex items-center gap-6 mb-6">
                                                     <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 relative">
                                                         <Clock size={24} />
                                                         <div className="absolute inset-0 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin" />
                                                     </div>
                                                     <div>
                                                         <p className="text-primary-pink font-bold text-lg leading-none mb-1">Pending Approval</p>
                                                         <p className="text-white text-xs">Your profile is under review by the admin team</p>
                                                     </div>
                                                 </div>
                                                 <div className="space-y-2">
                                                     <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                                                         <span className="text-white/30">Profile Completion</span>
                                                         <span className="text-primary-pink">85%</span>
                                                     </div>
                                                     <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                         <div className="h-full bg-gradient-to-r from-primary-pink to-primary-purple rounded-full w-[85%]" />
                                                     </div>
                                                 </div>
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5">
                                            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                                <TrendingUp size={16} className="text-primary-pink" /> What Happens Next?
                                            </h4>
                                            <div className="space-y-4">
                                                {[
                                                    "Click \"Submit for Review\" to send your profile to our team",
                                                    "We'll verify your credentials and documents",
                                                    "Once approved, you can start creating and publishing courses",
                                                    "Build your teaching portfolio and reach thousands of learners"
                                                ].map((t, i) => (
                                                    <div key={i} className="flex gap-4">
                                                        <span className="text-xs font-bold text-primary-pink">{i + 1}.</span>
                                                        <p className="text-white text-xs leading-relaxed">{t}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                                    <button onClick={prevStep} className="text-white hover:text-white flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] transition-colors">
                                        <ArrowLeft size={16} /> Back
                                    </button>
                                    <Button 
                                        type="submit" 
                                        disabled={loading}
                                        className="bg-gradient-to-r from-primary-pink to-primary-purple hover:scale-[1.02] active:scale-[0.98] transition-all px-10 shadow-[0_20px_40px_rgba(255,51,102,0.2)]"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit for Review"}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                    
                    <div className="mt-8 text-center">
                        <p className="text-white text-xs font-medium uppercase tracking-widest">Step {step} of 3 completed</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

const TrendingUp = ({ size, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);

export default EnrollmentForm;
