import useAdminStore from "@/store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaClipboardList, FaPlusCircle, FaBox, FaShoppingCart, FaUserShield } from "react-icons/fa";
import Order from "@/components/Dashboard/Order.dash";
import Analytics from "@/components/Dashboard/Analytics.dash";
import BulkAdd from "@/components/Dashboard/BulkAdd.dash";
import ManageProducts from "@/components/Dashboard/ManageProducts.dash";
import Account from "@/components/Dashboard/Account.dash";

const Dashboard = () => {
    const { isLoggedIn } = useAdminStore();
    const navigator = useNavigate();
    const [componentRender , setComponentRender] = useState<number>(4);

    useEffect(() => {
        console.log(isLoggedIn);
        if (!isLoggedIn) {
            navigator("/auth");
        }
    }, [isLoggedIn, navigator]);

    return (
        <>
            <div className="w-full h-screen flex">
                <aside
                    id="default-sidebar"
                    className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <FaChartLine className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="ms-3">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <button onClick={()=>setComponentRender(1)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full">
                                    <FaClipboardList className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="ms-3">Analytics</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>setComponentRender(2)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full">
                                    <FaPlusCircle className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="ms-3">Bulk Add</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>setComponentRender(3)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full">
                                    <FaBox className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="ms-3">Manage Products</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>setComponentRender(4)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full">
                                    <FaShoppingCart className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="ms-3">Orders</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>setComponentRender(5)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full">
                                    <FaUserShield className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                                    <span className="ms-3" >Admin</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="flex-1 ml-64 p-4">
                    { componentRender === 1 ? <Analytics/> : null }
                    { componentRender === 2 ? <BulkAdd/> : null }
                    { componentRender === 3 ?  <ManageProducts/> : null }
                    { componentRender === 4 ? <Order/> : null }
                    { componentRender === 5 ? <Account/> : null }
                </div>
            </div>
        </>
    );
};

export default Dashboard;
