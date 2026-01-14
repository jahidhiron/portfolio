"use client";

import React, { useState } from "react";
import projectsData from "../../../data/projects.json";
import SkillsModal from "@/components/modals/SkillsModal";
import ContributorsModal from "@/components/modals/ContributorsModal";
import { Avatar } from "@mui/material";
import { TbWorld } from "react-icons/tb";
import Link from "next/link";
import VideoModal from "@/components/modals/VideoModal";
import { FaArrowRight, FaGithub } from "react-icons/fa";
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
  const [showMoreDescription, setShowMoreDescription] = useState<number | null>(
    null
  );

  const renderProjectEntry = (entry: ProjectEntry) => {
    const displayedSkills = entry.skills.slice(0, 2);
    const hiddenSkillCount = entry.skills.length - displayedSkills.length;
    const isDescriptionExpanded = showMoreDescription === entry.id;

    const visibleAvatars = entry.contributorAvatars.slice(0, 2);
    const hiddenContributorCount =
      entry.contributorAvatars.length - visibleAvatars.length;

    return (
      <div
        key={entry.id}
        className='pb-8 pt-4 border-t border-theme last:border-b-0 last:mb-0'
      >
        <h3 className='text-base font-semibold text-theme-primary leading-snug'>
          {entry.title}
        </h3>

        <div className='flex flex-col sm:flex-row  sm:items-center sm:gap-5 gap-3 my-2'>
          <p className='text-sm text-theme-secondary mt-0.5'>
            {entry.startDate} - {entry.endDate}
          </p>
          <div className='text-sm flex items-center gap-2 text-theme-secondary mt-0.5'>
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

                <p className=' pt-0.3'>Source Code</p>
              </Link>
            )}
          </div>
        </div>

        <div className='flex items-center text-sm text-theme-secondary mt-2'>
          {entry.associatedWith && (
            <>
              {entry.associatedImage ? (
                <img
                  src={entry.associatedImage}
                  className='w-4 h-4 mr-2 rounded-full'
                  alt={entry.associatedWith}
                />
              ) : (
                <span className='flex items-center justify-center w-4 h-4 mr-2 bg-theme-secondary rounded-sm text-xs font-bold text-theme-primary'>
                  {entry?.associatedWith?.charAt(0)?.toUpperCase()}
                </span>
              )}

              <span className='text-sm'>
                Associated with{" "}
                <strong className='font-semibold'>
                  {entry.associatedWith}
                </strong>
              </span>
            </>
          )}
        </div>

        {/* --- HTML Description Rendering --- */}
        <div className='mt-2'>
          <div
            className={`text-sm text-theme-primary ${
              !isDescriptionExpanded ? "line-clamp-2" : ""
            }`}
            dangerouslySetInnerHTML={{ __html: entry.description }}
          />
          <span
            className='hover:text-blue-600 text-sm text-theme-secondary cursor-pointer hover:underline inline-block'
            onClick={() =>
              setShowMoreDescription(isDescriptionExpanded ? null : entry.id)
            }
          >
            {isDescriptionExpanded ? "...less" : "...more"}
          </span>
        </div>

        {entry.skills?.length > 1 && (
          <div className='text-sm text-theme-primary flex items-center gap-1 mt-2.5'>
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
        {entry.projectAvatar && (
          <img
            className='my-5 max-w-[150px] max-h-[80px] border border-theme'
            src={entry.projectAvatar}
          />
        )}
        {entry.contributorAvatars?.length > 1 && (
          <>
            <p className='text-sm text-theme-secondary mt-3 mb-1'>
              Other contributors
            </p>
            <div className='flex items-center'>
              {visibleAvatars.map((url, index) => (
                <Avatar
                  src={url.avatar}
                  key={index}
                  alt={url.name}
                  sx={{ width: 40, height: 40 }}
                  className={`w-8 h-8 rounded-full border-2 border-theme object-cover ${
                    index > 0 ? "-ml-2" : ""
                  }`}
                >
                  {url.name.charAt(0)}
                </Avatar>
              ))}

              {hiddenContributorCount > 0 && (
                <ContributorsModal
                  data={entry.contributorAvatars}
                  buttonText={`+ ${hiddenContributorCount}`}
                  title='All Contributors'
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      id='projects'
      className='border  scroll-mt-20 mt-7 border-theme rounded-lg shadow-sm bg-theme'
    >
      <div className=' p-4 md:p-6 space-y-4  relative'>
        <h2 className='text-xl font-semibold text-theme-primary mb-4'>
          Projects
        </h2>
        {projectsList?.slice(0, 2).map(renderProjectEntry)}
      </div>
      <Link
        href={"/projects"}
        className='block border-t rounded-b-lg  hover:bg-theme-secondary border-theme py-3 text-center'
        target='_blank'
      >
        <span className='text-theme-secondary gap-2 text-sm font-bold  flex justify-center items-center w-full'>
          Show all
          <FaArrowRight className='' />
        </span>
      </Link>
    </div>
  );
};

export default ProjectsSection;
