import React, { useState, useEffect, useCallback } from 'react';
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

  const scrollRef = React.useRef(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 850, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -850, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pt-10 pb-20 px-4 flex flex-col items-center overflow-hidden">
      <div className="relative z-10 w-full max-w-[1200px]">
        {/* Gray Background Container */}
        <div className="bg-[#1a1a1a]/40 rounded-[45px] p-4 md:p-8 border border-white/5 relative backdrop-blur-sm overflow-hidden group/main">
          
          {/* Transition Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#121212]/80 border border-white/10 flex items-center justify-center hover:bg-[#1a1a1a] transition-all opacity-0 group-hover/main:opacity-100 hidden lg:flex"
          >
            <ChevronLeft className="w-6 h-6 text-white/70" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-[#121212]/80 border border-white/10 flex items-center justify-center hover:bg-[#1a1a1a] transition-all opacity-0 group-hover/main:opacity-100 hidden lg:flex"
          >
            <ChevronRight className="w-6 h-6 text-white/70" />
          </button>

          {/* Marquee Wrapper */}
          <div className="relative overflow-hidden py-4 px-2" ref={scrollRef}>
             <div className="animate-marquee-slow flex gap-6">
                {[...slides, ...slides, ...slides].map((slide, index) => (
                  <div key={`${slide.id}-${index}`} className="w-[850px] flex-shrink-0">
                    <div className="relative bg-gradient-to-r from-[#cf4a69] to-[#de7388] rounded-[30px] p-[1px] overflow-hidden shadow-2xl">
                      <div className="relative bg-gradient-to-r from-[#cf4a69] to-[#de7388] rounded-[28px] p-8 md:p-10 flex items-center justify-between overflow-hidden min-h-[320px]">
                        <div className="flex-1 z-10">
                          <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-[#fea76e] fill-[#fea76e]" />
                            <span className="text-white/90 text-[12px] font-medium tracking-wide">
                              {slide.tag}
                            </span>
                          </div>
                          <h3 className="text-white text-[28px] md:text-[32px] font-bold mb-4 leading-tight">
                            {slide.title}
                          </h3>
                          <p className="text-white/90 text-[14px] leading-relaxed mb-8 max-w-[500px]">
                            {slide.description}
                          </p>
                          <button className={`text-white text-[13px] font-bold px-8 py-3 rounded-xl transition-all border border-white/20 shadow-lg ${
                            index % 6 < 3
                              ? 'bg-gradient-to-r from-[#e89d91] to-[#945398] hover:opacity-90'
                              : 'bg-[#532b53] hover:bg-[#663566]'
                          }`}>
                            {slide.buttonText}
                          </button>
                        </div>
                        <div className="relative w-[160px] h-[160px] flex-shrink-0 ml-8 hidden md:block">
                          <img
                            src={slide.icon}
                            alt="Icon"
                            className="w-full h-full object-contain drop-shadow-2xl"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Decorative Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-1.5 rounded-full bg-white/20 w-4" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTACarousel;
