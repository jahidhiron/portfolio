"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "var(--background)",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  width: { xs: "90%", sm: 720 },
  outline: "none",
  border: "1px solid var(--border)",
};

type Contributor = {
  name: string;
  avatar: string;
  subtitle: string;
  profileLink: string;
};

type ContributorsModalProps = {
  data: Contributor[];
  title: string;
  buttonText: string;
};

export default function ContributorsModal({
  data,
  title,
  buttonText,
}: ContributorsModalProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      {/* Trigger */}
      <span
        className='flex  items-center justify-center w-8 h-8 rounded-full bg-theme-secondary text-theme-primary text-xs font-semibold border border-theme cursor-pointer'
        onClick={() => setOpen(true)}
      >
        {buttonText}
      </span>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          {/* Close button */}
          <IconButton
            onClick={() => setOpen(false)}
            size='small'
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <RxCross2 />
          </IconButton>

          {/* Title */}
          <Typography variant='h6' mb={1}>
            {title}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Contributors list */}
          <Stack spacing={2} className='max-h-72 overflow-y-auto'>
            {data?.map((contributor) => (
              <Stack
                key={contributor.name}
                direction='row'
                spacing={2}
                alignItems='center'
              >
                <Avatar
                  src={contributor.avatar}
                  alt={contributor.name}
                  sx={{ width: 40, height: 40 }}
                >
                  {contributor.name.charAt(0)}
                </Avatar>

                {contributor.profileLink ? (
                  <Typography variant='body1'>
                    <Link
                      className='text-blue-600 hover:underline'
                      href={contributor.profileLink}
                      target='_blank'
                    >
                      {contributor.name}
                    </Link>{" "}
                    <br />
                    <span className='text-xs'>{contributor.subtitle}</span>
                  </Typography>
                ) : (
                  <Typography variant='body1'>
                    {contributor.name} <br />
                    <span className='text-xs'>{contributor.subtitle}</span>
                  </Typography>
                )}
              </Stack>
            ))}
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
