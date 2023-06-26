import { Todo } from "@/components/Todos";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useTodo = (id: string) => {
  const [todo, setTodo] = useState<Todo | undefined>(undefined)

  useEffect(()=>{
    const getTodo = async() => {
      const docSnapshot = await getDoc(doc(db, 'todos', id as string));
      setTodo({...docSnapshot.data(), id: docSnapshot.id} as Todo)
    }
    getTodo()
  },[id])

  return todo
}