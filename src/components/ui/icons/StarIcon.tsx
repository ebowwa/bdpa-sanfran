import React, { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  half?: boolean;
}

const StarIcon: React.FC<IconProps> = ({ half = false, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={half ? "url(#half-star-gradient)" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="#e5e7eb" />
      </linearGradient>
    </defs>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default StarIcon;