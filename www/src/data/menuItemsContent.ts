// src/data/menuItemsContent.ts
export type MenuItemContent = {
  title: string;
  items: ProductItemContent[];
  requiresAuth?: boolean;
};

export type ProductItemContent = {
  title: string;
  description: string;
  href: string;
};

export const menuItems: Record<string, MenuItemContent> = {
  "Our Services": {
    title: "Our Services",
    items: [
      {
        title: "Landscaping Membership",
        description: "Transform your outdoor spaces with our expert landscaping services.",
        href: "/landscaping",
      },
      {
        title: "Concrete Stamping Projects",
        description: "Durable and visually appealing concrete solutions for your property.",
        href: "/concrete",
      },
      {
        title: "Fencing",
        description: "Build with confidence – our construction services deliver quality and craftsmanship.",
        href: "/construction",
      },
    ],
  },
  "About Us": {
    title: "About Us",
    items: [
      {
        title: "Our Story",
        description: "Learn about Goldson's journey and commitment to excellence.",
        href: "/about",
      },
      {
        title: "Our Affiliates",
        description: "Join our affiliate program and lets grow together.",
        href: "/affiliates",
      },
      {
        title: "Where We Serve",
        description: "We proudly serve the entire San Francisco Bay Area.",
        href: "/service-areas",
      },
    ],
  },
  "Blog": {
    title: "Blog",
    items: [
      {
        title: "Latest Posts",
        description: "Check out our latest blog posts.",
        href: "/blog",
      },
    ],
  },
  "Account": {
    title: 'Account',
    items: [
      {
        title: 'Profile',
        description: 'View and edit your profile',
        href: '/account',
      },
      {
        title: 'Orders',
        description: 'View your order history',
        href: '/orders',
      },
    ],
    requiresAuth: true,
  },
};