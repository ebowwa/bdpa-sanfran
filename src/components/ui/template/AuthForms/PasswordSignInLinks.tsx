import React from 'react';
import Link from 'next/link';

interface SignInLinksProps {
  allowEmail: boolean;
}

const SignInLinks: React.FC<SignInLinksProps> = ({ allowEmail }) => {
  return (
    <>
      <p>
        <Link href="/signin/forgot_password" className="font-light text-sm">
          {`Forgot your password?`}
        </Link>
      </p>
      {allowEmail && (
        <p>
          <Link href="/signin/email_signin" className="font-light text-sm">
            {`Sign in via magic link`}
          </Link>
        </p>
      )}
      <p>
        <Link href="/signin/signup" className="font-light text-sm">
          {`Don't have an account? Sign up`}
        </Link>
      </p>
    </>
  );
};

export default SignInLinks;