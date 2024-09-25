import { ImageData } from "./api";

const colors = {
  orange: "#ff8b66",
  green: "#2fcc6b",
};

interface ProductInfoProps {
  item: string;
}

const ProductInfo = ({ item }: ProductInfoProps) => {
  return (
    <>
      <div className="text-lg font-semibold" style={{ color: colors.green }}>
        {item}
      </div>
    </>
  );
};

export default ProductInfo;

interface ProductImageProps {
    imageUrl: string;
    imageData: ImageData;
    width?: number;
    height?: number;
  }

export const ProductImage = ({ imageUrl, imageData, width = 500, height = 500 }: ProductImageProps) => {
    if (imageUrl && imageData[imageUrl]) {
      return (
        <img
          alt="Product image"
          className="aspect-square object-cover rounded-lg overflow-hidden"
          height={height}
          src={imageData[imageUrl]}
          width={width}
        />
      );
    }
    return (
      <div
        className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
        style={{ width: width, height: height }}
      ></div>
    );
  };