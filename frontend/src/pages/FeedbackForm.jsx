import { useState } from 'react';
import api from '../services/axiosInstance'; // ✅ usa instância correta

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    conteudo_avaliacao: '',
    criticas: '',
    baixou_curriculo: '',
    tema_interesse: '',
    outro_tema: '',
    nota: 5,
    depoimento: '',
    mais_infos: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    const payload = {
      ...formData,
      tema_interesse:
        formData.tema_interesse === 'Outros'
          ? `Outros: ${formData.outro_tema}`
          : formData.tema_interesse,
    };

    try {
      await api.post('/feedbacks', payload); // ✅ usa baseURL dinâmica
      setSuccess('Feedback enviado com sucesso!');
      setFormData({
        nome: '',
        email: '',
        conteudo_avaliacao: '',
        criticas: '',
        baixou_curriculo: '',
        tema_interesse: '',
        outro_tema: '',
        nota: 5,
        depoimento: '',
        mais_infos: '',
      });
    } catch (err) {
      console.error(err);
      setError('Erro ao enviar feedback. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const isOutroTema = formData.tema_interesse === 'Outros';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <div className="mb-6 flex justify-center">
          <img src="/banner-feedback.png" alt="Banner Feedback" className="w-full max-w-[1584px] h-auto rounded-lg" />
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            📝 Queremos melhorar cada vez mais a newsletter First Commit!
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Conta pra gente o que você achou da edição sobre currículo e entrevistas tech 👇
          </p>
        </div>

        {success && <div className="bg-green-100 text-green-700 text-center py-2 rounded mb-4">{success}</div>}
        {error && <div className="bg-red-100 text-red-700 text-center py-2 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="nome" className="block text-gray-700 font-semibold mb-1">
                Nome (Opcional)
              </label>
              <input id="nome" type="text" name="nome" className="input-style" value={formData.nome} onChange={handleChange} />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                E-mail *
              </label>
              <input id="email" type="email" name="email" required className="input-style" value={formData.email} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label htmlFor="conteudo_avaliacao" className="block text-gray-700 font-semibold mb-1">
              O que achou do conteúdo da edição?
            </label>
            <textarea id="conteudo_avaliacao" name="conteudo_avaliacao" required className="input-style" value={formData.conteudo_avaliacao} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="criticas" className="block text-gray-700 font-semibold mb-1">
              Teve algo que não gostou ou acha que poderia ser melhor?
            </label>
            <textarea id="criticas" name="criticas" required className="input-style" value={formData.criticas} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Baixou o nosso modelo de currículo?
            </label>
            <div className="flex flex-col gap-2 mt-2">
              {['Sim', 'Ainda não, mas vou baixar', 'Não tenho interesse'].map(opcao => (
                <label key={opcao} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="baixou_curriculo"
                    value={opcao}
                    className="form-radio text-blue-600"
                    checked={formData.baixou_curriculo === opcao}
                    onChange={handleChange}
                    required
                  />
                  <span className="ml-2 text-gray-700">{opcao}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="tema_interesse" className="block text-gray-700 font-semibold mb-1">
              Qual tema você gostaria de ver nas próximas edições?
            </label>
            <select id="tema_interesse" name="tema_interesse" required className="input-style" value={formData.tema_interesse} onChange={handleChange}>
              <option value="">Selecione um tema</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Mobile">Mobile</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Projetos pessoais">Projetos pessoais</option>
              <option value="Ferramentas">Ferramentas</option>
              <option value="Outros">Outros (especifique)</option>
            </select>

            {isOutroTema && (
              <div className="mt-4">
                <label htmlFor="outro_tema" className="block text-gray-700 font-semibold mb-1">Especifique o tema:</label>
                <input id="outro_tema" type="text" name="outro_tema" required className="input-style" value={formData.outro_tema} onChange={handleChange} />
              </div>
            )}
          </div>

          <div>
            <label htmlFor="nota" className="block text-gray-700 font-semibold mb-1">
              Você indicaria a newsletter para outros devs iniciantes?
            </label>
            <input id="nota" type="range" name="nota" min="1" max="5" required className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" value={formData.nota} onChange={handleChange} />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
            </div>
          </div>

          <div>
            <label htmlFor="depoimento" className="block text-gray-700 font-semibold mb-1">
              Quer deixar um depoimento para usarmos nas redes? (opcional)
            </label>
            <textarea id="depoimento" name="depoimento" className="input-style" value={formData.depoimento} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="mais_infos" className="block text-gray-700 font-semibold mb-1">
              Algo mais que você queira contar?
            </label>
            <textarea id="mais_infos" name="mais_infos" className="input-style" value={formData.mais_infos} onChange={handleChange} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-black hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50">
            {loading ? 'Enviando...' : 'Enviar Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}
