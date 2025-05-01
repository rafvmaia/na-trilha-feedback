import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function PrivateRoute({ children }) {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsAuthenticated(true);
    }
    setChecking(false);
  }, []);

  if (checking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 animate-pulse text-lg">Verificando acesso...</div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
