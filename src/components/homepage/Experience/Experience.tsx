"use client";
import React, { useState } from "react";
import experienceData from "../../../data/experience.json";
import SkillsModal from "@/components/modals/SkillsModal";
import { Avatar } from "@mui/material";
import Link from "next/link";

interface JobExperience {
  id: number;
  title: string;
  company: string;
  companyUrl?: string;
  type: string;
  duration: string;
  location: string;
  companyAvatar: string;
  description?: string;
  skills: string[];
}

const typedExperienceData: JobExperience[] = experienceData.map(
  (job, index) => ({
    ...job,
    id: index + 1,
  })
) as JobExperience[];

const getColorFromText = (text: string) => {
  const colors = ["#1976d2", "#9c27b0", "#2e7d32", "#ed6c02"];
  return colors[text.charCodeAt(0) % colors.length];
};

const ExperienceSection: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const initialItemsToShow: number = 6;
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  const jobsToDisplay = showAll
    ? typedExperienceData
    : typedExperienceData.slice(0, initialItemsToShow);

  const toggleShowAllList = () => {
    setShowAll(true);
  };

  const toggleDescription = (jobId: number) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const needsShowAllButton: boolean =
    typedExperienceData.length > initialItemsToShow && !showAll;

  return (
    <div
      id='experience'
      className='bg-white mt-7 scroll-mt-20 border border-gray-300 rounded-lg shadow-sm p-4 md:p-6'
    >
      <h2 className='text-lg md:text-xl font-semibold text-gray-800 mb-4'>
        Experience
      </h2>

      <div className='divide-y divide-gray-200'>
        {jobsToDisplay.map((job) => {
          const isDescriptionExpanded = expandedJobId === job.id;

          const truncatedDescription = job.description
            ? job.description.substring(
                0,
                job.description.indexOf(".") > 30
                  ? job.description.indexOf(".") + 1
                  : 100
              )
            : "";

          const fullDescription = job.description;
          const needsDescriptionToggle =
            job.description &&
            fullDescription!.length > truncatedDescription.length;

          const displayedSkills = job.skills.slice(0, 2);
          const hiddenSkillCount = job.skills.length - displayedSkills.length;

          return (
            <div key={job.id} className='flex py-4 group'>
              {/* Responsive Avatar: Slightly smaller on mobile */}
              <div className='flex-shrink-0 mr-3 md:mr-4 mt-1'>
                <Avatar
                  src={job.companyAvatar}
                  alt={job.company}
                  sx={{
                    width: { xs: 40, md: 50 },
                    height: { xs: 40, md: 50 },
                    bgcolor: job.companyAvatar
                      ? ""
                      : getColorFromText(job.company),
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: { xs: "0.9rem", md: "1.2rem" },
                    textTransform: "uppercase",
                  }}
                  className='rounded-md border border-gray-100  shadow-sm object-cover'
                >
                  {job.company.charAt(0)}
                </Avatar>
              </div>

              <div className='flex-grow min-w-0'>
                <p className='text-sm md:text-base font-semibold text-gray-800 leading-tight md:leading-snug truncate md:whitespace-normal'>
                  {job.title}
                </p>

                <p className='text-[13px] md:text-sm text-gray-600 mt-0.5'>
                  {job.companyUrl ? (
                    <Link
                      className='hover:underline text-blue-600 font-medium'
                      href={job?.companyUrl!}
                      target='_blank'
                    >
                      {job.company}
                    </Link>
                  ) : (
                    <span className='text-gray-800 font-medium'>
                      {job.company}
                    </span>
                  )}{" "}
                  <span className='text-gray-400 mx-1'>·</span>
                  <span className='text-gray-500'>{job.type}</span>
                </p>

                <p className='text-xs text-gray-500 mt-1 md:mt-0'>
                  {job.duration}
                </p>
                {job.location && (
                  <p className='text-xs text-gray-400 mt-0.5'>{job.location}</p>
                )}

                {job.description && (
                  <div className='text-[13px] md:text-sm text-gray-700 mt-2.5 whitespace-pre-line leading-relaxed'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: isDescriptionExpanded
                          ? String(fullDescription)
                          : String(truncatedDescription),
                      }}
                      className='inline'
                    />

                    {needsDescriptionToggle && (
                      <button
                        onClick={() => toggleDescription(job.id)}
                        className='inline-block ml-1 text-blue-600 cursor-pointer hover:underline font-semibold focus:outline-none'
                      >
                        {isDescriptionExpanded ? " ...less" : " ...more"}
                      </button>
                    )}
                  </div>
                )}

                {job.skills && job.skills.length > 0 && (
                  <div className='mt-3 flex items-start text-xs md:text-sm text-gray-600'>
                    <svg
                      className='w-3.5 h-3.5 md:w-4 md:h-4 mr-2 mt-0.5 text-gray-400 shrink-0'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path d='M10 12a2 2 0 100-4 2 2 0 000 4z'></path>
                      <path
                        fillRule='evenodd'
                        d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                    <div className='flex flex-wrap gap-x-1 items-center'>
                      <span className='font-semibold text-gray-700'>
                        {displayedSkills.join(", ")}
                      </span>
                      {hiddenSkillCount > 0 && (
                        <>
                          <span className='text-gray-400'>and</span>
                          <SkillsModal
                            data={job.skills}
                            buttonText={`+${hiddenSkillCount} skills`}
                            title='All Skills'
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {needsShowAllButton && (
        <div className='border-t border-gray-200 mt-2 pt-4 text-center'>
          <button
            onClick={toggleShowAllList}
            className='text-gray-600 text-sm md:text-base font-semibold hover:bg-gray-50 active:bg-gray-100 py-2 px-3 rounded-md transition-colors flex justify-center items-center w-full'
          >
            Show all ({typedExperienceData.length} items)
            <svg
              className='w-4 h-4 ml-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceSection;
