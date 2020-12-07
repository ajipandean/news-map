import LoginScreen from '../screens/AuthStack/LoginScreen';
import RegisterScreen from '../screens/AuthStack/RegisterScreen';

export default [
  {
    name: 'login',
    component: LoginScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'register',
    component: RegisterScreen,
    options: {
      headerShown: false,
    },
  },
];
