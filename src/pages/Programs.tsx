
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import NavigationBar from '@/components/NavigationBar';
import ProgramCard from '@/components/ProgramCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { getPrograms, getUser } from '@/utils/storage';
import { mockPrograms } from '@/utils/mockData';

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const user = getUser();
  
  // Get programs from storage or use mock data
  const programs = getPrograms().length > 0 ? getPrograms() : mockPrograms;
  
  // Filter programs based on search query
  const filteredPrograms = programs.filter(
    program => program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               program.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Check if program is active for user
  const isProgramActive = (programId: string) => {
    return user?.activePrograms.some(p => p.id === programId) || false;
  };
  
  // Calculate program progress
  const getProgramProgress = (programId: string) => {
    if (!user) return undefined;
    
    const activeProgram = user.activePrograms.find(p => p.id === programId);
    if (!activeProgram) return undefined;
    
    // For demo purposes, just return a random percentage
    return Math.floor(Math.random() * 100);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader 
        title="Recovery Programs" 
        showBack
        showNotifications
      />
      
      <main className="pt-20 px-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-10"
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Recommended Programs */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Recommended for You</h2>
          
          {user?.injuries.length && user.injuries[0].recommendedPrograms.length ? (
            <div className="grid grid-cols-1 gap-4">
              {programs
                .filter(program => user.injuries[0].recommendedPrograms.includes(program.id))
                .map(program => (
                  <ProgramCard
                    key={program.id}
                    program={program}
                    progress={isProgramActive(program.id) ? getProgramProgress(program.id) : undefined}
                    onClick={() => navigate(`/program/${program.id}`)}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <p className="text-muted-foreground">
                We don't have enough information to recommend programs yet.
                Complete your profile to get personalized recommendations.
              </p>
            </div>
          )}
        </section>
        
        {/* All Programs */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">All Programs</h2>
          
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredPrograms.map(program => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  progress={isProgramActive(program.id) ? getProgramProgress(program.id) : undefined}
                  onClick={() => navigate(`/program/${program.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <p className="text-muted-foreground">
                No programs found matching your search.
              </p>
            </div>
          )}
        </section>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Programs;
