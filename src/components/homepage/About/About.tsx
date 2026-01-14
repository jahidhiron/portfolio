"use client";

import React, { useState } from "react";
import aboutDataRaw from "../../../data/about.json";
import AllSkillsModal from "@/components/modals/AllSkillsModal";

// Define the structure for an individual object in the array
interface AboutSectionData {
  id: string | number;
  sectionTitle: string;
  fullAboutHTML: string;
  skills: string[];
  previewLength: number;
}

// Cast the imported JSON array
const aboutSections = aboutDataRaw as AboutSectionData[];

const AboutSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Access the first object in the array
  const data = aboutSections[0];

  if (!data) return null;

  // Helper to strip HTML for the preview text
  const getPreviewText = (html: string, length: number): string => {
    const stripped = html.replace(/<[^>]*>?/gm, "");
    return stripped.length > length
      ? stripped.substring(0, length) + "..."
      : stripped;
  };

  const previewText = getPreviewText(data.fullAboutHTML, data.previewLength);

  return (
    <div className='bg-theme mt-7 border border-theme rounded-lg shadow-sm p-6 space-y-4'>
      <h2 className='text-xl font-semibold text-theme-primary'>
        {data.sectionTitle}
      </h2>

      {/* --- Main Content --- */}
      <div className='text-sm text-theme-primary leading-relaxed'>
        {isExpanded ? (
          <div
            className='prose-custom'
            dangerouslySetInnerHTML={{ __html: data.fullAboutHTML }}
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: data.fullAboutHTML?.slice(0, 300),
            }}
          />
        )}

        <span
          onClick={() => setIsExpanded(!isExpanded)}
          className=' hover:text-blue-600 text-theme-secondary cursor-pointer hover:underline mt-2 inline-block'
        >
          {isExpanded ? "see less" : "see more"}
        </span>
      </div>

      {/* --- Top Skills Card --- */}
      <div className='border border-theme rounded-lg p-4 flex justify-between items-center mt-4 bg-theme-secondary hover:bg-theme transition-colors cursor-pointer group'>
        <div className='flex items-center'>
          <div className='mr-3 text-theme-secondary'>
            {/* Gem/Skill Icon */}
            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm-7-8a7 7 0 1114 0 7 7 0 01-14 0zM8 9a1 1 0 100 2 1 1 0 000-2zM12 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 100 2 1 1 0 000-2z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div>
            <h3 className='font-semibold text-sm text-theme-primary'>
              Top skills
            </h3>
            <p className='text-sm text-theme-secondary'>
              {data.skills.join(" • ")}
            </p>
          </div>
        </div>

        {/* --- Missing Arrow Icon --- */}
        <AllSkillsModal title='Skills' />
      </div>

      {/* Scoped CSS for HTML content */}
      <style jsx>{`
        .prose-custom :global(p) {
          margin-bottom: 0.75rem;
        }
        .prose-custom :global(ul) {
          list-style-type: disc;
          margin-left: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .prose-custom :global(li) {
          margin-bottom: 0.25rem;
        }
        .prose-custom :global(strong) {
          font-weight: 600;
          color: #111827;
        }
      `}</style>
    </div>
  );
};

export default AboutSection;
