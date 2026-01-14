"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import data from "../../data/skills-new.json";
import { IoMdArrowRoundForward } from "react-icons/io";

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
  bgcolor: "var(--background)",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  width: { xs: "95%", sm: 600 },
  outline: "none",
  border: "1px solid var(--border)",
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
      <div key={index} className='py-6 border-b border-theme/30 last:border-0'>
        {/* Category Header */}
        <h3 className='text-[13px] font-bold text-theme-primary uppercase tracking-widest mb-4'>
          {cat.category}
        </h3>

        <ul className='space-y-3 ml-5'>
          {/* Nested Map: This was causing your error */}
          {cat.skills?.map((item, i) => (
            <li
              key={i}
              className='list-disc list-outside text-sm text-theme-primary leading-relaxed'
            >
              <span className='font-semibold text-theme-primary'>
                {item.name}
              </span>
              <span className='mx-2 text-theme-secondary'>—</span>
              <span className='text-theme-secondary'>{item.desc}</span>
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
        className='text-theme-secondary hover:bg-theme-secondary hover:text-theme-primary rounded-full p-2 transition-all duration-200 cursor-pointer hover:scale-110'
      >
        <IoMdArrowRoundForward />
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className='flex justify-between items-center sticky top-0 bg-theme/95 backdrop-blur-sm pb-4 mb-2 z-10 border-b border-theme'>
            <Typography variant='h6' className='font-bold text-theme-primary'>
              {title}s
            </Typography>
            <IconButton onClick={handleClose} size='small'>
              <RxCross2 />
            </IconButton>
          </div>

          {/* Scrollable Container */}
          <div className='max-h-[70vh] overflow-y-auto pr-2'>
            <div className='divide-y divide-theme/20'>
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
