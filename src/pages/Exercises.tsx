
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import NavigationBar from '@/components/NavigationBar';
import ExerciseCard from '@/components/ExerciseCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUser } from '@/utils/storage';
import { Exercise } from '@/types';
import { recordCompletedExercise } from '@/utils/progress';

const Exercises: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const user = getUser();
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  // Get grouped exercises from all active programs
  const groupedExercises = {
    today: [] as Exercise[],
    upcoming: [] as Exercise[],
    all: [] as Exercise[],
  };
  
  // Populate exercise groups
  if (user.activePrograms.length > 0) {
    user.activePrograms.forEach(program => {
      program.phases.forEach((phase, phaseIndex) => {
        phase.exercises.forEach(exercise => {
          // For demo, just put some exercises in each category
          if (phaseIndex === 0) {
            groupedExercises.today.push(exercise);
          } else if (phaseIndex === 1) {
            groupedExercises.upcoming.push(exercise);
          }
          groupedExercises.all.push(exercise);
        });
      });
    });
  }
  
  // Handle exercise completion
  const handleCompleteExercise = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
      recordCompletedExercise();
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader 
        title="Exercises" 
        showBack
        showNotifications
      />
      
      <main className="pt-20 px-4 space-y-6">
        <Tabs defaultValue="today" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="all">All Exercises</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-4">
            <h2 className="text-lg font-semibold">Today's Exercises</h2>
            
            {groupedExercises.today.length > 0 ? (
              <div className="space-y-3">
                {groupedExercises.today.map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    isCompleted={completedExercises.includes(exercise.id)}
                    onStart={() => navigate(`/exercise/${exercise.id}`)}
                    onComplete={() => handleCompleteExercise(exercise.id)}
                    onViewDetails={() => navigate(`/exercise/${exercise.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-muted-foreground mb-4">No exercises scheduled for today</p>
                <p className="text-sm text-muted-foreground">
                  Start a recovery program to get personalized exercises
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4">
            <h2 className="text-lg font-semibold">Upcoming Exercises</h2>
            
            {groupedExercises.upcoming.length > 0 ? (
              <div className="space-y-3">
                {groupedExercises.upcoming.map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    isCompleted={false}
                    onStart={() => navigate(`/exercise/${exercise.id}`)}
                    onComplete={() => {}}
                    onViewDetails={() => navigate(`/exercise/${exercise.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-muted-foreground">No upcoming exercises found</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all" className="space-y-4">
            <h2 className="text-lg font-semibold">All Exercises</h2>
            
            {groupedExercises.all.length > 0 ? (
              <div className="space-y-3">
                {groupedExercises.all.map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    isCompleted={completedExercises.includes(exercise.id)}
                    onStart={() => navigate(`/exercise/${exercise.id}`)}
                    onComplete={() => handleCompleteExercise(exercise.id)}
                    onViewDetails={() => navigate(`/exercise/${exercise.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 text-center">
                <p className="text-muted-foreground mb-4">No exercises available</p>
                <p className="text-sm text-muted-foreground">
                  Start a recovery program to access exercises
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Exercises;
