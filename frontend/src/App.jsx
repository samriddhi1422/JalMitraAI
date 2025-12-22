import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Calculation from "./pages/Calculation";
import AR from "./pages/AR";
import GovtSchemes from "./pages/GovtSchemes";
import Login from "./pages/login";
import Monthy from "./pages/Monthy";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import DashboardLayout from "./pages/DashboardLayout";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import Report from "./pages/report";
import CalculationLoading from "./pages/CalculationLoading";
import ViewReport from "./pages/viewReport";

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>}/>

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calculation" element={<Calculation />} />
            <Route path="/GovtSchemes" element={<GovtSchemes />} />
            <Route path="/monthly" element={<Monthy />} />
            <Route path="/ar" element={<AR />} />
            <Route path="/report" element={<Report/>} />
            <Route path="/view-report/:id" element={<ViewReport/>} />
            <Route path="/CalculationLoading" element={<CalculationLoading/>} />
           

           
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
