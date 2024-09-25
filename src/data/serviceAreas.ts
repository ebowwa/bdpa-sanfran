// src/data/serviceAreas.ts
import serviceAreasData from '../../public/EastBay.json';

/**
 * Defines the structure of a ServiceArea object.
 */
export interface ServiceArea {
  county: string;
  city: string;
  neighborhoods: string[];
  slug: string;
}

/**
 * Validates a ServiceArea object and returns it if valid, or throws an error if invalid.
 * @param area - The ServiceArea object to validate.
 * @returns The validated ServiceArea object.
 * @throws {Error} If the ServiceArea object is invalid.
 */
function validateServiceArea(area: any): ServiceArea {
  if (
    typeof area.County !== 'string' ||
    typeof area['City/Town'] !== 'string' ||
    typeof area.Neighborhoods !== 'string'
  ) {
    throw new Error('Invalid ServiceArea object');
  }

  return {
    county: area.County,
    city: area['City/Town'],
    neighborhoods: area.Neighborhoods.split('\n'),
    slug: area['City/Town'].toLowerCase().replace(/\s/g, '-'),
  };
}

/**
 * Filters the service areas by county.
 * @param county - The county to filter by.
 * @returns An array of ServiceArea objects that match the specified county.
 */
export function getServiceAreasByCounty(county: string): ServiceArea[] {
  return serviceAreas.filter((area) => area.county === county);
}

/**
 * Filters the service areas by city.
 * @param city - The city to filter by.
 * @returns An array of ServiceArea objects that match the specified city.
 */
export function getServiceAreasByCity(city: string): ServiceArea[] {
  return serviceAreas.filter((area) => area.city === city);
}

/**
 * Filters the service areas by county and city.
 * @param county - The county to filter by.
 * @param city - The city to filter by.
 * @returns An array of ServiceArea objects that match the specified county and city.
 */
export function getServiceAreasByCountyAndCity(county: string, city: string): ServiceArea[] {
  return serviceAreas.filter((area) => area.county === county && area.city === city);
}

/**
 * Gets the neighborhoods for a specific county and city.
 * @param county - The county to get the neighborhoods for.
 * @param city - The city to get the neighborhoods for.
 * @returns An array of neighborhood strings for the specified county and city.
 */
export function getNeighborhoodsByCountyAndCity(county: string, city: string): string[] {
  const serviceAreas = getServiceAreasByCountyAndCity(county, city);
  return serviceAreas.flatMap((area) => area.neighborhoods);
}

/**
 * The array of ServiceArea objects.
 */
export const serviceAreas: ServiceArea[] = serviceAreasData.map(validateServiceArea);