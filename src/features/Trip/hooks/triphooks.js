import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { scrollTop } from "../../../utils/Scroll";

const useTripHook = () => {

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

    const [viewData, setViewData] = useState(null);


    // react hook form 
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
        mode: "onChange",
        defaultValues: emptyForm
    });

    const [enableTouching, setTouching] = useState(false);

    //    watch the value of route to auto fill the touching point and enable loaded and unloaded 
    const point = watch("route");

    const dateHtml = watch("date");


    useEffect(() => {
        console.log("Html Date", dateHtml)

    }, [dateHtml])



    console.log("checking ", point)

    // this fn check if points changes 
    useEffect(() => {
        const routes = point.split("-");
        if (routes.length > 2) {
            setValue("touchingPoint", routes[1])
            setTouching(true);
        } else {
            setValue("touchingPoint", "")
            setTouching(false);
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


    // set Data to state 
    const handleSetUpdate = (data) => {
        console.log("data is comming", data)
        setUpdateId(data);
        setOpen(true)
        reset(data);
        scrollTop()
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
        enableTouching,
        setViewData,
        viewData

    }
}

export default useTripHook