import { useState } from "react";
import { useForm } from "react-hook-form";
import { addRoute, removeRoute, editRoute, setvalue } from "../state/RouteState";
import { useDispatch } from 'react-redux';
import { addRouteApi, getRoutesApi, deleteRouteApi, editRouteApi } from "../api/routesapi";
import { toast } from "react-toastify";
import { scrollTop } from "../../../utils/Scroll";


const useRoute = () => {
    const [openAddingBox, setOpenBox] = useState(false);
    const [updateId, setUpdateId] = useState(null);
    const [loading, setloading] = useState(false)


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
    const dispatch = useDispatch();





    // closing header tab 
    const Closing = () => {
        setOpenBox(null);
        setUpdateId(null);
        reset(emptyForm);
    }


    // All are Apis 


    //  calling adding api  
    const handleRoute = async (data) => {
        try {
            const response = await addRouteApi(data);
            dispatch(addRoute(response.data));
            toast.success(response.message);
            reset(emptyForm);
            setOpenBox(false)
        } catch (error) {
            toast.error(error)
        }
    }

    // calling delete apis 
    const handleDelete = async (id) => {
        try {
            setloading(true)
            const response = await deleteRouteApi(id)
            dispatch(removeRoute(response.data._id))
            toast.success(response.message);
        } catch (error) {
            toast.error(error)
        } finally {
            setloading(false)
        }

    }

    //  calling update apis 
    const handleUpdateRoute = async (data) => {

        try {
            const response = await editRouteApi(data);
            dispatch(editRoute(response.data))
            setUpdateId(null);
            reset(emptyForm);
            setOpenBox(false);
            toast.success(response.message);

        } catch (error) {
            toast.error(error)
        }

    }

    // getting all Data 
    const hydratingRoutes = async () => {
        try {
            setloading(true)
            const { data } = await getRoutesApi();
            dispatch(setvalue(data));

        } catch (error) {
            console.log(error);

        } finally {
            setloading(false)
        }
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
        reset,
        errors,
        handleSubmit,
        handleRoute,
        openAddingBox,
        setOpenBox, handleDelete,
        setUpdateId,
        updateId,
        handleUpdateRoute,
        setUpData,
        hydratingRoutes,
        loading,
        scrollTop,
        Closing,


        closeExcelBox,
        OpenExcelBox,
        openFileBox,
        closeFileBox,
        handleExcelFile,
        openFilePopup, ExcelDataBox
    }


}

export default useRoute



















