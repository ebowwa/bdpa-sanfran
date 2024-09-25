import React from 'react';
import Button from '@/components/ui/template/Button';

interface SignUpFormProps {
  isSubmitting: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ isSubmitting, handleSubmit }) => {
  return (
    <form noValidate={true} className="mb-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="name@example.com"
            type="email"
            name="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            className="w-full p-3 rounded-md bg-zinc-800"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            className="w-full p-3 rounded-md bg-zinc-800"
          />
        </div>
        <Button variant="slim" type="submit" className="mt-1" loading={isSubmitting}>
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;