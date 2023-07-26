import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'

const config = {
    apiKey: "AIzaSyAtxy942IG4ka2x6_IVswJGpoB7dLy91eQ",
    authDomain: "real-time-chatting-3fc58.firebaseapp.com",
    databaseURL: "https://real-time-chatting-3fc58-default-rtdb.firebaseio.com",
    projectId: "real-time-chatting-3fc58",
    storageBucket: "real-time-chatting-3fc58.appspot.com",
    messagingSenderId: "953133937580",
    appId: "1:953133937580:web:3f56bd8f587b8d2c528009",
    measurementId: "G-QMLCFJK948"
};


const firebaseApp = initializeApp(config);
const database = getDatabase(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, database, auth };