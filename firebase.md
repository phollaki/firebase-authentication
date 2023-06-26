## Step 1: Set up a Firebase Project

1. Go to the Firebase console (https://console.firebase.google.com/) and create a new project.
2. Enable Firebase Authentication in the project settings.
3. Enable Firestore in the project settings.


## installation
```js
npm install firebase
```

## .env (with NextJS)
```js
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

## config/firebase.ts
```js
import { getAuth } from 'firebase/auth';
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

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

export { app, db, auth, storage };
```

## utils/auth.ts
```js
// Firebase treeshaking imports with v9
import { auth } from '../config/firebase';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, FacebookAuthProvider, signInWithEmailAndPassword, signOut as firebaseSignOut, User, sendPasswordResetEmail } from "firebase/auth";


export type LoginProvider = 'facebook' | 'google'

// Sign up/Register with email & password
export const signUp = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user!;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Sign in with firebase email/password
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user!;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Sign in with Provider (Facebook, Google)
export const signInWithProvider = async (providerType?: LoginProvider ) => {
  let provider;
  switch (providerType) {
    case 'facebook':
      provider = new FacebookAuthProvider();
      break;
    default:
      provider = new GoogleAuthProvider();
      break;
  }
  try{
    const userCredentials = await signInWithPopup(auth, provider)
    return userCredentials;
  } catch(error){
    throw new Error(error.message)
  }
}

// Reset password email
export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
}
```

## stores/authState.ts
```js
import { atom, useRecoilState } from 'recoil';
import { User } from "firebase/auth";
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()


export const userState = atom<User | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});


export const useAuth = () => useRecoilState(userState);
```

Firebase Authentication sessions are long lived. Every time a user signs in, the user credentials are sent to the Firebase Authentication backend and exchanged for a Firebase ID token (a JWT) and refresh token. Firebase ID tokens are short lived and last for an hour; the refresh token can be used to retrieve new ID tokens. Refresh tokens expire only when one of the following occurs:

The user is deleted
The user is disabled
A major account change is detected for the user. This includes events like password or email address updates.