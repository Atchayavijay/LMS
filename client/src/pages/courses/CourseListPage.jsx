import React from 'react';
import CourseCard from '../../features/courses/components/CourseCard';

// Dummy data for demonstration of the architecture
const DUMMY_COURSES = [
  {
    id: 1,
    title: "Mastering React 19: Advanced Design Patterns",
    category: "Development",
    description: "Deep dive into Server Components, Actions, and the new use() hook.",
    price: 49.99,
    thumbnail: null,
  },
  {
    id: 2,
    title: "UI/UX Architecture for Enterprise",
    category: "Design",
    description: "Learn how to build scalable design systems using Tailwind and Figma.",
    price: 79.99,
    thumbnail: null,
  },
  {
    id: 3,
    title: "Fullstack Mastery with Node & SQL",
    category: "Backend",
    description: "Comprehensive guide to building production-ready APIs with Postgres.",
    price: 59.99,
    thumbnail: null,
  },
  {
    id: 4,
    title: "Professional Motion Design in React",
    category: "Animation",
    description: "Create premium animations that wow users using Framer Motion.",
    price: 39.99,
    thumbnail: null,
  }
];

const CourseListPage = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 italic">The Curriculum</h1>
        <p className="text-white/50 text-lg max-w-2xl">
          Everything you need to master the art of modern software development and design.
        </p>
      </header>
      
      <div className="flex flex-wrap gap-4 mb-12">
        {['All', 'Development', 'Design', 'Backend', 'Animation'].map((cat) => (
          <button 
            key={cat}
            className="px-6 py-2 rounded-full border border-white/10 text-white/70 text-sm font-medium hover:border-primary-pink/50 hover:text-white transition-all bg-white/[0.02]"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {DUMMY_COURSES.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseListPage;
