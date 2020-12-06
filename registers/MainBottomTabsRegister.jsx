import ExploreScreen from '../screens/MainBottomTabs/ExploreScreen';
import FeedScreen from '../screens/MainBottomTabs/FeedScreen';
import SavedScreen from '../screens/MainBottomTabs/SavedScreen';
import AccountScreen from '../screens/MainBottomTabs/AccountScreen';

export default [
  {
    name: 'explore',
    icon: {
      active: 'map-marker',
      inactive: 'map-marker-outline',
    },
    component: ExploreScreen,
    options: {
      title: 'Explore',
    },
  },
  {
    name: 'feed',
    icon: {
      active: 'file-document-box',
      inactive: 'file-document-box-outline',
    },
    component: FeedScreen,
    options: {
      title: 'Feed',
    },
  },
  {
    name: 'saved',
    icon: {
      active: 'bookmark',
      inactive: 'bookmark-outline',
    },
    component: SavedScreen,
    options: {
      title: 'Saved',
    },
  },
  {
    name: 'account',
    icon: {
      active: 'account-circle',
      inactive: 'account-circle-outline',
    },
    component: AccountScreen,
    options: {
      title: 'Account',
    },
  },
];
