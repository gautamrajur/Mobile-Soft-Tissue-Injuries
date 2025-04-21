
import React from 'react';
import { ChevronLeft, Bell, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  showMenu?: boolean;
  showNotifications?: boolean;
  onMenuClick?: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  showBack = false,
  showMenu = false,
  showNotifications = false,
  onMenuClick,
}) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 bg-white shadow-sm z-10">
      <div className="flex items-center">
        {showBack && (
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}
        {showMenu && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-2">
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center">
        {showNotifications && (
          <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
            <Bell className="h-6 w-6" />
          </Button>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;
