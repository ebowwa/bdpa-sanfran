// src/components/ui/navbar-menu.tsx
"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Define the transition animation for the dropdown menu
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// MenuItem component: Renders a single menu item with a dropdown menu
export const MenuItem = ({
  item,
  children,
}: {
  item: string;
  children?: React.ReactNode;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="relative z-20"
    >
      {/* Render the menu item text with a hover effect */}
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>

      {/* Render the dropdown menu if the item is active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={transition}
            className="absolute top-[calc(100%_+_1.7rem)] left-1/2 transform -translate-x-1/2 z-30"
          >
            <div className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl">
              <motion.div layout className="w-max h-full p-4">
                {children}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Menu component: Renders the main menu container
export const Menu = ({ children }: { children: React.ReactNode }) => {
  return (
    // Wrap the menu in a relative container to position the dropdown
    <nav className="relative z-20 rounded-full boder border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex flex-col md:flex-row md:justify-center md:space-x-4 px-4 py-4 md:px-8 md:py-6">
      {children}
    </nav>
  );
};

// ProductItem component: Renders a product item in the dropdown menu
export const ProductItem = ({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) => {
  return (
    // Wrap the product item in a link with relative positioning
    <Link href={href} className="flex items-center space-x-2 py-2 relative z-20">
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

// HoveredLink component: Renders a link with a hover effect
export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black relative z-20"
    >
      {children}
    </Link>
  );
};