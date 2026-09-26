
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
import SearchBar from "../../../components/SearchBar";
import { Pagination } from "antd";

export default function DriverDashboard() {


    const { selectedDriver } = useSelector((state) => state.dash);
    const { data, isPending, error, setSearch, search, currentPage,
        setCurrentPage,
        itemPerPage
    } = useGetDashBoardData();

    return (
        <div className=" bg-gray-50">
            {/* Header */}
            <header className="pt-3 flex w-full justify-end">

                <MonthCalender />
            </header>

            {/* Main */}
            <main className="flex px-6 py-4 gap-x-5 min-h-[80vh] overflow-hidden">


                {/* Sidebar */}
                <aside className="w-3/12 space-y-5 ">
                    <DriverSelectCard />
                    {
                        selectedDriver && data && data.data.length > 0 &&
                        <Summary data={data.data} />
                    }


                </aside>



                <section className="w-9/12 overflow-y-auto relative">


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
                                        <Pagination
                                            pageSize={itemPerPage}
                                            total={data.total}
                                            defaultCurrent={currentPage}
                                            showSizeChanger={false}
                                            align="center"
                                            onChange={(key) => setCurrentPage(key)}

                                        />

                                    </>

                                    : <DataNotFound />

                    }



                </section>


            </main>
        </div>
    );
}







