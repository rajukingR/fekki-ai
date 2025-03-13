import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";  // Assuming you have a Navbar component

const Layout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <Outlet /> {/* This will render child components dynamically */}
      </div>
    </div>
  );
};

export default Layout;
