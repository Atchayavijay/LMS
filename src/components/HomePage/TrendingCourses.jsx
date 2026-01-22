import React from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import courseMidjourneyDesign from '../../assets/courses/course-midjourney-design.png'
import courseChatGPTBasics from '../../assets/courses/course-chatgpt-basics.png'
import courseWebDesignUIUX from '../../assets/courses/course-web-design-ui-ux.png'
import courseBusinessAnalytics from '../../assets/courses/course-business-analytics.png'
import viewallImage from '../../assets/courses/viewall.png'

const TrendingCourses = () => {
  const courses = [
    {
      id: 1,
      number: '01',
      title: 'How to design using Midjourney?',
      image: courseMidjourneyDesign,
    },
    {
      id: 2,
      number: '02',
      title: 'ChatGPT basics that you will need',
      image: courseChatGPTBasics,
    },
    {
      id: 3,
      number: '03',
      title: 'Web design for the New-Gen | Ui & Ux',
      image: courseWebDesignUIUX,
    },
    {
      id: 4,
      number: '04',
      title: 'Learn Business analytics within a year',
      image: courseBusinessAnalytics,
    },
  ]

  return (
    <div className="mt-14 w-full max-w-6xl">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4 text-white px-1">
        <h2 className="text-xl font-semibold text-left">Trending courses</h2>
        <ArrowUpRight className="h-5 w-5" />
      </div>

      {/* Card Wrapper */}
      <div className="border border-white/40 rounded-2xl p-4 backdrop-blur-sm bg-white/5">
        {/* Course Cards */}
        <div className="flex flex-col md:grid md:grid-cols-2 xl:flex xl:flex-row gap-4 overflow-visible xl:overflow-x-auto pb-3 scrollbar-hide items-stretch">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex-shrink-0 w-full xl:w-[211px] cursor-pointer group"
            >
              <div className="relative h-[163px] border border-white/40 rounded-xl overflow-hidden backdrop-blur-md bg-white/10 transition-transform duration-300 group-hover:scale-[1.02]">
                {/* Image */}
                <img
                  src={course.image}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  alt={course.title}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

                {/* Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 text-white text-xs font-semibold">
                  ~{course.number}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>

                {/* Title */}
                <div className="absolute bottom-2 left-3 right-3 text-left">
                  <h3 className="text-white font-bold text-[15px] leading-tight group-hover:text-zen-primary transition-colors">
                    {course.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}

          {/* View All Card */}
          <div className="flex-shrink-0 w-full xl:w-[124px] cursor-pointer group md:col-span-2 xl:col-span-1">
            <div className="relative h-[163px] border border-white/40 rounded-xl overflow-hidden backdrop-blur-md bg-white/10 transition-transform duration-300 group-hover:scale-[1.02]">
              <img
                src={viewallImage}
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                alt="View all"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <ArrowRight className="h-8 w-8 mb-2 group-hover:translate-x-1 transition-transform" />
                <p className="font-semibold text-base group-hover:text-zen-primary transition-colors">View all</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendingCourses
