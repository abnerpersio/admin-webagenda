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
        'x-wa-verification': 'verified',
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
        'x-wa-verification': 'verified',
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
        'x-wa-verification': 'verified',
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
        'x-wa-verification': 'verified',
      },
    });
  }
}

export default new HttpClient();
