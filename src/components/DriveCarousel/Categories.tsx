// Categories.tsx
import { LandscapeItem } from '@/data/landscape';

const colors = {
  orange: "#ff8b66",
  green: "#2fcc6b",
};

interface CategoriesProps {
  landscapeItems: LandscapeItem[];
  imageData: {
    [key: string]: string;
  };
  defaultCategory?: string;
  onImageError: (imageUrl: string) => void;
}

const Categories = ({ landscapeItems, imageData, defaultCategory, onImageError }: CategoriesProps) => {
  // Group the sheetData by Group and Category
  const groupedData = landscapeItems.reduce((groupedData: { [key: string]: { [key: string]: LandscapeItem[] } }, row: LandscapeItem) => {
    const group = row.Group;
    const category = row.Category;

    if (!groupedData[group]) {
      groupedData[group] = {};
    }

    if (!groupedData[group][category]) {
      groupedData[group][category] = [];
    }

    groupedData[group][category].push(row);
    return groupedData;
  }, {});

  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">Explore Our Services</h1>
          <p className="text-xl sm:text-3xl text-gray-600 mb-8">Discover a wide range of top-quality services tailored to your needs</p>
          <button className="bg-green-500 text-white text-lg sm:text-2xl font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:bg-green-600 transition duration-300">
            Book Now
          </button>
        </div>

        {/* Render the grouped data */}
        {Object.entries(groupedData).map(([group, categories]) => (
          <div key={group} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{group}</h2>
            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <ul className="list-disc list-inside">
                  {items.map((item) => (
                    <li key={item.Item}>{item.Item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        <div className="text-center mt-16">
          <button className="bg-orange-500 text-white text-lg sm:text-2xl font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:bg-orange-600 hover:shadow-lg transition duration-300">
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;