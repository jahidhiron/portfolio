"use client";

import React, { useState } from "react";
import skillsDataRaw from "../../../data/skills-new.json";
import Link from "next/link";

// --- Updated Type Definitions to match the new JSON structure ---
interface Skill {
  name: string;
  desc: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const SkillsSection: React.FC = () => {
  // Initializing with a fallback to an empty array to prevent crashes
  const [categories] = useState<SkillCategory[]>(
    (skillsDataRaw as SkillCategory[]) || []
  );

  const renderCategory = (cat: SkillCategory, index: number) => {
    return (
      <div key={index} className='py-6 border-b border-gray-100 last:border-0'>
        {/* Category Name (e.g., Programming Languages) */}
        <h3 className='text-md font-bold text-black mb-4 tracking-tight uppercase text-md text-gray-800'>
          {cat.category}
        </h3>

        <ul className='space-y-4 ml-4'>
          {/* Mapping over the nested skills array */}
          {cat.skills?.map((item, i) => (
            <li
              key={i}
              className='list-disc list-outside text-sm text-gray-800 leading-relaxed'
            >
              <span className='font-bold'>{item.name}</span>
              <span className='mx-2 text-gray-400'>—</span>
              <span className='text-gray-700'>{item.desc}</span>
            </li>
          ))}
        </ul>
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

      <div className='divide-y divide-gray-100'>
        {/* We map over categories. 
           Optional chaining (?.) prevents the "undefined" error if data hasn't loaded. 
        */}
        {categories
          ?.slice(0, 3)
          .map((cat, index) => renderCategory(cat, index))}
      </div>

      <button className='w-full pt-4 text-center border-t border-gray-200 mt-2 text-gray-600 font-semibold hover:bg-gray-50 transition-colors'>
        <Link href={"/skills"}>Show all {categories.length} skills &rarr;</Link>
      </button>
    </div>
  );
};

export default SkillsSection;
