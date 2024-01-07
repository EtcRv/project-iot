import LoginScreen from '../pages/Login';
import RegisterScreen from '../pages/Register';

const publicRoutes = [
  {
    path: '/login',
    component: LoginScreen,
  },
  {
    path: '/register',
    component: RegisterScreen,
  },
];

export default publicRoutes;
