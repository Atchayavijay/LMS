import React from 'react';
import CourseSection from './CourseSection';

const InDemandCourses = () => {
  const courses = [
    {
      title: 'Web Development For Beginners',
      category: 'Development',
      rating: '4.8',
      description: 'Learn to build responsive websites from scratch using HTML, CSS, and JavaScript.',
      lessons: '05',
      duration: '11h 20m',
      projects: '22',
      image: '/assets/TopCourses/DeveloP-1.PNG'
    },
    {
      title: 'UI/UX Designer Masterclass-2025',
      category: 'Design',
      rating: '4.5',
      description: 'Learn User Research, Wireframing, Prototyping, Figma, Design Systems, and Usability Testing.',
      lessons: '06',
      duration: '14h 00m',
      projects: '30',
      image: '/assets/TopCourses/Design.png'
    },
    {
      title: 'HTML - The Complete Guide 2026',
      category: 'Development',
      rating: '4.5',
      description: 'Build real-world, responsive websites with hands-on training from industry experts.',
      lessons: '04',
      duration: '09h 00m',
      projects: '40',
      image: '/assets/TopCourses/Development.png'
    },
    {
      title: 'Content Marketing Masterclass',
      category: 'Marketing',
      rating: '4.8',
      description: 'Master the art of storytelling, strategy, and digital growth with our Content Marketing Masterclass — 2025.',
      lessons: '07',
      duration: '08h 30m',
      projects: '45',
      image: '/assets/TopCourses/Marketing.png'
    },
  ];

  return <CourseSection title="In Demand" highlightWord="Courses" courses={courses} />;
};

export default InDemandCourses;
