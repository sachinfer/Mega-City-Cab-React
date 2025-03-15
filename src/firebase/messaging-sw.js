importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyCW4fI2i9n4dp4bCuhUVkxnPwki0fGLTyM",
  authDomain: "mega-city-cab-a0bf1.firebaseapp.com",
  projectId: "mega-city-cab-a0bf1",
  storageBucket: "mega-city-cab-a0bf1.appspot.com",
  messagingSenderId: "510879218276",
  appId: "1:510879218276:web:c45679951fff34de12bd71",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});