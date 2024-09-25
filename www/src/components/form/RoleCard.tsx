// components/RoleCard.tsx
'use client';
import { useRouter } from 'next/navigation';
import { CardContent, Card } from "@/components/ui/common/card";

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  formPath: string | null;
  onClick?: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, title, formPath, onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (formPath) {
      router.push(formPath);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <Card
      className={`bg-gray-100 dark:bg-gray-800 transition-transform duration-300 ease-in-out hover:scale-105 ${
        formPath ? 'cursor-pointer' : 'cursor-not-allowed'
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {icon}
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleCard;