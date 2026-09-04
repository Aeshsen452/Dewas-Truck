import { useForm } from "react-hook-form";
import { useState } from "react";


const useDriverHook = () => {

    // Form show or hide 
    const [open, setOpen] = useState(null);

    //  import export popup bar show 
    const [ExcelDataBox, setExcelDataBox] = useState(false);

    // File Popup 
    const [openFilePopup, setFilePopup] = useState(false);

    //    updated state 
    const [updatedId, setUpdatedId] = useState(null)

    // the object with default values 
    const emptyForm = {
        driverName: "",
        driverNumber: ""
    };

    const [files, setFiles] = useState(null);
    const [progress, setProgress] = useState(0);



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
        setUpdatedId(null);
    }


    const SetUpdatedData = (data) => {
        setUpdatedId(data);
        setOpen(true);
        reset({
            driverName: data.driverName,
            driverNumber: data.driverNumber,
            _id: data._id
        })
    }



    return {
        register, handleSubmit, errors, ExcelDataBox, closeExcelBox, OpenExcelBox, openFilePopup
        , openFileBox, OpenForm, CloseForm, open,
        SetUpdatedData, updatedId, closeFileBox, setFiles, files,
        progress, setProgress
    }




}

export default useDriverHook;