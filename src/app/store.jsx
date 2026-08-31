import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "../features/auth/state/authState.js"
import RouteReducer from "../features/triproute/state/RouteState.jsx"
import VehicleReducer from "../features/vehicles/state/vehiclestate.jsx"
import DriverReducer from "../features/driver/state/driverState.js";
import TripRouter from "../features/Trip/state/tripstate.js"
export const store = configureStore({
    reducer: {

        auth: AuthReducer,
        routeway: RouteReducer,
        vehicle: VehicleReducer,
        driver: DriverReducer,
        trip: TripRouter
    },
})