import axios from 'axios';
import { getCredentialsHeaders } from './getCredentials';

class HttpClient {
  async get({ url, options, credentials }) {
    const headersCredentials = getCredentialsHeaders(credentials);

    return axios.get(url, {
      ...options,
      headers: {
        ...options?.headers,
        ...headersCredentials,
      },
    });
  }

  async post({ url, body, options, credentials }) {
    const headersCredentials = getCredentialsHeaders(credentials);

    return axios.post(url, body, {
      ...options,
      headers: {
        ...options?.headers,
        ...headersCredentials,
      },
    });
  }

  async put({ url, body, options, credentials }) {
    const headersCredentials = getCredentialsHeaders(credentials);

    return axios.put(url, body, {
      ...options,
      headers: {
        ...options?.headers,
        ...headersCredentials,
      },
    });
  }

  async delete({ url, options, credentials }) {
    const headersCredentials = getCredentialsHeaders(credentials);

    return axios.delete(url, {
      ...options,
      headers: {
        ...options?.headers,
        ...headersCredentials,
      },
    });
  }
}

export default new HttpClient();
