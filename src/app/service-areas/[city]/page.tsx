// src/app/(landing)/service-areas/[city]/[neighborhood]/page.tsx
import { serviceAreas } from "@/data/serviceAreas";

interface NeighborhoodPageProps {
  params: {
    city: string;
    neighborhood: string;
  };
}

interface ServiceArea {
  slug: string;
  city: string;
  neighborhoods: string[];
}

const NotFoundContent = {
  serviceArea: {
    title: "Service Area Not Found",
    message: "The service area \"{{city}}\" could not be found.",
  },
  neighborhood: {
    title: "Neighborhood Not Found",
    message: "The neighborhood \"{{neighborhood}}\" could not be found in the \"{{city}}\" service area.",
  },
};

const cache = new Map<string, ServiceArea>();

export default async function NeighborhoodPage({ params: { city, neighborhood } }: NeighborhoodPageProps) {
  const serviceArea = await getServiceArea(city);

  if (!serviceArea) {
    return (
      <div>
        <h1>{NotFoundContent.serviceArea.title}</h1>
        <p>{NotFoundContent.serviceArea.message.replace("{{city}}", city)}</p>
      </div>
    );
  }

  const neighborhoodData = serviceArea.neighborhoods.find(
    (n) => n.toLowerCase().replace(/\s/g, "-") === neighborhood
  );

  if (!neighborhoodData) {
    return (
      <div>
        <h1>{NotFoundContent.neighborhood.title}</h1>
        <p>{NotFoundContent.neighborhood.message.replace("{{neighborhood}}", neighborhood).replace("{{city}}", serviceArea.city)}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{neighborhoodData}</h1>
      <p>This is the page for the {neighborhoodData} neighborhood in {serviceArea.city}.</p>
    </div>
  );
}

async function getServiceArea(city: string): Promise<ServiceArea | undefined> {
  const cacheKey = `service-area-${city}`;
  let serviceArea = cache.get(cacheKey);

  if (!serviceArea) {
    serviceArea = serviceAreas.find((area) => area.slug === city);
    if (serviceArea) {
      cache.set(cacheKey, serviceArea);
    }
  }

  return serviceArea;
}

export const revalidate = 60; // Revalidate the page every 60 seconds

export async function generateStaticParams() {
  try {
    const paths = serviceAreas.flatMap((serviceArea) =>
      serviceArea.neighborhoods.map((neighborhood) => ({
        city: serviceArea.slug,
        neighborhood: neighborhood.toLowerCase().replace(/\s/g, "-"),
      }))
    );

    return paths;
  } catch (error) {
    console.error(error);
    return [];
  }
}