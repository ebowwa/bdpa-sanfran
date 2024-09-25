// NavMenu.tsx

import React, { memo } from 'react';
import { Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { MenuItemContent } from '@/data/menuItemsContent';

interface NavMenuProps {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
  menuItems: Record<string, MenuItemContent>;
  user: any;
}

const NavMenu: React.FC<NavMenuProps> = ({
  activeItem,
  setActiveItem,
  menuItems,
  user,
}) => {
  const filteredMenuItems = Object.entries(menuItems).filter(([key, content]) => {
    return !content.requiresAuth || (content.requiresAuth && user);
  });

  return (
    <Menu setActive={setActiveItem}>
      {filteredMenuItems.map(([key, content]) => (
        <MenuItem key={key} setActive={setActiveItem} active={activeItem} item={content.title}>
          {activeItem === content.title && (
            <div className="flex flex-col">
              {content.items.map((item, index) => (
                <ProductItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  href={item.href}
                />
              ))}
            </div>
          )}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default memo(NavMenu);