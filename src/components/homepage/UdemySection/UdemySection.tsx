"use client";
import React, { useState, useRef, useEffect } from "react";
import udemyData from "../../../data/udemy/udemy-post.json";
import commentData from "../../../data/udemy/udemy-comments.json";
import courseData from "../../../data/udemy/udemy-post.json";
import {
  FaAngleLeft,
  FaAngleRight,
  FaStar,
  FaEllipsisH,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";
import { IoMdArrowRoundForward } from "react-icons/io";

interface CourseCardProps {
  course: (typeof courseData)[0];
}

// --- 1. Course Card Component (Responsive) ---
const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className='flex-shrink-0 w-full ml-3 md:w-80 h-[380px] border border-theme rounded-lg bg-theme overflow-hidden shadow-sm flex flex-col group'>
      <div className='h-44 relative overflow-hidden bg-theme-secondary'>
        <img
          src={course.thumbnailUrl}
          alt={course.courseTitle}
          className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent' />
        {/* <div className='absolute top-3 left-3 flex items-center space-x-2'>
          <img
            src={course.avatarUrl}
            alt={course.name}
            className='w-7 h-7 rounded-full border border-white shadow-sm'
          />
          <span className='text-white text-[11px] font-medium drop-shadow-md'>
            {course.name}
          </span>
        </div> */}
        <h4 className='absolute bottom-3 left-3 right-3 text-white font-bold text-sm line-clamp-2 leading-tight drop-shadow-md'>
          {course.courseTitle}
        </h4>
      </div>

      <div className='p-4 flex flex-col flex-grow space-y-2'>
        <p className='text-[10px] text-theme-secondary font-bold uppercase tracking-widest'>
          Course
        </p>
        {course.courseLink ? (
          <Link
            href={course.courseLink}
            target='_blank'
            className='text-sm text-primary hover:text-blue-600 hover:underline line-clamp-2 font-medium leading-snug'
          >
            {course.description}
          </Link>
        ) : (
          <p className='text-sm text-theme-secondary line-clamp-2 font-medium leading-snug'>
            {course.description}
          </p>
        )}

        <div className='flex items-center space-x-1 text-yellow-500 text-sm'>
          <span className='font-bold text-theme-primary'>{course.rating}</span>
          <div className='flex text-[10px]'>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(course.rating)
                    ? "fill-current"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className='text-theme-secondary text-xs'>
            ({course.ratingsCount})
          </span>
        </div>

        <div className='mt-auto border-t border-theme pt-3'>
          <p className='text-[13px] text-theme-secondary mb-1'>
            {course.totalHours} • {course.lectures} lectures
          </p>
          <p className='text-[13px] text-theme-primary'>{course.students}</p>
        </div>
      </div>
    </div>
  );
};

// --- 2. Comment Card (Responsive) ---
const CommentCard: React.FC<{ comment: any }> = ({ comment }) => {
  return (
    <div className='flex-shrink-0 w-full md:w-80 h-[300px] border border-theme rounded-lg bg-theme overflow-hidden shadow-sm p-4 space-y-3'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-lg'>
            {comment.commenterName.charAt(0)}
          </div>
          <div>
            <p className='text-sm font-semibold text-theme-primary'>
              {comment.commenterName}
            </p>
            <div className='flex items-center space-x-1 text-yellow-500 text-sm'>
              <div className='flex text-[10px]'>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(comment.rating)
                        ? "fill-current"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className='text-theme-secondary text-xs'>
                ({comment.rating})
              </span>
            </div>
          </div>
        </div>
        <FaEllipsisH className='w-4 h-4 text-theme-secondary' />
      </div>
      <div className='bg-theme-secondary p-3 rounded-lg border border-theme min-h-36 max-h-36 overflow-y-auto'>
        <p className='text-sm text-theme-primary italic'>
          "{comment.commentText}"
        </p>
      </div>
      <div className='pt-2'>
        <p className='text-xs text-theme-secondary font-medium'>
          Commenting on:
        </p>
        {comment.commentedPost ? (
          <a
            href={comment.commentedPost}
            className='text-sm text-primary hover:text-blue-600 truncate hover:underline cursor-pointer block'
          >
            {comment.originalPostTitle}
          </a>
        ) : (
          <p className='text-sm  truncate  cursor-pointer block'>
            {comment.originalPostTitle}
          </p>
        )}
      </div>
    </div>
  );
};

// --- 3. Main Udemy Section Component ---
const UdemySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Courses");
  const scrollRef = useRef<HTMLDivElement>(null);

  const getActiveData = () => {
    switch (activeTab) {
      case "Courses":
        return courseData;
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
    <div className='border mt-7 border-theme rounded-lg shadow-sm bg-theme'>
      <div className=' p-4 md:p-6 space-y-4  relative'>
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
          <h2 className='text-xl font-semibold text-theme-primary'>Udemy</h2>
          <p className='text-sm text-theme-secondary'>
            64,753 learners • 980 Reviews
          </p>
        </div>

        <div className='flex border-b border-theme'>
          {["Courses", "Comments"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 cursor-pointer text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "text-theme-primary border-b-2 border-theme-primary"
                  : "text-theme-secondary hover:text-theme-primary"
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
            {activeTab === "Courses" &&
              activeData.map((course: any) => (
                <div
                  key={course.id}
                  className='w-full flex-shrink-0 md:w-auto'
                  style={{ scrollSnapAlign: "start" }}
                >
                  <CourseCard course={course} />
                </div>
              ))}

            {activeTab === "Comments" &&
              activeData.map((comment: any) => (
                <div
                  key={comment.id}
                  className='w-full flex-shrink-0 md:w-auto'
                  style={{ scrollSnapAlign: "start" }}
                >
                  <CommentCard comment={comment} />
                </div>
              ))}
          </div>

          {activeData.length > 0 && (
            <>
              <button
                onClick={() => scroll("left")}
                className='absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 bg-theme/90 rounded-full p-2 cursor-pointer shadow-md border border-theme z-10 flex items-center justify-center'
                aria-label='Scroll Left'
              >
                <FaAngleLeft className='w-4 h-4 md:w-5 md:h-5 text-theme-primary' />
              </button>
              <button
                onClick={() => scroll("right")}
                className='absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 bg-theme/90 rounded-full p-2 cursor-pointer shadow-md border border-theme z-10 flex items-center justify-center'
                aria-label='Scroll Right'
              >
                <FaAngleRight className='w-4 h-4 md:w-5 md:h-5 text-theme-primary' />
              </button>
            </>
          )}
        </div>
      </div>
      <Link
        target='_blank'
        href={"https://www.udemy.com/user/jahid-hiron/"}
        className='block border-t rounded-b-lg hover:bg-theme-secondary border-theme py-3 text-center'
      >
        <span className='text-theme-secondary gap-2 text-sm font-bold  flex justify-center items-center w-full'>
          Show all
          <FaArrowRight className='' />
        </span>
      </Link>
    </div>
  );
};

export default UdemySection;
