import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/axiosInstance';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function FeedbackDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await api.get(`/feedbacks/${id}`);
      setFeedback(response.data);
    } catch (err) {
      console.error('Erro ao buscar feedback:', err);
      if (err.response?.status === 401) {
        toast.error('Sua sessão expirou. Faça login novamente.');
        navigate('/login');
      } else {
        toast.error('Erro ao buscar feedback.');
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex items-center gap-2 text-gray-600 text-lg">
          <Loader2 className="animate-spin w-6 h-6" />
          Carregando feedback...
        </div>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-500">Feedback não encontrado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="py-4 px-8 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          First Commit Feedback
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition"
        >
          Voltar ao Dashboard
        </button>
      </header>

      {/* Breadcrumbs */}
      <div className="px-8 py-3 text-sm text-gray-500">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-blue-600 hover:underline"
        >
          Dashboard
        </button>{' '}
        {'>'} Feedback #{feedback.id}
      </div>

      {/* Conteúdo */}
      <main className="flex-1 p-10 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Detalhes do Feedback
        </h2>

        <div className="space-y-3 text-gray-700 text-base">
          <p><strong>Nome:</strong> {feedback.nome || 'Anônimo'}</p>
          <p><strong>Email:</strong> {feedback.email}</p>
          <p><strong>Tema de Interesse:</strong> {feedback.tema_interesse}</p>
          <p><strong>Nota:</strong> ⭐ {feedback.nota}</p>

          <p><strong>O que achou do conteúdo:</strong> {feedback.conteudo_avaliacao}</p>
          <p><strong>Críticas:</strong> {feedback.criticas}</p>

          {feedback.baixou_curriculo && (
            <p>
              <strong>Link do Currículo:</strong>{' '}
              <a
                href={feedback.baixou_curriculo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Acessar
              </a>
            </p>
          )}

          {feedback.depoimento && (
            <p><strong>Depoimento:</strong> {feedback.depoimento}</p>
          )}

          {feedback.mais_infos && (
            <p><strong>Algo mais:</strong> {feedback.mais_infos}</p>
          )}
        </div>
      </main>
    </div>
  );
}
