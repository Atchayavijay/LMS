import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerInstructor, clearError } from '../features/auth/store/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Briefcase, ArrowRight } from 'lucide-react';
import heroBackground from "../assets/hero-background.png";
import formBackground from "../../assets/form.png";

const InstructorSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerInstructor(formData))
         .unwrap()
         .then(() => {
             navigate('/login', { state: { instructorSignupSuccess: true } });
         });
  };

  return (
    <div className="min-h-screen bg-[#0c091a] relative overflow-hidden flex flex-col font-satoshi selection:bg-primary-pink/30">
        {/* Background Image */}
        <img
            src={heroBackground}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4 relative z-10">
        <div 
          className="w-full max-w-[900px] border border-white/10 rounded-[32px] overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,0.7)] bg-[#0c091a] flex flex-col md:flex-row"
        >
          {/* Left Side - Promo */}
          <div className="bg-gradient-to-br from-primary-pink/20 to-primary-purple/20 p-10 flex flex-col justify-between md:w-2/5 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary-pink/20 blux-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
             
             <div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-6 backdrop-blur-sm">
                    <Briefcase size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4 italic">Teach on <br/>Kattran</h2>
                <p className="text-white/60 text-sm leading-relaxed">
                    Join our community of expert instructors. Create courses, mentor students, and earn revenue sharing your knowledge.
                </p>
             </div>

             <div className="mt-12 space-y-4">
                <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[10px]">✓</div>
                    Reash Global Audience
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[10px]">✓</div>
                    Easy Course Builder
                </div>
                <div className="flex items-center gap-3 text-white/80 text-sm font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center text-[10px]">✓</div>
                    Secure Payments
                </div>
             </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 md:p-10 md:w-3/5 bg-cover bg-center" style={{ backgroundImage: `url(${formBackground})` }}>
            <h1 className="text-2xl font-medium text-white mb-2">Instructor Sign Up</h1>
            <p className="text-white/40 text-sm mb-8">Create your account to start the enrollment process.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm text-center">
                  {error}
                </div>
              )}

              <Input
                label="Full Name"
                name="name"
                type="text"
                placeholder="Dr. Sarah Connor"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="sarah@university.edu"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  isLoading={loading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  Start Enrollment <ArrowRight size={16} />
                </Button>
              </div>
            </form>

            <div className="mt-8 text-center bg-white/[0.03] rounded-xl p-4">
                <p className="text-white/40 text-[12px] uppercase font-bold tracking-widest mb-1">Already an Instructor?</p>
                <Link to="/login" className="text-primary-pink hover:text-white transition-colors text-sm font-bold">Log in to Dashboard</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorSignUp;
