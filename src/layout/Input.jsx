import React, { forwardRef } from 'react'

const Input = ({ label, type, placeholder, ...rest }, ref) => (
    <label className='flex flex-col items-stretch justify-start gap-1 '>
        <span className='text-sm text-white/50'>{label}</span>
        <input ref={ref} className='bg-transparent border border-blue-700/40 hover:border-blue-700 focus:border-blue-700/100 outline-none text-sm px-4 py-2 rounded' type={type} required placeholder={placeholder} {...rest} />
    </label>
)

export default forwardRef(Input)