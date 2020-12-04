import React from 'react';

import ExploreScreen from '../screens/MainDrawer/ExploreScreen';
import ExploreHeaderActions from '../components/android/explore/HeaderActions';

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
      headerRight: () => <ExploreHeaderActions />,
    },
  },
];
