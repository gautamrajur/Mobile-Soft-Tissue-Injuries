
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { storeAuthToken, storeUser } from '@/utils/storage';
import { mockUser } from '@/utils/mockData';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // This is a mock authentication
    // In a real app, you would call an authentication API
    setTimeout(() => {
      if (email.trim() && password.trim()) {
        // Mock successful login
        const token = 'mock-auth-token-' + Date.now();
        storeAuthToken(token);
        storeUser(mockUser);
        navigate('/');
      } else {
        setError('Please enter both email and password');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-healing-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-healing-700">RecoverFlow</h1>
          <p className="text-gray-600 mt-2">Your personalized recovery journey</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your recovery program
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <div className="text-sm text-red-500">{error}</div>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Button 
                className="w-full bg-healing-600 hover:bg-healing-700" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
              <Button 
                className="w-full" 
                variant="outline" 
                type="button"
                onClick={() => navigate('/onboarding')}
              >
                Create Account
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
