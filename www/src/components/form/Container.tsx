// components/Container.tsx
// used @forms/page
import React, { ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ className, children }) => {
  return (
    <div className={`bg-white dark:bg-green-900 ${className}`}>
      <div className="sm:mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl">
        <div className="flex flex-col gap-8 py-8 sm:px-6">
          <div className="flex flex-col justify-center items-center space-y-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};