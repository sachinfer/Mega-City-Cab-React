import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW4fI2i9n4dp4bCuhUVkxnPwki0fGLTyM",
  authDomain: "mega-city-cab-a0bf1.firebaseapp.com",
  projectId: "mega-city-cab-a0bf1",
  storageBucket: "mega-city-cab-a0bf1.appspot.com",
  messagingSenderId: "510879218276",
  appId: "1:510879218276:web:c45679951fff34de12bd71",
  measurementId: "G-SJGHE68JQN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Authentication and Google Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Firebase Cloud Messaging (FCM)
const messaging = getMessaging(app);

// Request FCM token (needed for sending push notifications)
export const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "BM8x7X7F0y0AHbAhEvZPyHv_IHeVX1emRoC4PeP1wRmlX61AMgvwIOz91IUQ8hz9m5fPwa2oZmU92xVlCbmehU8",
    });

    if (currentToken) {
      console.log("FCM Token:", currentToken);
      return currentToken; // Send this token to your backend to store
    } else {
      console.warn("No FCM token received. Request permission.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching FCM token:", error);
    return null;
  }
};

// Listen for foreground push notifications
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("Foreground Notification Received:", payload);
      resolve(payload);
    });
  });

export { auth, googleProvider };
