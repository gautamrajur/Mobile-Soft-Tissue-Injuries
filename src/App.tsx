import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getAuthToken } from "./utils/storage";
import { initializeReminders } from "./utils/notifications";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetail";
import ProgramExercises from "./pages/ProgramExercises";
import Exercises from "./pages/Exercises"; 
import ExerciseDetail from "./pages/ExerciseDetail";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Initialize notifications on app load
  useEffect(() => {
    initializeReminders();
  }, []);

  // Check if user is authenticated
  const isAuthenticated = !!getAuthToken();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/program/:id" element={<ProgramDetail />} />
            <Route path="/program/:id/exercises" element={<ProgramExercises />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/exercise/:id" element={<ExerciseDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
