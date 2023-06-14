import { Loader2 } from '@/layout';
import axios from 'axios';
import React, { useState } from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify';

const TodoItem = ({ inputRef, setDescription, setEditCompleted, setEditId, mutate, todo: { isCompleted, description, _id } }) => {
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const { data } = await axios.put('/api/todo', { _id, description, isCompleted: !isCompleted });
            toast.success(data.message);
            mutate()
        } catch (error) {
            if (error?.response?.data?.message)
                toast.error(error?.response?.data?.message)
            else
                toast.error(error?.message)
        }
        setIsLoading(false);
    }

    const onDelete = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
            const { data } = await axios.delete(`/api/todo/${_id}`);
            toast.success(data.message);
            mutate()
        } catch (error) {
            if (error?.response?.data?.message)
                toast.error(error?.response?.data?.message)
            else
                toast.error(error?.message)
        }
        setIsLoading(false);
    }


    const onEdit = () => {
        setEditId(_id);
        setEditCompleted(isCompleted);
        setDescription(description);
        inputRef.current && inputRef.current.focus()
    }

    return (
        <div className='py-3 grid grid-cols-todo grid-rows-1 gap-x-2 items-center border-b border-b-white/20'>
            <div className='grid grid-cols-todoComplete grid-rows-1 gap-x-3 items-center cursor-pointer hover:opacity-90' onClick={onClick}>
                {
                    isLoading ? (
                        <Loader2 />
                    ) : (
                        <span role='checkbox' aria-checked={isCompleted} className={`w-4 h-4 rounded-full border border-blue-400 ${isCompleted ? 'bg-blue-400' : ''}`}></span>
                    )
                }
                <p className={`text-sm ${isCompleted ? 'line-through' : ''}`}>{description}</p>
            </div>
            <div className="flex items-center justify-end gap-1">
                <button onClick={onEdit} className='flex items-center justify-center hover:text-blue-400'><AiFillEdit /></button>
                <button onClick={onDelete} className='flex items-center justify-center hover:text-red-400'><AiFillDelete /></button>
            </div>
        </div>
    )
}

export default TodoItem