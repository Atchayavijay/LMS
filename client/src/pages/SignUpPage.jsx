import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircle2, Circle } from 'lucide-react';
import { register, clearError } from '../features/auth/store/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import heroBackground from "../assets/hero-background.png";
import formBackground from "../../assets/form.png";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Clean up errors
  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

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
      // Only show error message if user has started typing and something is wrong
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
    dispatch(register(formData));
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
          className="w-full max-w-[800px] border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_32px_120px_rgba(0,0,0,0.7)] bg-cover bg-center"
          style={{ backgroundImage: `url(${formBackground})` }}
        >
          <h1 className="text-2xl md:text-[28px] font-medium text-white text-center mb-10 tracking-tight">Create Your Account</h1>

          <form onSubmit={handleSubmit} className="max-w-[650px] mx-auto space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="name@example.com"
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
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 px-2">
                    {[
                        { label: '6+ Char & Letters', met: passwordMetadata.hasMinLength && passwordMetadata.hasLetter },
                        { label: 'At least 1 Number', met: passwordMetadata.hasNumber },
                        { label: '1 Special Character', met: passwordMetadata.hasSpecial }
                    ].map((rule, idx) => (
                        <div key={idx} className={`flex items-center gap-2 transition-all duration-300 ${rule.met ? 'text-primary-pink' : 'text-white/30'}`}>
                            {rule.met ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                            <span className="text-[10px] font-bold uppercase tracking-widest leading-none">
                                {rule.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-start gap-2.5 px-1">
              <input 
                type="checkbox" 
                id="terms" 
                required
                className="w-3.5 h-3.5 mt-1 rounded-sm border-white/20 bg-white/5 accent-primary-pink cursor-pointer" 
              />
              <label htmlFor="terms" className="text-white/70 text-[12px] font-normal cursor-pointer leading-tight">
                I agree to the <span className="text-primary-pink">Terms of Service</span> and <span className="text-primary-pink">Privacy Policy</span>.
              </label>
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                type="submit"
                isLoading={loading}
                className="w-full max-w-[240px]"
              >
                Sign up
              </Button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <p className="text-white/70 text-[14px]">
              Already have an account? <Link to="/login" className="text-primary-pink hover:underline font-medium ml-1">Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
