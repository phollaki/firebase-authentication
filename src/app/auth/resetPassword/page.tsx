"use client"; // This is a client component 👈🏽
import { resetPassword } from "@/utils/auth";
import { Notifications } from "@mantine/notifications";
import Link from "next/link";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";

export default function SignIn() {
  const [email, setEmail] = useState('');

  return (
    <div className="p-10">
     <ReactSVG src="/forgot.svg"
        beforeInjection={(svg) => {
          svg.classList.add('svg-class-name')
          svg.setAttribute('style', 'width: 280px; height: 280px;')
        }}
      />
      <h1 className="text-gray-700 text-3xl font-bold my-2">Forgot your password? </h1>
      <h2 className="text-gray-500">Please enter your email so we can send you a reset possibility.</h2>
      <form className="flex flex-col space-y-5 text-black" onSubmit={() => resetPassword(email)}>
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-purple-500 rounded-md p-3 text-white hover:scale-110" type="submit">Reset password</button>
        <Link href="/auth/login" className="bg-gray-200 text-center rounded-md p-3 text-gray-800 hover:scale-110">Go back</Link>
      </form>
    </div>
  );
};
