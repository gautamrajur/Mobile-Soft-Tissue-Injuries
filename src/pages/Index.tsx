import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "@/utils/storage";

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!getAuthToken();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-healing-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-healing-700">RecoverFlow</h1>
        <p className="text-lg text-gray-600">Loading your recovery journey...</p>
      </div>
    </div>
  );
};

export default Index;
