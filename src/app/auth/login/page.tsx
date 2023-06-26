"use client";
import { signIn } from "@/utils/auth";
import React, { FormEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { ReactSVG } from "react-svg";
import ProviderButton from "@/components/ProviderButton";
import { useAtom } from "jotai";
import { userAtom } from "../../../../store";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()
  const [user, setUser] = useAtom(userAtom)


  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    const user = await signIn(email, password);
    // setUser(user)
    if(user) router.push('/')
  };

  return (
    <div className="overflow-hidden">
      <ReactSVG src="/signal.svg"
        beforeInjection={(svg) => {
          svg.classList.add('svg-class-name')
          svg.setAttribute('style', 'width: 280px; height: 280px;')
        }}
      />

      <form className="flex flex-col space-y-5 text-black" onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href="/auth/resetPassword" className="text-blue-400 ml-auto w-max">Forget password?</Link>
        <button className="bg-purple-600 rounded-md p-3 text-white" type="submit">Sign in</button>

        <ProviderButton provider="google"/>

        <ProviderButton provider="apple"/>

        <ProviderButton provider="facebook"/>

        <div>
          <span className="text-gray-500">Don&lsquo;t you have account?
            <Link href="/auth/signup" className="ml-2 text-purple-400">Signup here</Link>
          </span>
        </div>

      </form>
    </div>
  );
};
