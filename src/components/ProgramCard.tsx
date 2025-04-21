
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RecoveryProgram } from '@/types';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProgramCardProps {
  program: RecoveryProgram;
  progress?: number; // 0-100
  onClick: () => void;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  progress,
  onClick,
}) => {
  // Display difficulty badge
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className="overflow-hidden shadow-md">
      <div 
        className="h-32 bg-cover bg-center" 
        style={{ 
          backgroundImage: program.imageUrl 
            ? `url(${program.imageUrl})` 
            : 'linear-gradient(to right, #38bdf8, #0ea5e9)' 
        }}
      >
        {progress !== undefined && (
          <div className="w-full h-1 bg-gray-300">
            <div 
              className="h-full bg-healing-500" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-medium">{program.name}</CardTitle>
          <Badge className={getDifficultyColor(program.difficulty)}>
            {program.difficulty.charAt(0).toUpperCase() + program.difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {program.description}
        </p>
        <div className="text-xs text-muted-foreground">
          <span className="font-medium">Duration:</span> {program.durationWeeks} weeks
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-healing-600 hover:bg-healing-700 text-white" 
          onClick={onClick}
        >
          View Program <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;
