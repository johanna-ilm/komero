import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'komero-bbe8e.firebaseapp.com',
  databaseURL: 'https://komero-bbe8e.firebaseio.com',
  projectId: 'komero-bbe8e',
  storageBucket: 'komero-bbe8e.appspot.com',
  messagingSenderId: '627231312134',
  appId: '1:627231312134:web:7f2a1e3ac3c8599d'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
