"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import YoutubePlayer from "../ui/videoplayers/YoutubePlayer";
import GDrivePlayer from "../ui/videoplayers/DrivePlayer";
import { FaRegEye } from "react-icons/fa";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "var(--background)",
  boxShadow: 24,
  p: 5,
  borderRadius: 2,
  width: { xs: "95%", sm: "80%" },
  outline: "none",
  border: "1px solid var(--border)",
};

type SkillsModalProps = {
  source: string;
  videoLink: string;
};

export default function VideoModal({ source, videoLink }: SkillsModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className='flex items-center gap-1 text-gray-500 border px-3 rounded-full hover:bg-[#262956] hover:text-white hover:border-white text-xs py-1 cursor-pointer dark:border-gray-400  dark:hover:bg-blue-950'
      >
        <FaRegEye />
        <p className=' pt-0.3'>View Demo</p>
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            size='small'
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <RxCross2 />
          </IconButton>
          {source === "youtube" ? (
            <YoutubePlayer url={videoLink} />
          ) : (
            <GDrivePlayer link={videoLink} />
          )}
        </Box>
      </Modal>
    </div>
  );
}
