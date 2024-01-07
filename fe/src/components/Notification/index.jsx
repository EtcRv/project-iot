import { notification } from 'antd';

const SuccessNotification = (type, message) => {
  const args = {
    message: type,
    description: message,
    style: {
      width: 300,
      border: 20,
      backgroundColor: '#52c41a',
      color: '#fff',
    },
  };
  notification.open(args);
};

const ErrorNotification = (type, message) => {
  const args = {
    message: type,
    description: message,
    style: {
      width: 300,
      border: 20,
      backgroundColor: '#f5222d',
      color: '#fff',
    },
  };
  notification.open(args);
};

export { SuccessNotification, ErrorNotification };
