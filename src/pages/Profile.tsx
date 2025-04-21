
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import NavigationBar from '@/components/NavigationBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, LogOut, Bell, Shield, User, Info } from 'lucide-react';
import { getUser, clearAppData } from '@/utils/storage';

const ProfileSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <Card className="shadow-sm">
    <CardHeader className="pb-2">
      <CardTitle className="text-base font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const ProfileItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
  <button
    className="flex items-center space-x-3 w-full py-3 hover:bg-gray-50 rounded-md transition-colors text-left"
    onClick={onClick}
  >
    <div className="text-healing-600 ml-1">{icon}</div>
    <div className="flex-1">
      <p className="font-medium">{title}</p>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  </button>
);

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  const handleLogout = () => {
    clearAppData();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader 
        title="Profile" 
        showMenu
      />
      
      <main className="pt-20 px-4 space-y-6">
        {/* User Profile Card */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.profilePicture} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            
            {/* User Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="border rounded-md p-3 text-center">
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="text-xl font-semibold text-healing-700">{user.progressStats.currentStreak}</p>
                <p className="text-xs text-muted-foreground">days</p>
              </div>
              <div className="border rounded-md p-3 text-center">
                <p className="text-sm text-muted-foreground">Exercises</p>
                <p className="text-xl font-semibold text-healing-700">{user.progressStats.exercisesCompleted}</p>
                <p className="text-xs text-muted-foreground">completed</p>
              </div>
              <div className="border rounded-md p-3 text-center">
                <p className="text-sm text-muted-foreground">Programs</p>
                <p className="text-xl font-semibold text-healing-700">{user.progressStats.programsCompleted}</p>
                <p className="text-xs text-muted-foreground">completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Current Injuries */}
        <ProfileSection title="Current Injuries">
          {user.injuries.length > 0 ? (
            <div className="space-y-3">
              {user.injuries.map(injury => (
                <div key={injury.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{injury.name}</p>
                    <p className="text-sm text-muted-foreground">{injury.bodyPart}</p>
                  </div>
                  <Badge
                    className={`
                      ${injury.severity === 'mild' ? 'bg-green-100 text-green-800' : ''}
                      ${injury.severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${injury.severity === 'severe' ? 'bg-red-100 text-red-800' : ''}
                    `}
                  >
                    {injury.severity}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No injuries recorded</p>
          )}
        </ProfileSection>
        
        {/* Settings and Help */}
        <ProfileSection title="Settings">
          <div className="space-y-1">
            <ProfileItem
              icon={<Bell className="h-5 w-5" />}
              title="Notifications"
              description="Manage your reminders"
              onClick={() => navigate('/notifications')}
            />
            
            <Separator />
            
            <ProfileItem
              icon={<Settings className="h-5 w-5" />}
              title="Account Settings"
              description="Update your profile details"
              onClick={() => navigate('/settings')}
            />
            
            <Separator />
            
            <ProfileItem
              icon={<Shield className="h-5 w-5" />}
              title="Privacy & Security"
              description="Manage your data and privacy"
              onClick={() => navigate('/privacy')}
            />
            
            <Separator />
            
            <ProfileItem
              icon={<Info className="h-5 w-5" />}
              title="Help & Support"
              description="FAQ and contact information"
              onClick={() => navigate('/help')}
            />
            
            <Separator />
            
            <ProfileItem
              icon={<LogOut className="h-5 w-5" />}
              title="Sign Out"
              onClick={handleLogout}
            />
          </div>
        </ProfileSection>
        
        {/* App Version */}
        <div className="text-center text-xs text-muted-foreground mt-6">
          <p>RecoverFlow v1.0.0</p>
        </div>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Profile;
