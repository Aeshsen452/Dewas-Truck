import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router"
import Spinner from '../components/Loader/Spinner';


const PublicRoute = lazy(() => import('./Proctected/PublicRoute'));
const Login = lazy(() => import('../features/auth/Component/LoginPage'))
const Signup = lazy(() => import('../features/auth/Component/Signup'))
const MainRoute = lazy(() => import('./Proctected/MainRoute'))
const Layout = lazy(() => import('../Layout/Layout'))
const HomePage = lazy(() => import('../components/HomePage'));
const VehiclesHome = lazy(() => import('../features/vehicles/component/HomePage'));
const TripRouteHome = lazy(() => import('../features/triproute/component/TripHome'));
const DriverHome = lazy(() => import('../features/driver/component/DriverHome'));
const TripHome = lazy(() => import("../features/Trip/component/TripHome"))




const AppRoutes = () => {



    const router = createBrowserRouter([
        {
            path: "/",
            element: <PublicRoute />,
            children: [
                {
                    path: "",
                    element: <Suspense fallback={<Spinner />}>
                        <Login />
                    </Suspense>
                },
                {
                    path: "signup",
                    element: <Suspense fallback={<Spinner />}>
                        <Signup />
                    </Suspense>


                }
            ]
        },

        {
            path: "/main",
            element: <MainRoute />,

            children: [
                {
                    path: "",
                    element: <Layout />,
                    children: [
                        {
                            path: "",
                            element: <Suspense fallback={<Spinner />}>
                                <HomePage />
                            </Suspense>


                        },
                        {
                            path: "vehicles",
                            element:
                                <Suspense fallback={<Spinner />}>
                                    <VehiclesHome />
                                </Suspense>


                        },
                        {
                            path: "routes",
                            element: <Suspense fallback={<Spinner />}>
                                <TripRouteHome />
                            </Suspense>


                        },
                        {
                            path: "drivers",
                            element: <Suspense fallback={<Spinner />}>
                                <DriverHome />
                            </Suspense>

                        },
                        {
                            path: "trip",
                            element: <Suspense fallback={<Spinner />}>
                                <TripHome />
                            </Suspense>


                        }
                    ]
                }

            ]



        },


    ])



    return (
        <RouterProvider router={router} />
    )
}

export default AppRoutes


