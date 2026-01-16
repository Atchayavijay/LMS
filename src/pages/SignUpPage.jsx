import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import heroBackground from "../assets/hero-background.png";
import formBackground from "../../assets/form.png";

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-[#0c091a] relative overflow-hidden flex flex-col font-satoshi selection:bg-primary-pink/30">
      {/* Background Image - Exactly like HeroSection */}
      <img
        src={heroBackground}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient Overlay - Exactly like HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-36 pb-16 px-4 relative z-10">
        <div 
          className="w-full max-w-[800px] border border-white/10 rounded-[32px] p-8 md:p-10 shadow-[0_32px_120px_rgba(0,0,0,0.7)] font-satoshi bg-cover bg-center"
          style={{ backgroundImage: `url(${formBackground})` }}
        >
          <h1 className="text-2xl md:text-[28px] font-medium text-white text-center mb-10 tracking-tight">Sign Up With Email</h1>

          <form className="max-w-[650px] mx-auto space-y-5">
            <div className="space-y-1.5">
              <label className="text-white text-[15px] font-normal ml-1">Name</label>
              <input
                type="text"
                className="w-full bg-white/[0.05] border border-white/10 rounded-full py-2.5 px-6 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
                placeholder=""
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white text-[15px] font-normal ml-1">Email</label>
              <input
                type="email"
                className="w-full bg-white/[0.05] border border-white/10 rounded-full py-2.5 px-6 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
                placeholder=""
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white text-[15px] font-normal ml-1">Password</label>
              <input
                type="password"
                className="w-full bg-white/[0.05] border border-white/10 rounded-full py-2.5 px-6 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
                placeholder=""
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white text-[15px] font-normal ml-1">Re-enter password</label>
              <input
                type="password"
                className="w-full bg-white/[0.05] border border-white/10 rounded-full py-2.5 px-6 text-white text-[14px] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all"
                placeholder=""
              />
            </div>

            <div className="flex items-center gap-2.5 px-1 pt-1">
              <input 
                type="checkbox" 
                id="updates" 
                className="w-3.5 h-3.5 rounded-sm border-white/20 bg-white/5 accent-primary-pink cursor-pointer" 
              />
              <label htmlFor="updates" className="text-white/70 text-[12px] font-normal cursor-pointer leading-tight">
                Send me special offers, personalized recommendations, and learning tips.
              </label>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                className="w-full max-w-[240px] bg-gradient-to-r from-primary-pink to-[#ff7b3f] hover:brightness-110 text-white font-bold py-3 rounded-full transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-primary-pink/20 text-[15px]"
              >
                Sign up
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <div className="relative mb-8 flex items-center justify-center max-w-[650px] mx-auto">
              <div className="flex-grow border-t border-white"></div>
              <span className="px-5 text-[13px] text-white font-normal">Or Sign Up Using</span>
              <div className="flex-grow border-t border-white"></div>
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

            <p className="text-white text-[14px]">
              Already have an account? <Link to="/login" className="text-primary-pink hover:underline font-medium ml-1">Log in</Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignUpPage;
