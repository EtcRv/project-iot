import api from './api';

const getMe = async (accessToken) => {
  const me = await api({
    method: 'GET',
    url: '/auth/me',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return me;
};

export { getMe };
