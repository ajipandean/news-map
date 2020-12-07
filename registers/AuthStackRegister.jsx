import LoginScreen from '../screens/AuthStack/LoginScreen';
import RegisterScreen from '../screens/AuthStack/RegisterScreen';
import AddInfoScreen from '../screens/AuthStack/AddInfoScreen';

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
  {
    name: 'add-info',
    component: AddInfoScreen,
    options: { headerShown: false },
  },
];
