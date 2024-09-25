// src/app/(landing)/service-areas/[city]/page.tsx
import { serviceAreas } from "@/data/serviceAreas";

interface ServiceAreaPageProps {
  params: {
    city: string;
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

export default async function ServiceAreaPage({ params: { city } }: ServiceAreaPageProps) {
  const serviceArea = await getServiceArea(city);

  if (!serviceArea) {
    return (
      <div>
        <h1>{NotFoundContent.serviceArea.title}</h1>
        <p>{NotFoundContent.serviceArea.message.replace("{{city}}", city)}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{serviceArea.city}</h1>
      <p>Neighborhoods:</p>
      <ul>
        {serviceArea.neighborhoods.map((neighborhood) => (
          <li key={neighborhood}>
            <a href={`/service-areas/${serviceArea.slug}/${neighborhood.toLowerCase().replace(/\s/g, "-")}`}>
              {neighborhood}
            </a>
          </li>
        ))}
      </ul>
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

export async function generateStaticParams() {
  try {
    const paths = serviceAreas.map((serviceArea) => ({
      city: serviceArea.slug,
    }));

    return paths;
  } catch (error) {
    console.error(error);
    return [];
  }
}