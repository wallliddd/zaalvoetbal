import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAipowRdXJ-Kr5sbIzhAixvY-Ea071JJJs",
    authDomain: "zaalvoetbal-3c796.firebaseapp.com",
    databaseURL: "https://zaalvoetbal-3c796-default-rtdb.firebaseio.com",
    projectId: "zaalvoetbal-3c796",
    storageBucket: "zaalvoetbal-3c796.appspot.com",
    messagingSenderId: "680231601627",
    appId: "1:680231601627:web:0a4f8eb8af56829c2953fe",
    measurementId: "G-RFPCPHWBJD"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,
    auth,
}

export default  db