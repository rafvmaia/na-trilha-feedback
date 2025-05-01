import { useNavigate } from 'react-router-dom';

export default function useAuth() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const isAuthenticated = !!accessToken;

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return { user, accessToken, refreshToken, isAuthenticated, logout };
}
