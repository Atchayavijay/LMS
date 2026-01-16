import React from 'react';
import { Code, Palette, Cloud, BarChart2, Megaphone, ShieldCheck, Star } from 'lucide-react';
import pathBg from '../../../assets/Path-bg.png';

import developerImg from '../../../assets/Roles/developer.png';
import designerImg from '../../../assets/Roles/designer.png';
import devopsImg from '../../../assets/Roles/devops.png';
import dataImg from '../../../assets/Roles/data.png';
import digitalImg from '../../../assets/Roles/digital.png';
import qaImg from '../../../assets/Roles/QA.png';

const PathSelector = () => {
  const paths = [
    {
      id: 1,
      title: 'Developer',
      icon: <Code className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      image: developerImg,
      description: "For those who ship products, not just code.",
      features: ["React", "NodeJS", "API", "Deploy"],
      cta: "Start Building"
    },
    {
      id: 2,
      title: 'Designer',
      icon: <Palette className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      image: designerImg,
      description: "For those who create systems, not just screens.",
      features: ["Figma", "Design Systems", "Motion", "Sketch"],
      cta: "Start Designing"
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      icon: <Cloud className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      image: devopsImg,
      description: "For those who build pipelines, not just deploy code.",
      features: ["Docker", "CI/CD", "Cloud", "Monitoring"],
      cta: "Start Deploying"
    },
    {
      id: 4,
      title: 'Data Analyst',
      icon: <BarChart2 className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      image: dataImg,
      description: "For those who drive insights, not just reports.",
      features: ["SQL", "Python", "Visualization", "Strategy"],
      cta: "Start Analyzing"
    },
    {
      id: 5,
      title: 'Digital Marketer',
      icon: <Megaphone className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      image: digitalImg,
      description: "For those who build growth, not just campaigns.",
      features: ["SEO", "Ads", "Analytics", "Content Strategy"],
      cta: "Start Growing"
    },
    {
      id: 6,
      title: 'QA Engineer',
      icon: <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-white" />,
      image: qaImg,
      description: "For those who automate quality, not just run tests.",
      features: ["Selenium", "Cypress", "Automation", "Frameworks"],
      cta: "Start Testing"
    },
  ];

  return (
    <section className="relative w-full py-24 px-4 bg-transparent overflow-hidden flex flex-col items-center">
      <div className="relative z-10 w-full max-w-[1095px] flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Choose your path <span className="text-[#FF5E5E]">We handle the rest!</span>
          </h2>
          
          {/* Decorative line with stars */}
          <div className="flex items-center justify-center gap-6 w-full max-w-[400px] mx-auto opacity-90">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
            <div className="flex gap-2 items-center">
              <Star className="w-3 h-3 text-white/40 fill-white/40" />
              <Star className="w-4 h-4 text-white fill-white" />
              <Star className="w-3 h-3 text-white/40 fill-white/40" />
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
        </div>

        {/* Main Glass Container - Width 1095px */}
        <div className="relative w-full max-w-[1095px] min-h-[604px] p-4 md:p-10 rounded-[45px] border-[0.8px] border-white/10 bg-[#0F0F0F]/40 backdrop-blur-md overflow-hidden shadow-2xl flex items-center justify-center">
          
          {/* Background Image used as the container background */}
          <img 
            src={pathBg} 
            alt="Path Background" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40"
          />
          
        {/* Grid of paths - Hover to swap Image with Content */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-16 gap-x-10 md:gap-x-16 w-full h-full content-center">
          {paths.map((path) => (
            <div 
              key={path.id} 
              className="group relative h-[240px] md:h-[260px] w-full max-w-[340px] mx-auto rounded-[45px] overflow-hidden cursor-pointer border-[0.7px] border-white/20 transition-all duration-500 hover:scale-[1.05] hover:border-[#FF5E5E]/40"
            >
              {/* INITIAL STATE: Role Image/Title */}
              <div className="absolute inset-0 z-10 transition-all duration-500 group-hover:opacity-0 group-hover:scale-110">
                <img 
                  src={path.image} 
                  alt={path.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 shadow-inner"></div>
                
                <div className="relative h-full flex flex-col items-center justify-center p-6 mt-4">
                  <div className="mb-4">
                    {React.cloneElement(path.icon, { className: "w-12 h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" })}
                  </div>
                  <h3 className="text-white text-2xl font-bold tracking-tight text-center">
                    {path.title}
                  </h3>
                </div>
              </div>

              {/* HOVER STATE: Detailed Content Card (Full Replacement) */}
              <div className="absolute inset-0 bg-[#1A1A1A] p-7 flex flex-col items-start transition-all duration-500 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                {/* Header: Icon & Title */}
                <div className="flex items-center gap-3 mb-2">
                  {React.cloneElement(path.icon, { className: "w-7 h-7 text-[#FF5E5E]" })}
                  <h3 className="text-white text-lg font-bold">{path.title}</h3>
                </div>

                {/* Description */}
                <p className="text-white/70 text-[13px] leading-relaxed mb-4 font-medium">
                  {path.description}
                </p>

                {/* Features */}
                <ul className="space-y-1.5 mb-6">
                  {path.features.map((feature, i) => (
                    <li key={i} className="text-white/50 text-[11px] flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5E5E]/60"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto">
                  <button className="text-white text-[14px] font-bold hover:text-[#FF5E5E] transition-colors flex items-center gap-2">
                    {path.cta} <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
};

export default PathSelector;
