
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import NavigationBar from '@/components/NavigationBar';
import ProgressCard from '@/components/ProgressCard';
import ExerciseCard from '@/components/ExerciseCard';
import PainTracker from '@/components/PainTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getUser } from '@/utils/storage';
import { Exercise } from '@/types';
import { recordCompletedExercise } from '@/utils/progress';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  
  // Get today's exercises (simplified for demo)
  const getTodaysExercises = (): Exercise[] => {
    if (!user || user.activePrograms.length === 0) return [];
    
    const activeProgram = user.activePrograms[0];
    // For demo, just return first phase exercises
    return activeProgram.phases[0].exercises;
  };
  
  const todaysExercises = getTodaysExercises();
  
  // Handle exercise completion
  const handleCompleteExercise = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
      recordCompletedExercise();
    }
  };
  
  // Progress calculation
  const exerciseCompletion = {
    today: completedExercises.length,
    total: todaysExercises.length || 0,
  };
  
  const daysActive = user?.progressStats.currentStreak || 0;
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader 
        title="RecoverFlow" 
        showMenu 
        showNotifications
      />
      
      <main className="pt-20 px-4 space-y-6">
        {/* Welcome Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-healing-100 flex items-center justify-center">
                <span className="text-healing-700 font-semibold text-lg">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="font-semibold">Welcome back, {user.name.split(' ')[0]}</h2>
                <p className="text-sm text-muted-foreground">Let's continue your recovery journey</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-healing-50 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Days active</p>
                <p className="text-xl font-semibold text-healing-700">{daysActive}</p>
              </div>
              <div className="bg-healing-50 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Exercises done</p>
                <p className="text-xl font-semibold text-healing-700">{user.progressStats.exercisesCompleted}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Progress Tracking */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Today's Progress</h2>
          <ProgressCard 
            title="Today's Exercises" 
            current={exerciseCompletion.today} 
            max={exerciseCompletion.total || 1} 
            colorClass="bg-healing-500"
          />
        </section>
        
        {/* Today's Exercises */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Today's Exercises</h2>
            <Button 
              variant="ghost" 
              className="text-healing-600 text-sm"
              onClick={() => navigate('/exercises')}
            >
              See all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          {todaysExercises.length > 0 ? (
            <div className="space-y-3">
              {todaysExercises.slice(0, 3).map((exercise) => (
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
            <Card>
              <CardContent className="py-6 text-center">
                <p className="text-muted-foreground mb-4">No exercises scheduled for today</p>
                <Button onClick={() => navigate('/programs')}>
                  Find a Recovery Program
                </Button>
              </CardContent>
            </Card>
          )}
        </section>
        
        {/* Pain Tracker */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Pain Tracking</h2>
          {user.injuries.length > 0 && (
            <PainTracker 
              bodyPart={user.injuries[0].bodyPart} 
              onSave={() => {
                // Show a success message or update UI in a real app
              }}
            />
          )}
        </section>
      </main>
      
      <NavigationBar />
    </div>
  );
};

export default Home;
