import api from './api';

const login = async (email, password) => {
  const loginInfo = await api({
    method: 'POST',
    url: '/auth/sign-in',
    data: { email, password },
  });
  return loginInfo;
};

const register = async ({ email, password, username }) => {
  const registerInfo = await api({
    method: 'POST',
    url: '/auth/sign-up',
    data: { email, password, username },
  });
  return registerInfo;
};

export { login, register };
