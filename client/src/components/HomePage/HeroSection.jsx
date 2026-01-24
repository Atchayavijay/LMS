import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import TrendingCourses from "./TrendingCourses";
import heroBackground from "../../assets/hero-background.png";
import heroDecorationRightBottom from "../../assets/hero-decoration-right-bottom.png";
import heroDecorationLeft from "../../assets/hero-decoration-left.png";
import heroDecorationRightTop from "../../assets/hero-decoration-right-top.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-start pt-28 md:pt-32 lg:pt-36 xl:pt-44 pb-16">

      {/* Background Image */}
      <img
        src={heroBackground}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
      
      {/* Bottom Fade to blend with next section */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#090C03] via-[#090C03]/60 to-transparent pointer-events-none" />

      {/* Floating Decorations */}
      {/* Right Icon (Menu/UI) - Top Right */}
      <img
        src={heroDecorationRightBottom}
        className="hidden md:block absolute right-[15%] top-[180px] w-16 md:w-20 opacity-90 animate-float-slow"
        alt="decor"
      />

      {/* Left Icon (Mountains) - Bottom Left */}
      <img
        src={heroDecorationRightTop}
        className="hidden md:block absolute left-[15%] top-[480px] w-20 md:w-24 opacity-90 animate-float"
        alt="decor"
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">

        {/* Badge Container */}
        <div className="relative">
            <div 
              className="px-8 py-2.5 rounded-full border backdrop-blur-md bg-gradient-to-r from-[rgba(65,30,30,0.6)] to-[rgba(40,20,40,0.6)] border-[rgba(255,100,100,0.2)] shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            >
              <span className="text-white/90 text-[15px] font-medium tracking-wide">
                Upskill. Anytime. Anywhere.
              </span>
            </div>

            {/* Star Decoration - Positioned relative to badge */}
            <img
              src={heroDecorationLeft}
              className="absolute -top-3 -right-4 w-6 h-6 animate-pulse drop-shadow-[0_0_8px_rgba(158,48,255,0.5)]"
              alt="star"
            />
        </div>

        {/* Hero Heading */}
        <h1 className="mt-4 md:mt-6 text-white font-black text-4xl sm:text-5xl lg:text-[56px] xl:text-[64px] leading-tight tracking-tight px-4">
          New-Gen <br /> Learning Hub
        </h1>

        {/* Subtitle */}
        <p className="text-white/90 mt-4 text-sm md:text-[15px] max-w-md">
          Join millions of learners worldwide and master new skills with our
          comprehensive online courses.
        </p>

        {/* CTA Button */}
        <button className="mt-8 inline-flex items-center gap-3 text-white px-10 py-2.5 rounded-full text-[17px] font-medium border border-white/30 backdrop-blur-md bg-[rgba(168,85,108,0.5)] hover:bg-[rgba(168,85,108,0.6)] transition-all shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
          Start learning
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Trending Courses Component */}
        <TrendingCourses />
      </div>

    </section>
  );
};

export default HeroSection;
