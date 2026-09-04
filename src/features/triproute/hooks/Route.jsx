import { useState } from "react";
import { useForm } from "react-hook-form";
import { scrollTop } from "../../../utils/Scroll";


const useRoute = () => {
    const [openAddingBox, setOpenBox] = useState(false);
    const [updateId, setUpdateId] = useState(null);


    const emptyForm = {
        route: "",
        diesel: "",
        salary: "",
        incentive: "",
        latecharge: "",
    }


    //  import export popup bar show 
    const [ExcelDataBox, setExcelDataBox] = useState(false);

    // File Popup 
    const [openFilePopup, setFilePopup] = useState(false);


    const setUpData = (data) => {
        const { _id } = data;
        setUpdateId(_id);
        setOpenBox(true);
        reset(data);
        scrollTop()
    }

    const { register, reset, formState: { errors }, handleSubmit } = useForm(
        {
            mode: 'onChange',
            defaultValues: emptyForm
        }

    );


    // closing header tab 
    const Closing = () => {
        setOpenBox(null);
        setUpdateId(null);
        reset(emptyForm);
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



    const handleExcelFile = (file) => {
        dispatch(setFile(file));
        const formdata = new FormData();
        formdata.append("file", file)
        dispatch(uploadVechileExcelFile(formdata))
    }





    return {
        register,
        errors,
        handleSubmit,
        openAddingBox,
        setOpenBox,
        setUpdateId,
        updateId,
        setUpData,
        scrollTop,
        Closing,
        closeExcelBox,
        OpenExcelBox,
        openFileBox,
        closeFileBox,
        handleExcelFile,
        openFilePopup,
        ExcelDataBox
    }


}

export default useRoute



















