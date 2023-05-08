import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
apiKey: 'AIzaSyD-21ONjUohndLc_yKySIRu9_v8QrpNtvc',
authDomain: 'authpinkuppers.firebaseapp.com',
projectId: 'authpinkuppers',
storageBucket: 'authpinkuppers.appspot.com',
messagingSenderId: '1032263276423',
appId: '1:1032263276423:web:bc6e4e1e8ff785f2056522'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)