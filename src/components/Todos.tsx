import {  db } from "@/config/firebase";
import { ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBellFilled } from "@tabler/icons-react";
import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface Todo {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
}

export const isWithinThreeDays = (dateString: string) => {
  const date = new Date(dateString);
  const currentDate = new Date();
  const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

  return Math.abs(date.getTime() - currentDate.getTime()) <= threeDaysInMilliseconds;
};

export const TodoItem = ({ id, completed, title, description, deadline }: Todo) => {
  return (
    <Link href={{
      pathname: `/todos/todo/`,
      query: { id }
    }}
    >
      <div className={`${completed ? 'bg-gray-100': 'bg-purple-100'} p-3 rounded-lg space-y-2 shadow-md h-32 relative`}>
        <h2 className={`font-bold ${completed ? 'text-gray-600' : 'text-purple-500'} text-sm`}>{title}</h2>
        <p className="text-xs line-clamp-2">{description}</p>
        <p className="text-gray-700 text-xs">
          {new Date(deadline).toLocaleDateString()}
        </p>
        {isWithinThreeDays(String(deadline)) && !completed &&
          <ActionIcon className='absolute bottom-3 right-3 text-red-700'>
            <IconBellFilled size="1.5rem"/>
          </ActionIcon>
        }
      </div>
    </Link>
  );
};

const Todos = ({firebaseUser}: {firebaseUser:User | null}) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);

  const sortByDate = (todos: Todo[]) => [...todos].sort((a:Todo, b:Todo) =>  new Date(b.deadline).valueOf() - new Date(a.deadline).valueOf())

  const notifyNotCompletedTodos = (todos: Todo[]) => {
    const notifiableTodos = todos.filter((todo:Todo)=> isWithinThreeDays(String(todo.deadline)) && !todo.completed)
    if(notifiableTodos.length > 0){
      notifications.show({
        title: "Firebase notification",
        message: `You have ${notifiableTodos.length} todos with close deadline! Let's complete these ToDos! 😬`,
        color: "orange",
        autoClose: false
      });
    }
  }

  useEffect(() => {
    const getTodoList = async () => {
      if (firebaseUser) {
        const todosRef = collection(db, 'todos');
        const queryRef = query(todosRef, where('userId', '==', firebaseUser.uid));
        const docs = (await getDocs(queryRef)).docs;
        const todoList = docs.map((doc) => ({...doc.data(), id: doc.id }) as Todo);
        setTodos(sortByDate(todoList));
        notifyNotCompletedTodos(todoList)
      }
    };
    getTodoList();

  }, [firebaseUser]);


  return (
    <div className="mt-5 bg-white max-h-full">
      {todos &&todos.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 py-5 overflow-y-auto max-h-[30rem] scrollbar-hide">
          {todos.map((todo) => (
            <li key={todo.description}>
              <TodoItem {...todo} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-800">You have no todo`s yet.</p>
      )}
    </div>
  );
};

export default Todos;
