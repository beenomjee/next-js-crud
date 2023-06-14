'use client';
import { CreateTodo, TodoItem } from "@/components";
import { useRef, useState } from "react";
import useSWR from 'swr'
import { BiLogOutCircle } from 'react-icons/bi'
import { Loader, Loader2 } from "@/layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const fetcher = (...args) => fetch(...args).then(res => res.json())
export default function Home() {
  const { data, isLoading, mutate } = useSWR('/api/todo', fetcher)
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState('');
  const [editCompleted, setEditCompleted] = useState(null);
  const [isLoading2, setIsLoading2] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  const onLogout = async () => {
    if (isLoading2 || isLoading) return;
    setIsLoading2(true);
    try {
      const { data } = await axios.get(`/api/auth/logout`);
      toast.success(data.message);
      router.replace('/signin');
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error?.response?.data?.message)
      else
        toast.error(error?.message)
      setIsLoading2(false);
    }
  }
  return (
    isLoading2 ? (
      <Loader />
    ) : (
      <main className="w-[95vw] max-w-md mx-auto py-10">
        <CreateTodo inputRef={inputRef} setEditCompleted={setEditCompleted} setEditId={setEditId} editCompleted={editCompleted} editId={editId} mutate={mutate} description={description} setDescription={setDescription} />
        <div className="py-3">
          {
            isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 />
              </div>
            ) : (
              data && (
                data.todos.length === 0 ? (
                  <p className="text-center text-sm pt-5">There&apos;s no todo to show!</p>
                ) : (
                  data.todos.map(todo => (
                    <TodoItem inputRef={inputRef} setDescription={setDescription} setEditCompleted={setEditCompleted} setEditId={setEditId} mutate={mutate} key={todo._id} todo={todo} />
                  ))
                )
              )
            )
          }
        </div>
        <button onClick={onLogout} className="fixed top-7 left-7 text-xl hover:opacity-80"><BiLogOutCircle /></button>
      </main>
    )
  )
}
