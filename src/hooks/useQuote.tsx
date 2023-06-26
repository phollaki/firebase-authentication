import { Quote } from '@/app/page';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { useEffect, useState } from 'react'

export const useQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null)

  useEffect(()=>{
    const fetchRandomQuote = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random');
        const quote = response.data.content;
        const author = response.data.author;
        setQuote({quote, author})
      } catch (error) {
        notifications.show({
          title: "Firebase notification",
          message: `${error.message} 🤥`,
          color: "red",
        });
      }
    };
    fetchRandomQuote()
  },[])

  return quote
}
