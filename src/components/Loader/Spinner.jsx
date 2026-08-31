import React from 'react'

const Spinner = () => {
    return (
        <div className='w-full h-[89.8vh]  flex flex-col gap-y-3 justify-center items-center'>
            <span className="loader">
            </span>
            <p className='font-bold'>Please wait</p>
        </div>

    )
}

export default Spinner