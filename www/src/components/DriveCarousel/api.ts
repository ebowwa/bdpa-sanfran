// src/components/DriveCarousel/api.ts
import { LandscapeItem } from '@/data/landscape'
export const fetchImageDataForUrl = async (repo: string, path: string): Promise<string | null> => {
  const cdnUrl = `https://cdn.jsdelivr.net/gh/${repo}/${path}`;

  try {
    // Fetch the image from the CDN URL
    const response = await fetch(cdnUrl);

    // Check if the response was successful (status code 200-299)
    if (response.ok) {
      // Convert the response to a Blob
      const blob = await response.blob();

      // Create an object URL from the Blob
      return createObjectUrl(blob);
    } else {
      // Log an error message if the fetch request failed
      console.error(`Failed to fetch image from CDN: ${cdnUrl}`);

      // Return null to indicate the fetch request failed
      return null;
    }
  } catch (error) {
    // Log an error message if an exception occurred during the fetch request
    console.error(`Error fetching image from CDN: ${cdnUrl}`, error);

    // Return null to indicate the fetch request failed
    return null;
  }
};

export const createObjectUrl = (blob: Blob): string => {
  // Create an object URL from the provided Blob
  return URL.createObjectURL(blob);
};


export interface ImageData {
  [key: string]: string;
}

export const fetchImageData = async (sheetData: LandscapeItem[]): Promise<ImageData> => {
  const updatedImageData: ImageData = {};
  const uniqueImagePaths = new Set<string>();

  // Iterate through the sheetData to collect unique image paths
  for (const row of sheetData) {
    const repo = row["Github Repo"];
    const path = row["Github Location"];

    // Check if both the repo and path are available
    if (repo && path) {
      // Add the unique image path to the set
      uniqueImagePaths.add(`${repo}/${path}`);
    }
  }

  // Create an array of promises to fetch the image data for each unique path
  const imagePromises = Array.from(uniqueImagePaths).map(async (imagePath) => {
    // Split the image path into the repo and the remaining path parts
    const [repo, ...pathParts] = imagePath.split("/");
    const path = pathParts.join("/");

    // Fetch the image data for the current path
    const objectUrl = await fetchImageDataForUrl(repo, path);

    // Check if the fetch was successful (objectUrl is not null)
    if (objectUrl) {
      // Add the object URL to the updatedImageData object
      updatedImageData[imagePath] = objectUrl;
    }
  });

  // Wait for all the image data to be fetched
  await Promise.all(imagePromises);

  // Return the updated image data
  return updatedImageData;
};