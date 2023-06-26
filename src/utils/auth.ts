
import { notifications } from '@mantine/notifications';
import { auth } from '../config/firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  OAuthProvider
} from "firebase/auth";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';


export type LoginProvider = 'facebook' | 'google' | 'apple'

export const signUp = async (email: string, password: string) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    notifications.show({
      title: "Firebase notification",
      message: `${error.message} 🤥`,
      color: "red",
    });
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user
  } catch (error) {
    notifications.show({
      title: "Firebase notification",
      message: `${error.message} 🤥`,
      color: "red",
    });
  }
};

export const signOut = async (router: AppRouterInstance): Promise<void> => {
  try {
    await firebaseSignOut(auth);
    router.push('/auth/login')
  } catch (error) {
    notifications.show({
      title: "Firebase notification",
      message: `${error.message} 🤥`,
      color: "red",
    });
  }
};

export const signInWithProvider = async (providerType?: LoginProvider ) => {
  let provider;
  switch (providerType) {
    case 'apple':
      provider = new OAuthProvider('apple');
      break;
    case 'facebook':
      provider = new FacebookAuthProvider();
      break;
    default:
      provider = new GoogleAuthProvider();
      break;
  }
  try{
    await signInWithPopup(auth, provider)
  } catch(error){
    notifications.show({
      title: "Firebase notification",
      message: `${error.message} 🤥`,
      color: "red",
    });
  }
}

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
}

