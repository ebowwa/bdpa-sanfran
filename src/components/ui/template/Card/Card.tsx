// src/components/ui/template/Card/index.ts
import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl m-auto my-8 bg-white shadow-md rounded-lg transition duration-300 ease-in-out hover:shadow-lg hover:transform hover:-translate-y-1">
      <div className="px-8 py-6">
        <h3 className="mb-2 text-2xl font-bold text-gray-800">{title}</h3>
        {description && (
          <p className="mb-4 text-gray-600 text-base">{description}</p>
        )}
        {children}
      </div>
      {footer && (
        <div className="px-8 py-4 bg-gray-100 rounded-b-lg border-t">
          {footer}
        </div>
      )}
    </div>
  );
}