"use client";

import ScrollToTop from "react-scroll-to-top";

const ScrollButton = () => {
  return (
    <ScrollToTop
      smooth
      color='#ffff'
      className='flex items-center justify-center transition-all'
      style={{
        right: 20,
        bottom: 20,
        backgroundColor: "#262956",
        border: "1px solid #e0e0e0",
        borderRadius: "50%",
      }}
    />
  );
};

export default ScrollButton;
