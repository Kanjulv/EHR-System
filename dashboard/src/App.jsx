import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import { Context } from "./main";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AddNewAdmin from "./components/AddNewAdmin";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } =
    useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user...");
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        console.log("Fetched user successfully:", response.data.user);
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsAuthenticated(false);
        setAdmin({});
      } finally {
        setLoading(false); // Ensure loading is stopped
        console.log("Loading state set to false");
      }
    };
    fetchUser();
  }, []); // Empty array ensures this runs only once on mount

  console.log("isAuthenticated:", isAuthenticated);
  console.log("Admin data:", admin);

  if (loading) {
    console.log("App is loading...");
    return <div>Loading...</div>; // Show a loading spinner or placeholder
  }

  return (
    <Router>
      {isAuthenticated && <Sidebar />}
      <Routes>
        {/* Redirect unauthenticated users to login */}
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/doctor/addnew"
          element={isAuthenticated ? <AddNewDoctor /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/addnew"
          element={isAuthenticated ? <AddNewAdmin /> : <Navigate to="/login" />}
        />
        <Route
          path="/messages"
          element={isAuthenticated ? <Messages /> : <Navigate to="/login" />}
        />
        <Route
          path="/doctors"
          element={isAuthenticated ? <Doctors /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer position="top-center" />
    </Router>
  );
};

export default App;
