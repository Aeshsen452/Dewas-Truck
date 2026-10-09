import { useState } from 'react'
import { useForm } from 'react-hook-form'

const useCommonHook = () => {
    const { register, handleSubmit, reset, watch, setValue } = useForm();
    const [Deducteddata, setData] = useState({});
    const [TotalAmount, setAmount] = useState(0)



    let extraDiesel = watch("extraDiesel")
    let extraDuty = watch("extraDuty")


    setValue("cumaltiveAmount", TotalAmount - Number(extraDiesel) + Number(extraDuty));


    return {
        register,
        handleSubmit,
        Deducteddata,
        setData,
        reset,
        setAmount
    }
}

export default useCommonHook