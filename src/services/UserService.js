import { toast } from 'react-toastify';
import { API_URL } from '../utils/constants';
import HttpClient from './utils/HttpClient';

class UserService {
  async getUserWithToken({ user }) {
    try {
      const response = await HttpClient.get({
        url: `${API_URL}/login`,
        credentials: {
          type: 'token',
          data: user,
        },
      });

      return response.data;
    } catch (error) {
      toast.error(`Ocorreu um erro ao buscar seu usuário: ${error?.response?.data?.message || error.message}`);
      return null;
    }
  }

  async getUserWithLogin({ username, password }) {
    try {
      const response = await HttpClient.get({
        url: `${API_URL}/login`,
        credentials: {
          type: 'login',
          data: { username, password },
        },
      });

      return response.data;
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error('este usuário não existe!');
        return null;
      }

      if (error?.response?.status === 403) {
        toast.error('usuario ou senha incorretos!');
        return null;
      }

      toast.error(`Ocorreu um erro ao buscar seu usuário: ${error?.response?.data?.message || error.message}`);
      return null;
    }
  }

  async updateUser({ user, body }) {
    try {
      const response = await HttpClient.put({
        url: `${API_URL}/users/${user.id}`,
        body,
        credentials: {
          type: 'token',
          data: user,
        },
      });

      return response.data;
    } catch (error) {
      toast.error(`Ocorreu um errado ao atulizar seu usuário: ${error?.response?.data?.message || error.message}`);
      return null;
    }
  }
}

export default new UserService();
