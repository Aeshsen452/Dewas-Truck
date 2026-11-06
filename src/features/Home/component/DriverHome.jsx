
import DriverSelectCard from "./DriverSelectCard";
import MonthCalender from "./MonthCalender";
import { useGetDashBoardData, useGetMonthlySalary } from "../hooks/TanStakApi.hook";
import DataFetchingSpinner from "../../../components/Loader/DataFetchingSpinner";
import DriverTree from "./Tree";
import NoDriverSelected from "./NoDriverSelected";
import Summary from "./Summary";
import DriverCard from "./DriverCards";
import DataNotFound from "../../../components/NotFound";
import { useSelector } from "react-redux";
import SearchBar from "../../../components/SearchBar";
import { Pagination } from "antd";
import { FileDown } from "lucide-react"

import Preloader from "../../../components/LandingComponent";

export default function DriverDashboard() {


    const { selectedDriver, calender } = useSelector((state) => state.dash);
    const { data, isPending, error, setSearch, search, currentPage,
        setCurrentPage,
        itemPerPage
    } = useGetDashBoardData();

    const { ExportData, ExportPending } = useGetMonthlySalary()


    if (isPending) {
        return <Preloader />
    }

    return (
        <div className=" bg-gray-50">
            {/* Header */}
            <header className="pt-3 flex flex-col w-full justify-end">

                <MonthCalender />
                {
                    !selectedDriver && calender && data && data.data.length > 0 &&
                    <div className="flex justify-end py-3 px-8 text-sm">
                        <button className="flex gap-x-1 cursor-pointer" onClick={ExportData}> <FileDown size={18} className="text-green-600" /> Download Report </button>
                    </div>
                }

            </header>

            {/* Main */}
            <main className="flex flex-col lg:flex-row px-6 py-4 gap-x-5 lg:min-h-[80vh] overflow-hidden">


                {/* Sidebar */}
                <aside className="lg:w-3/12 space-y-5 ">
                    <DriverSelectCard />
                    {
                        selectedDriver && data && data.data.length > 0 &&
                        <Summary data={data.data} />
                    }


                </aside>



                <section className="lg:w-9/12 overflow-y-auto relative">


                    {!selectedDriver &&
                        <div className="sticky top-0 z-10 bg-gray-50 py-5">
                            <SearchBar search={search} setSearch={setSearch} />
                        </div>

                    }


                    {
                        isPending ?
                            <div className="w-full h-[50vh] flex justify-center items-center">

                                <DataFetchingSpinner />
                            </div>

                            :

                            selectedDriver && data && data.data.length > 0 ?
                                <>
                                    <h1 className='p-2 font-medium text-center text-base'>{selectedDriver}</h1>
                                    <div className="flex flex-col gap-3">
                                        {
                                            data.data.map((driver, index) => (
                                                <DriverTree key={index} data={driver} />
                                            ))
                                        }

                                    </div>
                                </>
                                :
                                data && data.data.length > 0 ?

                                    <>

                                        <div className="grid gap-5 my-3">

                                            {
                                                data.data.map((d, index) => (
                                                    <DriverCard key={index} data={d} />
                                                ))
                                            }

                                        </div>

                                        {data.total > itemPerPage &&
                                            <Pagination
                                                pageSize={itemPerPage}
                                                total={data.total}
                                                defaultCurrent={currentPage}
                                                showSizeChanger={false}
                                                align="center"
                                                onChange={(key) => setCurrentPage(key)}

                                            />
                                        }
                                    </>

                                    : <DataNotFound />

                    }



                </section>


            </main>
        </div>
    );
}







