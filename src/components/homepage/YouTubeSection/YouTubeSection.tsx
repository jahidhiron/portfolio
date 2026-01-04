"use client";
import React, { useState, useRef, useEffect } from "react";
import youtubeData from "../../../data/youtube/youtube-videos.json";
import commentData from "../../../data/youtube/youtube-comments.json";
import {
  FaAngleLeft,
  FaAngleRight,
  FaThumbsUp,
  FaCommentDots,
  FaPaperPlane,
  FaEllipsisH,
  FaPlayCircle,
} from "react-icons/fa";
import { MdInsertComment } from "react-icons/md";
import { IoPlayCircleOutline } from "react-icons/io5";
import Link from "next/link";

interface YoutubeCardProps {
  post: (typeof youtubeData)[0];
}

interface CommentCardProps {
  comment: (typeof commentData)[0];
}

// --- 1. Comment Card Component (Responsive) ---
const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className='flex-shrink-0 w-full sm:w-80 h-[300px] border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm p-4 space-y-3'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg'>
            {comment.commenterName.charAt(0)}
          </div>
          <div>
            <p className='text-sm font-semibold text-gray-800'>
              {comment.commenterName}
            </p>
            <p className='text-xs text-gray-500'>{comment.commenterTitle}</p>
          </div>
        </div>
        <div className='text-xs text-gray-500 flex items-center space-x-1'>
          <span>{comment.commentTime}</span>
          <FaEllipsisH className='w-4 h-4' />
        </div>
      </div>

      <div className='bg-gray-50 p-3 rounded-lg border border-gray-200 h-28 overflow-hidden'>
        <p className='text-sm text-gray-800 italic'>"{comment.commentText}"</p>
      </div>

      <div className='pt-2'>
        <p className='text-xs text-gray-600 font-medium'>Commenting on:</p>
        <a
          href='#'
          className='text-sm text-blue-600 truncate hover:underline block'
        >
          {comment.originalPostTitle}
        </a>
      </div>

      <div className='flex justify-around items-center pt-2 text-gray-600 border-t pt-4'>
        <button className='flex items-center space-x-1 hover:text-blue-600 text-xs'>
          <FaThumbsUp className='w-4 h-4' /> <span>Like</span>
        </button>
        <button className='flex items-center space-x-1 hover:text-blue-600 text-xs'>
          <FaCommentDots className='w-4 h-4' /> <span>Reply</span>
        </button>
      </div>
    </div>
  );
};

// --- 2. Youtube Card Component (Responsive) ---
const YoutubeCard: React.FC<YoutubeCardProps> = ({ post }) => {
  const isVideo = post.videoId !== null;
  const thumbnailUrl = isVideo
    ? `https://img.youtube.com/vi/${post.videoId}/mqdefault.jpg`
    : null;

  const linkHost = post.link.includes("youtube")
    ? "youtube.com"
    : post.link.includes("blog.dev")
    ? "blog.dev"
    : "external.link";

  return (
    <div className='flex-shrink-0 w-full sm:w-80 h-[380px] border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm'>
      <div className='p-4 space-y-3'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center space-x-2'>
            <img
              src={post.avatarUrl}
              alt={post.name}
              className='w-10 h-10 rounded-full bg-blue-900'
            />
            <div>
              <p className='text-sm font-semibold text-gray-800'>{post.name}</p>
              <p className='text-xs text-gray-500'>{post.title}</p>
            </div>
          </div>
          <div className='text-xs text-gray-500 flex items-center space-x-1'>
            <span>{post.time}</span>
            <FaEllipsisH className='w-4 h-4' />
          </div>
        </div>

        <p className='text-sm text-gray-800 whitespace-pre-line line-clamp-2'>
          {post.text}
        </p>

        <div className='bg-gray-100 rounded-lg overflow-hidden border border-gray-300'>
          <a
            href={post.link}
            target='_blank'
            rel='noopener noreferrer'
            className='block'
          >
            <div
              className={`w-full h-38 bg-cover bg-center relative flex items-center justify-center`}
              style={{
                backgroundImage: `url(${thumbnailUrl})`,
                backgroundColor: isVideo ? "transparent" : "#20205b",
              }}
            >
              {isVideo && (
                <FaPlayCircle className='text-white text-5xl opacity-80 hover:opacity-100 transition' />
              )}
              {!isVideo && (
                <span className='p-2 text-sm font-semibold text-white/90'>
                  {post.videoTitle.substring(0, 30)}...
                </span>
              )}
            </div>
          </a>
          <div className='p-2 text-xs'>
            <p className='font-medium truncate'>{post.videoTitle}</p>
            <p className='text-gray-500'>{linkHost}</p>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <div className='flex justify-around flex-grow pt-0 text-gray-600'>
            <button className='flex items-center space-x-1 hover:text-blue-600'>
              <div className='text-xs text-gray-600 flex items-center space-x-1 pb-1'>
                <IoPlayCircleOutline
                  className={`w-4 h-4 ${
                    post.views > 0 ? "text-blue-600" : "text-gray-600"
                  }`}
                />
                <span>{post.views}</span>
              </div>
            </button>
            <button className='flex items-center space-x-1 hover:text-blue-600'>
              <div className='text-xs text-gray-600 flex items-center space-x-1 pb-1'>
                <FaThumbsUp
                  className={`w-3 h-3 ${
                    post.likes > 0 ? "text-blue-600" : "text-gray-600"
                  }`}
                />
                <span>{post.likes}</span>
              </div>
            </button>
            <button className='flex items-center space-x-1 hover:text-blue-600'>
              <div className='text-xs text-gray-600 flex items-center space-x-1 pb-1'>
                <MdInsertComment
                  className={`w-4 h-4 ${
                    post.commentsCount > 0 ? "text-blue-600" : "text-gray-600"
                  }`}
                />
                <span>{post.commentsCount}</span>
              </div>
            </button>
            <button className='flex items-center space-x-1 hover:text-blue-600'>
              <FaPaperPlane className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Main Youtube Section Component ---
const YoutubeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Videos");
  const scrollRef = useRef<HTMLDivElement>(null);

  const getActiveData = () => {
    switch (activeTab) {
      case "Videos":
        return youtubeData;
      case "Comments":
        return commentData;
      default:
        return [];
    }
  };

  const activeData = getActiveData();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [activeTab]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Dynamic width calculation for responsive scrolling
      const cardWidth =
        scrollRef.current.offsetWidth < 768
          ? scrollRef.current.offsetWidth
          : 330;

      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className='bg-white border mt-7 border-gray-300 rounded-lg shadow-sm p-4 md:p-6 space-y-4 relative'>
      <style global jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div>
        <h2 className='text-xl font-semibold text-gray-800'>Youtube</h2>
        <p className='text-sm text-gray-500'>93 subscribers • 74 videos</p>
      </div>

      <div className='flex border-b border-gray-200'>
        {["Videos", "Comments"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 cursor-pointer text-sm font-semibold ${
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='relative'>
        <div
          ref={scrollRef}
          className='flex overflow-x-scroll no-scrollbar space-x-4 pb-4'
          style={{ scrollSnapType: "x mandatory" }}
        >
          {activeTab === "Videos" &&
            activeData.map((post, index) => (
              <div
                key={`${post.id}-${index}`}
                className='w-full flex-shrink-0 sm:w-auto'
                style={{ scrollSnapAlign: "start" }}
              >
                <YoutubeCard post={post as any} />
              </div>
            ))}

          {activeTab === "Comments" &&
            activeData.map((comment) => (
              <div
                key={comment.id}
                className='w-full flex-shrink-0 md:w-auto'
                style={{ scrollSnapAlign: "start" }}
              >
                <CommentCard comment={comment as any} />
              </div>
            ))}
        </div>

        {activeData.length > 0 && (
          <>
            <button
              onClick={() => scroll("left")}
              className='absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md border border-gray-300 z-10 flex items-center justify-center'
              style={{ marginLeft: "-12px" }}
            >
              <FaAngleLeft className='w-4 h-4 md:w-5 md:h-5 text-gray-700' />
            </button>

            <button
              onClick={() => scroll("right")}
              className='absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-md border border-gray-300 z-10 flex items-center justify-center'
              style={{ marginRight: "-12px" }}
            >
              <FaAngleRight className='w-4 h-4 md:w-5 md:h-5 text-gray-700' />
            </button>
          </>
        )}
      </div>

      <div className='border-t border-gray-200 mt-4 pt-3 text-center'>
        <Link
          target='_blank'
          href={"https://www.youtube.com/@jahid-academy"}
          className='text-gray-600 text-sm font-semibold hover:underline flex justify-center items-center w-full'
        >
          Show all
          <svg
            className='w-4 h-4 ml-1 mt-0.5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 8l4 4m0 0l-4 4m4-4H3'
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default YoutubeSection;
