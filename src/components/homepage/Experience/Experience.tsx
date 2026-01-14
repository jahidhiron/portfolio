"use client";
import React, { useState } from "react";
import experienceData from "../../../data/experience.json";
import SkillsModal from "@/components/modals/SkillsModal";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { IoDiamondOutline } from "react-icons/io5";

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
      className='bg-theme mt-7 scroll-mt-20 border border-theme rounded-lg shadow-sm p-4 md:p-6'
    >
      <h2 className='text-lg md:text-xl font-semibold text-theme-primary mb-4'>
        Experience
      </h2>

      <div className='divide-y divide-theme'>
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
                  className='rounded-md border border-theme shadow-sm object-cover'
                >
                  {job.company.charAt(0)}
                </Avatar>
              </div>

              <div className='flex-grow min-w-0'>
                <p className='text-sm md:text-base font-semibold text-theme-primary leading-tight md:leading-snug truncate md:whitespace-normal'>
                  {job.title}
                </p>

                <p className='text-[13px] md:text-sm text-theme-secondary mt-0.5'>
                  {job.companyUrl ? (
                    <Link
                      className='hover:underline hover:text-blue-600 text-primary font-medium'
                      href={job?.companyUrl!}
                      target='_blank'
                    >
                      {job.company}
                    </Link>
                  ) : (
                    <span className='text-theme-primary font-medium'>
                      {job.company}
                    </span>
                  )}{" "}
                  <span className='text-theme-secondary mx-1'>·</span>
                  <span className='text-theme-secondary'>{job.type}</span>
                </p>

                <p className='text-xs text-theme-secondary mt-1 md:mt-0'>
                  {job.duration}
                </p>
                {job.location && (
                  <p className='text-xs text-theme-secondary mt-0.5'>
                    {job.location}
                  </p>
                )}

                {job.description && (
                  <div className='text-[13px] md:text-sm text-theme-primary mt-2.5 whitespace-pre-line leading-relaxed'>
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
                        className=' hover:text-blue-600 text-theme-secondary cursor-pointer hover:underline inline-block'
                      >
                        {isDescriptionExpanded ? "...less" : "...more"}
                      </button>
                    )}
                  </div>
                )}

                {job.skills && job.skills.length > 0 && (
                  <div className='mt-3 flex items-center gap-2 text-xs md:text-sm text-theme-secondary'>
                    <IoDiamondOutline />
                    <div className='flex flex-wrap gap-x-1 items-center'>
                      <SkillsModal
                        data={job.skills}
                        buttonText={`${displayedSkills.join(
                          ", "
                        )} and +${hiddenSkillCount} skills`}
                        title='All Skills'
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {needsShowAllButton && (
        <div className='border-t border-theme mt-2 pt-4 text-center'>
          <button
            onClick={toggleShowAllList}
            className='text-theme-secondary text-sm md:text-base font-semibold hover:bg-theme-secondary active:bg-theme py-2 px-3 rounded-md transition-colors flex justify-center items-center w-full'
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
