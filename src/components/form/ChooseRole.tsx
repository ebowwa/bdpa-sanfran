/**
 * v0 by Vercel.
 * @see https://v0.dev/t/FjNo3N4sACu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// ./src/components/form/ChooseRole.tsx

import { Card } from "@/components/ui/common/card";
import RoleCard from "@/components/form/RoleCard";

import FactoryIcon from '@/components/ui/icons/FactoryIcon';
import HomeIcon from '@/components/ui/icons/HomeIcon';
import LinkIcon from '@/components/ui/icons/LinkIcon';
import RefrigeratorIcon from '@/components/ui/icons/RefrigeratorIcon';

// Content objects
const roleContents = [
  {
    icon: <HomeIcon />,
    title: "Homeowner",
    formPath: "/forms/homeowner",
  },
  {
    icon: <RefrigeratorIcon />,
    title: "Realtor",
    formPath: "/forms/realtor",
  },
  {
    icon: <LinkIcon />,
    title: "Affiliate",
    formPath: "/forms/affiliate",
  },
  {
    icon: <FactoryIcon />,
    title: "Commercial",
    formPath: "/forms/commercial",
  },
];

export default function ChooseRole() {
  return (
    <div>
      <Card className="bg-green-800 dark:bg-green-900">
        <div className="sm:mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl">
          <div className="flex flex-col gap-4 py-6 sm:px-6">
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Choose your role</h1>
                <p className="text-muted">Select the role that best describes you.</p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                {roleContents.map((roleContent, index) => (
                  <RoleCard
                    key={index}
                    icon={roleContent.icon}
                    title={roleContent.title}
                    formPath={roleContent.formPath}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}