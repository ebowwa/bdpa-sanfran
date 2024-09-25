// This directive indicates that the code below should run on the client-side
"use client";

// Import necessary dependencies from React and other libraries
import React, { useEffect, useState, useMemo, useRef } from "react";
import { z } from "zod";
import useSWR from "swr";
import CustomCircularProgress from "./loading";
import styles from "@/styles/BucketObject.module.css";

// Define a schema for the component's props using the Zod library
// This allows for runtime type checking and validation of the props
const BucketObjectPropsSchema = z.object({
  googleDriveUrl: z.string().url(),
  alt: z.string().optional(),
  className: z.string().optional(),
});

// Create a type alias for the component's props based on the schema
type BucketObjectProps = z.infer<typeof BucketObjectPropsSchema>;

// Function to extract the file ID from the Google Drive URL using a regular expression
const extractFileIdFromUrl = (url: string): string => {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : "";
};

// Fetcher function for useSWR
const fetcher = (url: string) => fetch(url).then((res) => res.blob());

// Component responsible for fetching and rendering the file
const BucketObjectAsync: React.FC<BucketObjectProps> = ({
  googleDriveUrl,
  alt,
  className,
}) => {
  // Use the useMemo hook to parse the props and extract the file ID from the URL
  // This ensures that the file ID is only recomputed when the relevant props change
  const fileId = useMemo(() => {
    const parsedProps = BucketObjectPropsSchema.parse({
      googleDriveUrl,
      alt,
      className,
    });
    return extractFileIdFromUrl(parsedProps.googleDriveUrl);
  }, [googleDriveUrl, alt, className]);

  // Use the SWR hook for data fetching and caching
  const { data, error } = useSWR(`/api/getGoogleDriveFile?id=${fileId}`, fetcher);

  // Use state variables to track loading state, file URL, and whether the file is a video
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState(false);

  // Use the useEffect hook to create an object URL for the fetched file data
  useEffect(() => {
    let objectUrl: string | null = null;
    if (data) {
      objectUrl = URL.createObjectURL(data);
      setFileUrl(objectUrl);
      setIsLoading(false);

      const contentType = data.type;
      setIsVideo(contentType?.startsWith("video/") || false);
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [data]);

  // Render loading state, error state, or the file content
  if (isLoading) return <CustomCircularProgress />;
  if (error) return <div>Failed to load file</div>;

  return (
    <div className={className}>
      {isVideo && fileUrl ? (
        <div className={styles.videoContainer}>
          <video className={styles.video} controls>
            <source src={fileUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        fileUrl && <img src={fileUrl} alt={alt} loading="lazy" />
      )}
    </div>
  );
};

// Component responsible for lazy loading the BucketObjectAsync component
const BucketObject: React.FC<BucketObjectProps> = (props) => {
  // Use state to track whether the component is intersecting the viewport
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Use a ref to access the component's DOM node
  const ref = useRef<HTMLDivElement>(null);

  // Set up an intersection observer to detect when the component enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "200px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Only render the async component when it's intersecting
  return (
    <div ref={ref}>
      {isIntersecting && <BucketObjectAsync {...props} />}
    </div>
  );
};

export default BucketObject;