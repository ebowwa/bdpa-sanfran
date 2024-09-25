// NavbarContext.tsx
import React, { createContext, useState } from 'react';

interface NavbarContextProps {
  activeItem: string | null;
  isMobileMenuOpen: boolean;
  setActiveItem: (item: string | null) => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const NavbarContext = createContext<NavbarContextProps>({
  activeItem: null,
  isMobileMenuOpen: false,
  setActiveItem: () => {},
  setIsMobileMenuOpen: () => {},
});

interface NavbarProviderProps {
  children: React.ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <NavbarContext.Provider
      value={{
        activeItem,
        isMobileMenuOpen,
        setActiveItem,
        setIsMobileMenuOpen,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};