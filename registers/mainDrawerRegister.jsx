import ExploreScreen from '../screens/MainDrawer/ExploreScreen';

export default [
  {
    name: 'explore',
    icon: 'compass-outline',
    component: ExploreScreen,
    options: {
      title: 'Explore',
      headerStyle: {
        elevation: 0,
        borderColor: '#e0e0e0',
        borderBottomWidth: 1,
      },
    },
  },
];
