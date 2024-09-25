
// src/components/DriveCarousel/Carousel.tsx
import dynamic from "next/dynamic";
import { ImageData } from "./api";
import { LandscapeDataManager, LandscapeItem } from "@/data/landscape";

import CarouselItem from "./CarouselItem";
import { Carousel, CarouselContent, CarouselPrevious, CarouselNext } from "@/components/DriveCarousel/ui-carousel";

interface CarouselProps {
  categoryData: LandscapeItem[];
  imageData: ImageData;
  onImageError: (imageUrl: string) => void; // Add this line
}

const CarouselComponent = ({ categoryData, imageData }: CarouselProps) => {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="overflow-visible">
        {categoryData.map((row, index) => (
          <CarouselItem key={index} row={row} imageData={imageData} />
        ))}
      </CarouselContent>
      <div className="flex justify-between">
        <CarouselPrevious className="border-none" />
        <CarouselNext className="border-none" />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;