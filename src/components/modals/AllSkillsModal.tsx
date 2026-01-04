"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import data from "../../data/skills-new.json";

// --- Updated Types to match your nested JSON ---
interface Skill {
  name: string;
  desc: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
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
  width: { xs: "95%", sm: 600 },
  outline: "none",
};

type SkillsModalProps = {
  title: string;
};

export default function AllSkillsModal({ title }: SkillsModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Cast the imported data safely
  const skillCategories = (data as SkillCategory[]) || [];

  const renderCategory = (cat: SkillCategory, index: number) => {
    return (
      <div key={index} className='py-6 border-b border-gray-100 last:border-0'>
        {/* Category Header */}
        <h3 className='text-md font-bold text-gray-800 uppercase tracking-widest mb-4'>
          {cat.category}
        </h3>

        <ul className='space-y-4 ml-5'>
          {/* Nested Map: This was causing your error */}
          {cat.skills?.map((item, i) => (
            <li
              key={i}
              className='list-disc list-outside text-sm text-gray-800 leading-relaxed'
            >
              <span className='font-bold'>{item.name}</span>
              <span className='mx-2 text-gray-400'>—</span>
              <span className='text-gray-600'>{item.desc}</span>
            </li>
          ))}
        </ul>
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
              {title}s
            </Typography>
            <IconButton onClick={handleClose} size='small'>
              <RxCross2 />
            </IconButton>
          </div>

          {/* Scrollable Container */}
          <div className='max-h-[70vh] overflow-y-auto pr-2'>
            <div className='divide-y divide-gray-50'>
              {skillCategories.map((category, index) =>
                renderCategory(category, index)
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
