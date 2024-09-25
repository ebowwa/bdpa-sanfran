// components/OnboardingPage.tsx
"use client";

import { CardContent, Card } from "@/components/ui/common/card";
import LogInIcon from "@/components/ui/icons/LogInIcon";
import LogOutIcon from "@/components/ui/icons/LogOut";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();

  const handleCreateAccountClick = () => {
    router.push("/signin/signup");
  };

  const handleContinueWithoutAccountClick = () => {
    router.push("/forms");
  };

  return (
    <Card key="1" className="bg-green-800 dark:bg-green-900">
      <div className="sm:mx-auto sm:max-w-2xl sm:px-6 lg:max-w-3xl">
        <div className="flex flex-col gap-4 py-6 sm:px-6">
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="space-y-2 text-center">
              <h1 className="text-5xl font-extrabold text-center text-green-600 dark:text-green-400">
                Welcome!
              </h1>
              <p className="bg-blue-100 dark:bg-blue-800 p-4 rounded-lg">
                Do you have time to create an account or would you like to proceed without one? Account holders enjoy
                exclusive discounts and incentives.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Card
                className="bg-gray-100 dark:bg-gray-800 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                onClick={handleCreateAccountClick}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <LogInIcon className="h-6 w-6" />
                    <h3 className="text-lg font-bold">Create Account</h3>
                  </div>
                </CardContent>
              </Card>
              <Card
                className="bg-gray-100 dark:bg-gray-800 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
                onClick={handleContinueWithoutAccountClick}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <LogOutIcon className="h-6 w-6" />
                    <h3 className="text-lg font-bold">Continue Without Account</h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}