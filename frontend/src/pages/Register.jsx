import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axiosInstance';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      toast.error('Preencha todos os campos.');
      return;
    }

    if (senha.length < 6) {
      toast.error('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/register', { nome, email, senha });

      if (response.status === 201) {
        toast.success('Usuário cadastrado! Faça login.');
        navigate('/login');
      }
    } catch (err) {
      console.error('Erro ao registrar:', err);
      toast.error(err.response?.data?.message || 'Erro ao registrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          🚀 Criar Conta
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label htmlFor="nome" className="block text-gray-700 font-semibold mb-1">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="senha" className="block text-gray-700 font-semibold mb-1">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Criando Conta...' : 'Registrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
