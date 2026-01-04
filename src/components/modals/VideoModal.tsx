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
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  borderRadius: 2,
  width: 980,
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
        className='flex items-center gap-2 border px-3 rounded-full hover:bg-blue-600 hover:text-white hover:border-white text-sm cursor-pointer'
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
