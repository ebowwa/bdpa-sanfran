// components/tally/TallyHeader.tsx

import { Button } from "@/components/ui/common/button";
import React from 'react';
import { useRouter } from 'next/navigation';

type TallyHeaderContent = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
};

const content: TallyHeaderContent = {
  title: "Goldson: Crafting Outdoor Excellence in the Bay Area",
  description: "Explore our landscaping, concrete, and construction solutions tailored for the San Francisco Bay Area.",
  buttonText: "Get a Free Quote Today",
  buttonLink: "/quote",
};

const TallyHeader: React.FC = () => {
  const router = useRouter();

  return (
    <div className="absolute inset-x-0 bottom-0 text-center py-8">
      <div className="bg-opacity-10 py-8 px-4 rounded-lg inline-block text-white">
        <h2 className="text-6xl font-bold mb-4 text-shadow-lg">
          {content.title}
        </h2>
        <p className="text-xl mb-8 text-shadow-md">{content.description}</p>
        <Button className="bg-white text-black font-bold py-4 px-8 rounded-lg">
          {content.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default TallyHeader;