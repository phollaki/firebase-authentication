"use client";
import { db } from '@/config/firebase';
import useFirebaseAuthentication from '@/hooks/useFirebaseAuthentication';
import { ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft } from '@tabler/icons-react';
import { addDoc, collection } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { ReactSVG } from 'react-svg';

const Page = () => {
  const firebaseUser = useFirebaseAuthentication()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Access the form elements using event.target
    const form = e.target as HTMLFormElement;

    const title = (form.elements[0] as HTMLInputElement).value
    const description = (form.elements[1] as HTMLInputElement).value;
    const deadline = (form.elements[2] as HTMLInputElement).value;

    try{
      const docRef = await addDoc(collection(db, 'todos'), {
        userId: firebaseUser?.uid,
        title,
        description,
        deadline,
        completed: false,
      });

      notifications.show({
        title: "Firebase notification",
        message: `Todo ${docRef.id} is successfully added! 😜`,
        color: "green",
      });

      router.push('/')
    } catch(error) {
      notifications.show({
        title: "Firebase notification",
        message: `${error.message} 🤥`,
        color: "red",
      });
    }
  }

  return (
    <div className='relative h-screen w-screen p-10'>
      <Link href="/" className='top-5 left-5 absolute z-50'>
          <ActionIcon className='border-2 border-white rounded-full'>
            <IconArrowLeft size="2rem" color='purple'/>
          </ActionIcon>
        </Link>
      <ReactSVG src="/add.svg"
        beforeInjection={(svg) => {
          svg.classList.add('svg-class-name')
          svg.setAttribute('style', 'width: 280px; height: 280px;')
        }}
      />
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="flex flex-col">
          Title:
          <input className="input"/>
        </label>
        <label className="flex flex-col">
          Description:
          <textarea className="input"/>
        </label>
        <label className="flex flex-col">
          Deadline:
          <input className="input" type="date"/>
        </label>
        <button className="w-full bg-purple-500 p-2 rounded-lg text-white">Add ToDo</button>
      </form>
    </div>
  )
}

export default Page