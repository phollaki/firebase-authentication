import { firebaseCloudMessaging } from "@/config/firebase";
import { useCallback, useEffect, useState } from "react";

export const useCloudMessaging = () => {
  const [mounted, setMounted] = useState(false);

  if (mounted) {
    firebaseCloudMessaging.onMessage();
  }

  const getFirebaseToken = useCallback(async () => {
    await firebaseCloudMessaging.init();
    const setToken = async () => {
      const token = await firebaseCloudMessaging.tokenInlocalforage();

      if (token) {
        setMounted(true);
      }
    };

    const token = await setToken();
    console.log(token)
  }, []);

  useEffect(() => {
    getFirebaseToken();
    return ()=>{getFirebaseToken()}
  }, [getFirebaseToken]);
};