const COLOR = {
  white: '#ffffff',
  background: '#f8f8f8',
  divider: '#e9ecef',
  lightDivider: '#b9b9c3',
  text: '#242424',
  subText: '#6e6b7b',
  lightText: '#787878',
  blue: '#0061AF',
  labelBlue: '#117EEF',
  danger: '#ea5455',
  purple: '#8b78cd',
  lightGreen: '#4eb081',
  lightBlue: '#2279c9',
  orange: '#ff9f43',
  red: '#fe0303',
  darkRed: '#7a211b',
  darkBlue: '#1e164e',
  skyBlue: '#bfd9ff',
  paleBlue: '#e6f7ff',
  alert: '#ff9500',

  primary: '#ffd60a',
  success: '#52C41A',
  error: '#fe0303',
  warning: '#faad14',
  info: '#1890FF',
  dark: '#4b4b4b',
  light: '#babfc7',
  gray: '#E9E9E9',
  charcoal: '#f4f5f7',

  boldSuccess: '#00A442',
  button: 'rgba(0, 0, 0, 0.54)',
  disableButton: 'rgba(0, 0, 0, 0.26)',
  primary40: 'rgba(255, 214, 10, 0.40)',

  secondary: {
    old: '#4b4b4b',
    80: 'rgba(30, 22, 78, 0.08)',
    60: 'rgba(30, 22, 78, 0.06)',
    40: 'rgba(30, 22, 78, 0.04)',
    8: 'rgba(30, 22, 78, 0.8)',
    24: 'rgba(30, 22, 78, 0.24)',
    32: 'rgba(30, 22, 78, 0.32)',
  },

  black: {
    default: '#000000',
    8: 'rgba(0, 0, 0, 0.08)',
    16: 'rgba(0, 0, 0, 0.16)',
    32: 'rgba(0, 0, 0, 0.32)',
    48: 'rgba(0, 0, 0, 0.48)',
    64: 'rgba(0, 0, 0, 0.64)',
    80: 'rgba(0, 0, 0, 0.8)',
  },

  indigo: {
    default: '#5e5ce6',
    4: 'rgba(30, 22, 78, 0.04)',
    8: 'rgba(30, 22, 78, 0.08)',
    32: 'rgba(30, 22, 78, 0.32)',
    64: 'rgba(30, 22, 78, 0.64)',
    100: 'rgba(30, 22, 78, 1)',
  },

  label: {
    80: 'rgba(60, 60, 67, 0.80)',
    8: 'rgba(60, 60, 67, 0.08)',
  },

  functionalRed: {
    default: '#ff3b30',
    32: 'rgba(255, 59, 48, 0.32)',
  },

  functionYellow: {
    default: '#FFCC00',
    64: 'rgba(255, 204, 0, 0.64)',
  },

  yellow: {
    default: '#FFD60A',
    64: 'rgba(255, 214, 10, 0.64)',
    16: 'rgba(255, 214, 10, 0.16)',
  },

  darkV2: {
    default: '#3C3C43',
    32: 'rgba(60, 60, 67, 0.32)',
    80: 'rgba(60, 60, 67, 0.80)',
  },

  grayV2: {
    100: 'rgba(237, 237, 241)',
  },
};

const TRANSPARENT_COLOR = {
  primary: 'rgba(255, 214, 10, 0.20)',
  secondary: 'rgba(108, 117, 125, 0.05)',
  success: 'rgba(40, 199, 111, 0.12)',
  error: 'rgba(234, 84, 85, 0.12)',
  warning: 'rgba(255, 225, 67, 0.12)',
  info: 'rgba(0, 207, 232, 0.12)',
  dark: 'rgba(30, 30, 30, 0.05)',
  light: 'rgba(186, 191, 199, 0.12)',
  lightOrange: 'rgba(252, 102, 52, 0.25)',
  red: 'rgb(254, 3, 3, 0.12)',
  darkBlue: 'rgba(30, 22, 78, 0.32)',
};

const GRADIENT_COLOR = {
  primary: 'linear-gradient(45deg, #fc6634 0%, #fe506a 100%)',
  secondary: 'linear-gradient(45deg, #82868b 0%, #9ca0a4 100%)',
  success:
    'linear-gradient(45.79deg, #28c76f 0%, #48da89 94.75%, #48da89 94.75%)',
  error: 'linear-gradient(43.96deg, #ea5455 2.91%, #f08182 94.71%)',
  warning: 'linear-gradient(41.83deg, #ffe143 2.18%, #ffbc0e 97.5%)',
  info: 'linear-gradient(45deg, #00cfe8 0%, #1ce7ff 100%)',
  dark: 'linear-gradient(48.35deg, #4b4b4b 0%, #787878 94.43%)',
  orange: 'linear-gradient(to right, #ffca44 9.97%, #ff9920 97.59%)',
  darkBlue: 'linear-gradient(to right, #1e164e 9.97%, #1e164e 97.59%)',
  orangeRed: 'linear-gradient(212.33deg, #fc6634 -2.88%, #fc9434 103.36%)',
};

const LINEAR_COLOR = {
  info: {
    text: 'rgba(0, 122, 255, 1)',
    background: 'rgba(50, 173, 230, 0.08)',
    linear: 'rgba(0, 122, 255, 0.16)',
  },
};

const CONTAINED_BUTTON_COLOR = {
  primary: {
    hover: '#FFE66C',
    active: '#ffe86d',
    focus: '#ffe86d',
  },
  secondary: {
    hover: '#4a4a4a',
    active: '#242424',
    focus: '#75797e',
  },
  success: {
    hover: '#28c76f',
    active: '#24b263',
    focus: '#24b263',
  },
  error: {
    hover: '#ea5455',
    active: '#e73d3e',
    focus: '#e73d3e',
  },
  warning: {
    hover: '#ffe86d',
    active: '#ffe143',
    focus: '#ffd600',
  },
  info: {
    hover: '#00cfe8',
    active: '#00b8cf',
    focus: '#00b8cf',
  },
  dark: {
    hover: '#4b4b4b',
    active: '#343434',
    focus: '#343434',
  },
};

const OUTLINED_BUTTON_COLOR = {
  primary: {
    hover: 'rgba(30, 22, 78, 0.1)',
    active: 'rgba(30, 22, 78, 0.1)',
    focus: 'rgba(30, 22, 78, 0.1)',
  },
  secondary: {
    hover: 'rgba(108, 117, 125, 0.04)',
    active: 'rgba(108, 117, 125, 0.1)',
    focus: 'rgba(108, 117, 125, 0.2)',
  },
  success: {
    hover: 'rgba(40, 199, 111, 0.04)',
    active: 'rgba(40, 199, 111, 0.2)',
    focus: 'rgba(40, 199, 111, 0.2)',
  },
  error: {
    hover: 'rgba(234, 84, 85, 0.04)',
    active: 'rgba(234, 84, 85, 0.2)',
    focus: 'rgba(234, 84, 85, 0.2)',
  },
  warning: {
    hover: 'rgba(255, 225, 67, 0.04)',
    active: 'rgba(255, 225, 67, 0.2)',
    focus: 'rgba(255, 225, 67, 0.2)',
  },
  info: {
    hover: 'rgba(0, 207, 232, 0.04)',
    active: 'rgba(0, 207, 232, 0.2)',
    focus: 'rgba(0, 207, 232, 0.2)',
  },
  dark: {
    hover: 'rgba(30, 30, 30, 0.04)',
    active: 'rgba(30, 30, 30, 0.2)',
    focus: 'rgba(30, 30, 30, 0.2)',
  },
};

const TEXT_BUTTON_COLOR = {
  primary: {
    hover: 'rgba(30, 22, 78, 0.1)',
    active: 'rgba(30, 22, 78, 0.1)',
    focus: 'rgba(30, 22, 78, 0.1)',
  },
  secondary: {
    hover: 'rgba(108, 117, 125, 0.12)',
    active: 'rgba(108, 117, 125, 0.2)',
    focus: 'rgba(108, 117, 125, 0.2)',
  },
  success: {
    hover: 'rgba(40, 199, 111, 0.12)',
    active: 'rgba(40, 199, 111, 0.2)',
    focus: 'rgba(40, 199, 111, 0.2)',
  },
  error: {
    hover: 'rgba(234, 84, 85, 0.12)',
    active: 'rgba(234, 84, 85, 0.2)',
    focus: 'rgba(234, 84, 85, 0.2)',
  },
  warning: {
    hover: 'rgba(255, 225, 67, 0.12)',
    active: 'rgba(255, 225, 67, 0.2)',
    focus: 'rgba(255, 225, 67, 0.2)',
  },
  info: {
    hover: 'rgba(0, 207, 232, 0.12)',
    active: 'rgba(0, 207, 232, 0.2)',
    focus: 'rgba(0, 207, 232, 0.2)',
  },
  dark: {
    hover: 'rgba(75, 75, 75, 0.12)',
    active: 'rgba(75, 75, 75, 0.2)',
    focus: 'rgba(75, 75, 75, 0.2)',
  },
};

const GRADIENT_BUTTON_COLOR = {
  primary: {
    hover: 'linear-gradient(46.62deg,#ff4000 0%, #ff2647; 93.64%)',
    active: 'linear-gradient(45deg, #fc6634 0%, #fe506a 100%)',
    focus: 'linear-gradient(45deg, #ff3d06 0%, #ff0026 100%)',
  },
  secondary: {
    hover: 'linear-gradient(45deg, #82868b 0%, #9ca0a4 100%)',
    active: 'linear-gradient(47.52deg, #696d71 0%, #82868b 95.97%)',
    focus: 'linear-gradient(47.52deg, #696d71 0%, #82868b 95.97%)',
  },
  success: {
    hover:
      'linear-gradient(46.82deg, #28c76f 0%, #48da89 93.46%, #48da89 93.46%)',
    active: 'linear-gradient(45deg, #1f9d57 0%, #28c76f 100%)',
    focus: 'linear-gradient(45deg, #1f9d57 0%, #28c76f 100%)',
  },
  error: {
    hover: 'linear-gradient(49.38deg, #ea5455 0.32%, #f08182 93.45%)',
    active: 'linear-gradient(45deg, #e42728 0.32%, #ea5455 100%)',
    focus: 'linear-gradient(45deg, #e42728 0.32%, #ea5455 100%)',
  },
  warning: {
    hover: 'linear-gradient(48.12deg, #ffe143 1.18%, #ffbc0e 95.16%)',
    active: 'linear-gradient(45deg, #ffe143 0.32%, #ffbc0e 100%)',
    focus: 'linear-gradient(45deg, #ffe143 0.32%, #ffbc0e 100%)',
  },
  info: {
    hover: 'linear-gradient(47.47deg, #00cfe8 1.18%, #03e4ff 96.09%)',
    active: 'linear-gradient(45deg, #00b8cf 0.32%, #00cfe8 100%)',
    focus: 'linear-gradient(45deg, #00b8cf 0.32%, #00cfe8 100%)',
  },
  dark: {
    hover: 'linear-gradient(48.13deg, #4b4b4b 1.18%, #787878 94.3%)',
    active: 'linear-gradient(44.76deg, #1e1e1e 1.18%, #4b4b4b 164.14%)',
    focus: 'linear-gradient(44.76deg, #1e1e1e 1.18%, #4b4b4b 164.14%)',
  },
};

export {
  COLOR,
  TRANSPARENT_COLOR,
  GRADIENT_COLOR,
  CONTAINED_BUTTON_COLOR,
  OUTLINED_BUTTON_COLOR,
  TEXT_BUTTON_COLOR,
  GRADIENT_BUTTON_COLOR,
  LINEAR_COLOR,
};
