
import React from 'react';
import { Home, Activity, Calendar, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Activity, label: 'Exercise', path: '/exercises' },
    { icon: Calendar, label: 'Programs', path: '/programs' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex justify-around items-center z-10">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full transition-colors",
              isActive 
                ? "text-healing-600" 
                : "text-gray-500 hover:text-healing-400"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationBar;
