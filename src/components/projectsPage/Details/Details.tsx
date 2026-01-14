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
        <h2 className='text-2xl font-bold'>Project not found</h2>
        <button
          onClick={() => router.back()}
          className='mt-4 text-blue-600 underline'
        >
          Go Back
        </button>
      </div>
    );
  }

  const skillsString = project.skills.join(" · ");

  const dynamicBg = {
    backgroundImage: `url(${project.projectAvatar})`,
  };

  return (
    <div className='max-w-4xl mx-auto px-4 py-6 animate-in fade-in duration-500'>
      {/* Navigation / Breadcrumbs */}
      <button
        onClick={() => router.back()}
        className='flex items-center gap-2 text-sm text-gray-600 hover:text-[#262956] mb-6 transition-colors'
      >
        <TbArrowLeft /> Back to Projects
      </button>
      <div
        className={`
         h-72 md:h-96  rounded-t-2xl relative
          bg-no-repeat bg-center bg-black
          /* Mobile: contain | Desktop (md+): cover */
          bg-contain
        `}
        style={dynamicBg}
      ></div>
      <div className='bg-white border border-gray-200 rounded-b-2xl overflow-hidden shadow-sm'>
        {/* Header Section */}
        <div className='p-8 border-b border-gray-100 bg-white'>
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
                <h1 className='text-xl font-bold text-gray-900'>
                  {project.title}
                </h1>
                <p className='text-gray-500 text-xs  font-medium mt-1'>
                  {project.startDate} — {project.endDate}
                </p>
              </div>
            </div>
          </div>
          <div className='text-sm flex items-center gap-2 text-gray-700 mt-5'>
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
                className='flex items-center gap-1 border px-3 rounded-full hover:bg-[#262956] hover:text-white hover:border-white text-xs py-1 cursor-pointer'
              >
                <TbWorld />

                <p className=' pt-0.3'>Live Site</p>
              </Link>
            )}
            {project.githubLink && (
              <Link
                href={project.githubLink}
                target='_blank'
                className='flex items-center gap-1 border px-3 rounded-full hover:bg-[#262956] hover:text-white hover:border-white text-xs py-1 cursor-pointer'
              >
                <FaGithub />

                <p className=' pt-0.3'>Source Code</p>
              </Link>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className='p-8 space-y-8'>
          <div className='flex items-center text-sm text-gray-700 mt-3'>
            {project.associatedWith && (
              <>
                {project.associatedImage ? (
                  <img
                    src={project.associatedImage}
                    className='w-4 h-4 mr-2 rounded-full'
                    alt={project.associatedWith}
                  />
                ) : (
                  <span className='flex items-center justify-center w-4 h-4 mr-2 bg-gray-100 rounded-sm text-sm font-bold text-gray-700'>
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
            <h2 className='text-md font-bold text-gray-900 mb-3 border-b pb-2'>
              Description
            </h2>
            <div
              className='prose prose-xs text-sm max-w-none text-gray-800 leading-relaxed'
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </div>

          {project.skills?.length > 0 && (
            <div>
              <h2 className='text-md font-bold text-gray-900 mb-3 border-b pb-2'>
                Technologies & Skills
              </h2>
              <div className='text-gray-800 bg-gray-50 p-4 text-sm rounded-xl border border-gray-100'>
                <span className='font-semibold text-[#262956]'>Skills: </span>
                <span className='leading-loose'>{skillsString}</span>
              </div>
            </div>
          )}

          {/* Full Contributors List */}
          {project.contributorAvatars?.length > 0 && (
            <div>
              <h2 className='text-lg font-bold text-gray-900 mb-4 border-b pb-2'>
                Team
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {project.contributorAvatars.map((person, idx) => (
                  <Link
                    href={person.profileLink}
                    target='_blank'
                    key={idx}
                    className='flex items-center gap-3 p-3 border border-gray-100 rounded-xl'
                  >
                    <Avatar src={person.avatar} sx={{ width: 48, height: 48 }}>
                      {person.name.charAt(0)}
                    </Avatar>
                    <div>
                      <p className='text-sm font-bold text-gray-900'>
                        {person.name}
                      </p>
                      <p className='text-xs text-gray-500'>{person.subtitle}</p>
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
