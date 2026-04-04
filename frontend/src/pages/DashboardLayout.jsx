import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">

   
      <Sidebar />

     
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;
