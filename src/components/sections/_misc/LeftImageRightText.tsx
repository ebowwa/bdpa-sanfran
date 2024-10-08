/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/yaiH5cPpAGU
 */

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/yaiH5cPpAGU
 */

// src/components/LeftImageRightCopy.tsx
import BucketImage from '@/components/media/GoogleDriveBucketObject'; // from Google Drive

type LeftImageRightCopyContent = {
  badge: string;
  title: string;
  description: string;
  // imageBucketId: string;
  // imagePath: string;
  googleDriveUrl: string;
  imageAlt: string;
};

const content: LeftImageRightCopyContent = {
  badge: 'Featured Service',
  title: 'Transforming Outdoor Spaces with Expertise',
  description:
    'At Goldson, we pride ourselves on our ability to turn your vision into reality. Our team of skilled professionals excels in creating captivating landscapes, crafting durable concrete structures, and executing construction projects with precision and artistry. Discover how our comprehensive range of services can elevate your outdoor spaces and bring your dreams to life.',
  // imageBucketId: 'static',
  // imagePath: 'fencing/IMG_1767.JPG',
  googleDriveUrl: 'https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing',
  imageAlt: 'Goldson outdoor project showcase',
};

export function LeftImageRightCopy() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <BucketImage
            // bucketId={content.imageBucketId}
            // path={content.imagePath}
            googleDriveUrl={content.googleDriveUrl}
            alt={content.imageAlt}
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                {content.badge}
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {content.title}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {content.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}