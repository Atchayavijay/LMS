import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

import icon1 from '../../../assets/icon.png';
import icon2 from '../../../assets/icon-2.png';

const CTACarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tag: "New at Kattraan",
      title: "Full Stack is evolving. Are you?",
      description: "Build production-ready applications using React, Node.js, and modern frameworks companies actually use.",
      buttonText: "Explore developer track",
      icon: icon1
    },
    {
      id: 2,
      tag: "New at Kattraan",
      title: "Advance your career without quitting your job",
      description: "Learn evenings and weekends. Build real projects. Get hired. All with flexible schedules designed for working professionals",
      buttonText: "View All Tracks",
      icon: icon2
    },
    {
      id: 3,
      tag: "New at Kattraan",
      title: "The future is automated testing. Start building today.",
      description: "Manual testing is dead. Learn Selenium, Cypress, and CI/CD automation to stay relevant in 2025 and beyond",
      buttonText: "Start QA Track",
      icon: icon1
    },
    {
      id: 4,
      tag: "New at Kattraan",
      title: "Cloud & DevOps are reshaping IT. Are you ready?",
      description: "Docker, Kubernetes, and AWS aren't optional anymore. Companies need DevOps engineers who can deploy, not just code.",
      buttonText: "Start Cloud Track",
      icon: icon1
    },
    {
      id: 5,
      tag: "New at Kattraan",
      title: "Data drives every decision. Can you analyze it?",
      description: "SQL, Python, and Tableau are non-negotiable skills. Learn data analytics and become the person companies can't afford to lose.",
      buttonText: "Start Data Track",
      icon: icon1
    },
    {
      id: 6,
      tag: "New at Kattraan",
      title: "AI tools are changing development. Learn to use them",
      description: "GitHub Copilot, ChatGPT, and AI-assisted coding are the new normal. Build faster, smarter, and stay ahead of developers who don't adapt",
      buttonText: "Master AI Tools",
      icon: icon1
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full pt-16 pb-8 px-4 flex flex-col items-center">
      <div className="relative z-10 w-full max-w-[1000px]">
        {/* Gray Background Container */}
        <div className="bg-[#1a1a1a]/60 rounded-[40px] p-10 border border-white/5 relative">
          {/* Carousel Container */}
          <div className="relative">
            {/* Left Arrow - Positioned outside the container */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-24 z-30 w-12 h-12 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center hover:bg-[#1a1a1a] transition-all group"
            >
              <ChevronLeft className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
            </button>

            {/* Right Arrow - Positioned outside the container */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-24 z-30 w-12 h-12 rounded-full bg-[#121212] border border-white/10 flex items-center justify-center hover:bg-[#1a1a1a] transition-all group"
            >
              <ChevronRight className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
            </button>

          {/* Slide Content */}
          <div className="relative bg-gradient-to-r from-[#cf4a69] to-[#de7388] rounded-[30px] p-[1px] overflow-hidden">
            <div className="relative bg-gradient-to-r from-[#cf4a69] to-[#de7388] rounded-[28px] p-8 flex items-center justify-between overflow-hidden">
              {/* Content */}
              <div className="flex-1 z-10">
                {/* Tag with Star Icon */}
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-[#fea76e] fill-[#fea76e]" />
                  <span className="text-white/90 text-[12px] font-medium tracking-wide">
                    {slides[activeSlide].tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white text-[28px] font-bold mb-3 leading-tight">
                  {slides[activeSlide].title}
                </h3>

                {/* Description */}
                <p className="text-white/90 text-[13px] leading-relaxed mb-6 max-w-[450px]">
                  {slides[activeSlide].description}
                </p>

                {/* Button - Different styles for first 3 vs last 3 slides */}
                <button className={`text-white text-[12px] font-medium px-6 py-2.5 rounded-lg transition-all border border-white/20 shadow-sm ${
                  activeSlide < 3
                    ? 'bg-gradient-to-r from-[#e89d91] to-[#945398] hover:opacity-90'
                    : 'bg-[#532b53] hover:bg-[#663566]'
                }`}>
                  {slides[activeSlide].buttonText}
                </button>
              </div>

              {/* Icon/Graphic */}
              <div className="relative w-[140px] h-[140px] flex-shrink-0 ml-8">
                <img
                  src={slides[activeSlide].icon}
                  alt="Icon"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeSlide
                    ? 'w-8 bg-[#FF5E7E]'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default CTACarousel;
