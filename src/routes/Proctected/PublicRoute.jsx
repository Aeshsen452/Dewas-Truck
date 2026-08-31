import { Outlet, Navigate } from 'react-router';
import useRouteHook from './hooks/routehook'


const PublicRoute = () => {

    const { isLoggedIn } = useRouteHook();

    if (isLoggedIn) return <Navigate to="/main" />

    return <Outlet />
}

export default PublicRoute