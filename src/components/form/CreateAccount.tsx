"use client"; // components/CreateAccountCard.tsx

import { CardContent, Card } from "@/components/ui/common/card";
import LogInIcon from "@/components/ui/icons/LogInIcon";
import { useRouter } from "next/navigation";

export default function CreateAccountCard() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/signin/signup");
  };

  return (
    <Card
      className="bg-gray-100 dark:bg-gray-800 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <LogInIcon className="h-6 w-6" />
          <h3 className="text-lg font-bold">Create Account</h3>
        </div>
      </CardContent>
    </Card>
  );
}