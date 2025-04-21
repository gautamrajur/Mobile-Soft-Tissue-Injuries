
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressCardProps {
  title: string;
  current: number;
  max: number;
  unit?: string;
  colorClass?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  current,
  max,
  unit = '',
  colorClass = 'bg-healing-500',
}) => {
  const percentage = Math.min(Math.round((current / max) * 100), 100);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Progress 
            value={percentage} 
            className={`h-2 [&>div]:${colorClass}`}
          />
          <div className="flex justify-between text-sm">
            <span className="text-healing-700 font-medium">{current}{unit}</span>
            <span className="text-muted-foreground">of {max}{unit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
