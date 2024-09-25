import React from 'react';
import Link from 'next/link';

interface SignInLinksProps {
  allowEmail: boolean;
}

const SignInLinks: React.FC<SignInLinksProps> = ({ allowEmail }) => {
  return (
    <>
      <p>Already have an account?</p>
      <p>
        <Link href="/signin/password_signin" className="font-light text-sm">
          Sign in with email and password
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="font-light text-sm">
            Sign in via magic link
          </Link>
        </p>
      )}
    </>
  );
};

export default SignInLinks;