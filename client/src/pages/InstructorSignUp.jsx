import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerInstructor, becomeInstructor, clearError } from '../features/auth/store/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Briefcase, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
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

  // Check if user is already an instructor
  const isInstructor = user?.roles?.some(r => r.roleId === 2 || r === 2) || user?.role === 'instructor';

  useEffect(() => {
      // If user is already an instructor and approved, maybe redirect to dashboard?
      // For now, let's just focus on the upgrade flow.
      if (isInstructor && user?.status === 'approved') {
          navigate('/instructor-dashboard');
      }
  }, [isInstructor, user, navigate]);

  const [passwordError, setPasswordError] = useState('');
  const [passwordMetadata, setPasswordMetadata] = useState({
    hasMinLength: false,
    hasLetter: false,
    hasNumber: false,
    hasSpecial: false
  });

  const validatePassword = (pass) => {
    const meta = {
        hasMinLength: pass.length >= 6,
        hasLetter: /[a-zA-Z]/.test(pass),
        hasNumber: /[0-9]/.test(pass),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pass)
    };
    setPasswordMetadata(meta);

    if (!meta.hasMinLength) return "Password must be at least 6 characters long";
    if (!meta.hasLetter) return "Password must contain at least one letter";
    if (!meta.hasNumber) return "Password must contain at least one number";
    if (!meta.hasSpecial) return "Password must contain at least one special character";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password') {
      const error = validatePassword(value);
      if (value.length > 0 && error) {
          setPasswordError(error);
      } else {
          setPasswordError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pError = validatePassword(formData.password);
    if (pError) {
      setPasswordError(pError);
      return;
    }
    dispatch(registerInstructor(formData))
         .unwrap()
         .then(() => {
             navigate('/login', { state: { instructorSignupSuccess: true } });
         });
  };

  const handleUpgrade = () => {
      if (user?.email || user?.userEmail) {
          const email = user.email || user.userEmail;
          dispatch(becomeInstructor(email))
            .unwrap()
            .then(() => {
                // Success! Redirect directly to enrollment form
                navigate('/instructor-enrollment');
            })
            .catch((err) => {
                console.error("Upgrade failed", err);
            });
      }
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
                    Reach Global Audience
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

          {/* Right Side - Form or Upgrade UI */}
          <div className="p-8 md:p-10 md:w-3/5 bg-cover bg-center" style={{ backgroundImage: `url(${formBackground})` }}>
            <h1 className="text-2xl font-medium text-white mb-2">
                {isAuthenticated ? "Become an Instructor" : "Instructor Sign Up"}
            </h1>
            <p className="text-white/40 text-sm mb-8">
                {isAuthenticated 
                    ? "You are logged in. Upgrade your account to start teaching." 
                    : "Create your account to start the enrollment process."}
            </p>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm text-center mb-4">
                  {error}
                </div>
            )}

            {isAuthenticated ? (
                <div className="space-y-6">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="text-white/80 text-sm mb-1">Logged in as:</p>
                        <p className="text-white font-medium text-lg">{user?.name || user?.userName}</p>
                        <p className="text-white/50 text-sm">{user?.email || user?.userEmail}</p>
                    </div>
                    
                    {!isInstructor ? (
                        <Button
                            onClick={handleUpgrade}
                            isLoading={loading}
                            className="w-full flex items-center justify-center gap-2"
                        >
                            Activate Instructor Account <ArrowRight size={16} />
                        </Button>
                    ) : (
                         <div className="text-center">
                            <p className="text-green-400 mb-4">You are already an instructor!</p>
                             <Link to="/instructor-dashboard">
                                <Button className="w-full">Go to Dashboard</Button>
                             </Link>
                         </div>
                    )}
                    
                    <div className="text-center">
                         <p className="text-white/40 text-xs mb-2">Not you?</p>
                         <button onClick={() => {
                             // Handle logout if needed, or import logout action
                             // dispatch(logout());
                             navigate('/login');
                         }} className="text-white/60 hover:text-white text-sm underline">
                             Switch Account
                         </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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

                  <div className="space-y-4">
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        error={passwordError}
                        required
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 px-2">
                        {[
                            { label: '6+ Char & Letters', met: passwordMetadata.hasMinLength && passwordMetadata.hasLetter },
                            { label: 'At least 1 Number', met: passwordMetadata.hasNumber },
                            { label: '1 Special Character', met: passwordMetadata.hasSpecial }
                        ].map((rule, idx) => (
                            <div key={idx} className={`flex items-center gap-2 transition-all duration-300 ${rule.met ? 'text-primary-pink' : 'text-white/30'}`}>
                                {rule.met ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                                <span className="text-[9px] font-bold uppercase tracking-widest leading-none">
                                    {rule.label}
                                </span>
                            </div>
                        ))}
                    </div>
                  </div>

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
            )}

            {!isAuthenticated && (
                <div className="mt-8 text-center bg-white/[0.03] rounded-xl p-4">
                    <p className="text-white/40 text-[12px] uppercase font-bold tracking-widest mb-1">Already have an account?</p>
                    <Link to="/login" className="text-primary-pink hover:text-white transition-colors text-sm font-bold">Log in to Upgrade</Link>
                </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InstructorSignUp;
