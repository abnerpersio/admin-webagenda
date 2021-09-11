const getCredentialsHeadersWithToken = (user) => ({
  Authorization: `Bearer ${user.token}`,
  'x-wa-username': user.username,
});

const getCredentialsHeadersWithLogin = ({ username, password }) => ({
  'x-wa-username': username,
  'x-wa-password': password,
});

export const getCredentialsHeaders = (credentials) => {
  let headersCredentials;

  if (credentials?.type === 'login') {
    headersCredentials = getCredentialsHeadersWithLogin({ ...credentials?.data });
  } else if (credentials?.type === 'token') {
    headersCredentials = getCredentialsHeadersWithToken({ ...credentials?.data });
  }

  return headersCredentials;
};
