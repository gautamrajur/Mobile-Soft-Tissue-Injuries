
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import ExerciseCard from '@/components/ExerciseCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getPrograms, getUser } from '@/utils/storage';
import { RecoveryProgram, ProgramPhase } from '@/types';
import { mockPrograms } from '@/utils/mockData';
import { recordCompletedExercise } from '@/utils/progress';

const ProgramExercises: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<RecoveryProgram | null>(null);
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  
  useEffect(() => {
    if (!id) return;
    
    // Get programs from storage or use mock data
    const programs = getPrograms().length > 0 ? getPrograms() : mockPrograms;
    const foundProgram = programs.find(p => p.id === id);
    
    if (foundProgram) {
      setProgram(foundProgram);
    }
  }, [id]);
  
  // Handle exercise completion
  const handleCompleteExercise = (exerciseId: string) => {
    if (!completedExercises.includes(exerciseId)) {
      setCompletedExercises([...completedExercises, exerciseId]);
      recordCompletedExercise();
    }
  };
  
  // Calculate program progress
  const calculateProgress = () => {
    if (!program) return 0;
    
    const totalExercises = program.phases.reduce(
      (sum, phase) => sum + phase.exercises.length, 0
    );
    
    return Math.round((completedExercises.length / totalExercises) * 100);
  };
  
  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading program exercises...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <MobileHeader 
        title={program.name} 
        showBack
      />
      
      <main className="pt-20 px-4 space-y-6">
        {/* Program Progress */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Your Progress</h2>
            <span className="text-sm text-healing-600 font-medium">{calculateProgress()}%</span>
          </div>
          <Progress value={calculateProgress()} className="h-2" />
        </div>
        
        {/* Phase Tabs */}
        <Tabs 
          defaultValue={program.phases[0]?.id} 
          onValueChange={(value) => {
            const index = program.phases.findIndex(phase => phase.id === value);
            if (index !== -1) {
              setActivePhaseIndex(index);
            }
          }}
        >
          <TabsList className="grid grid-cols-3 mb-4">
            {program.phases.slice(0, 3).map((phase, index) => (
              <TabsTrigger key={phase.id} value={phase.id}>
                Phase {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {program.phases.map((phase) => (
            <TabsContent key={phase.id} value={phase.id} className="space-y-4">
              <div className="bg-healing-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium">{phase.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{phase.description}</p>
                <p className="text-xs text-muted-foreground mt-2">Duration: {phase.durationDays} days</p>
              </div>
              
              <h3 className="font-semibold">Exercises</h3>
              
              {phase.exercises.length > 0 ? (
                <div className="space-y-3">
                  {phase.exercises.map(exercise => (
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
                  <p className="text-muted-foreground">No exercises in this phase</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default ProgramExercises;
