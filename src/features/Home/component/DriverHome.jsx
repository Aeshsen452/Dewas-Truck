
import DriverSelectCard from "./DriverSelectCard";
import MonthCalender from "./MonthCalender";
import { useGetDashBoardData } from "../hooks/TanStakApi.hook";
import DataFetchingSpinner from "../../../components/Loader/DataFetchingSpinner";
import DriverTree from "./Tree";
import NoDriverSelected from "./NoDriverSelected";
import Summary from "./Summary";
import DriverCard from "./DriverCards";
import DataNotFound from "../../../components/NotFound";
import { useSelector } from "react-redux";

export default function DriverDashboard() {




    const { selectedDriver } = useSelector((state) => state.dash);
    const { data, isPending, error } = useGetDashBoardData();



    return (
        <div className=" bg-gray-50">
            {/* Header */}
            <header className="pt-3 flex w-full justify-end">

                <MonthCalender />
            </header>

            {/* Main */}
            <main className="flex px-6 py-4 gap-x-5 h-[100vh] overflow-hidden">


                {/* Sidebar */}
                <aside className="w-3/12 space-y-5 ">
                    <DriverSelectCard />
                    {
                        selectedDriver && data && data.length > 0 &&
                        <Summary data={data} />
                    }


                </aside>



                <section className="w-9/12 overflow-y-auto">

                    {
                        isPending ? <DataFetchingSpinner /> :

                            selectedDriver && data && data.length > 0 ?
                                <>
                                    <h1 className='p-2 font-medium text-center text-base'>{selectedDriver}</h1>
                                    <div className="flex flex-col gap-3">
                                        {
                                            data.map((driver, index) => (
                                                <DriverTree key={index} data={driver} />
                                            ))
                                        }

                                    </div>
                                </>
                                :
                                data && data.length > 0 ? <div className="grid gap-5">
                                    {
                                        data.map((d, index) => (
                                            <DriverCard key={index} data={d} />
                                        ))
                                    }

                                </div> : <DataNotFound />

                    }



                </section>


            </main>
        </div>
    );
}







