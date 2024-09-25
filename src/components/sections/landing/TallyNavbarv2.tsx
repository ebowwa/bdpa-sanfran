"use client"
import React, { useState } from 'react';
// import { useUser } from '@/providers/UserContext'; // Commented out user context
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/common/button";
import { useRouter } from 'next/navigation';
// import { handleRequest } from '@/utils/auth-helpers/client'; // Commented out auth helper
// import { SignOut } from '@/utils/auth-helpers/server'; // Commented out sign out functionality
// import { getRedirectMethod } from '@/utils/auth-helpers/settings'; // Commented out settings import
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { cn } from "@/utils/utility/cn";
import { menuItems, MenuItemContent, ProductItemContent } from '@/data/menuItemsContent';

const TallyNavbarv2: React.FC = () => {
  // const { user, loading } = useUser(); // Commented out user state
  const router = useRouter();
  // const redirectMethod = getRedirectMethod(); // Commented out getRedirectMethod() call
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItemContent | null>(null);

  // const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const { success, redirectUrl } = await handleRequest(e, SignOut, redirectMethod === 'client' ? router : null);
  //   if (success && redirectUrl) {
  //     router.push(redirectUrl);
  //   }
  // };

  const handleMenuItemClick = (item: MenuItemContent) => {
    setActiveMenuItem(item === activeMenuItem ? null : item);
  };

  const handleSubMenuItemClick = (subItem: ProductItemContent) => {
    setIsMobileMenuOpen(false);
    router.push(subItem.href);
  };

  return (
    <nav className="flex justify-between items-center py-4 px-8 border-b sticky top-0 bg-white z-50">
      <Link href="/" className="flex items-center space-x-2 text-lg font-medium">
        <Image src="/logo.svg" alt="Goldson landscaping Logo" width={120} height={90} />
        <span className="sr-only">Goldson</span>
      </Link>

      <div className="md:hidden">
      <button className="text-xl focus:outline-none px-4" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>

          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      <div className={cn("md:flex md:items-center md:space-x-4", isMobileMenuOpen ? "block" : "hidden")}>
        <ul className="space-y-4 md:flex md:space-y-0 md:space-x-4 relative">
          {menuItems && Object.values(menuItems).map((item) => {
            // if (item.requiresAuth && !user) { // Commented out auth check
            //   return null;
            // }

            return (
              <li key={item.title} className="relative">
                <button
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  onClick={() => handleMenuItemClick(item)}
                >
                  {item.title}
                </button>
                {activeMenuItem === item && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-4">
                    {item.items.map((subItem) => (
                      <button
                        key={subItem.title}
                        className="block text-gray-600 hover:text-gray-800 mb-2"
                        onClick={() => handleSubMenuItemClick(subItem)}
                      >
                        {subItem.title}
                      </button>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-4 md:mt-0 md:ml-4 space-y-2 md:space-y-0 md:flex md:items-center md:space-x-4">
          {/* {!loading && user ? ( // Commented out user check and sign out functionality */}
            {/* <> */}
              {/* <span>Welcome, {user.email}</span> */}
              {/* <form onSubmit={handleSignOut}> */}
                {/* <Button type="submit" className="ml-4" variant="secondary"> */}
                  {/* Sign Out */}
                {/* </Button> */}
              {/* </form> */}
            {/* </> */}
          {/* ) : ( */}
            <>
              <Button className="ml-4" variant="secondary" onClick={() => router.push('/signin')}>
                Sign in
              </Button>
              <BackgroundGradient containerClassName="inline-block">
                <Button className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium leading-none text-white rounded-full bg-[#ff8b66] hover:bg-[#ff7a4d] shadow-md dark:bg-[#ff8b66]" onClick={() => router.push('/onboarding/')}>
                  Book Service
                </Button>
              </BackgroundGradient>
            </>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
};

export default TallyNavbarv2;