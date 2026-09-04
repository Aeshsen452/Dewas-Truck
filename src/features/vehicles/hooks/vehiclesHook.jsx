import { useState } from "react";
import { useForm } from "react-hook-form";
import { scrollTop } from "../../../utils/Scroll";



const usevehiclesHook = () => {

    // Form show or hide 
    const [open, setOpen] = useState(null);

    //  import export popup bar show 
    const [ExcelDataBox, setExcelDataBox] = useState(false);

    // File Popup 
    const [openFilePopup, setFilePopup] = useState(false);


    // when click on update button this state is used 
    const [updateId, setUpdateId] = useState(null);



    // the object with default values 
    const emptyForm = {
        vehicleNumber: ""
    };


    // react hook form 
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onChange",
        defaultValues: emptyForm
    });


    // opening form fn 
    const OpenForm = () => {
        setOpen(!open)
    }


    // closing form fn 
    const CloseForm = () => {
        setOpen(null);
        reset(emptyForm);
        setUpdateId(null)
    }



    //  closing import export box on hover
    const closeExcelBox = () => {
        setExcelDataBox(false)
    }


    // open import export box on hover 

    const OpenExcelBox = () => {
        setExcelDataBox(true)
    }

    // Excel File Mangment actions for close and open 

    const closeFileBox = () => {
        setFilePopup(false);
    }

    //  open File uplaod  dialog 
    const openFileBox = () => {
        setFilePopup(true);
        closeExcelBox();

    }


    // set Data to state 
    const handleSetUpdate = (data) => {
        setUpdateId(data);
        setOpen(true)
        reset(data);
    }



    return {
        open,
        OpenForm,
        CloseForm,
        register,
        handleSubmit,
        errors,
        scrollTop,
        closeExcelBox,
        OpenExcelBox,
        ExcelDataBox,
        closeFileBox,
        openFileBox,
        openFilePopup,
        handleSetUpdate,
        updateId,
    }
}

export default usevehiclesHook