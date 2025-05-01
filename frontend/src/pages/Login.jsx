import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/axiosInstance';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.error('Preencha todos os campos.');
      return;
    }

    setLoading(true);
    console.log('📤 Enviando login para API...');

    try {
      const response = await api.post('/auth/login', {
        email: email.trim(),
        senha: senha.trim(),
      });

      const { user, accessToken, refreshToken } = response.data;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const primeiroNome = user?.nome?.split?.(' ')[0] || 'dev';
      toast.success(`Bem-vindo(a), ${primeiroNome}! 🚀`);
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Erro ao fazer login:', err);

      if (err.response?.status === 401) {
        toast.error('Email ou senha incorretos. Tente novamente.');
      } else {
        toast.error('Erro ao conectar com o servidor. Tente novamente mais tarde.');
      }
    } finally {
      console.log('✅ Finalizou requisição de login');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          🔐 Acesso ao First Commit Feedback
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              📧 Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Senha */}
          <div className="relative">
            <label htmlFor="senha" className="block text-gray-700 font-semibold mb-2">
              🔒 Senha
            </label>
            <input
              id="senha"
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full p-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Link Esqueceu Senha */}
          <div className="flex justify-end">
            <a
              className="text-blue-600 hover:underline text-sm cursor-pointer"
              onClick={() => toast('Função ainda não disponível. 🚧')}
            >
              Esqueceu a senha?
            </a>
          </div>

          {/* Botão Entrar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
