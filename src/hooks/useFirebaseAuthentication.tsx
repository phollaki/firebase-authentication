import { useState, useEffect } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';


export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<User | null>(null);

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setAuthUser(null)
      return;
    }
    setAuthUser(authState);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>authStateChanged(user));
  }, []);

  return authUser
}