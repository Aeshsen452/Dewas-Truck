
import DriverSelectCard from "./DriverSelectCard";
import MonthCalender from "./MonthCalender";
import { useGetDashBoardData } from "../hooks/TanStakApi.hook";
import DataFetchingSpinner from "../../../components/Loader/DataFetchingSpinner";
import DriverTree from "./Tree";
import NoDriverSelected from "./NoDriverSelected";
import Summary from "./Summary";

export default function DriverDashboard() {





    const { data, isPending, error } = useGetDashBoardData();



    return (
        <div className=" bg-gray-50">
            {/* Header */}
            <header className="pt-3 flex w-full justify-end">

                <MonthCalender />
            </header>

            {/* Main */}
            <main className="flex px-6 py-4 gap-x-5 h-[90vh] overflow-hidden">


                {/* Sidebar */}
                <aside className="w-3/12 space-y-5 ">
                    <DriverSelectCard />
                    <Summary />

                </aside>



                <section className="w-9/12 overflow-y-auto">

                    {
                        false ? <NoDriverSelected />
                            :

                            <>
                                <h1 className='p-2 font-medium text-center text-base'> Raj Kamal Singh</h1>
                                <div className="flex flex-col gap-3">
                                    <DriverTree />
                                    <DriverTree />
                                </div>

                            </>

                    }

                </section>


            </main>
        </div>
    );
}







