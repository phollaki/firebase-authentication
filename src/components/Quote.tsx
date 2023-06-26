import { Quote as QuoteProps } from '@/app/page'
import React from 'react'

export const Quote = ({author, quote}: QuoteProps) => (
    <div className='h-full flex justify-center items-center'>
      <p className="text-gray-200">{quote}<span className="mt-2 text-purple-600 bg-white block px-2 py-1 rounded-lg w-max ml-auto">{author}</span></p>
    </div>
)
