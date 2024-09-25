"use client";

// src/providers/UserContext/index.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

// Define a custom User type
type User = {
  id: string;
  email: string;
  // Add any other fields you need for your User
};

const UserContext = createContext<{ user: User | null, loading: boolean, signOut: () => void }>({
  user: null,
  loading: true,
  signOut: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const signOut = async () => {
    // const supabase = createClient();
    // await supabase.auth.signOut();
    setUser(null);
    deleteCookie('user');
  };

  useEffect(() => {
    const fetchUserFromSupabase = async () => {
      // const supabase = createClient();

      // const { data: { user }, error } = await supabase.auth.getUser();

      // if (error) {
      //   console.error('Error fetching user:', error.message);
      //   setLoading(false);
      // } else {
      //   setUser(user);
      //   setLoading(false);
      // }
    };

    const getUserFromCookie = () => {
      const cachedUser = getCookie('user');
      if (cachedUser) {
        setUser(JSON.parse(cachedUser as string));
        setLoading(false);
        return true;
      }
      return false;
    };

    // const authListener = createClient().auth.onAuthStateChange((_event, session) => {
    //   setUser(session?.user ?? null);
    //   setLoading(false);
    // });

    if (!getUserFromCookie()) {
      // fetchUserFromSupabase();
    }

    return () => {
      // authListener.data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      setCookie('user', JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      });
    } else {
      deleteCookie('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, loading, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };