import { useState } from 'react'
import { useForm } from 'react-hook-form'

const useCommonHook = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [Deducteddata, setData] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const handleFormSubmit = (data) => {
    
        setIsOpen(true);
        setData(data)
    }

    return {
        register,
        isOpen,
        handleSubmit,
        handleFormSubmit,
        Deducteddata
    }
}

export default useCommonHook