import HomeScreen from '../pages/Home';
import DeviceScreen from '../pages/Device';

const privateRoutes = [
  {
    path: '/',
    component: HomeScreen,
  },
  {
    path: '/device/:id',
    component: DeviceScreen,
  },
];

export default privateRoutes;
