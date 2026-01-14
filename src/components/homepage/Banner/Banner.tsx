"use client";

import ContactModal from "@/components/modals/ContactModal";
import Link from "next/link";
import React, { useState } from "react";
import { BiDownArrowAlt, BiLoaderAlt } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";

// --- Profile Data Interface ---
interface ProfileData {
  name: string;
  headline: string;
  foundation: string;
  badge: string;
  education: string;
  foundationUrl: string;
  currentEducation: string;
  currentEducationImageUrl: string;
  currentEductionUrl: string;
  currentJobUrl: string;
  currentJob: string;
  avatarUrl: string;
  currentJobImageUrl: string;
  bannerImageUrl: string;
}

interface BannerProps {
  data: ProfileData;
}

const Banner: React.FC<BannerProps> = ({ data }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // --- Download Logic ---
  const handleDownload = async () => {
    setIsDownloading(true);

    // Simulated delay for visual feedback
    await new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      // Assumes your PDF is at /public/resume.pdf
      const pdfUrl = "/resume.pdf";
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.setAttribute(
        "download",
        `${data.name.replace(/\s+/g, "_")}_Resume.pdf`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const dynamicBg = {
    backgroundImage: `url(${data.bannerImageUrl})`,
  };

  return (
    <div
      id='home'
      className='bg-theme scroll-mt-20 border border-theme rounded-lg shadow-sm'
    >
      {/* --- Banner Background Section --- */}
      <div
        className={`
          h-32 md:h-40 lg:h-48 rounded-t-lg relative
          bg-no-repeat bg-center bg-black
          /* Mobile: contain | Desktop (md+): cover */
          bg-cover
        `}
        style={dynamicBg}
      >
        {/* <div className='absolute top-2 right-2 p-1 bg-black/50 rounded-full cursor-pointer'></div> */}
      </div>

      {/* --- Profile Info Section --- */}
      <div className='px-4 pb-4 sm:px-6'>
        <div className='relative flex items-end'>
          <img
            className='w-24 h-24 bg-theme sm:w-32 sm:h-32 rounded-full border-4 border-theme -mt-12 sm:-mt-16 object-cover'
            src={data.avatarUrl}
            alt={data.name}
          />
        </div>

        {/* Name and Professional Links */}
        <div className='mt-2 flex flex-col sm:flex-row justify-between items-start'>
          <div>
            <h1 className='text-xl sm:text-2xl font-semibold text-theme-primary'>
              {data.name}
            </h1>

            <p className='text-sm sm:text-base text-theme-secondary mt-1 font-medium'>
              {data.headline}
            </p>

            {/* Foundation Link Logic */}
            <div className='text-xs sm:text-sm text-theme-secondary mt-1'>
              {data.foundation}
              {data.foundationUrl ? (
                <a
                  href={data.foundationUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 font-medium ml-1 hover:underline'
                >
                  Jahid Academy
                </a>
              ) : (
                <span className='text-black font-bold ml-1'>Jahid Academy</span>
              )}
            </div>
          </div>

          {/* Side Links (Current Job & Education) */}
          <div className='hidden sm:block'>
            {/* Current Job */}
            <div className='flex items-center gap-1 text-sm text-theme-secondary pt-1'>
              {data?.currentJobImageUrl ? (
                <img
                  className='w-5 h-5 object-contain'
                  src={data.currentJobImageUrl}
                  alt={data.currentJob}
                />
              ) : (
                <div className='w-5 h-5 rounded-full bg-theme-secondary text-theme-primary flex items-center justify-center text-[10px] font-semibold'>
                  {data?.currentJob?.charAt(0)?.toUpperCase()}
                </div>
              )}

              {data.currentJobUrl ? (
                <Link
                  className='hover:underline hover:text-blue-600 text-theme-primary font-medium'
                  href={data.currentJobUrl}
                  target='_blank'
                >
                  {data?.currentJob}
                </Link>
              ) : (
                <span className='text-black font-medium'>
                  {data?.currentJob}
                </span>
              )}
            </div>

            {/* Current Education */}
            {data.currentEducation && (
              <div className='flex items-center gap-1 mt-2 text-sm text-theme-secondary'>
                {data?.currentEducationImageUrl ? (
                  <img
                    className='w-5 h-5 object-contain'
                    src={data.currentEducationImageUrl}
                    alt={data.currentEducation}
                  />
                ) : (
                  <div className='w-5 h-5 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-[10px] font-semibold'>
                    {data?.currentEducation?.charAt(0)?.toUpperCase()}
                  </div>
                )}
                {data.currentEductionUrl ? (
                  <Link
                    className='hover:underline hover:text-blue-600 text-theme-primary font-medium'
                    href={data.currentEductionUrl}
                    target='_blank'
                  >
                    {data?.currentEducation}
                  </Link>
                ) : (
                  <span className='text-black font-medium'>
                    {data?.currentEducation}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile View Education */}
        <div className='text-xs text-theme-secondary mt-2 sm:hidden'>
          <div className='flex items-center gap-1 text-sm text-theme-secondary pt-1'>
            {data?.currentJobImageUrl ? (
              <img
                className='w-5 h-5 object-contain'
                src={data.currentJobImageUrl}
                alt={data.currentJob}
              />
            ) : (
              <div className='w-5 h-5 rounded-full bg-theme-secondary text-theme-primary flex items-center justify-center text-[10px] font-semibold'>
                {data?.currentJob?.charAt(0)?.toUpperCase()}
              </div>
            )}

            {data.currentJobUrl ? (
              <Link
                className='hover:underline text-blue-600 font-medium'
                href={data.currentJobUrl}
                target='_blank'
              >
                {data?.currentJob}
              </Link>
            ) : (
              <span className='text-black font-medium'>{data?.currentJob}</span>
            )}
          </div>

          {/* Current Education */}
          {data.currentEducation && (
            <div className='flex items-center gap-1 mt-2 text-sm text-theme-secondary'>
              {data?.currentEducationImageUrl ? (
                <img
                  className='w-5 h-5 object-contain'
                  src={data.currentEducationImageUrl}
                  alt={data.currentEducation}
                />
              ) : (
                <div className='w-5 h-5 rounded-full bg-theme-secondary text-theme-primary flex items-center justify-center text-[10px] font-semibold'>
                  {data?.currentEducation?.charAt(0)?.toUpperCase()}
                </div>
              )}
              {data.currentEductionUrl ? (
                <Link
                  className='hover:underline text-blue-600 font-medium'
                  href={data.currentEductionUrl}
                  target='_blank'
                >
                  {data?.currentEducation}
                </Link>
              ) : (
                <span className='text-black font-medium'>
                  {data?.currentEducation}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex gap-2'>
          <ContactModal />

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`mt-5 font-semibold text-sm flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 ${
              isDownloading
                ? "bg-theme-secondary text-theme-secondary border-theme cursor-wait"
                : "border-[#262956] text-[#262956] hover:bg-[#262956] hover:text-white cursor-pointer"
            }`}
          >
            {isDownloading ? (
              <>
                <BiLoaderAlt className='text-xl animate-spin' />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <BiDownArrowAlt className='text-xl' />
                <span>Download CV</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
