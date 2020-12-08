import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyC0yGREXdI3qpaRshYf_LSirKrMSp1gs10',
  authDomain: 'news-app-6d814.firebaseapp.com',
  projectId: 'news-app-6d814',
  storageBucket: 'news-app-6d814.appspot.com',
  messagingSenderId: '538120566824',
  appId: '1:538120566824:web:6de3de25c5ae251cbf5d1d',
  measurementId: 'G-4CH8SF3GG8',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

export default firebase;
