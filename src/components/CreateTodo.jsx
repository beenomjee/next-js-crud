'use client'
import { Loader2 } from '@/layout';
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const CreateTodo = ({ inputRef, setEditCompleted, setEditId, editId, editCompleted, mutate, description, setDescription }) => {
    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async e => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        try {
            const { data } = editId ? await axios.put('/api/todo', { _id: editId, description, isCompleted: editCompleted }) :
                await axios.post('/api/todo', { description });
            toast.success(data.message);
            setDescription('');
            setEditId('');
            setEditCompleted(null);
            mutate()
            inputRef.current.focus();
        } catch (error) {
            if (error?.response?.data?.message)
                toast.error(error?.response?.data?.message)
            else
                toast.error(error?.message)
            setEditId('');
            setEditCompleted(null);
        }
        setIsLoading(false);
    }
    return (
        <form className="flex items-center justify-between gap-2" onSubmit={onSubmit}>
            <input ref={inputRef} value={description} onChange={e => setDescription(e.target.value)} type="text" required placeholder='Any new todo?' className='flex-1 px-4 py-2 rounded text-sm outline-none border border-blue-400/40 bg-transparent text-white/50 hover:border-blue-400 focus:border-blue-400 focus:ring-1 ring-blue-700' />
            <button type="submit" disabled={isLoading} className='w-[60px] flex items-center justify-center h-9 py-2 px-4 rounded text-sm bg-blue-700/80 hover:bg-blue-700 disabled:bg-blue-200 disabled:opacity-70 disabled:cursor-not-allowed'>{isLoading ? <Loader2 /> : editId ? 'Edit' : 'Add'}</button>
        </form>
    )
}

export default CreateTodo