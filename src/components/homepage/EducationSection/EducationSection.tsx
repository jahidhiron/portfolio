"use client";
import React, { useState } from "react";
import educationData from "../../../data/education.json";
import SkillsModal from "@/components/modals/SkillsModal";
import { Avatar } from "@mui/material";
import Link from "next/link";

interface EducationEntry {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  institutionUrl?: string;
  duration: string;
  description: string;
  grade?: string;
  avatar?: string;
  skills?: string[]; // Define as array of strings
}

// Cast your JSON data
const typedEducationData = educationData as EducationEntry[];

const getColorFromText = (text: string) => {
  const colors = ["#1976d2", "#9c27b0", "#2e7d32", "#ed6c02"];
  return colors[text.charCodeAt(0) % colors.length];
};
// Cast the imported JSON to our interface
const data = educationData as EducationEntry[];

const getPlaceholderIcon = (institutionName: string) => {
  const colors = ["bg-blue-600", "bg-red-700", "bg-purple-700", "bg-teal-600"];
  let hash = 0;
  for (let i = 0; i < institutionName.length; i++) {
    hash = institutionName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = colors[Math.abs(hash) % colors.length];

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold ${color} border border-theme`}
    >
      {institutionName.charAt(0)}
    </div>
  );
};

const EducationSection: React.FC = () => {
  const [expandedDescriptionId, setExpandedDescriptionId] = useState<
    number | null
  >(null);

  const [showAllList, setShowAllList] = useState<boolean>(false);
  const initialItemsToShow = 6;

  const listToDisplay = showAllList ? data : data.slice(0, initialItemsToShow);

  const toggleDescription = (index: number) => {
    setExpandedDescriptionId(expandedDescriptionId === index ? null : index);
  };

  return (
    <div className='bg-theme mt-7 border border-theme rounded-lg shadow-sm p-6'>
      <h2 className='text-xl font-semibold text-theme-primary mb-4'>
        Education
      </h2>

      <div className='divide-y divide-theme'>
        {listToDisplay.map((edu, index) => {
          const isDescriptionExpanded = expandedDescriptionId === index;

          // Skill Logic
          const skills = edu.skills || [];
          const displayedSkills = skills.slice(0, 2);
          const hiddenSkillCount = skills.length - displayedSkills.length;

          return (
            <div
              key={index}
              className={`flex py-4 ${index === 0 ? "pt-0" : ""}`}
            >
              <div className='flex-shrink-0  mr-3 mt-1'>
                <Avatar
                  src={edu.avatar}
                  alt={`job.company`}
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: edu.avatar
                      ? "transparent"
                      : getColorFromText(edu.institution),
                    color: "#fff",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                  className={`w-8 h-8 rounded-full border-2 border-theme object-cover`}
                >
                  {edu.institution.charAt(0)}
                </Avatar>
              </div>

              <div className='flex-grow'>
                <p className='text-base font-semibold text-theme-primary leading-snug'>
                  {edu.institutionUrl ? (
                    <Link
                      href={edu.institutionUrl}
                      target='_blank'
                      className='text-theme-primary hover:text-blue-600 hover:underline'
                    >
                      {edu.institution}
                    </Link>
                  ) : (
                    <span>{edu.institution}</span>
                  )}
                </p>
                <p className='text-sm text-theme-secondary'>
                  {edu.degree} ·{" "}
                  <span className='text-theme-secondary'>
                    {edu.fieldOfStudy}
                  </span>
                </p>
                <p className='text-xs text-theme-secondary'>{edu.duration}</p>

                {edu.grade && (
                  <p className='text-xs text-theme-secondary mt-1'>
                    Grade: <span className='font-semibold'>{edu.grade}</span>
                  </p>
                )}

                {/* Maintained design while using HTML rendering */}
                <div className='text-sm text-theme-primary mt-2'>
                  <div
                    className={!isDescriptionExpanded ? "line-clamp-2" : ""}
                    dangerouslySetInnerHTML={{ __html: edu.description }}
                  />
                  <span
                    onClick={() => toggleDescription(index)}
                    className='hover:text-blue-600 text-theme-secondary cursor-pointer hover:underline inline-block'
                  >
                    {isDescriptionExpanded ? "...less" : "...more"}
                  </span>
                </div>

                {/* Skills Section */}
                {skills.length > 0 && (
                  <div className='mt-3 flex items-center gap-2 text-xs md:text-sm text-theme-secondary'>
                    Skills :
                    <SkillsModal
                      data={skills}
                      buttonText={`${displayedSkills.join(
                        ", "
                      )} and + ${hiddenSkillCount} skills`}
                      title='Education Skills'
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {data.length > initialItemsToShow && !showAllList && (
        <div className='border-t border-theme mt-4 pt-4'>
          <button
            onClick={() => setShowAllList(true)}
            className='text-theme-secondary text-base font-semibold hover:bg-theme-secondary py-2 px-3 rounded-md flex justify-center items-center w-full transition-colors'
          >
            Show all {data.length} education entries
          </button>
        </div>
      )}
    </div>
  );
};
export default EducationSection;
