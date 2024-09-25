// src/components/DriveCarousel/CategorySelection.tsx

"use client"

import { useEffect, useState } from "react";
import { fetchImageData, ImageData } from "./api";
import { LandscapeDataManager, LandscapeItem } from "@/data/landscape";
import CustomCircularProgress from "../media/loading";
import Carousel from "./DriveCarousel";

// Function to map LandscapeItem to sheet data format
const mapLandscapeItemToSheetData = (item: LandscapeItem): {
  productName: string;
  Category: string;
  description: string;
  'Github Location': string;
  'Github Repo': string;
  Group: string;
  Item: string;
  Description: string;
} => ({
  productName: item.Item,
  Category: item.Category,
  description: item.Description,
  'Github Location': item['Github Location'] ?? '',
  'Github Repo': item['Github Repo'] ?? '',
  Group: item.Group,
  Item: item.Item,
  Description: item.Description,
});

const CategoriesSection = () => {
  // State variables
  const [groupedData, setGroupedData] = useState<{ [key: string]: { [key: string]: LandscapeItem[] } }>({});
  const [imageData, setImageData] = useState<ImageData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const landscapeDataManager = new LandscapeDataManager();
        const allLandscapeItems = landscapeDataManager.getAllItems();

        // Group the landscape items by Group and Category
        const groupedItems = allLandscapeItems.reduce((acc: { [key: string]: { [key: string]: LandscapeItem[] } }, item: LandscapeItem) => {
          if (!acc[item.Group]) {
            acc[item.Group] = {};
          }
          if (!acc[item.Group][item.Category]) {
            acc[item.Group][item.Category] = [];
          }
          acc[item.Group][item.Category].push(item);
          return acc;
        }, {});

        setGroupedData(groupedItems);

        const mappedLandscapeItems = allLandscapeItems.map(mapLandscapeItemToSheetData);
        const updatedImageData = await fetchImageData(mappedLandscapeItems);
        setImageData(updatedImageData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle image error
  const handleImageError = (imageUrl: string) => {
    console.warn(`Image not found: ${imageUrl}`);
    setImageData((prevImageData) => {
      const updatedImageData = { ...prevImageData };
      Object.keys(updatedImageData).forEach((key) => {
        if (updatedImageData[key] === imageUrl) {
          delete updatedImageData[key];
        }
      });
      return updatedImageData;
    });
  };

  // Handle group click
  const handleGroupClick = (group: string) => {
    setExpandedGroup(group === expandedGroup ? null : group);
    setExpandedCategory(null);
  };

  // Handle category click
  const handleCategoryClick = (category: string) => {
    setExpandedCategory(category === expandedCategory ? null : category);
  };

  // Render loading state
  if (isLoading) {
    return <CustomCircularProgress />;
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-3xl font-bold text-red-600">{error}</div>
      </div>
    );
  }

  // Render categories section
  return (
    <div className="container mx-auto py-12 h-full">
      <h1 className="text-5xl font-bold mb-6">Elevate Your San Francisco Bay Area Home with Stunning Outdoor Spaces</h1>
      <p className="text-2xl mb-12">Transform your space, enhance the beauty of your San Francisco Bay Area neighborhood. Our team will create a custom outdoor living space that reflects your style and enhances your lifestyle. From beautiful concrete patios to lush landscaping, We&apos;ll help you outshine your neighbors and become the talk of the town.</p>
      <div className="flex flex-wrap justify-center mb-8">
        {Object.keys(groupedData).map((group) => (
          <div key={group} className="w-full sm:w-auto mb-6 sm:mb-0 sm:mr-6">
            <button
              className={`w-full sm:w-auto px-8 py-4 text-2xl font-bold rounded-lg shadow-md transition duration-300 ${
                expandedGroup === group
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                  : "bg-gradient-to-r from-orange-300 to-orange-400 text-gray-800"
              }`}
              onClick={() => handleGroupClick(group)}
            >
              {group}
            </button>
            {expandedGroup === group && (
              <div className="mt-8">
                {Object.keys(groupedData[group]).map((category) => (
                  <div key={category} className="mb-6">
                    <button
                      className={`w-full sm:w-auto px-6 py-3 text-xl font-bold rounded-lg shadow-md transition duration-300 ${
                        expandedCategory === category
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                          : "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800"
                      }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </button>
                    {expandedCategory === category && (
                      <div className="mt-6">
                        <Carousel categoryData={groupedData[group][category]} imageData={imageData} onImageError={handleImageError} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;