"use client";
import React from 'react'
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import useFirebaseAuthentication from '../hooks/useFirebaseAuthentication';


export const AuthButtons: React.FC = () => {
  const firebaseUser = useFirebaseAuthentication()

  if(!firebaseUser){
    return (
      <>
        <Link href="/auth/signup">
          Sign Up
        </Link>
        <Link href="/auth/login">
          Sign in
        </Link>
      </>
    )
  }

  return (
    <>
      <Link href="/todos">Todos</Link>
      <LogoutButton />
    </>
  )
}
