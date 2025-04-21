
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, Check, Play, Pause } from 'lucide-react';
import { getUser } from '@/utils/storage';
import { Exercise } from '@/types';
import { recordCompletedExercise } from '@/utils/progress';

const ExerciseDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showMods, setShowMods] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [isExercising, setIsExercising] = useState(false);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentRep, setCurrentRep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    if (!id) return;
    
    // Find exercise in active programs
    const user = getUser();
    if (!user) {
      navigate('/login');
      return;
    }
    
    let foundExercise: Exercise | null = null;
    
    for (const program of user.activePrograms) {
      for (const phase of program.phases) {
        const found = phase.exercises.find(e => e.id === id);
        if (found) {
          foundExercise = found;
          break;
        }
      }
      if (foundExercise) break;
    }
    
    if (foundExercise) {
      setExercise(foundExercise);
    } else {
      // If not found in active programs, try mock data
      for (const program of user.activePrograms) {
        for (const phase of program.phases) {
          const found = phase.exercises.find(e => e.id === id);
          if (found) {
            setExercise(found);
            break;
          }
        }
        if (exercise) break;
      }
    }
  }, [id, navigate]);
  
  const handleStartExercise = () => {
    setIsExercising(true);
    setCurrentSet(1);
    setCurrentRep(1);
  };
  
  const handleNextRep = () => {
    if (!exercise) return;
    
    if (currentRep < exercise.reps) {
      setCurrentRep(currentRep + 1);
    } else {
      // End of set
      if (currentSet < exercise.sets) {
        // Move to next set
        setCurrentSet(currentSet + 1);
        setCurrentRep(1);
      } else {
        // Exercise complete
        handleCompleteExercise();
      }
    }
  };
  
  const handleCompleteExercise = () => {
    setIsExercising(false);
    setIsCompleted(true);
    recordCompletedExercise();
    
    // In a real app, you would update the user's progress
    // For now we'll just simulate completion
  };
  
  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading exercise...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileHeader 
        title={exercise.name} 
        showBack
      />
      
      <main className="pt-20 px-4 space-y-6">
        {/* Exercise Image/Video */}
        <div 
          className="h-64 bg-cover bg-center rounded-lg overflow-hidden flex items-center justify-center bg-healing-100"
        >
          {exercise.imageUrl ? (
            <img 
              src={exercise.imageUrl} 
              alt={exercise.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-healing-600">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </div>
          )}
        </div>
        
        {/* Exercise Details */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">{exercise.name}</h2>
            <p className="text-gray-600 mb-4">{exercise.description}</p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-healing-50 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Sets</p>
                <p className="text-xl font-semibold text-healing-700">{exercise.sets}</p>
              </div>
              <div className="bg-healing-50 p-3 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Reps</p>
                <p className="text-xl font-semibold text-healing-700">{exercise.reps}</p>
              </div>
            </div>
            
            {/* Instructions Accordion */}
            <div className="rounded-lg border p-1 mb-3">
              <button
                className="flex w-full items-center justify-between rounded-md p-3"
                onClick={() => setShowInstructions(!showInstructions)}
              >
                <span className="font-medium">Instructions</span>
                {showInstructions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {showInstructions && (
                <div className="p-3 pt-0">
                  <Separator className="my-2" />
                  <ol className="list-decimal list-inside space-y-2 text-gray-600">
                    {exercise.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
            
            {/* Modifications Accordion */}
            {exercise.modifications.length > 0 && (
              <div className="rounded-lg border p-1 mb-3">
                <button
                  className="flex w-full items-center justify-between rounded-md p-3"
                  onClick={() => setShowMods(!showMods)}
                >
                  <span className="font-medium">Modifications</span>
                  {showMods ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                
                {showMods && (
                  <div className="p-3 pt-0">
                    <Separator className="my-2" />
                    <div className="space-y-3">
                      {exercise.modifications.map((mod) => (
                        <div key={mod.id} className="space-y-1">
                          <h4 className="font-medium">
                            {mod.name} 
                            <span className="ml-2 text-xs text-muted-foreground">(
                              {mod.difficulty === 'easier' ? 'Easier' : 'Harder'}
                            )</span>
                          </h4>
                          <p className="text-sm text-gray-600">{mod.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Tips Accordion */}
            {exercise.tips.length > 0 && (
              <div className="rounded-lg border p-1 mb-3">
                <button
                  className="flex w-full items-center justify-between rounded-md p-3"
                  onClick={() => setShowTips(!showTips)}
                >
                  <span className="font-medium">Tips</span>
                  {showTips ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                
                {showTips && (
                  <div className="p-3 pt-0">
                    <Separator className="my-2" />
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {exercise.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      {/* Exercise Control Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        {isExercising ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground">Set {currentSet} of {exercise.sets}</p>
              <p className="text-2xl font-bold text-healing-700">Rep {currentRep} of {exercise.reps}</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => setIsExercising(false)}
              >
                <Pause className="mr-2 h-4 w-4" />
                Pause
              </Button>
              <Button 
                className="flex-1 bg-healing-600 hover:bg-healing-700"
                onClick={handleNextRep}
              >
                Next Rep
              </Button>
            </div>
          </div>
        ) : (
          isCompleted ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-center font-medium">Exercise Completed!</p>
              <Button 
                className="w-full bg-healing-600 hover:bg-healing-700"
                onClick={() => navigate(-1)}
              >
                Return to Exercises
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full bg-healing-600 hover:bg-healing-700"
              onClick={handleStartExercise}
            >
              <Play className="mr-2 h-4 w-4" />
              Start Exercise
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default ExerciseDetail;
