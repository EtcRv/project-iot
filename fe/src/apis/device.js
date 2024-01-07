import api from './api';

const getDeviceDetail = async (deviceId, accessToken) => {
  const deviceDetail = await api({
    method: 'GET',
    url: `/device/${deviceId}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return deviceDetail;
};

const testDevice = async (testType, accessToken) => {
  const testDevice = await api({
    method: 'POST',
    url: `/device/test-device`,
    headers: { Authorization: `Bearer ${accessToken}` },
    data: {
      testType,
    },
  });
  return testDevice;
};

export { getDeviceDetail, testDevice };
