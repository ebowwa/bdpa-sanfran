// src/components/DriveCarousel/CarouselItem.tsx
import { CardContent, Card } from "@/components/ui/card";
import { LandscapeItem } from "@/data/landscape";
import { ImageData } from "./api";
import ProductInfo, { ProductImage } from "./Product";
import { PinContainer } from "@/components/ui/3d-pin";

interface CarouselItemProps {
  row: LandscapeItem;
  imageData: ImageData;
  onImageError?: (imageUrl: string) => void;
}

const CarouselItem = ({ row, imageData, onImageError }: CarouselItemProps) => {
  const handleImageError = (imageUrl: string) => {
    if (onImageError) {
      onImageError(imageUrl);
    }
  };

  return (
    <div className="p-1 flex justify-center">
      <PinContainer title="Find out more" href={row["Github Repo"]}>
        <Card className="h-full">
          <CardContent className="p-6 pl-12 flex flex-col items-center justify-center gap-4">
            <div className="product-image-container">
              <ProductImage
                imageUrl={`${row["Github Repo"]}/${row["Github Location"]}`}
                imageData={imageData}
              />
            </div>
            <div className="product-info-container">
              <ProductInfo item={row.Item} />
            </div>
          </CardContent>
        </Card>
      </PinContainer>
    </div>
  );
};

export default CarouselItem;