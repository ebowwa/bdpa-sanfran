// components/sections/landing/HeaderImage.tsx

import React from 'react';
import BucketObject from '@/components/media/GoogleDriveBucketObject';

interface HeaderImageProps {
  bucketId: string;
  path: string;
  alt: string;
}

const HeaderImage: React.FC<HeaderImageProps> = ({ bucketId, path, alt }) => {
  return (
    <div className="flex justify-center">
      <BucketObject googleDriveUrl={bucketId} alt={path} className={alt} />
    </div>
  );
};

export default HeaderImage;