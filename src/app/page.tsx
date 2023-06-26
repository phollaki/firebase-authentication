"use client";
import LogoutButton from "@/components/LogoutButton";
import { Quote } from "@/components/Quote";
import Todos from "@/components/Todos";
import { useCloudMessaging } from "@/hooks/useCloudMessaging";
import useFirebaseAuthentication from "@/hooks/useFirebaseAuthentication";
import { useQuote } from "@/hooks/useQuote";
import { Avatar } from "@mantine/core";
import Link from "next/link";

export interface Quote {
  author?: string;
  quote?: string;
}

const Home = () => {
  const quote = useQuote();
  const firebaseUser = useFirebaseAuthentication();
  useCloudMessaging()

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <div className="flex flex-col bg-purple-600 h-96 p-5 pb-12 text-white">
        <div className="flex items-center justify-between h-32">
          <LogoutButton />
          <Link href="/profile" className="flex items-center space-x-2">
            <p>
              Hi,
              <span className="font-bold"> {firebaseUser?.displayName}</span>
            </p>
            <Avatar
              className="rounded-full"
              src={firebaseUser?.photoURL}
              alt="it's me"
              size={60}
            />
          </Link>
        </div>
        <Quote quote={quote?.quote} author={quote?.author} />
      </div>
      <div className="-mt-5 p-10 rounded-t-3xl bg-white h-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl">
            <span className="text-purple-500 font-bold">Your</span> ToDo`s
          </h2>
          <Link
            href="/todos/add"
            className="border-2 border-purple-500 p-2 rounded-lg active:bg-purple-500"
          >
            Add New
          </Link>
        </div>
        <Todos firebaseUser={firebaseUser} />
      </div>
    </div>
  );
};

export default Home;
