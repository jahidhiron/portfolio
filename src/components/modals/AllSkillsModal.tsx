"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa"; // Added for professional bullet points
import data from "../../data/skills-new.json";

// --- Updated Type Definitions for your new JSON ---
interface SkillEntry {
  skill: string;
  points: string[]; // Changed from experience/projects to points
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  width: { xs: "90%", sm: 550 },
  outline: "none",
};

type SkillsModalProps = {
  title: string;
};

export default function AllSkillsModal({ title }: SkillsModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Helper to render the updated detailed entry
  const renderSkillEntry = (entry: SkillEntry, index: number) => {
    return (
      <div key={index} className='py-6 border-b border-gray-100 last:border-0'>
        <h3 className='text-md font-bold text-black mb-3 tracking-tight'>
          {entry.skill}
        </h3>

        <div className='space-y-3'>
          {/* Mapping over the new "points" array */}
          {entry.points.map((point, i) => (
            <div
              key={i}
              className='flex items-start text-sm text-gray-700 leading-relaxed'
            >
              <span className='mr-3 text-green-500 mt-1 shrink-0'>
                <FaCheckCircle className='w-3.5 h-3.5' />
              </span>
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className='text-gray-400 group-hover:text-gray-600 transition-colors cursor-pointer'
      >
        <svg
          className='w-5 h-5 text-gray-600'
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
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className='flex justify-between items-center sticky top-0 bg-white pb-4 mb-2 z-10 border-b border-gray-100'>
            <Typography variant='h6' className='font-bold text-gray-800'>
              {title}
            </Typography>
            <IconButton onClick={handleClose} size='small'>
              <RxCross2 />
            </IconButton>
          </div>

          {/* Scrollable Container */}
          <div className='max-h-[60vh] overflow-y-auto '>
            <div className='divide-y divide-gray-100'>
              {data?.map((entry, index) =>
                renderSkillEntry(entry as any, index)
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
