'use client'
import ChangeableProfilePicture from '@/components/ChangeableProfilePicture'
import { Text } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import { ActionIcon } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import useFirebaseAuthentication from '@/hooks/useFirebaseAuthentication'


const Profile = () => {
  const firebaseUser = useFirebaseAuthentication()

  if(!firebaseUser){
    return null
  }

  const { displayName, email, phoneNumber, providerId, photoURL } = firebaseUser

  return (
    <div className="h-screen w-full">
      <div className="flex flex-col items-center bg-purple-600 h-64 p-5 text-white">
        <Link href="/" className='top-5 left-5 absolute z-50'>
          <ActionIcon className='border-2 border-white rounded-full'>
            <IconArrowLeft size="2rem" color='white'/>
          </ActionIcon>
        </Link>
        <Text className='text-xl font-bold'>{displayName}</Text>
        <ChangeableProfilePicture />
      </div>
      <div className="bg-white rounded-t-3xl -mt-10 relative">
        <div className='px-10 pt-10 space-y-5'>
          <label className='flex flex-col'>
            <span className=''>Email</span>
            <input
              type='text'
              readOnly
              value={email || '-'}
              className='bg-purple-100 text-gray-700 w-max px-3 py-2 rounded-lg shadow-md'
            />
          </label>
          <label className='flex flex-col'>
            Phone:
            <input
              type='text'
              readOnly
              value={phoneNumber || '-'}
              className='bg-purple-100 text-gray-700 w-max px-3 py-2 rounded-lg shadow-md'
            />
          </label>
          <label className='flex flex-col'>
            ProviderId:
            <input
              type='text'
              readOnly
              value={providerId || '-'}
              className='bg-purple-100 text-gray-700 w-max px-3 py-2 rounded-lg shadow-md'
            />
          </label>
          <label className='flex flex-col'>
            Photo URL:
            <p className='max-w-72 break-words bg-purple-100 text-gray-700 h-full px-3 py-2 rounded-lg shadow-md'>{JSON.stringify(photoURL)}</p>

          </label>
        </div>
      </div>
    </div>
  )
}

export default Profile