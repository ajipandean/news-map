import MainBottomTabsNavigation from '../navigations/MainBottomTabsNavigation';
import CameraScreen from '../screens/RootStack/CameraScreen';

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
];
