"use client";

import React, { useState } from "react";
import interestsData from "../../../data/interest.json"; // Import the JSON data

// --- Type Definitions ---

type TabKey = "Companies" | "Groups" | "Newsletters" | "Schools";

interface InterestItem {
  id: number;
  name: string;
  followers?: string; // Used for Companies and Schools
  members?: string; // Used for Groups
  subscribers?: string; // Used for Newsletters
  logoUrl: string;
  isFollowing: boolean;
}

interface InterestsData {
  [key: string]: InterestItem[];
}

const data: InterestsData = interestsData;
const tabs: TabKey[] = ["Companies", "Groups", "Newsletters", "Schools"];

// --- Component ---

const InterestsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("Companies");
  // Local state to manage the follow status, separate from the imported JSON
  const [followStatus, setFollowStatus] = useState<{ [key: number]: boolean }>({
    1: false, // ChartVPS
    2: false, // Randstad
    // Add other initial statuses here if needed
  });

  const handleFollowToggle = (id: number) => {
    setFollowStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id],
    }));
  };

  const renderItem = (item: InterestItem) => {
    const isFollowing = followStatus[item.id] || item.isFollowing;

    // Determine the stat text based on the active tab
    let statText = "";
    if (activeTab === "Companies" || activeTab === "Schools") {
      statText = `${item.followers} followers`;
    } else if (activeTab === "Groups") {
      statText = `${item.members} members`;
    } else if (activeTab === "Newsletters") {
      statText = `${item.subscribers} subscribers`;
    }

    return (
      <div key={item.id} className='w-1/2 flex flex-col items-center p-3'>
        <div className='flex flex-col items-center text-center w-full'>
          {/* Logo */}
          <img
            src={item.logoUrl}
            alt={`${item.name} Logo`}
            className='w-12 h-12 mb-2 object-contain'
          />

          {/* Name and Followers */}
          <p
            className='text-sm font-semibold text-theme-primary truncate w-full'
            title={item.name}
          >
            {item.name}
          </p>
          <p className='text-xs text-theme-secondary mb-2'>{statText}</p>

          {/* Follow Button */}
          <button
            onClick={() => handleFollowToggle(item.id)}
            className={`
              flex items-center justify-center px-4 py-1.5 text-sm font-semibold rounded-full border transition-colors duration-150 w-full max-w-[120px]
              ${
                isFollowing
                  ? "bg-theme text-theme-primary border-theme hover:bg-theme-secondary"
                  : "bg-theme text-blue-700 border-blue-700 hover:bg-blue-50"
              }
            `}
          >
            {/* Using text instead of a true icon for the plus sign to match the image */}
            {!isFollowing && (
              <span className='mr-1 text-base leading-none'>+</span>
            )}
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    );
  };

  const currentItems = data[activeTab] || [];

  return (
    <div className='bg-theme mt-7 border border-theme rounded-lg shadow-sm p-6'>
      <h2 className='text-xl font-semibold text-theme-primary mb-4'>
        Interests
      </h2>

      {/* Tab Navigation */}
      <div className='border-b border-theme mb-4'>
        <nav className='flex space-x-6'>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                pb-2 text-sm font-semibold transition-colors duration-150
                ${
                  activeTab === tab
                    ? "text-theme-primary border-b-2 border-theme-primary"
                    : "text-theme-secondary hover:text-theme-primary hover:border-b-2 hover:border-theme"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className='flex flex-wrap -mx-3'>
        {currentItems.map(renderItem)}

        {/* If the current tab has no items */}
        {currentItems.length === 0 && (
          <p className='text-sm text-theme-secondary w-full px-3 py-4'>
            No interests found for this category.
          </p>
        )}
      </div>

      {/* Show all button */}
      <div className='pt-4 text-center border-t border-theme mt-4'>
        <a href='#' className='text-blue-700 font-semibold hover:underline'>
          Show all &rarr;
        </a>
      </div>
    </div>
  );
};

export default InterestsSection;
