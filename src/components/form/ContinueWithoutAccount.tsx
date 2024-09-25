"use client"; // components/ContinueWithoutAccountCard.tsx

import { CardContent, Card } from "@/components/ui/common/card";
import LogOutIcon from "@/components/ui/icons/LogOut";
import { useRouter } from "next/navigation";

export default function ContinueWithoutAccountCard() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/forms");
  };

  return (
    <Card
      className="bg-gray-100 dark:bg-gray-800 transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <LogOutIcon className="h-6 w-6" />
          <h3 className="text-lg font-bold">Continue Without Account</h3>
        </div>
      </CardContent>
    </Card>
  );
}