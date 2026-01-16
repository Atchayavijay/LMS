import React from 'react';
import { Clock } from 'lucide-react';

// Images
import blogBg from '../../../assets/blog.png';
import blogBg2 from '../../../assets/blog 1.png';

const BlogCard = ({ article, alignment = 'left', variant = 'large' }) => {
  const isCentered = alignment === 'center';
  const isLarge = variant === 'large';

  return (
    <div className={`group relative flex flex-col w-[95%] mx-auto bg-transparent border border-white/20 rounded-[32px] p-5 transition-all duration-300 hover:border-white/40 overflow-hidden ${isCentered ? 'items-center text-center' : 'items-start text-left'}`} style={{ background: '#00000000' }}>
      
      {/* Article Image with Badge Overlay */}
      <div className={`relative w-full ${isLarge ? 'h-[200px]' : 'h-[130px]'} rounded-[24px] overflow-hidden mb-4 shrink-0`}>
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Category Badge */}
        <div className={`absolute top-4 ${isCentered ? 'left-4' : 'left-4'}`}>
          <span className="text-[10px] font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col w-full">
        <h3 className={`text-white text-[20px] font-bold leading-tight mb-2 group-hover:text-[#FF5E5E] transition-colors ${isCentered ? 'text-center' : 'text-left'}`}>
          {article.title}
        </h3>
        <p className={`text-white/80 text-[13px] leading-relaxed mb-4 font-medium ${isCentered ? 'mx-auto' : ''}`}>
          {article.description}
        </p>
      </div>

      {/* Footer - Read time and Button */}
      <div className={`mt-auto flex flex-col gap-3 w-full ${isCentered ? 'items-center' : 'items-start'}`}>
        <p className="text-white/50 text-[11px] font-medium">
          {article.readTime}
        </p>
        
        <button className="bg-gradient-to-r from-[#FF8C42] to-[#FF3FB4] hover:opacity-90 text-white text-[12px] font-bold py-2.5 px-8 rounded-[12px] transition-all shadow-lg shadow-pink-500/20">
          Read Article
        </button>
      </div>
    </div>
  );
};

const BlogSection = () => {
  const articles = [
    {
      id: 1,
      category: 'Mindset',
      title: "Why 'Learning' is Keeping you Stuck",
      description: "Stop consuming content. Start building capability. The uncomfortable truth about why your course collection isn't helping.",
      readTime: '5 Min read',
      image: '/assets/blog/communicate.png'
    },
    {
      id: 2,
      category: 'Career',
      title: 'How to Get Hired Without "Years of Experience"',
      description: "Why showing beautiful screens isn't enough. What separates portfolio projects from portfolio theater.",
      readTime: '6 Min read',
      image: '/assets/blog/Career.png'
    },
    {
      id: 3,
      category: 'Development',
      title: "The Full-Stack Developer Doesn't Exist",
      description: "Why that's actually good news. What employers really mean when they say 'full-stack' and how to position yourself.",
      readTime: '8 Min read',
      image: '/assets/blog/Development.png'
    },
    {
      id: 4,
      category: 'Design',
      title: "Your Figma Files Won't Get You Hired",
      description: "Why showing beautiful screens isn't enough. What separates portfolio projects from actually useful.",
      readTime: '6 Min read',
      image: '/assets/blog/Designs.png'
    },
    {
      id: 5,
      category: 'Future Of Work',
      title: 'AI Won\'t Replace You. Someone Using AI Will.',
      description: "The uncomfortable truth about AI augmentation. How to 10x your output instead of becoming obsolete.",
      readTime: '9 Min read',
      image: '/assets/blog/Work.png'
    },
    {
      id: 6,
      category: 'Analytics',
      title: "Excel Isn't a Skill. Problem-Solving Is.",
      description: "Why technical proficiency doesn't equal analytical thinking. What makes a dashboard actually useful vs. just pretty.",
      readTime: '7 Min read',
      image: '/assets/blog/Analystics.png'
    }
  ];

  // Column Distribution for Masonry-like effect
  // Col 1: Big, Small
  // Col 2: Small, Big (Centered)
  // Col 3: Big, Small
  const col1 = [articles[0], articles[3]];
  const col2 = [articles[1], articles[4]];
  const col3 = [articles[2], articles[5]];

  return (
    <section className="relative w-full  py-20 px-4 flex justify-center bg-transparent border-none">
      {/* Background Container for the Section - Split Backgrounds */}
      <div className="relative w-full max-w-[1252px] rounded-[32px] overflow-hidden p-8 md:p-12 shadow-2xl bg-[#030002] border border-white/10">
        
        {/* Top Background Image (blog.png) - Fixed Height 572px, Radius 32px, Opacity 52% - No Border to avoid lines in cards */}
        <div 
          className="absolute top-[-150px] left-0 w-full h-[742px] pointer-events-none z-0 rounded-[32px] opacity-[0.52] border-t border-x border-white/10 border-b-transparent"
          style={{
            backgroundImage: `url(${blogBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center -50px',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        {/* Bottom Background Image (blog 1.png) - Covers the rest */}
        <div 
          className="absolute top-[600px] h-[742px] bottom-0 left-0 w-full pointer-events-none z-0"
          style={{
            backgroundImage: `url(${blogBg2})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>

        {/* Header */}
        <div className="relative z-10 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Stay ahead of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C42] to-[#FF3FB4]">What's next</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-medium tracking-wide">
            Insights on learning, building, and shipping from the Kattraan team.
          </p>
        </div>

        {/* Blog Masonry Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Column 1 - Left Aligned */}
          <div className="flex flex-col gap-8">
            <BlogCard article={col1[0]} alignment="left" variant="large" />
            <BlogCard article={col1[1]} alignment="left" variant="compact" />
          </div>

          {/* Column 2 - Center Aligned */}
          <div className="flex flex-col gap-8">
            <BlogCard article={col2[0]} alignment="center" variant="compact" />
            <BlogCard article={col2[1]} alignment="center" variant="large" />
          </div>

          {/* Column 3 - Left Aligned */}
          <div className="flex flex-col gap-8">
            <BlogCard article={col3[0]} alignment="left" variant="large" />
            <BlogCard article={col3[1]} alignment="left" variant="compact" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
