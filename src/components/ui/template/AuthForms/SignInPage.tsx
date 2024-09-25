// src/components/ui/template/AuthForms/SignInPage.tsx

import Image from 'next/image';
import Link from 'next/link';
import Card from '@/components/ui/template/Card';
import PasswordSignIn from '@/components/ui/template/AuthForms/PasswordSignIn';
import EmailSignIn from '@/components/ui/template/AuthForms/EmailSignIn';
import Separator from '@/components/ui/template/AuthForms/Separator';
import OauthSignIn from '@/components/ui/template/AuthForms/OauthSignIn';
import ForgotPassword from '@/components/ui/template/AuthForms/ForgotPassword';
import UpdatePassword from '@/components/ui/template/AuthForms/UpdatePassword';
import SignUp from '@/components/ui/template/AuthForms/Signup';

interface Props {
  viewProp: string;
  allowOauth: boolean;
  allowEmail: boolean;
  allowPassword: boolean;
  redirectMethod: string;
  disableButton: boolean;
}

export default function SignInPage({
  viewProp,
  allowOauth,
  allowEmail,
  allowPassword,
  redirectMethod,
  disableButton,
}: Props) {
  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80">
        <div className="flex justify-center pb-12">
          <Link href="/">
            <Image src="/logo.svg" alt="Goldson landscaping Logo" width={120} height={60} />
          </Link>
        </div>
        <Card
          title={
            viewProp === 'forgot_password'
              ? 'Reset Password'
              : viewProp === 'update_password'
              ? 'Update Password'
              : viewProp === 'signup'
              ? 'Sign Up'
              : 'Sign In'
          }
        >
          {viewProp === 'password_signin' && (
            <PasswordSignIn
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
            />
          )}
          {viewProp === 'email_signin' && (
            <EmailSignIn
              allowPassword={allowPassword}
              redirectMethod={redirectMethod}
              disableButton={disableButton}
            />
          )}
          {viewProp === 'forgot_password' && (
            <ForgotPassword
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
              disableButton={disableButton}
            />
          )}
          {viewProp === 'update_password' && (
            <UpdatePassword redirectMethod={redirectMethod} />
          )}
          {viewProp === 'signup' && (
            <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
          )}
          {viewProp !== 'update_password' &&
            viewProp !== 'signup' &&
            allowOauth && (
              <>
                <Separator text="Third-party sign-in" />
                <OauthSignIn />
              </>
            )}
        </Card>
      </div>
    </div>
  );
}