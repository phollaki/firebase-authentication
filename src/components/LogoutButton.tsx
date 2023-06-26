"use client";
import { signOut } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const router = useRouter()

  return (
    <button
      className="text-gray-200 max-h-14"
      onClick={async () => await signOut(router)}
    >
      Logout
    </button>
  );
};

export default LogoutButton;