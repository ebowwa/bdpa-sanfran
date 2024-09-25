// src/components/media/CDNapi.tsx

import React, { Suspense, ComponentType } from 'react';
import ReactMarkdown from 'react-markdown';
import CustomCircularProgress from './loading'; // custom loading component

// Define the interface for the AssetProps
export interface AssetProps {
  repo: string; // The GitHub repository where the asset is located
  path: string; // The path to the asset within the repository
  assetType: 'image' | 'video' | 'font' | 'markdown' | 'other'; // The type of the asset (image, video, font, markdown, or other)
  width?: number; // Optional width for images
  height?: number; // Optional height for images
}

// Define the GitHubAsset component
const GitHubAsset: React.FC<AssetProps> = ({ repo, path, assetType, width, height }) => {
  // Declare state variables
  const [assetContent, setAssetContent] = React.useState<string | null>(null);
  // This state variable will hold the content of the asset, which can be a string or null
  const [error, setError] = React.useState<string | null>(null);
  // This state variable will hold any error messages that occur during the asset fetching process

  // Use the useEffect hook to fetch the asset when the component mounts or when the repo, path, or assetType changes
  React.useEffect(() => {
    const fetchAsset = async () => {
      try {
        // Construct the URL for the asset based on the provided repo and path
        const url = `https://cdn.jsdelivr.net/gh/${repo}/${path}`;

        // Check if the asset is already cached
        const cache = await caches.open('github-assets');
        const cachedResponse = await cache.match(url);

        if (cachedResponse) {
          // If the asset is cached, use the cached response
          const contentType = cachedResponse.headers.get('content-type');
          let assetData: string | null = null;

          // Process the cached asset based on its type
          if (assetType === 'image' || assetType === 'video') {
            // For images and videos, create a blob from the cached response's ArrayBuffer and generate a URL for it
            const data = await cachedResponse.arrayBuffer();
            const blob = new Blob([data], { type: contentType ?? undefined });
            assetData = URL.createObjectURL(blob);
          } else if (assetType === 'font') {
            // For fonts, convert the cached response's ArrayBuffer to a base64-encoded string and create a data URL
            const data = await cachedResponse.arrayBuffer();
            const base64 = btoa(
              new Uint8Array(data).reduce(
                (dataStr, byte) => dataStr + String.fromCharCode(byte),
                '',
              ),
            );
            const fontType = contentType?.split('/')[1] ?? 'woff2';
            assetData = `data:application/x-font-${fontType};base64,${base64}`;
          } else if (assetType === 'markdown' || assetType === 'other') {
            // For Markdown files and other asset types, decode the cached response as text
            assetData = await cachedResponse.text();
          }

          // Update the assetContent state with the cached asset data
          setAssetContent(assetData);
        } else {
          // If the asset is not cached, fetch it from the network
          const response = await fetch(url);

          // Check if the response was successful
          if (!response.ok) {
            throw new Error('Failed to fetch the asset');
          }

          // Cache the response
          const clonedResponse = response.clone();
          await cache.put(url, clonedResponse);

          // Get the content type of the asset from the response headers
          const contentType = response.headers.get('content-type');

          // Process the asset based on its type
          let assetData: string | null = null;
          if (assetType === 'image') {
            // For images, create a blob and generate a URL for it
            const data = await response.arrayBuffer();
            const blob = new Blob([data], { type: contentType ?? undefined });
            assetData = URL.createObjectURL(blob);
            
            // Check if the image dimensions are larger than the displayed size
            const image = new Image();
            image.src = assetData;
            await new Promise((resolve) => {
              image.onload = resolve;
            });
            
            if (image.width > (width || 0) || image.height > (height || 0)) {
              console.warn(
                `Image dimensions (${image.width}x${image.height}) are larger than the displayed size (${width || 'auto'}x${height || 'auto'}). Consider resizing the image to improve performance.`,
              );
            }
          } else if (assetType === 'video') {
            // For videos, create a blob and generate a URL for it
            const data = await response.arrayBuffer();
            const blob = new Blob([data], { type: contentType ?? undefined });
            assetData = URL.createObjectURL(blob);
          } else if (assetType === 'font') {
            // For fonts, convert the response to an ArrayBuffer, then convert it to a base64-encoded string and create a data URL
            const data = await response.arrayBuffer();
            const base64 = btoa(
              new Uint8Array(data).reduce(
                (dataStr, byte) => dataStr + String.fromCharCode(byte),
                '',
              ),
            );
            const fontType = contentType?.split('/')[1] ?? 'woff2';
            assetData = `data:application/x-font-${fontType};base64,${base64}`;
          } else if (assetType === 'markdown') {
            // For Markdown files, decode the response as text
            assetData = await response.text();
          } else {
            // For other asset types, decode the response as text
            assetData = await response.text();
          }

          // Update the assetContent state with the processed asset data
          setAssetContent(assetData);
        }
      } catch (err) {
        // Handle any errors that occurred during the asset fetching process
        console.error('Error fetching asset:', err);
        setError('Failed to fetch the asset. Please check the repo and path.');
      }
    };

    // Call the fetchAsset function to start the asset fetching process
    fetchAsset();
  }, [repo, path, assetType, width, height]);

  // Render the component based on the current state
  if (error) {
    // If an error occurred during the asset fetching process, display the error message
    return <div>{error}</div>;
  }

  // Use React.lazy to lazily load the appropriate component based on the asset type
  const LazyAssetComponent = React.lazy(async () => {
    if (assetType === 'image') {
      // For images, create a lazily loaded component that renders an <img> element with the asset content as the source
      const ImageComponent: ComponentType = () => (
        <Suspense fallback={<CustomCircularProgress />}>
          <img src={assetContent ?? undefined} alt="" width={width} height={height} />
        </Suspense>
      );
      return { default: ImageComponent };
    }
    if (assetType === 'video') {
      // For videos, create a lazily loaded component that renders a <video> element with the asset content as the source
      const VideoComponent: ComponentType = () => (
        <Suspense fallback={<CustomCircularProgress />}>
          <video controls width={width} height={height}>
            <source src={assetContent ?? undefined} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Suspense>
      );
      return { default: VideoComponent };
    }
    if (assetType === 'font') {
      // For fonts, create a lazily loaded component that injects a <style> element with the @font-face rule using the asset content as the font source
      const FontComponent: ComponentType = () => (
        <style jsx global>{`
          @font-face {
            font-family: 'GitHub-Font';
            src: url('${assetContent ?? ''}') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
        `}</style>
      );
      return { default: FontComponent };
    }
    if (assetType === 'markdown') {
      // For Markdown files, create a lazily loaded component that renders the asset content using ReactMarkdown
      const MarkdownComponent: ComponentType = () => <ReactMarkdown>{assetContent ?? ''}</ReactMarkdown>;
      return { default: MarkdownComponent };
    }
    // For other asset types, create a default lazily loaded component that renders the asset content in a <div> element
    const DefaultComponent: ComponentType = () => <div>{assetContent}</div>;
    return { default: DefaultComponent };
  });

  // Render the lazily loaded asset component inside a Suspense component with the custom loading fallback
  return (
    <>
      {/* Add a preconnect link to improve performance by establishing an early connection to the CDN */}
      <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      <Suspense fallback={<CustomCircularProgress />}>
        <LazyAssetComponent />
      </Suspense>
    </>
  );
};

export default GitHubAsset;