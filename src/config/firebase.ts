import { getAuth } from 'firebase/auth';
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import localforage from "localforage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { notifications } from '@mantine/notifications';

const firebaseConfig = {
  apiKey: "AIzaSyD_x0SAh_Ug6A1hpb8rNNDjyEOvwL0aawg",
  authDomain: "fir-authentication-af3f6.firebaseapp.com",
  projectId: "fir-authentication-af3f6",
  storageBucket: "fir-authentication-af3f6.appspot.com",
  messagingSenderId: "828362674645",
  appId: "1:828362674645:web:8c698af1aceb411daaed5c",
  measurementId: "G-2SL8YR8RCJ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore(app)

const auth = getAuth(app)

const storage = getStorage(app)


const firebaseCloudMessaging = {
  init (){
    Notification.requestPermission().then((permission)=>{
      if(permission === 'granted'){
        console.log('permission is ', permission)
      }else{
        console.log('permisison is not granted: ', permission)
      }
      });
      const messaging = getMessaging(app)
      getToken(messaging, { vapidKey: 'BO2s3vQFDmTlN5SKWy4D0ywevwW-WrOUIrOuQSKhpHdQ23lFO6MHy7Fuc29bEoG7JtdkPp6G20rVYxnF9Z02K4U'})
        .then((currentToken)=>{
          if(currentToken){
            console.log('currentToken', currentToken)
          }else{
            console.log("Couldn't get current token")
          }
        })
    },
  tokenInlocalforage: async () => {
    const token = await localforage.getItem("fcm_token");
    return token;
  },
  onMessage: async () => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      notifications.show({
        title: payload.notification?.title || 'Hey Friend! You have a ToDo notification!',
        message: `${payload.notification?.body} 🤥`,
        color: "green",
        autoClose: false
      });
    });
  },
};


export { app, db, auth, storage, firebaseCloudMessaging };
