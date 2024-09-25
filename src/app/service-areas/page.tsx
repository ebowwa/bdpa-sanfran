// src/app/(landing)/service-areas/page.tsx
// nextjs 14 app router typescript
"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
import { serviceAreas, ServiceArea } from "@/data/serviceAreas";
import TallyNavbarv2 from "@/components/sections/landing/TallyNavbarv2";
import { LandingFooter } from "@/components/sections/landing/landing-footer";
import StreamlineLeafSolid from "@/components/ui/icons/StreamlineLeafSolid";
import Head from "next/head";

// Define the section title and description
const sectionTitle = "Servicing Our Local Communities";
const sectionDescription = "At Goldson, we take pride in delivering exceptional services tailored to the unique needs of the communities we serve. Explore our service areas below to learn how we can support you and your neighborhood.";
const learnMoreLinkText = "Learn more";

// Define the props for the ServiceAreaCard component
interface ServiceAreaCardProps {
  area: ServiceArea;
}

// Create a ServiceAreaModal component that displays a modal with neighborhood information
const ServiceAreaModal: React.FC<{ city: string; neighborhood: string; onClose: () => void }> = ({
  city,
  neighborhood,
  onClose,
}) => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`/service-areas/${city.toLowerCase().replace(/\s/g, "-")}/${neighborhood.toLowerCase().replace(/\s/g, "-")}`} />
      </Head>
      <div className="fixed inset-0 flex items-center justify-center z-10">
        <div className="bg-white p-6 rounded-md shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{neighborhood}</h2>
          <p className="text-gray-700">
            This is the modal content for the {neighborhood} neighborhood in {city}.
          </p>
          <button
            className="mt-4 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

// Create a ServiceAreaCard component that displays information about a single service area
const ServiceAreaCard: React.FC<ServiceAreaCardProps> = ({ area }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);

  const handleNeighborhoodClick = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedNeighborhood(null);
  };

  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg transition duration-300">
      <h3 className="text-2xl font-bold mb-4" aria-label={area.city}>
        {area.city}
      </h3>
      <ul className="text-gray-700 mb-4">
        {area.neighborhoods.map((neighborhood) => (
          <li key={neighborhood}>
            <Link
              href={`/service-areas/${area.slug}/${neighborhood.toLowerCase().replace(/\s/g, "-")}`}
              className="text-[#1f9a4f] hover:text-[#1f9a4f] hover:underline"
            >
              {neighborhood}
            </Link>
            <span
              className="text-[#1f9a4f] hover:text-[#1f9a4f] hover:underline cursor-pointer ml-2"
              onClick={() => handleNeighborhoodClick(neighborhood)}
            >
              <StreamlineLeafSolid className="inline-block w-4 h-4 align-middle" />
            </span>
          </li>
        ))}
      </ul>
      <Link
        className="inline-block bg-[#ff8b66] hover:bg-[#ff9b80] text-white font-bold py-2 px-4 rounded transition duration-300"
        href={`/service-areas/${area.slug}`}
      >
        {learnMoreLinkText}
      </Link>
      {isModalOpen && selectedNeighborhood && (
        <ServiceAreaModal
          city={area.city}
          neighborhood={selectedNeighborhood}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

const ServiceAreasPage: React.FC = () => {
  return (
    <div className="container mx-auto py-20">
      <TallyNavbarv2 />
      <div className="text-center">
        <div className="mt-20 pb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-4" aria-label={sectionTitle}>
            {sectionTitle}
          </h1>
          <p className="text-xl text-gray-700" aria-describedby={sectionDescription}>
            {sectionDescription}
          </p>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {serviceAreas.map((area) => (
            <ServiceAreaCard key={area.city} area={area} />
          ))}
        </div>
      </Suspense>
      <LandingFooter />
    </div>
  );
};

export default ServiceAreasPage;