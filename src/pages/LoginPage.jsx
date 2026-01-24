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
      if (user?.role === 'instructor') {
          if (user.status === 'pending_enrollment') {
            navigate('/instructor-enrollment', { replace: true });
            return;
          }
          if (user.status === 'pending_approval') {
            navigate('/waiting-approval', { replace: true });
            return;
          }
          // If approved, go to dashboard
          navigate('/instructor-dashboard', { replace: true });
          return;
      }
      // Student or Admin
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  // Clean up errors on unmount
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
          <h1 className="text-2xl md:text-[28px] font-medium text-white text-center mb-10 tracking-tight">Log In With Email</h1>

          {/* New Success Message */}
          {location.state?.instructorSignupSuccess && (
             <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm text-center font-medium">
               Account created successfully! Please log in to complete your enrollment.
             </div>
          )}

          <form onSubmit={handleSubmit} className="max-w-[650px] mx-auto space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm text-center">
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

            <div className="flex items-center gap-2.5 px-1">
              <input 
                type="checkbox" 
                id="updates" 
                className="w-3.5 h-3.5 rounded-sm border-white/20 bg-white/5 accent-primary-pink cursor-pointer" 
              />
              <label htmlFor="updates" className="text-white/70 text-[12px] font-normal cursor-pointer leading-tight">
                Send me special offers, personalized recommendations, and learning tips.
              </label>
            </div>

            <div className="pt-4 flex justify-center">
              <Button
                type="submit"
                isLoading={loading}
                className="w-full max-w-[240px]"
              >
                Log in
              </Button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <div className="relative mb-8 flex items-center justify-center max-w-[650px] mx-auto">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="px-5 text-[13px] text-white/50 font-normal">Or Sign Up Using</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <div className="flex justify-center gap-10 mb-8">
              <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" alt="Google" />
              </button>
              <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <svg viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                </svg>
              </button>
              <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                <img src="https://www.svgrepo.com/show/475689/twitter-color.svg" className="w-6 h-6" alt="Twitter" />
              </button>
            </div>

            <p className="text-white/70 text-[14px]">
              Don't have an account? <Link to="/signup" className="text-primary-pink hover:underline font-medium ml-1">Sign up</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
