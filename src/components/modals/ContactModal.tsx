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
import TextEditor from "../ui/texteditor/TextEditor";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "var(--background)",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  width: { xs: "95%", sm: 620 },
  outline: "none",
  border: "1px solid var(--border)",
};

export default function ContactModal() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;
    if (!message || message.replace(/<(.|\n)*?>/g, "").trim() === "") {
      toast.error("Message is required");
      setLoading(false);
      return;
    }

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          message,
        }),
      });
      toast.success(" Message sent successfully!");
      setLoading(false);
      setOpen(false);
      form.reset();
      setMessage("");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className='mt-5 font-semibold text-sm flex items-center border gap-2 bg-theme text-theme-primary px-4 py-1.5 rounded-full cursor-pointer hover:bg-theme-secondary transition-colors'
      >
        <IoIosSend className='text-lg' /> Contact Me
      </button>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <IconButton
            onClick={() => setOpen(false)}
            size='small'
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "var(--text-primary)",
            }}
          >
            <RxCross2 />
          </IconButton>

          <h3 className='text-lg font-semibold mb-4 text-theme-primary'>
            Get in touch
          </h3>

          <form onSubmit={handleSubmit} className='space-y-3'>
            <TextField
              name='name'
              label='Name'
              size='small'
              fullWidth
              required
              sx={{
                "& .MuiInputLabel-root": { color: "var(--text-secondary)" },
                "& .MuiOutlinedInput-root": {
                  color: "var(--text-primary)",
                  "& fieldset": { borderColor: "var(--border)" },
                  "&:hover fieldset": { borderColor: "var(--text-secondary)" },
                },
              }}
            />

            <TextField
              name='email'
              label='Email'
              type='email'
              size='small'
              fullWidth
              required
              sx={{
                mt: 3,
                "& .MuiInputLabel-root": { color: "var(--text-secondary)" },
                "& .MuiOutlinedInput-root": {
                  color: "var(--text-primary)",
                  "& fieldset": { borderColor: "var(--border)" },
                  "&:hover fieldset": { borderColor: "var(--text-secondary)" },
                },
              }}
            />

            <div className='mt-3'>
              <label className='text-sm font-medium mb-2 block text-theme-primary'>
                Message
              </label>
              <TextEditor setValue={setMessage} value={message} />
            </div>

            <button
              type='submit'
              className='bg-primary text-white cursor-pointer w-full mt-5 py-2 rounded-full hover:opacity-90 transition-colors border border-theme'
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
