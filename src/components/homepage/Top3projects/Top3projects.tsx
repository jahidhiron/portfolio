"use client";

import React from "react";
import projectsData from "../../../data/projects.json";
import SkillsModal from "@/components/modals/SkillsModal";
import ContributorsModal from "@/components/modals/ContributorsModal";
import { Avatar } from "@mui/material";
import { TbWorld } from "react-icons/tb";
import Link from "next/link";
import VideoModal from "@/components/modals/VideoModal";

// --- Types ---
interface ContributorEntity {
  avatar: string;
  name: string;
  profileLink: string;
  subtitle: string;
}

interface ProjectEntry {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  associatedWith: string;
  associatedImage: string;
  source: string;
  description: string;
  liveLink: string;
  demoVideoLink: string;
  skills: string[];
  contributorAvatars: ContributorEntity[];
}

const projectsList: ProjectEntry[] = projectsData as ProjectEntry[];

const Top3ProjectsSection: React.FC = () => {
  return (
    <div
      id='projects'
      className='bg-white mt-7 scroll-mt-20 border border-gray-300 rounded-lg shadow-sm'
    >
      {/* 1. Unified Header (Same as Language Section) */}
      <div className='p-5 flex items-center border-b border-gray-200'>
        <div className='w-1 h-8 bg-[#262956] mr-4 rounded-full hidden sm:block'></div>
        <h2 className='text-xl font-semibold text-gray-800'>Top 3 Projects</h2>
      </div>

      {/* 2. Content List */}
      <div className='divide-y divide-gray-200 p-6'>
        {projectsList?.slice(0, 3).map((entry, index) => {
          const displayedSkills = entry.skills.slice(0, 2);
          const hiddenSkillCount = entry.skills.length - displayedSkills.length;
          const visibleAvatars = entry.contributorAvatars.slice(0, 2);
          const hiddenContributorCount =
            entry.contributorAvatars.length - visibleAvatars.length;

          return (
            <div
              key={entry.id}
              className={`flex flex-col py-6 ${index === 0 ? "pt-0" : ""}`}
            >
              {/* Project Title */}
              <h3 className='text-base font-semibold text-gray-800 leading-snug'>
                {entry.title}
              </h3>

              {/* Date & Links Row */}
              <div className='flex flex-wrap items-center gap-4 my-2'>
                <p className='text-sm text-gray-600 font-medium'>
                  {entry.startDate} - {entry.endDate}
                </p>
                <div className='flex items-center gap-3'>
                  {entry.demoVideoLink && (
                    <VideoModal
                      source={entry.source}
                      videoLink={entry.demoVideoLink}
                    />
                  )}
                  {entry?.liveLink && (
                    <Link
                      href={entry?.liveLink}
                      target='_blank'
                      className='flex items-center gap-2 border px-3 rounded-full hover:bg-blue-600 hover:text-white hover:border-white text-sm cursor-pointer'
                    >
                      <TbWorld />
                      Live Site
                    </Link>
                  )}
                </div>
              </div>

              {/* Association Row */}
              <div className='flex items-center text-sm text-gray-600 mb-2'>
                {entry.associatedImage ? (
                  <img
                    src={entry.associatedImage}
                    className='w-4 h-4 mr-2 rounded-full border border-gray-200'
                  />
                ) : (
                  <span className='flex items-center justify-center w-4 h-4 mr-2 bg-gray-100 rounded text-[10px] font-bold text-gray-500 border border-gray-200'>
                    {entry?.associatedWith?.charAt(0)?.toUpperCase()}
                  </span>
                )}
                <span>
                  Associated with{" "}
                  <span className='font-semibold'>{entry.associatedWith}</span>
                </span>
              </div>

              {/* Skills Footer */}
              <div className='text-sm text-gray-800 flex items-center gap-1 mt-3'>
                <span className='font-semibold'>Skills:</span>
                <span className='text-gray-700'>
                  {displayedSkills.join(", ")}
                </span>
                {hiddenSkillCount > 0 && (
                  <SkillsModal
                    data={entry.skills}
                    buttonText={`+${hiddenSkillCount} more`}
                    title='Project Skills'
                  />
                )}
              </div>

              {/* Contributors */}
              {entry.contributorAvatars.length > 0 && (
                <div className='flex items-center mt-4'>
                  <div className='flex items-center'>
                    {visibleAvatars.map((url, idx) => (
                      <Avatar
                        src={url.avatar}
                        key={idx}
                        sx={{ width: 32, height: 32 }}
                        className={`border-2 border-white ${
                          idx > 0 ? "-ml-2" : ""
                        }`}
                      />
                    ))}
                    {hiddenContributorCount > 0 && (
                      <div className='-ml-2'>
                        <ContributorsModal
                          data={entry.contributorAvatars}
                          buttonText={`+${hiddenContributorCount}`}
                          title='All Contributors'
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* <div className='border-t border-gray-200 text-center'>
        <button className='text-gray-600 text-base font-semibold hover:bg-gray-100 py-4 px-3 flex justify-center items-center w-full transition-colors'>
          Show all projects
          <svg
            className='w-4 h-4 ml-2'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M14 5l7 7m0 0l-7 7m7-7H3'
            />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default Top3ProjectsSection;
