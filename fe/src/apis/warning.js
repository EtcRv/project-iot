import api from './api';

const getWarningByEmbedId = async (id, accessToken) => {
  const warning = await api({
    method: 'GET',
    url: `/warning/${id}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return warning;
};

export { getWarningByEmbedId };
