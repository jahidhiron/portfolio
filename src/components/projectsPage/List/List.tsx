"use client";

import React from "react";
import projectsData from "../../../data/projects.json";
import ContributorsModal from "@/components/modals/ContributorsModal";
import { Avatar } from "@mui/material";
import { TbWorld } from "react-icons/tb";
import VideoModal from "@/components/modals/VideoModal";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import SkillsModal from "@/components/modals/SkillsModal";
import { IoDiamondOutline } from "react-icons/io5";

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
  projectAvatar: string;
  githubLink: string;
  skills: string[];
  contributorAvatars: ContributorEntity[];
}

const projectsList: ProjectEntry[] = projectsData as any[];

const ProjectsSection: React.FC = () => {
  const renderProjectEntry = (entry: ProjectEntry) => {
    const displayedSkills = entry.skills.slice(0, 2);
    const hiddenSkillCount = entry.skills.length - displayedSkills.length;
    const visibleAvatars = entry.contributorAvatars?.slice(0, 2) || [];
    const hiddenContributorCount =
      (entry.contributorAvatars?.length || 0) - visibleAvatars.length;

    return (
      <Link
        href={`projects/${entry.id}`}
        key={entry.id}
        className='flex flex-col bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-300 h-full'
      >
        <div className='mb-4 flex justify-center items-center bg-gray-50 rounded-lg h-32 border border-gray-100 overflow-hidden'>
          <img
            src={entry.projectAvatar ?? "./not-found.png"}
            alt={entry.title}
            className='w-full h-full object-cover'
          />
        </div>

        {/* Title & Dates */}
        <div className='mb-2'>
          <h3 className='text-base font-bold text-gray-900 line-clamp-1'>
            {entry.title}
          </h3>
          <p className='text-[12px] text-gray-500 font-medium'>
            {entry.startDate} - {entry.endDate}
          </p>
        </div>

        <div className='text-sm flex items-center gap-2 text-gray-700 mt-0.5'>
          {entry.demoVideoLink && (
            <VideoModal source={entry.source} videoLink={entry.demoVideoLink} />
          )}
          {entry.liveLink && (
            <Link
              href={entry.liveLink}
              target='_blank'
              className='flex items-center gap-1 border px-3 rounded-full hover:bg-[#262956] hover:text-white hover:border-white text-xs py-1 cursor-pointer'
            >
              <TbWorld />

              <p className=' pt-0.3'>Live Site</p>
            </Link>
          )}
          {entry.githubLink && (
            <Link
              href={entry.githubLink}
              target='_blank'
              className='flex items-center gap-1 border px-3 rounded-full hover:bg-[#262956] hover:text-white hover:border-white text-xs py-1 cursor-pointer'
            >
              <FaGithub />

              <p className=' pt-0.3'> Code</p>
            </Link>
          )}
        </div>

        <div className='flex items-center text-sm text-gray-700 mt-3'>
          {entry.associatedWith && (
            <>
              {entry.associatedImage ? (
                <img
                  src={entry.associatedImage}
                  className='w-4 h-4 mr-2 rounded-full'
                  alt={entry.associatedWith}
                />
              ) : (
                <span className='flex items-center justify-center w-4 h-4 mr-2 bg-gray-100 rounded-sm text-xs font-bold text-gray-700'>
                  {entry?.associatedWith?.charAt(0)?.toUpperCase()}
                </span>
              )}

              <span className='text-xs'>
                Associated with{" "}
                <strong className='font-semibold'>
                  {entry.associatedWith}
                </strong>
              </span>
            </>
          )}
        </div>
        {/* Description is intentionally omitted for card view */}

        {/* Skills & Contributors - Pushed to bottom */}
        <div className='mt-auto space-y-4'>
          {entry.skills?.length > 1 && (
            <div className='text-sm text-gray-800 flex items-center gap-1 mt-2.5'>
              <IoDiamondOutline />
              {hiddenSkillCount > 0 && (
                <SkillsModal
                  data={entry.skills}
                  buttonText={`${displayedSkills.join(
                    ", "
                  )} and +${hiddenSkillCount} skills`}
                  title='All Skills'
                />
              )}
            </div>
          )}

          {entry.contributorAvatars?.length > 0 && (
            <div className='flex items-center justify-between pt-1'>
              <span className='text-[11px] text-gray-500 font-medium'>
                Contributors
              </span>
              <div className='flex items-center'>
                <div className='flex -space-x-2 mr-2'>
                  {visibleAvatars.map((url, index) => (
                    <Avatar
                      src={url.avatar}
                      key={index}
                      alt={url.name}
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: "10px",
                        border: "2px solid #fff",
                      }}
                    >
                      {url.name.charAt(0)}
                    </Avatar>
                  ))}
                </div>
                {hiddenContributorCount > 0 && (
                  <ContributorsModal
                    data={entry.contributorAvatars}
                    buttonText={`+${hiddenContributorCount}`}
                    title='All Contributors'
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div
      id='projects'
      className='mt-10 scroll-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'
    >
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-gray-900'>Projects</h2>
        <div className='h-1 w-12 bg-[#262956] mt-2 rounded-full'></div>
      </div>

      {/* 3-Column Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projectsList.map(renderProjectEntry)}
      </div>
    </div>
  );
};

export default ProjectsSection;
