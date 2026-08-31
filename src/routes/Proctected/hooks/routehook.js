import React from 'react'
import { useSelector } from 'react-redux'


const useRouteHook = () => {

    const { isLoggedIn } = useSelector((state) => state.auth);



    return {
        isLoggedIn
    }
}

export default useRouteHook