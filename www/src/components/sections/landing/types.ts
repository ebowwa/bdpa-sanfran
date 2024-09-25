// types.ts

// This interface defines the properties of an asset that can be used in the VideoCard component
export interface AssetPropsType {
    // The repository where the asset is located
    repo: string;
    // The path to the asset within the repository
    path: string;
    // The type of the asset (image, video, font, markdown, or other)
    assetType: 'image' | 'video' | 'font' | 'markdown' | 'other';
    // The width of the asset (optional)
    width?: number;
    // The height of the asset (optional)
    height?: number;
  }
  
  // This interface defines the properties of the VideoCard component
  export interface VideoCardProps {
    // The title of the video
    title: string;
    // The description of the video
    description: string;
    // The repository where the video is located
    repo: string;
    // The path to the video within the repository
    path: string;
    // The icon to be displayed for the video
    icon: React.ReactNode;
    // The width of the video (optional)
    width?: number;
    // The height of the video (optional)
    height?: number;
  }