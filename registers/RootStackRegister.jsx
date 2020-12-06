import MainBottomTabsNavigation from '../navigations/MainBottomTabsNavigation';
import CameraScreen from '../screens/RootStack/CameraScreen';
import CreateScreen from '../screens/RootStack/CreateScreen';

export default [
  {
    name: 'main-bottom-tabs',
    component: MainBottomTabsNavigation,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'camera',
    component: CameraScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'create',
    component: CreateScreen,
    options: {
      headerTitle: 'Create new post',
    },
  },
];
