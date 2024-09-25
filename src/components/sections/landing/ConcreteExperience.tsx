// src/components/sections/landing/ConcreteExperience.tsx
"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { PauseIcon } from "@/components/ui/icons/Pause";
import PlayIcon from "@/components/ui/icons/PlayIcon";
import { VideoCardProps } from '@/data/ConcreteVideos'
import GitHubAsset from "@/components/media/CDNapi";
import { concreteExperienceData } from "@/data/ConcreteVideos";

// This is the VideoCard component, which renders a single video card
const VideoCard: React.FC<VideoCardProps> = ({
  title,
  description,
  repo,
  path,
  icon,
  width,
  height,
}) => {
  // The VideoCard component uses the useState hook to manage the isPlaying state
  const [isPlaying, setIsPlaying] = useState(false);

  // The togglePlay function is used to toggle the isPlaying state
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // The VideoCard component returns JSX that renders the video card
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden w-full hover:shadow-[#2fcc6b] transition-shadow duration-300"
      onClick={togglePlay}
    >
      <div className="p-6">
        {/* If the video is playing, display the PauseIcon, otherwise display the icon prop */}
        {isPlaying ? (
          <PauseIcon className="w-10 h-10 rounded-full bg-gray-200 sh-1 dark:bg-gray-800" />
        ) : (
          icon || <PlayIcon className="w-10 h-10 rounded-full bg-gray-200 sh-1 dark:bg-gray-800" />
        )}
        <h3 className="text-gray-700 dark:text-gray-300 text-lg font-semibold mt-4">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
        <div className="relative flex items-center justify-center -mx-4 md:mx-0">
          <div className="absolute inset-0 w-full h-full bg-gray-50 rounded-2xl sh-3 translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 dark:bg-gray-850" />
          <div className="relative w-full max-w-sm p-4 rounded-2xl sh-2 dark:sh-3">
            {/* The GitHubAsset component is used to render the video */}
            <GitHubAsset
              repo={repo}
              path={path}
              assetType="video"
              width={width || 640}
              height={height || 360}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// This is the ConcreteExperience component, which renders a section with a title, description, and a grid of video cards
export default function ConcreteExperience() {
  // The ConcreteExperience component uses the useState hook to manage the title, description, and videoData state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoData, setVideoData] = useState<VideoCardProps[]>([]);

  // The useEffect hook is used to fetch the title, description, and videoData from an API or other data source
  useEffect(() => {
    // Fetch the title, description, and videoData from the concreteExperienceData
    setTitle(concreteExperienceData.title);
    setDescription(concreteExperienceData.description);
    setVideoData(concreteExperienceData.videoData);
  }, []);

  // The ConcreteExperience component returns JSX that renders the section
  return (
    <section key="1" className="bg-gray-50 py-8 md:py-12.5 lg:py-20">
      <div className="container px-4">
        <div className="grid gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-4 md:space-y-5">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Render a VideoCard component for each video in the videoData array */}
            {videoData.map((video, index) => (
              <VideoCard key={index} {...video} />
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-6">
          <Link
            className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium leading-none text-white rounded-full bg-[#ff8b66] hover:bg-[#ff7a4d] shadow-md dark:bg-[#ff8b66]"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}