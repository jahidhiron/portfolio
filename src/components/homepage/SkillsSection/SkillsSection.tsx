"use client";

import React, { useState } from "react";
import skillsDataRaw from "../../../data/skills-new.json";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

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
      <div key={index} className='py-6 border-b border-theme last:border-0'>
        {/* Category Name (e.g., Programming Languages) */}
        <h3 className='text-[13px] font-bold text-theme-primary mb-4 tracking-tight uppercase text-md'>
          {cat.category}
        </h3>

        <ul className='space-y-4 ml-4'>
          {/* Mapping over the nested skills array */}
          {cat.skills?.map((item, i) => (
            <li
              key={i}
              className='list-disc list-outside text-sm text-theme-primary leading-relaxed'
            >
              <span className='font-semibold'>{item.name}</span>
              <span className='mx-2 text-theme-secondary'>—</span>
              <span className='text-theme-secondary'>{item.desc}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div
      id='skills'
      className='bg-theme mt-7 border scroll-mt-20 border-theme rounded-lg shadow-sm '
    >
      <div className='p-6'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-xl font-semibold text-theme-primary'>Skills</h2>
        </div>

        <div className='divide-y divide-theme'>
          {/* We map over categories. 
           Optional chaining (?.) prevents the "undefined" error if data hasn't loaded. 
        */}
          {categories
            ?.slice(0, 3)
            .map((cat, index) => renderCategory(cat, index))}
        </div>
      </div>
      <button className='w-full py-3 cursor-pointer text-center border-t border-theme mt-2 text-theme-secondary font-semibold hover:bg-theme-secondary transition-colors'>
        <Link
          href={"/skills"}
          className='text-theme-secondary gap-2 text-sm font-bold  flex justify-center items-center w-full'
          target='_blank'
        >
          Show all
          <FaArrowRight className='' />
        </Link>
      </button>
    </div>
  );
};

export default SkillsSection;
