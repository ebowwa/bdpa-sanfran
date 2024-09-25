'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPassword } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import PasswordSignInForm from './PasswordSignInForm';
import SignInLinks from './PasswordSignInLinks';

interface PasswordSignInProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function PasswordSignIn({
  allowEmail,
  redirectMethod,
}: PasswordSignInProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled

    // Decide how to handle the request based on redirectMethod
    if (redirectMethod === 'client') {
      await handleRequest(e, signInWithPassword, router);
    } else {
      // Handle server-side redirection or other logic here
      await handleRequest(e, signInWithPassword);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <PasswordSignInForm isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
      <SignInLinks allowEmail={allowEmail} />
    </div>
  );
}