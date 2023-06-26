importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyD_x0SAh_Ug6A1hpb8rNNDjyEOvwL0aawg",
  authDomain: "fir-authentication-af3f6.firebaseapp.com",
  projectId: "fir-authentication-af3f6",
  storageBucket: "fir-authentication-af3f6.appspot.com",
  messagingSenderId: "828362674645",
  appId: "1:828362674645:web:8c698af1aceb411daaed5c",
  measurementId: "G-2SL8YR8RCJ"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});