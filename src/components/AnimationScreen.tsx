"use client";
import { useEffect, useState } from "react";
import LottieAnimation from "./LottieAnimation";
import { Notifications } from "@mantine/notifications";

export const AnimationScreen = () => (
  <div className="h-screen bg-white flex justify-center items-center">
    <LottieAnimation animationData={'/initial-animation.json'} />
  </div>
)

export const Main = ({ children }: { children: React.ReactNode }) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoaded(true);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if(!loaded){
    return <AnimationScreen />
  }

  return (
  <main className="flex min-h-screen justify-center items-center">
    <Notifications position="top-right" zIndex={2077} />
    {children}
  </main>
);
  }


