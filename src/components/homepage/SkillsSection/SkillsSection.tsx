"use client";

import React, { useState } from "react";
// Path to your new skills JSON file
import skillsDataRaw from "../../../data/skills-new.json";
import Link from "next/link";
import { FaCheckCircle } from "react-icons/fa";

// --- Type Definitions based on your images ---
interface SkillEntry {
  skill: string;
  points: string[]; // Changed from experience/projects to points
}

const initialSkills = skillsDataRaw as SkillEntry[];

const SkillsSection: React.FC = () => {
  const [skills] = useState<SkillEntry[]>(initialSkills);

  // const renderSkillEntry = (entry: SkillEntry, index: number) => {
  //   return (
  //     <div key={index} className='py-6 border-b border-gray-200 last:border-0'>
  //       {/* Skill Name */}
  //       <h3 className='text-md font-bold text-gray-900 mb-3'>{entry.skill}</h3>

  //       <div className='space-y-3'>
  //         {/* Experience List (Company Logos placeholder) */}
  //         {entry.experience.map((exp, i) => (
  //           <div key={i} className='flex items-center text-sm text-gray-800'>
  //             <span className='w-6 h-6 bg-blue-100 text-blue-600 flex items-center justify-center rounded mr-3 text-[10px] font-bold'>
  //               {exp.charAt(0)}
  //             </span>
  //             <span>{exp}</span>
  //           </div>
  //         ))}

  //         {/* Endorsement Row */}
  //         {entry.endorsements > 0 && (
  //           <div className='flex items-start text-sm text-gray-700'>
  //             <span className='mr-3 text-gray-500 mt-0.5'>
  //               <svg
  //                 className='w-5 h-5'
  //                 fill='currentColor'
  //                 viewBox='0 0 20 20'
  //               >
  //                 <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z' />
  //               </svg>
  //             </span>
  //             <div>
  //               <p className='font-medium text-gray-900'>
  //                 {entry.endorsements} endorsement
  //                 {entry.endorsements > 1 ? "s" : ""}
  //               </p>
  //               {entry.endorsementNote && (
  //                 <p className='text-xs text-gray-500'>
  //                   {entry.endorsementNote}
  //                 </p>
  //               )}
  //             </div>
  //           </div>
  //         )}

  //         {/* Projects List */}
  //         {entry.projects.map((project, i) => (
  //           <div key={i} className='flex items-start text-sm text-gray-700'>
  //             <span className='mr-3 text-gray-500 mt-0.5'>
  //               <svg
  //                 className='w-5 h-5'
  //                 fill='currentColor'
  //                 viewBox='0 0 20 20'
  //               >
  //                 <path d='M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z' />
  //               </svg>
  //             </span>
  //             <span className='hover:text-blue-600 cursor-pointer transition-colors'>
  //               {project}
  //             </span>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   );
  // };
  const renderSkillEntry = (entry: SkillEntry, index: number) => {
    return (
      <div key={index} className='py-6 border-b border-gray-100 last:border-0'>
        <h3 className='text-md font-bold text-black mb-3 tracking-tight'>
          {entry.skill}
        </h3>

        <div className='space-y-3'>
          {/* Mapping over the new "points" array */}
          {entry.points.map((point, i) => (
            <div
              key={i}
              className='flex items-start text-sm text-gray-700 leading-relaxed'
            >
              <span className='mr-3 text-green-500 mt-1 shrink-0'>
                <FaCheckCircle className='w-3.5 h-3.5' />
              </span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div
      id='skills'
      className='bg-white mt-7 border scroll-mt-20 border-gray-300 rounded-lg shadow-sm p-6'
    >
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-xl font-semibold text-gray-800'>Skills</h2>
      </div>

      <div className='divide-y divide-gray-200'>
        {skills
          ?.slice(0, 5)
          .map((entry, index) => renderSkillEntry(entry, index))}
      </div>

      <button className='w-full pt-4 text-center border-t border-gray-200 mt-2 text-gray-600 font-semibold hover:bg-gray-50 transition-colors'>
        <Link href={"/skills"}>Show all {skills.length} skills &rarr;</Link>
      </button>
    </div>
  );
};

export default SkillsSection;
