"use client";

import React, { useState, useEffect } from "react";
// Ensure this path exactly matches your file location
import skillsDataRaw from "../../../data/skills-new.json";

interface Skill {
  name: string;
  desc: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const SkillsSectionDetails: React.FC = () => {
  const [categories] = useState<SkillCategory[]>(skillsDataRaw);

  return (
    <div
      id='skills'
      className='bg-theme mt-7 border scroll-mt-20 border-theme rounded-lg shadow-sm p-8'
    >
      <div className='mb-8 border-b border-theme pb-4'>
        <h2 className='text-2xl font-bold text-theme-primary'>Skills</h2>
      </div>

      <div className='flex flex-col gap-8'>
        {(categories || []).map((cat, index) => (
          <div key={index} className='flex flex-col'>
            <h3 className='text-[15px] font-bold text-theme-primary mb-4'>
              {cat.category}
            </h3>

            <ul className='space-y-4 ml-5'>
              {cat?.skills?.map((item, i) => (
                <li
                  key={i}
                  className='list-disc list-outside text-theme-primary text-sm leading-relaxed'
                >
                  <span className='font-semibold'>{item.name}</span>
                  <span className='mx-2'>—</span>
                  <span className='text-theme-secondary'>{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSectionDetails;
