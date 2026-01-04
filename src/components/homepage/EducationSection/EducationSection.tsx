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
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold ${color} border border-gray-300`}
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
    <div className='bg-white mt-7 border border-gray-300 rounded-lg shadow-sm p-6'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>Education</h2>

      <div className='divide-y divide-gray-200'>
        {listToDisplay.map((edu, index) => {
          const isDescriptionExpanded = expandedDescriptionId === index;

          // Skill Logic
          const skills = edu.skills || [];
          const displayedSkills = skills.slice(0, 3);
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
                  className={`w-8 h-8  rounded-full border-2 border-gray-200 object-cover`}
                >
                  {edu.institution.charAt(0)}
                </Avatar>
              </div>

              <div className='flex-grow'>
                <p className='text-base font-semibold text-gray-800 leading-snug'>
                  {edu.institutionUrl ? (
                    <Link
                      href={edu.institutionUrl}
                      target='_blank'
                      className='text-blue-600 hover:underline'
                    >
                      {edu.institution}
                    </Link>
                  ) : (
                    <span>{edu.institution}</span>
                  )}
                </p>
                <p className='text-sm text-gray-600'>
                  {edu.degree} ·{" "}
                  <span className='text-gray-500'>{edu.fieldOfStudy}</span>
                </p>
                <p className='text-xs text-gray-500'>{edu.duration}</p>

                {edu.grade && (
                  <p className='text-xs text-gray-500 mt-1'>
                    Grade: <span className='font-semibold'>{edu.grade}</span>
                  </p>
                )}

                {/* Maintained design while using HTML rendering */}
                <div className='text-sm text-gray-700 mt-2'>
                  <div
                    className={!isDescriptionExpanded ? "line-clamp-2" : ""}
                    dangerouslySetInnerHTML={{ __html: edu.description }}
                  />
                  <span
                    onClick={() => toggleDescription(index)}
                    className='text-blue-600 cursor-pointer hover:underline font-semibold'
                  >
                    {isDescriptionExpanded ? "less" : "more"}
                  </span>
                </div>

                {/* Skills Section */}
                {skills.length > 0 && (
                  <div className='flex items-center flex-wrap gap-1 mt-3'>
                    <span className='text-sm font-semibold text-gray-800'>
                      Skills: {displayedSkills.join(" · ")}
                    </span>
                    {hiddenSkillCount > 0 && (
                      <span className='text-sm flex items-center gap-1'>
                        and
                        <SkillsModal
                          data={skills}
                          buttonText={`${hiddenSkillCount} skills`}
                          title='Education Skills'
                        />
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {data.length > initialItemsToShow && !showAllList && (
        <div className='border-t border-gray-200 mt-4 pt-4'>
          <button
            onClick={() => setShowAllList(true)}
            className='text-gray-600 text-base font-semibold hover:bg-gray-100 py-2 px-3 rounded-md flex justify-center items-center w-full transition-colors'
          >
            Show all {data.length} education entries
          </button>
        </div>
      )}
    </div>
  );
};
export default EducationSection;
