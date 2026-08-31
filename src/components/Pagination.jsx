import React from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const Pagination = () => {
    return (
        <div className='border border-gray-200 p-2  py-3 rounded flex justify-end items-center bg-white'>
            <div className='flex gap-x-2 px-5 items-center'>
                <button className='bg-blue-700 cursor-pointer text-white  p-1 rounded-full'> <ChevronLeft size={20} /> </button>
                <span className='font-bold'>2</span>
                <button className='bg-blue-700 cursor-pointer text-white p-1 rounded-full '> <ChevronRight size={20} /> </button>
            </div>
        </div>
    )
}

export default Pagination