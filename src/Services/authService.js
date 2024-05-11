import axios from 'axios';

const API_URL = 'http://localhost:8082/api/v1/auth/';

export const authService = {
  signIn: async (email, password) => {
    const response = await axios.post(`${API_URL}signin`, { email, password });
    return response.data;
  },
  // Add other authentication-related methods here
};
