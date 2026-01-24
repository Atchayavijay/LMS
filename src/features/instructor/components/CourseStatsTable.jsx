import React from 'react';

/**
 * Feature component for the Instructor domain.
 * Displays a list of courses with enrollment and revenue data.
 */
const CourseStatsTable = ({ courses }) => {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-[32px] overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-white/5 bg-white/[0.02]">
            <th className="px-6 py-4 text-white/40 text-sm font-medium">Course Name</th>
            <th className="px-6 py-4 text-white/40 text-sm font-medium text-center">Enrollments</th>
            <th className="px-6 py-4 text-white/40 text-sm font-medium text-right">Revenue</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {courses.map((course, i) => (
            <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
              <td className="px-6 py-4 text-white font-medium group-hover:text-primary-pink transition-colors">
                {course.name}
              </td>
              <td className="px-6 py-4 text-white/70 text-center">
                {course.enrollments} Students
              </td>
              <td className="px-6 py-4 text-green-400 font-bold text-right">
                ${course.revenue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseStatsTable;
