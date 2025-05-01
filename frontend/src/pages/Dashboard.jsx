import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axiosInstance';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      fetchFeedbacks();
    }
  }, [navigate]);

  const fetchFeedbacks = async () => {
    try {
      const response = await api.get('/feedbacks');
      setFeedbacks(response.data);
    } catch (err) {
      console.error('Erro ao buscar feedbacks:', err);
      toast.error('Erro ao buscar feedbacks.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  const handleViewFeedback = (id) => {
    navigate(`/feedback/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Topbar */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">📋 Painel de Feedbacks</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow transition"
        >
          Sair
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-gray-500 text-lg animate-pulse">Carregando feedbacks...</p>
        </div>
      ) : (
        <>
          {feedbacks.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum feedback encontrado.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="text-left py-3 px-6">📛 Nome</th>
                    <th className="text-left py-3 px-6">🎯 Tema de Interesse</th>
                    <th className="text-center py-3 px-6">⭐ Nota</th>
                    <th className="text-center py-3 px-6">🔍 Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback) => (
                    <tr key={feedback.id} className="border-t hover:bg-gray-100 transition">
                      <td className="py-3 px-6">{feedback.nome || 'Anônimo'}</td>
                      <td className="py-3 px-6">{feedback.tema_interesse || '-'}</td>
                      <td className="py-3 px-6 text-center">{feedback.nota || '-'}</td>
                      <td className="py-3 px-6 text-center">
                        <button
                          onClick={() => handleViewFeedback(feedback.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-full text-sm font-semibold transition"
                        >
                          Ver Feedback
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
