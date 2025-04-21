
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileHeader from '@/components/MobileHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Calendar, Clock, Activity, Play } from 'lucide-react';
import { getPrograms, getUser, storeUser } from '@/utils/storage';
import { RecoveryProgram } from '@/types';
import { mockPrograms } from '@/utils/mockData';

const ProgramDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<RecoveryProgram | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  useEffect(() => {
    if (!id) return;
    
    // Get programs from storage or use mock data
    const programs = getPrograms().length > 0 ? getPrograms() : mockPrograms;
    const foundProgram = programs.find(p => p.id === id);
    
    if (foundProgram) {
      setProgram(foundProgram);
      
      // Check if user is enrolled in this program
      const user = getUser();
      if (user && user.activePrograms.some(p => p.id === id)) {
        setIsEnrolled(true);
      }
    }
  }, [id]);
  
  const handleEnroll = () => {
    if (!program || !id) return;
    
    const user = getUser();
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Add program to user's active programs
    if (!user.activePrograms.some(p => p.id === id)) {
      user.activePrograms.push(program);
      storeUser(user);
      setIsEnrolled(true);
    }
  };
  
  const handleStartExercises = () => {
    if (!program || !id) return;
    navigate(`/program/${id}/exercises`);
  };
  
  if (!program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading program...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <MobileHeader 
        title="Program Details" 
        showBack
      />
      
      <main className="pt-20 px-4 space-y-6">
        {/* Program Header */}
        <div 
          className="h-48 bg-cover bg-center rounded-lg relative overflow-hidden"
          style={{ 
            backgroundImage: program.imageUrl 
              ? `url(${program.imageUrl})` 
              : 'linear-gradient(to right, #38bdf8, #0ea5e9)' 
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
            <Badge className="mb-2 self-start">
              {program.difficulty.charAt(0).toUpperCase() + program.difficulty.slice(1)}
            </Badge>
            <h1 className="text-white text-2xl font-bold">{program.name}</h1>
            <p className="text-white text-sm mt-1">
              {program.durationWeeks} weeks program for {program.targetInjury} recovery
            </p>
          </div>
        </div>
        
        {/* Program Description */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">About this Program</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{program.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-healing-600" />
                <div className="text-sm">
                  <p className="font-medium">Duration</p>
                  <p className="text-gray-600">{program.durationWeeks} weeks</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-healing-600" />
                <div className="text-sm">
                  <p className="font-medium">Time per session</p>
                  <p className="text-gray-600">15-20 minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-healing-600" />
                <div className="text-sm">
                  <p className="font-medium">Intensity</p>
                  <p className="text-gray-600">
                    {program.difficulty.charAt(0).toUpperCase() + program.difficulty.slice(1)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Program Phases */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recovery Phases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {program.phases.map((phase, index) => (
                <div key={phase.id}>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-healing-100 flex items-center justify-center">
                      <span className="text-healing-700 font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{phase.name}</h3>
                      <p className="text-sm text-gray-600">{phase.durationDays} days</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 pl-11 mb-3">
                    {phase.description}
                  </p>
                  
                  {index < program.phases.length - 1 && (
                    <Separator className="my-3" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Enrollment Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          {isEnrolled ? (
            <Button 
              className="w-full bg-healing-600 hover:bg-healing-700"
              onClick={handleStartExercises}
            >
              <Play className="mr-2 h-4 w-4" />
              Start Today's Exercises
            </Button>
          ) : (
            <Button 
              className="w-full bg-healing-600 hover:bg-healing-700"
              onClick={handleEnroll}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              Start This Program
            </Button>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProgramDetail;
