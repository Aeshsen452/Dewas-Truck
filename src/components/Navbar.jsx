import { NavLink } from "react-router";

const Navbar = () => {
    return (
        <nav className="w-full border-b border-gray-200 ">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Left */}
                <div className="flex-1">
                    <NavLink
                        to="/main"
                        className="text-2xl font-bold text-blue-600"
                    >
                        Dewas-Truck
                    </NavLink>
                </div>

                {/* Center */}

                <div className="flex flex-1 justify-center">
                    <div className="flex items-center gap-8">
                        <NavLink
                            to="/main"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-700 font-bold border-b-2 border-blue-700 pb-2"
                                    : "text-black font-bold border-b-2 border-transparent pb-2 transition hover:text-blue-700 "
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/main/vehicles"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-700 font-bold  border-b-2 border-blue-700 pb-2"
                                    : "text-black font-bold border-b-2 border-transparent pb-2 transition hover:text-blue-700 "
                            }

                        >
                            Vehicles
                        </NavLink>

                        <NavLink
                            to="/main/routes"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-700 font-bold border-b-2 border-blue-700 pb-2"
                                    : "text-black font-bold border-b-2 border-transparent pb-2 transition hover:text-blue-700 "
                            }
                        >
                            Routes
                        </NavLink>

                        <NavLink
                            to="/main/drivers"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-700 font-bold border-b-2 border-blue-700 pb-2"
                                    : "text-black font-bold border-b-2 border-transparent pb-2 transition hover:text-blue-700 "
                            }
                        >
                            Drivers
                        </NavLink>

                        <NavLink
                            to="/main/trip"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-blue-700 font-bold border-b-2 border-blue-700 pb-2"
                                    : "text-black font-bold border-b-2 border-transparent pb-2 transition hover:text-blue-700 "
                            }
                        >
                            Trip
                        </NavLink>



                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-1 justify-end">
                    Account
                </div>

            </div>
        </nav>
    );
};

export default Navbar;