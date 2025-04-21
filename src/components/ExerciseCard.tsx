
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Check, Info } from 'lucide-react';
import { Exercise } from '@/types';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted?: boolean;
  onStart: () => void;
  onComplete: () => void;
  onViewDetails: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  isCompleted = false,
  onStart,
  onComplete,
  onViewDetails,
}) => {
  return (
    <Card className={`shadow-sm transition-all ${isCompleted ? 'bg-gray-50' : ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex justify-between items-center">
          <span>{exercise.name}</span>
          {isCompleted && <Check className="w-5 h-5 text-green-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {exercise.description}
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-secondary/50 p-2 rounded-md">
            <span className="font-medium">Sets:</span> {exercise.sets}
          </div>
          <div className="bg-secondary/50 p-2 rounded-md">
            <span className="font-medium">Reps:</span> {exercise.reps}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={onViewDetails}>
          <Info className="h-4 w-4 mr-1" />
          Details
        </Button>
        
        {isCompleted ? (
          <Button variant="outline" size="sm" className="text-healing-600" disabled>
            <Check className="h-4 w-4 mr-1" />
            Completed
          </Button>
        ) : (
          <Button variant="default" size="sm" className="bg-healing-600 hover:bg-healing-700" onClick={onStart}>
            <Play className="h-4 w-4 mr-1" />
            Start
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExerciseCard;
