import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { scrollTop } from "../../../utils/Scroll";
import { toast } from "react-toastify";
import { handleVehicleNumber, handleRoutes, handleDriverNames, handleAddTripAction, handleGetTripAction } from "../state/trip.actions";

const useTripHook = () => {

    // Form show or hide 
    const [open, setOpen] = useState(null);

    //  import export popup bar show 
    const [ExcelDataBox, setExcelDataBox] = useState(false);

    // File Popup 
    const [openFilePopup, setFilePopup] = useState(false);


    // when click on update button this state is used 
    const [updateId, setUpdateId] = useState(null);


    const [search, setSearch] = useState("");
    const [current, setcurrent] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const DataPerPage = 10

    const url = `/vehicle?search=${search}&currentPage=${current}&DataPerPage=${DataPerPage}`


    const dispatch = useDispatch();

    // the object with default values 
    const emptyForm = {
        date: "",
        rps: "",
        driverName: "",
        vehicleNumber: "",
        route: "",
        dispatchTime: "",
        inTime: "",
        givenHour: "",
        givenMinutes: "",
        touchingPoint: "",
        unloadTime: "",
        loadTime: "",
        loadhour: "",
        loadminute: "",
        remark: "",
        refundedamount: "",
    };


    // react hook form 
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
        mode: "onChange",
        defaultValues: emptyForm
    });

    const [enableTouching, setTouching] = useState(false);

    //    watch the value of route to auto fill the touching point and enable loaded and unloaded 
    const point = watch("route");

    // this fn check if points changes 
    useEffect(() => {
        const routes = point.split("-");
        if (routes.length > 2) {
            setValue("touchingPoint", routes[1])
            setTouching(true);
        }
    }, [point])


    // opening form fn 
    const OpenForm = () => {
        setOpen(!open)
    }


    // closing form fn 
    const CloseForm = () => {
        setOpen(null);
        reset(emptyForm);
        setUpdateId(null);
        setTouching(false);
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


    //    async thunk import calling function 
    const handleExcelFile = (file) => {
        // dispatch(setFile(file));
        const formdata = new FormData();
        formdata.append("file", file)
        // dispatch(uploadVechileExcelFile(formdata))
    }


    // async thunk delete vehicle  Action call 
    const handleDeleteVehicle = (id) => {
        // dispatch(deleteVehiclesAction(id));
    }


    //   async thunk calling function 
    const handleUpdateVehicle = (data) => {

        const { vehicleNumber, _id } = data;

        if (vehicleNumber === updateId.vehicleNumber) return toast.warn("No Updation Needed");
        const payload = {
            vehicleNumber,
            _id
        }
        // dispatch(updateVehiclesAction(payload));
        CloseForm();
    }

    // set Data to state 
    const handleSetUpdate = (data) => {
        setUpdateId(data);
        setOpen(true)
        reset(data);
    }


    const handleHydrating = () => {
        dispatch(handleDriverNames())
        dispatch(handleRoutes())
        dispatch(handleVehicleNumber())
        dispatch(handleGetTripAction());
    }


    const timerRef = useRef(null);

    const searching = (val) => {
        setSearch(val);

        // clearTimeout(timerRef.current);

        // timerRef.current = setTimeout(() => {
        //     handleHydrating();
        // }, 700);
    };


    // submit form fn 
    const handleSubmitForm = (data) => {
        dispatch(handleAddTripAction(data));
        CloseForm();

    }






    return {
        open,
        OpenForm,
        CloseForm,

        register,
        handleSubmit,
        errors,
        handleSubmitForm,
        scrollTop,
        closeExcelBox,
        OpenExcelBox,
        ExcelDataBox,
        closeFileBox,
        openFileBox,
        openFilePopup,
        handleExcelFile,

        // handleDeleteVehicle,
        handleSetUpdate,
        updateId,
        // handleUpdateVehicle,
        handleHydrating,
        searching,
        search,
        enableTouching
    }
}

export default useTripHook