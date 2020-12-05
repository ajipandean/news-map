import ExploreScreen from '../screens/MainBottomTabs/ExploreScreen';
import FeedScreen from '../screens/MainBottomTabs/FeedScreen';
import SavedScreen from '../screens/MainBottomTabs/SavedScreen';
import AccountScreen from '../screens/MainBottomTabs/AccountScreen';

export default [
  {
    name: 'explore',
    icon: 'map-marker-outline',
    component: ExploreScreen,
    options: {
      title: 'Explore',
    },
  },
  {
    name: 'feed',
    icon: 'file-document-box-outline',
    component: FeedScreen,
    options: {
      title: 'Feed',
    },
  },
  {
    name: 'saved',
    icon: 'bookmark-outline',
    component: SavedScreen,
    options: {
      title: 'Saved',
    },
  },
  {
    name: 'account',
    icon: 'account-circle-outline',
    component: AccountScreen,
    options: {
      title: 'Account',
    },
  },
];
