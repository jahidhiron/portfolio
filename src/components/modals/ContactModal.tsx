"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { RxCross2 } from "react-icons/rx";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  width: { xs: "95%", sm: 420 },
  outline: "none",
};

export default function ContactModal() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    const messageInput = form.elements.namedItem(
      "message"
    ) as HTMLTextAreaElement;

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value,
        }),
      });
      toast.success(" Message sent successfully!");
      setLoading(false);
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='mt-5 font-semibold text-sm flex items-center gap-2 bg-[#262956] text-white px-4 py-1.5 rounded-full cursor-pointer hover:bg-blue-900 transition-colors'
      >
        <IoIosSend className='text-lg' /> Contact Me
      </button>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <IconButton
            onClick={() => setOpen(false)}
            size='small'
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <RxCross2 />
          </IconButton>

          <h3 className='text-lg font-semibold mb-4'>Get in touch</h3>

          <form onSubmit={handleSubmit} className='space-y-3'>
            <TextField
              name='name'
              label='Name'
              size='small'
              fullWidth
              required
            />

            <TextField
              name='email'
              label='Email'
              type='email'
              size='small'
              fullWidth
              required
              sx={{ mt: 3 }}
            />

            <TextField
              name='message'
              label='Message'
              size='small'
              fullWidth
              multiline
              rows={4}
              required
              sx={{ mt: 3 }}
            />

            <button
              type='submit'
              className='bg-primary cursor-pointer text-white w-full mt-5 py-1 rounded-full'
              disabled={loading}
            >
              {loading ? (
                <LuLoaderCircle className='m-auto text-2xl animate-spin' />
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
