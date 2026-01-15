"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import projectsData from "../../../data/projects.json";
import { Avatar, Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { TbWorld, TbArrowLeft } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import VideoModal from "@/components/modals/VideoModal";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();

  // Find the specific project by ID
  const project = projectsData.find((p) => p.id.toString() === id);

  if (!project) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <h2 className='text-2xl font-bold text-theme-primary'>
          Project not found
        </h2>
        <button
          onClick={() => router.back()}
          className='mt-4 text-theme-primary hover:underline'
        >
          Go Back
        </button>
      </div>
    );
  }

  const skillsString = project.skills.join(" · ");

  return (
    <div className='max-w-4xl mx-auto px-4 py-6 animate-in fade-in duration-500'>
      {/* Navigation / Breadcrumbs */}
      <Link
        href='/projects'
        className='flex items-center gap-2 text-sm text-theme-secondary hover:text-theme-primary mb-6 transition-colors'
      >
        <TbArrowLeft /> Back to Projects
      </Link>
      <div className='h-72 md:h-96 border max-w-4xl border-theme border-b-0 rounded-t-2xl relative bg-black overflow-hidden'>
        <img
          src={project.projectAvatar}
          alt={project.title}
          className='w-full h-full object-cover'
        />
      </div>
      <div className='bg-theme border-t-0 border border-theme rounded-b-2xl overflow-hidden shadow-sm'>
        {/* Header Section */}
        <div className='p-8 border-b border-theme bg-theme'>
          {/* {project.projectAvatar && (
            <img
              src={project.projectAvatar}
              alt={project.title}
              className='h-44 object-contain  bg-white rounded-xl p-2'
            />
          )} */}
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6'>
            <div className='flex items-center gap-5'>
              <div>
                <h1 className='text-xl font-bold text-theme-primary'>
                  {project.title}
                </h1>
                <p className='text-theme-secondary text-xs  font-medium mt-1'>
                  {project.startDate} — {project.endDate}
                </p>
              </div>
            </div>
          </div>
          <div className='text-sm flex items-center gap-2 text-theme-primary mt-5'>
            {project.demoVideoLink && (
              <VideoModal
                source={project.source}
                videoLink={project.demoVideoLink}
              />
            )}
            {project.liveLink && (
              <Link
                href={project.liveLink}
                target='_blank'
                className='flex items-center gap-1 border border-theme px-3 rounded-full hover:bg-theme-primary hover:text-white hover:border-theme-primary text-xs py-1 cursor-pointer text-theme-primary'
              >
                <TbWorld />

                <p className=' pt-0.3'>Live Site</p>
              </Link>
            )}
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target='_blank'
                className='flex items-center gap-1 border border-theme px-3 rounded-full hover:bg-theme-primary hover:text-white hover:border-theme-primary text-xs py-1 cursor-pointer text-theme-primary'
              >
                <FaGithub />

                <p className=' pt-0.3'>Source Code</p>
              </Link>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className='p-8 space-y-8'>
          <div className='flex items-center text-sm text-theme-secondary mt-3'>
            {project.associatedWith && (
              <>
                {project.associatedImage ? (
                  <img
                    src={project.associatedImage}
                    className='w-4 h-4 mr-2 rounded-full'
                    alt={project.associatedWith}
                  />
                ) : (
                  <span className='flex items-center justify-center w-4 h-4 mr-2 bg-theme-secondary rounded-sm text-sm font-bold text-theme-primary'>
                    {project?.associatedWith?.charAt(0)?.toUpperCase()}
                  </span>
                )}

                <span className='text-sm'>
                  Associated with{" "}
                  <strong className='font-semibold'>
                    {project.associatedWith}
                  </strong>
                </span>
              </>
            )}
          </div>

          {/* Detailed Description - RESTORED HTML RENDER */}
          <div>
            <h2 className='text-md font-bold text-theme-primary mb-3 border-b border-theme pb-2'>
              Description
            </h2>
            <div
              className='prose prose-xs text-sm max-w-none text-theme-primary leading-relaxed'
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>

          {project.skills?.length > 0 && (
            <div>
              <h2 className='text-md font-bold text-theme-primary mb-3 border-b border-theme pb-2'>
                Technologies & Skills
              </h2>
              <div className='text-theme-primary bg-theme-secondary p-4 text-sm rounded-xl border border-theme'>
                <span className='font-semibold text-theme-primary'>
                  Skills:{" "}
                </span>
                <span className='leading-loose'>{skillsString}</span>
              </div>
            </div>
          )}

          {/* Full Contributors List */}
          {project.contributorAvatars?.length > 0 && (
            <div>
              <h2 className='text-lg font-bold text-theme-primary mb-4 border-b border-theme pb-2'>
                Team
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {project.contributorAvatars.map((person, idx) => (
                  <Link
                    href={person.profileLink}
                    target='_blank'
                    key={idx}
                    className='flex items-center gap-3 p-3 border border-theme rounded-xl'
                  >
                    <Avatar src={person.avatar} sx={{ width: 48, height: 48 }}>
                      {person.name.charAt(0)}
                    </Avatar>
                    <div>
                      <p className='text-sm font-bold text-theme-primary'>
                        {person.name}
                      </p>
                      <p className='text-xs text-theme-secondary'>
                        {person.subtitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
