import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

// Adiciona o token em todas as requisições
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Se der 401 e ainda não tentamos um refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const res = await axios.post('http://localhost:3000/api/auth/refresh', {
            token: refreshToken,
          });
  
          if (res.status === 200) {
            const newAccessToken = res.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (err) {
          console.error('Erro ao renovar token:', err);
  
          // 🔐 SE O REFRESH FALHAR
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
  
          alert('Sua sessão expirou. Por favor, faça login novamente.');
          window.location.href = '/login';
  
          return Promise.reject(err); // <- GARANTE que não continua a execução
        }
      }
  
      return Promise.reject(error);
    }
  );
  

export default api;
