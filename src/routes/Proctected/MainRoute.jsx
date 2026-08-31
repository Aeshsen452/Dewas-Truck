import { Outlet, Navigate } from 'react-router';
import useRouteHook from './hooks/routehook'


const MainRoute = () => {

    const { isLoggedIn } = useRouteHook();

    if (!isLoggedIn) return <Navigate to="/" />

    return <Outlet />
}

export default MainRoute