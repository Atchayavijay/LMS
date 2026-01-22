import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div 
      className="group relative h-full rounded-[30px] p-[1px] transition-all duration-300 shadow-2xl backdrop-blur-sm"
      style={{
        background: 'linear-gradient(103.94deg, rgba(243, 243, 243, 0.8075) 9.17%, rgba(255, 255, 255, 0.1785) 30.27%, rgba(255, 255, 255, 0) 64.23%, rgba(255, 255, 255, 0.4505) 89.4%)'
      }}
    >
      <div className="flex flex-col bg-gradient-to-b from-[#1f1f1f]/90 to-[#0a0a0a]/90 rounded-[29px] p-6 h-full">
        {/* Category/Role with quotes - Pink to Orange gradient */}
        <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C42] to-[#FF3FB4] text-[20px] font-bold mb-2">
          "{testimonial.category}"
        </h3>

        {/* Star Rating - Smaller stars */}
        <div className="flex gap-1.5 mb-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-white/80 flex items-center justify-center">
              <Star className="w-2 h-2 fill-black text-black" />
            </div>
          ))}
        </div>

        {/* Testimonial Text - Larger and White */}
        <p className="text-white text-[15px] leading-relaxed mb-3 flex-1">
          {testimonial.text}
        </p>

        {/* Author Name - Larger and White */}
        <p className="text-white text-[14px] mb-4 text-right font-medium">
          - {testimonial.author}
        </p>

        {/* Journey/Transition Badge - White text and larger */}
        <div className="mt-auto">
          <div className="w-full bg-[#2a2a2a]/70 border border-white/5 rounded-full px-4 py-3 text-center">
            <span className="text-white text-[13px] font-medium">
              {testimonial.journey}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      category: "Career Switcher",
      text: "At 32, I thought it was too late. Kattran proved me wrong. Built a job portal from scratch. Now earning double as a developer.",
      author: "Rajesh Kumar",
      journey: "Civil Engineer → Full Stack Developer"
    },
    {
      id: 2,
      category: "Struggling Fresh Grad",
      text: "12 rejections broke me. Kattran's real projects gave me confidence. Cracked TCS, Infosys & a startup!",
      author: "Aditya Verma, B.Tech",
      journey: "Rejections → selection"
    },
    {
      id: 3,
      category: "Working Professional",
      text: "Same job, same salary for 4 years. I felt invisible. Learned automation at Kattran. Got promoted in 2 months. Finally noticed.",
      author: "Priya Menon",
      journey: "Manual Tester → Automation Lead"
    },
    {
      id: 4,
      category: "Career Switcher",
      text: "At 32, I thought it was too late. Kattran proved me wrong. Built a job portal from scratch. Now earning double as a developer.",
      author: "Rajesh Kumar",
      journey: "Civil Engineer → Full Stack Developer"
    },
    {
      id: 5,
      category: "Struggling Fresh Grad",
      text: "12 rejections broke me. Kattran's real projects gave me confidence. Cracked TCS, Infosys & a startup!",
      author: "Aditya Verma, B.Tech",
      journey: "Rejections → selection"
    },
    {
      id: 6,
      category: "Working Professional",
      text: "Same job, same salary for 4 years. I felt invisible. Learned automation at Kattran. Got promoted in 2 months. Finally noticed.",
      author: "Priya Menon",
      journey: "Manual Tester → Automation Lead"
    }
  ];

  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center overflow-hidden">
      {/* Gradient Overlays for Focus Effect - Positioned relative to section for full coverage */}
      <div className="absolute inset-y-0 left-0 w-[15%] md:w-[30%] bg-gradient-to-r from-[#090C03] via-[#090C03]/90 to-transparent z-30 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-[15%] md:w-[30%] bg-gradient-to-l from-[#090C03] via-[#090C03]/90 to-transparent z-30 pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-[1200px]">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Voices That Validate <span className="bg-gradient-to-r from-[#FF8C42] to-[#FF3FB4] bg-clip-text text-transparent">Our Impact</span>
          </h2>
          
          {/* Decorative line with stars */}
          <div className="flex items-center justify-center gap-3 w-full max-w-[600px] mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/60"></div>
            <div className="flex gap-1 items-center">
              <Star className="w-2 h-2 text-white/60 fill-white/60" />
              <Star className="w-3 h-3 text-white fill-white" />
              <Star className="w-2 h-2 text-white/60 fill-white/60" />
            </div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/60"></div>
          </div>
        </div>

        {/* Testimonials Rows - Staggered Layout */}
        <div className="flex flex-col gap-16 mb-8 w-full">
          {/* First Row - Centered */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Second Row - Shifted Right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 md:translate-x-12 lg:translate-x-16">
            {testimonials.slice(3, 6).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
