import { useForm } from "react-hook-form";
import { useState } from "react";
import { handleAddAction, handleGetAction, handlDeleteAction, handleUpdateAction } from "../state/driver.actions";
import { useDispatch } from "react-redux";

const useDriverHook = () => {
    const dispatch = useDispatch();

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


    // submit form fn 
    const handleSubmitForm = (data) => {
        dispatch(handleAddAction(data))
        CloseForm();
    }

    // hydrating fn 
    const hydrating = () => {
        dispatch(handleGetAction());
    }


    // DeleteDriver
    const handleDeleteDriver = (id) => {
        dispatch(handlDeleteAction(id))
    }

    // update 
    const handleUpdate = (payload) => {
        dispatch(handleUpdateAction({ ...payload, _id: updatedId._id }));
        CloseForm();
    }


    const SetUpdatedData = (data) => {
        setUpdatedId(data);
        setOpen(true);
        reset({
            driverName: data.driverName,
            driverNumber: data.driverNumber
        })
    }




    return {
        register, handleSubmit, errors, ExcelDataBox, closeExcelBox, OpenExcelBox, openFilePopup
        , openFileBox, OpenForm, CloseForm, handleSubmitForm, open, hydrating, handleDeleteDriver,
        SetUpdatedData, handleUpdate, updatedId
    }




}

export default useDriverHook;