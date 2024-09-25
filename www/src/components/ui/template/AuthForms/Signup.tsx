'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import SignUpForm from './SignUpForm';
import SignInLinks from './SignInLinks';

interface SignUpProps {
  allowEmail: boolean;
  redirectMethod: string;
}

export default function SignUp({ allowEmail, redirectMethod }: SignUpProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true); // Disable the button while the request is being handled
    // Conditionally use `router` based on `redirectMethod` without violating the rules of hooks
    const effectiveRouter = redirectMethod === 'client' ? router : undefined;
    await handleRequest(e, signUp, effectiveRouter);
    setIsSubmitting(false);
  };

  return (
    <div className="my-8">
      <SignUpForm isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
      <SignInLinks allowEmail={allowEmail} />
    </div>
  );
}