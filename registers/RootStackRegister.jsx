import MainBottomTabsNavigation from '../navigations/MainBottomTabsNavigation';
import CameraScreen from '../screens/RootStack/CameraScreen';
import CreateNewPostScreen from '../screens/RootStack/CreateNewPostScreen';

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
    name: 'create-new-post',
    component: CreateNewPostScreen,
    options: {
      headerTitle: 'Create new post',
    },
  },
];
