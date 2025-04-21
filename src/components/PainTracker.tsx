
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Save } from 'lucide-react';
import { BodyPart, PainLevel } from '@/types';
import { recordPainLevel } from '@/utils/progress';

interface PainTrackerProps {
  bodyPart: BodyPart;
  onSave?: (painLevel: PainLevel) => void;
}

const PainTracker: React.FC<PainTrackerProps> = ({ 
  bodyPart,
  onSave
}) => {
  const [painLevel, setPainLevel] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');

  const handleSave = () => {
    const newPainLevel: PainLevel = {
      date: new Date().toISOString().split('T')[0],
      level: painLevel,
      bodyPart,
      notes: notes || undefined,
    };
    
    recordPainLevel(newPainLevel);
    
    if (onSave) {
      onSave(newPainLevel);
    }
    
    // Reset form
    setPainLevel(5);
    setNotes('');
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Track Pain Level</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>No Pain</span>
            <span>Severe Pain</span>
          </div>
          <Slider
            value={[painLevel]}
            min={0}
            max={10}
            step={1}
            onValueChange={(value) => setPainLevel(value[0])}
          />
          <div className="text-center font-medium text-healing-700 mt-2">
            {painLevel} / 10
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Notes (optional)</label>
          <textarea 
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional details about your pain..."
          />
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-healing-600 hover:bg-healing-700 text-white" 
          onClick={handleSave}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Pain Level
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PainTracker;
