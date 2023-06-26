'use client'
import { db } from "@/config/firebase";
import { useTodo } from "@/hooks/useTodo";
import { ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft, IconTrashFilled } from "@tabler/icons-react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = (props:any) => {
  const todo = useTodo(props.searchParams.id)
  const router = useRouter()

  if(!todo){
    return (
      <div>
        ...Loading
      </div>
    )
  }

  const {completed, deadline, title, description} = todo

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "todos", props.searchParams.id));
      notifications.show({
        title: "Firebase notification",
        message: `Todo ${props.searchParams.id} successfully removed 🤥`,
        color: "green",
      });
      router.push('/')
    } catch (error) {
      notifications.show({
        title: "Firebase notification",
        message: `${error.message} 🤥`,
        color: "red",
      });
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement;

    const titleValue = (form.elements[0] as HTMLInputElement).value
    const descriptionValue = (form.elements[1] as HTMLInputElement).value;
    const deadlineValue = (form.elements[2] as HTMLInputElement).value;
    const completedValue = (form.elements[3] as HTMLInputElement).checked;

    try {
      await updateDoc(doc(db, "todos", props.searchParams.id),{
        id: props.searchParams.id,
        title: titleValue,
        description: descriptionValue,
        deadline: deadlineValue,
        completed: completedValue
      });
      notifications.show({
        title: "Firebase notification",
        message: `Todo ${props.searchParams.id} successfully updated 🤥`,
        color: "green",
      });
      router.push('/')
    } catch (error) {
      notifications.show({
        title: "Firebase notification",
        message: `${error.message} 🤥`,
        color: "red",
      });
    }
  }

  return (
    <div className="h-screen w-full relative">
      <Link href="/" className='top-5 left-5 absolute z-50'>
          <ActionIcon className='border-2 border-white rounded-full'>
            <IconArrowLeft size="2rem" color='white'/>
          </ActionIcon>
        </Link>
      <div className="flex flex-col bg-purple-600 h-56 p-5 py-20 text-white">
        <h2 className="font-bold text-2xl">Todo:</h2>
        <h1 className="text-2xl">{title}</h1>
      </div>
    <div className="bg-white rounded-t-3xl -mt-10 relative px-10 pt-10 space-y-5">
      <form onSubmit={handleUpdate} className="space-y-5">
          <label className="flex flex-col">
            Title:
            <input className="input" defaultValue={title}/>
          </label>
          <label className="flex flex-col">
            Description:
            <textarea className="input" defaultValue={description}/>
          </label>
          <label className="flex flex-col">
            Deadline:
            <input className="input" type="date" defaultValue={String(deadline)}/>
          </label>
          <label className="flex items-center">
            Completed:
            <input className="input ml-2 h-4 w-4" type="checkbox" defaultChecked={completed}/>
          </label>
          <button
          className="w-full bg-purple-500 p-2 rounded-lg text-white"
          >Update ToDo</button>
          <ActionIcon onClick={handleDelete} className='bg-gray-200 w-full h-10 rounded-lg'>
            Remove
            <IconTrashFilled size="1.5rem" color='white'/>
          </ActionIcon>
        </form>
    </div>
  </div>
  );
};



export default Page