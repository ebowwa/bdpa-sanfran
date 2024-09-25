'use client'
import React from 'react';
import CheckmarkIcon from '@/components/ui/icons/CheckmarkIcon';
import StarIcon from '@/components/ui/icons/StarIcon';
import outdoorServicesData from '../../../../public/raw-data/outdoorServices.json';

export interface ServiceListItemProps {
  service: string;
}

export const ServiceListItem: React.FC<ServiceListItemProps> = ({ service }) => (
  <li className="flex items-center gap-2">
    <CheckmarkIcon className="w-5 h-5 text-green-500 dark:text-green-400" />
    <span className="text-gray-700 dark:text-gray-300">{service}</span>
  </li>
);

export interface WhyPointsListItemProps {
  point: string;
}

export const WhyPointsListItem: React.FC<WhyPointsListItemProps> = ({ point }) => (
  <li className="flex items-center gap-2">
    <StarIcon className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
    <span className="text-gray-700 dark:text-gray-300">{point}</span>
  </li>
);

export interface ActionButtonProps {
  text: string;
  isFirst: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ text, isFirst }) => (
  <button
    className={`font-semibold py-4 focus:outline-none focus:ring-2 ring-purple-500 justify-center flex gap-2 w-full transition-colors duration-150 items-center text-sm px-4 text-white ${
      isFirst ? 'bg-green-500 dark:bg-green-600 rounded-l-lg' : 'bg-orange-500 dark:bg-orange-600 rounded-r-lg'
    }`}
  >
    {text}
  </button>
);

export const OutdoorServices: React.FC = () => {
  const { title, description, services, whyTitle, whyDescription, whyPoints, buttons } = outdoorServicesData;

  return (
    <div className="relative">
      <section key="1" className="w-full py-12">
        <div className="container grid items-center gap-6 px-4 text-center">
          <div className="rounded-xl border bg-white dark:bg-gray-800 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-4">{title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
              <ul className="grid grid-cols-1 gap-4">
                {services.map((service, index) => (
                  <ServiceListItem key={index} service={service} />
                ))}
              </ul>
            </div>
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-4">{whyTitle}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{whyDescription}</p>
              <ul className="grid grid-cols-1 gap-4">
                {whyPoints.map((point, index) => (
                  <WhyPointsListItem key={index} point={point} />
                ))}
              </ul>
            </div>
          </div>
          <div className="rounded-xl border bg-white dark:bg-gray-800 p-6 flex justify-center">
            <div className="grid grid-cols-2 gap-4">
              {buttons.map((button, index) => (
                <ActionButton key={index} text={button.text} isFirst={index === 0} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};