import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { submitEnrollment } from '../../features/auth/store/authSlice';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { LayoutList, BookOpen, Linkedin, Globe, CheckCircle, Upload } from 'lucide-react';
import heroBackground from "../../assets/hero-background.png";

const EnrollmentForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        experience: '',
        expertise: '',
        linkedin: '',
        website: '',
        bio: '',
        document: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitEnrollment(formData))
            .unwrap()
            .then(() => {
                navigate('/waiting-approval');
            })
            .catch((err) => {
                console.error("Enrollment failed", err);
                // Optionally show error state
            });
    };

    return (
        <div className="min-h-screen bg-[#0c091a] relative overflow-hidden flex flex-col font-satoshi selection:bg-primary-pink/30 items-center justify-center py-20 px-4">
             {/* Background Image */}
            <img
                src={heroBackground}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#0c091a]/80 to-[#0c091a]" />

            <div className="relative z-10 w-full max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white italic mb-2">Instructor Enrollment</h1>
                    <p className="text-white/60">Tell us about your teaching experience and expertise.</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/5 backdrop-blur-md rounded-[32px] p-8 md:p-12 shadow-2xl">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-white text-sm font-bold ml-1">Years of Experience</label>
                                <select 
                                    name="experience" 
                                    value={formData.experience} 
                                    onChange={handleChange}
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-full py-3 px-6 text-white text-sm focus:outline-none appearance-none cursor-pointer"
                                    required
                                >
                                    <option value="">Select Range</option>
                                    <option value="0-2">0-2 Years</option>
                                    <option value="3-5">3-5 Years</option>
                                    <option value="5-10">5-10 Years</option>
                                    <option value="10+">10+ Years</option>
                                </select>
                            </div>
                            <Input 
                                label="Primary Expertise" 
                                name="expertise" 
                                placeholder="e.g. UX Design, React" 
                                value={formData.expertise} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        <div className="space-y-2">
                             <label className="text-white text-sm font-bold ml-1">Bio / Introduction</label>
                             <textarea 
                                name="bio"
                                rows={4}
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Write a short bio about yourself..."
                                className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-3 px-6 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all resize-none"
                                required
                             />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="relative">
                               <Linkedin className="absolute left-4 top-[38px] w-5 h-5 text-white/20" />
                               <Input 
                                 label="LinkedIn Profile" 
                                 name="linkedin" 
                                 placeholder="linkedin.com/in/you" 
                                 className="pl-12"
                                 value={formData.linkedin}
                                 onChange={handleChange}
                               />
                           </div>
                           <Input 
                             label="Website / Portfolio" 
                             name="website" 
                             placeholder="https://yourwebsite.com" 
                             value={formData.website}
                             onChange={handleChange}
                           />
                        </div>

                        <div className="pt-4 border-t border-white/5">
                            <label className="block text-white text-sm font-bold mb-3">Upload Resume / CV</label>
                            <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.02] hover:border-primary-pink/30 transition-all cursor-pointer">
                                <Upload size={24} className="text-white/40 mb-2" />
                                <p className="text-white/60 text-sm font-bold">Drag & Drop or Click to Upload</p>
                                <p className="text-white/20 text-xs mt-1">PDF max 5MB</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-end">
                        <Button type="submit" className="px-8">
                            Submit Application
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnrollmentForm;
