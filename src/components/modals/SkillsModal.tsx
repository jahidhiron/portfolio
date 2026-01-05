"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import { RxCross2 } from "react-icons/rx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 5,
  borderRadius: 2,
  width: { xs: "90%", sm: 550 }, // Responsive width
};

type SkillsModalProps = {
  data: string[];
  title: string;
  buttonText: string;
};

export default function SkillsModal({
  data,
  title,
  buttonText,
}: SkillsModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <span
        className='text-gray-700 hover:text-blue-600 hover:underline font-semibold cursor-pointer'
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </span>

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
          <Typography variant='h6' mb={2}>
            {title}
          </Typography>

          {/* Skills List */}
          <Stack direction='row' spacing={1} useFlexGap flexWrap='wrap'>
            {data?.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                variant='outlined'
                color='primary'
                size='small'
              />
            ))}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
