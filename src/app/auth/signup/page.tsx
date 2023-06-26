"use client"; // This is a client component 👈🏽
import { signUp } from "@/utils/auth";
import React, { FormEvent, useState } from "react";
import { ReactSVG } from "react-svg";
import Link from "next/link";
import { notifications } from "@mantine/notifications";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    const user = await signUp(email, password);
    if(user){
      notifications.show({
        title: "Firebase notification",
        message: `Successfull registration 🤥`,
        color: "green",
      });
    }
  };


  return (
    <div className="p-10">
      <ReactSVG src="/register.svg"
        beforeInjection={(svg) => {
          svg.classList.add('svg-class-name')
          svg.setAttribute('style', 'width: 280px; height: 280px;')
        }}
      />
      <h1 className="text-gray-700 text-3xl font-bold my-2">Lets signup!</h1>
      <h2 className="text-gray-500 my-2">Be part of a community with full of positive energy.</h2>
      <form className="flex flex-col space-y-5 text-black" onSubmit={handleSignup}>
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
        <div>
          <span className="text-gray-500">Already have an account?
            <Link href="/auth/login" className="ml-2 text-purple-400">Sign in here</Link>
          </span>
        </div>
        <button className="bg-purple-600 rounded-md p-3 text-white" type="submit">Sign Up</button>
        <Link href="/auth/login" className="bg-gray-200 text-center rounded-md p-3 text-gray-800 hover:scale-110" type="submit">Go back</Link>
      </form>
    </div>
  );
};
