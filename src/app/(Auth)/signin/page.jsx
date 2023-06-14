'use client'
import { Input, Loader } from '@/layout'
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

export default function Signup() {
    const ref = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [data, setdata] = useState({
        email: '',
        password: '',
    })
    useEffect(() => {
        ref.current && ref.current.focus();
    }, [router])

    const changeHandler = e => {
        const id = e.target.id;
        setdata(p => ({ ...p, [id]: e.target.value }))
    }

    const onSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data: { message }, headers } = await axios.post('/api/auth/login', data, { withCredentials: true });
            toast.success(message);
            console.log(headers);
            router.replace('/')
        } catch (error) {
            if (error?.response?.data?.message)
                toast.error(error?.response?.data?.message);
            else
                toast.error(error.message);
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        isLoading ? (
            <Loader />
        ) : (
            <div className="flex justify-center items-center min-h-screen max-w-[95vw]">
                <div className="p-5 rounded-lg bg-slate-800 shadow-lg shadow-white/10 w-96">
                    <h1 className='font-medium text-center text-3xl'>Sign In</h1>
                    <form className='py-5 flex flex-col items-stretch justify-start gap-2' onSubmit={onSubmit}>
                        <Input ref={ref} placeholder="What's your email?" type="email" label="Email" id="email" onChange={changeHandler} value={data.email} />
                        <Input placeholder="What's your password?" type="password" label="Password" id="password" onChange={changeHandler} value={data.password} />
                        <button type='submit' className='bg-blue-700 border-none outline-none text-sm px-4 py-2 rounded hover:opacity-90'>Sign In</button>
                    </form>
                    <p className='text-xs text-center text-white/50'>Don&apos;t have account? <Link href="/signup" className='text-blue-600 hover:underline'>Sign Up</Link></p>
                </div>
            </div>
        )
    )
}
