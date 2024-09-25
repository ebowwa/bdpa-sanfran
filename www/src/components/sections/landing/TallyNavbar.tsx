// src/components/sections/landing/TallyNavbar.tsx
// https://claude.ai/chat/0253436a-7a8e-478e-9666-60deeed9aff7
// TallyNavbar.tsx

import React, { useState } from 'react';
import { useUser } from '@/providers/UserContext';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/common/button";
import { useRouter } from 'next/navigation';
import { handleRequest } from '@/utils/auth-helpers/client';
import { SignOut } from '@/utils/auth-helpers/server';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { menuItems, MenuItemContent } from '@/data/menuItemsContent';
import NavMenu from './NavMenu';

export type TallyNavbarProps = {
  activeItem: string | null;
  setActiveItem: (item: string | null) => void;
  menuItems: Record<string, MenuItemContent>;
};

const TallyNavbar: React.FC<TallyNavbarProps> = ({
  activeItem,
  setActiveItem,
  menuItems,
}) => {
  const { user, loading } = useUser();
  const router = useRouter();
  const redirectMethod = getRedirectMethod();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, redirectUrl } = await handleRequest(e, SignOut, redirectMethod === 'client' ? router : null);
    if (success && redirectUrl) {
      router.push(redirectUrl);
    }
  };

  return (
    <nav className="flex justify-between items-center py-4 px-8 border-b sticky top-0 bg-white z-50">
      {/* Replace the existing logo */}
      <Link href="/" className="flex items-center space-x-2 text-lg font-medium">
        <Image src="/logo.svg" alt="Goldson landscaping Logo" width={120} height={60} />
        <span className="sr-only">Goldson</span>
      </Link>

      <div className="md:hidden">
        <button
          className="text-xl focus:outline-none px-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:flex md:items-center md:space-x-4`}
      >
        <NavMenu
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          menuItems={menuItems}
          user={user}
        />

        <div className="mt-4 md:mt-0 md:ml-4 space-y-2 md:space-y-0 md:flex md:items-center md:space-x-4">
          {!loading && user ? (
            <>
              {/* User is logged in */}
              <span>Welcome, {user.email}</span>
              <form onSubmit={handleSignOut}>
                <Button type="submit" className="ml-4" variant="secondary">
                  Sign Out
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* User is not logged in */}
              <Button className="ml-4" variant="secondary" onClick={() => router.push('/signin')}>
                Sign in
              </Button>
              <BackgroundGradient containerClassName="inline-block">
                <Button className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium leading-none text-white rounded-full bg-[#ff8b66] hover:bg-[#ff7a4d] shadow-md dark:bg-[#ff8b66]" onClick={() => router.push('/onboarding/')}>
                  Book Service
                </Button>
              </BackgroundGradient>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TallyNavbar;