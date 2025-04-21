
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { requestNotificationPermission } from '@/utils/notifications';
import { mockInjuries } from '@/utils/mockData';
import { BodyPart, Injury } from '@/types';

const bodyParts: BodyPart[] = [
  'shoulder',
  'knee',
  'ankle',
  'wrist',
  'elbow',
  'back',
  'neck',
  'hip',
];

const OnboardingStep: React.FC<{
  title: string;
  description: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  backVisible?: boolean;
  nextText?: string;
}> = ({
  title,
  description,
  children,
  onNext,
  onBack,
  nextDisabled = false,
  backVisible = true,
  nextText = 'Next',
}) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-healing-700">{title}</h2>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
    
    <div className="my-6">
      {children}
    </div>
    
    <div className="flex justify-between">
      {backVisible && onBack ? (
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : <div></div>}
      
      <Button 
        className="bg-healing-600 hover:bg-healing-700" 
        onClick={onNext}
        disabled={nextDisabled}
      >
        {nextText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
);

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);
  const [selectedInjury, setSelectedInjury] = useState<Injury | null>(null);
  
  const filteredInjuries = selectedBodyPart 
    ? mockInjuries.filter(injury => injury.bodyPart === selectedBodyPart)
    : [];
  
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleComplete = () => {
    // In a real app, you would send this data to your backend
    // For now, we'll just navigate to the login screen
    navigate('/login');
  };
  
  const handleNotificationsSetup = async () => {
    await requestNotificationPermission();
    handleNext();
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-healing-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          {currentStep === 0 && (
            <OnboardingStep
              title="Welcome to RecoverFlow"
              description="Let's get your recovery journey started"
              onNext={handleNext}
              backVisible={false}
            >
              <div className="space-y-4">
                <p className="text-center text-gray-600">
                  RecoverFlow helps you recover from soft tissue injuries with personalized exercise programs and progress tracking.
                </p>
                <div className="flex justify-center">
                  <img 
                    src="/images/onboarding-welcome.svg" 
                    alt="Welcome" 
                    className="h-40 w-40"
                  />
                </div>
              </div>
            </OnboardingStep>
          )}
          
          {currentStep === 1 && (
            <OnboardingStep
              title="Where's Your Injury?"
              description="Select the area that's bothering you"
              onNext={handleNext}
              onBack={handleBack}
              nextDisabled={!selectedBodyPart}
            >
              <div className="grid grid-cols-2 gap-3">
                {bodyParts.map(part => (
                  <Button
                    key={part}
                    variant={selectedBodyPart === part ? "default" : "outline"}
                    className={selectedBodyPart === part ? "bg-healing-600 hover:bg-healing-700" : ""}
                    onClick={() => setSelectedBodyPart(part)}
                  >
                    {part.charAt(0).toUpperCase() + part.slice(1)}
                  </Button>
                ))}
              </div>
            </OnboardingStep>
          )}
          
          {currentStep === 2 && (
            <OnboardingStep
              title="Specify Your Injury"
              description="Select the specific condition"
              onNext={handleNext}
              onBack={handleBack}
              nextDisabled={!selectedInjury}
            >
              <div className="space-y-3">
                {filteredInjuries.length > 0 ? (
                  filteredInjuries.map(injury => (
                    <div
                      key={injury.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedInjury?.id === injury.id 
                          ? 'border-healing-600 bg-healing-50' 
                          : 'border-gray-200 hover:border-healing-400'
                      }`}
                      onClick={() => setSelectedInjury(injury)}
                    >
                      <h3 className="font-medium">{injury.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{injury.description}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4">
                    <p className="text-gray-600">No specific injuries found for this body part. You can still continue.</p>
                    <Button 
                      className="mt-4 bg-healing-600 hover:bg-healing-700"
                      onClick={() => {
                        // Create a generic injury
                        const genericInjury: Injury = {
                          id: 'generic-' + selectedBodyPart,
                          name: `${selectedBodyPart?.charAt(0).toUpperCase() + selectedBodyPart?.slice(1)} Pain`,
                          bodyPart: selectedBodyPart as BodyPart,
                          severity: 'moderate',
                          description: `General pain in the ${selectedBodyPart} area`,
                          recommendedPrograms: [],
                        };
                        setSelectedInjury(genericInjury);
                      }}
                    >
                      Continue with General Recovery
                    </Button>
                  </div>
                )}
              </div>
            </OnboardingStep>
          )}
          
          {currentStep === 3 && (
            <OnboardingStep
              title="Enable Notifications"
              description="Stay on track with your recovery"
              onNext={handleNotificationsSetup}
              onBack={handleBack}
              nextText="Enable"
            >
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <svg className="h-24 w-24 text-healing-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  RecoverFlow uses notifications to remind you about your exercises and track your progress. Enable notifications to get the most out of your recovery program.
                </p>
              </div>
            </OnboardingStep>
          )}
          
          {currentStep === 4 && (
            <OnboardingStep
              title="All Set!"
              description="You're ready to start your recovery journey"
              onNext={handleComplete}
              onBack={handleBack}
              nextText="Get Started"
            >
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <svg className="h-24 w-24 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600">
                  Your recovery program is ready. Create your account to begin your personalized journey to recovery.
                </p>
              </div>
            </OnboardingStep>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
