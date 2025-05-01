export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };
  
  export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
  };
  
  export const clearTokens = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
  