"use client";

import React from "react";
import projectsData from "../../../data/projects.json";
import ContributorsModal from "@/components/modals/ContributorsModal";
import SkillsModal from "@/components/modals/SkillsModal";
import { Avatar } from "@mui/material";
import { TbWorld } from "react-icons/tb";
import Link from "next/link";
import VideoModal from "@/components/modals/VideoModal";

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
  skills: string[];
  contributorAvatars: ContributorEntity[];
}

const projectsList: ProjectEntry[] = projectsData as any[];

const ProjectsSection: React.FC = () => {
  const renderProjectEntry = (entry: ProjectEntry) => {
    // Exact design requires displaying all skills as a bolded string
    const skillsString = entry.skills.join(" · ");

    const visibleAvatars = entry.contributorAvatars?.slice(0, 2) || [];
    const hiddenContributorCount =
      (entry.contributorAvatars?.length || 0) - visibleAvatars.length;

    return (
      <div
        key={entry.id}
        className='pb-8 pt-4 border-t border-gray-100 last:border-b-0'
      >
        {/* Title */}
        <h3 className='text-base font-semibold text-gray-900 leading-snug'>
          {entry.title}
        </h3>

        {/* Date and Links */}
        <div className='flex flex-col sm:flex-row  sm:items-center sm:gap-5 gap-3 my-2'>
          <p className='text-sm text-gray-700 mt-0.5'>
            {entry.startDate} - {entry.endDate}
          </p>
          <div className='text-sm flex items-center gap-2 text-gray-700 mt-0.5'>
            {entry.demoVideoLink && (
              <VideoModal
                source={entry.source}
                videoLink={entry.demoVideoLink}
              />
            )}
            {entry.liveLink && (
              <Link
                href={entry.liveLink}
                target='_blank'
                className='flex items-center gap-2 border px-3 rounded-full hover:bg-blue-600 hover:text-white hover:border-white text-sm cursor-pointer'
              >
                <TbWorld />
                Live Site
              </Link>
            )}
          </div>
        </div>

        {/* Association Badge */}
        <div className='flex items-center text-sm text-gray-700 mt-2'>
          {entry.associatedWith && (
            <>
              {entry.associatedImage ? (
                <img
                  src={entry.associatedImage}
                  className='w-4 h-4 mr-2 rounded-full'
                  alt={entry.associatedWith}
                />
              ) : (
                <span className='flex items-center justify-center w-4 h-4 mr-2 bg-gray-100 rounded-sm text-[10px] font-bold text-gray-700 border border-gray-200'>
                  {entry.associatedWith.charAt(0).toUpperCase()}
                </span>
              )}

              <span className='text-sm'>
                Associated with{" "}
                <strong className='font-semibold text-gray-900'>
                  {entry.associatedWith}
                </strong>
              </span>
            </>
          )}
        </div>

        {/* Full HTML Description (No clamp, No "more" button) */}
        <div className='mt-2'>
          <div
            className='text-sm text-gray-800 leading-normal prose-li:list-disc'
            dangerouslySetInnerHTML={{ __html: entry.description }}
          />
        </div>

        {/* Skills - Exact bold string design */}
        {entry.skills?.length > 0 && (
          <div className='text-sm text-gray-800 mt-3'>
            <span className='font-semibold'>Skills: {skillsString}</span>
          </div>
        )}
        {entry.projectAvatar && (
          <img
            className='my-5 max-w-[150px] max-h-[80px] border border-gray-300'
            src={entry.projectAvatar}
          />
        )}

        {/* Contributors Section */}
        {entry.contributorAvatars?.length > 0 && (
          <div className='mt-4'>
            <p className='text-sm text-gray-700 mb-2'>Other contributors</p>
            <div className='flex items-center'>
              {visibleAvatars.map((url, index) => (
                <Avatar
                  src={url.avatar}
                  key={index}
                  alt={url.name}
                  sx={{ width: 32, height: 32 }}
                  className={`border-2 border-white ${
                    index > 0 ? "-ml-2" : ""
                  }`}
                >
                  {url.name.charAt(0)}
                </Avatar>
              ))}

              {hiddenContributorCount > 0 && (
                <div className='ml-1'>
                  <ContributorsModal
                    data={entry.contributorAvatars}
                    buttonText={`+ ${hiddenContributorCount}`}
                    title='All Contributors'
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      id='projects'
      className='bg-white mt-7 scroll-mt-20 border border-gray-300 rounded-lg shadow-sm p-6 max-w-4xl mx-auto'
    >
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>Projects</h2>

      {/* Displaying ALL projects from JSON */}
      <div className='flex flex-col'>
        {projectsList.map(renderProjectEntry)}
      </div>
    </div>
  );
};

export default ProjectsSection;
