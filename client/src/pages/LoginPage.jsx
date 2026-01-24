import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../features/auth/store/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import heroBackground from "../assets/hero-background.png";
import formBackground from "../../assets/form.png";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'admin' || user?.roles?.includes(3)) {
          navigate('/admin-dashboard', { replace: true });
          return;
      }
      if (user?.role === 'instructor' || user?.roles?.includes(2)) {
          if (user.status === 'pending_enrollment') {
            navigate('/instructor-enrollment', { replace: true });
            return;
          }
          if (user.status === 'pending_approval') {
            navigate('/waiting-approval', { replace: true });
            return;
          }
          navigate('/instructor-dashboard', { replace: true });
          return;
      }
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen bg-obsidian relative overflow-hidden flex flex-col font-satoshi selection:bg-primary-pink/30">
      {/* Background Image */}
      <img
        src={heroBackground}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center translate-y-[-10%] opacity-60"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-obsidian/40 to-obsidian" />

      <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-4 relative z-10">
        <div 
          className="w-full max-w-[680px] border border-white/5 rounded-[40px] p-10 md:p-14 shadow-[0_32px_120px_rgba(0,0,0,0.8)] bg-white/[0.03] backdrop-blur-3xl"
        >
          <h1 className="text-2xl md:text-[32px] font-bold text-white text-center mb-12 tracking-tight">
             Log In With Email
          </h1>

          {/* New Success Message */}
          {location.state?.instructorSignupSuccess && (
             <div className="mb-8 bg-green-500/10 border border-green-500/20 text-green-400 p-5 rounded-2xl text-sm text-center font-medium">
               Account created successfully! Please log in to complete your enrollment.
             </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-[480px] mx-auto space-y-8">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm text-center font-bold">
                {error}
              </div>
            )}

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-white/5 border-white/10"
            />

            <div className="flex items-center gap-3 px-1">
              <input 
                type="checkbox" 
                id="updates" 
                className="w-4 h-4 rounded border-white/20 bg-white/5 accent-primary-pink cursor-pointer" 
              />
              <label htmlFor="updates" className="text-white/60 text-[13px] font-medium cursor-pointer leading-tight">
                Send me special offers, personalized recommendations, and learning tips.
              </label>
            </div>

            <div className="pt-6 flex justify-center">
              <Button
                type="submit"
                isLoading={loading}
                className="w-full h-[52px] text-base font-bold bg-gradient-to-r from-primary-pink to-[#ff6b6b] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Log in
              </Button>
            </div>
          </form>

          <div className="mt-14 text-center">
            <div className="relative mb-10 flex items-center justify-center max-w-[480px] mx-auto">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="px-6 text-[13px] text-white/40 font-bold uppercase tracking-widest">Or Sign Up Using</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <div className="flex justify-center gap-8 mb-10">
              <button className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all shadow-xl">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
              </button>
              <button className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all shadow-xl">
                <svg viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                </svg>
              </button>
              <button className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all shadow-xl">
                <img src="https://www.svgrepo.com/show/475689/twitter-color.svg" className="w-6 h-6" alt="Twitter" />
              </button>
            </div>

            <p className="text-white/70 text-[15px] font-medium">
              Don't have an account? <Link to="/signup" className="text-primary-pink hover:underline font-bold ml-1">Sign up</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
