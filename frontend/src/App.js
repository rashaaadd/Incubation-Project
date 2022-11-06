import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
// import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Application from "./pages/Application";
import Notifications from "./pages/Notifications";
import Userslist from "./pages/Userslist";
import PendingApplicationlist from "./pages/PendingApplicationlist";
import Approvedlist from "./pages/Approvedlist";
import Rejectedlist from "./pages/Rejectedlist";
import Slot from "./pages/Slot";
import Status from "./pages/Status";

function App() {
  const {loading} = useSelector(state => state.alerts) //heading
  return (
    <BrowserRouter>
      { loading && (<div className="spinner-parent">
        <div className="spinner-border text-white" role="status">
          
        </div>
      </div>)}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Status /></ProtectedRoute>} />
        <Route path="/application" element={<ProtectedRoute><Application /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><Userslist /></ProtectedRoute>} />
        <Route path="/admin/pending-application" element={<ProtectedRoute><PendingApplicationlist /></ProtectedRoute>} />
        <Route path="/admin/approved-application" element={<ProtectedRoute><Approvedlist /></ProtectedRoute>} />
        <Route path="/admin/rejected-application" element={<ProtectedRoute><Rejectedlist /></ProtectedRoute>} />
        <Route path="/admin/slots" element={<ProtectedRoute><Slot /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
} 

export default App;
