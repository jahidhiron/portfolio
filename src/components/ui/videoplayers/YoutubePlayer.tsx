"use client";

import dynamic from "next/dynamic";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface PlayerProps {
  url: string;
}

export default function YoutubePlayer({ url }: PlayerProps) {
  return (
    <div>
      <ReactPlayer
        controls
        muted
        height={500}
        width={900}
        src={`https://www.youtube.com/watch?v=${url}`}
      />
    </div>
  );
}
