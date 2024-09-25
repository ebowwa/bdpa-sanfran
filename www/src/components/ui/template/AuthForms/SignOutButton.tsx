// src/components/ui/template/AuthForms/SignOutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { createClient as createClientClient } from '@/utils/supabase/client';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClientClient();
    await supabase.auth.signOut();
    router.push('/signin');
  };

  return (
    <button
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      onClick={handleSignOut}
    >
      Sign Out
    </button>
  );
}