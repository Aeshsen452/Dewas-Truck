import { useState } from 'react'
import { useForm } from 'react-hook-form'

const useCommonHook = () => {
    const { register, handleSubmit, reset } = useForm();
    const [Deducteddata, setData] = useState({});

    return {
        register,
        handleSubmit,
        Deducteddata,
        setData,
        reset
    }
}

export default useCommonHook