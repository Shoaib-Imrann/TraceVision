import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import WebcamFeed from "./components/WebcamFeed"; // WebcamFeed component
import Login from "./pages/login"; // Login component
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || ""); // Load token from localStorage
  const navigate = useNavigate(); // Navigation hook

  // Navigate to the home page when token is updated
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // Save token in localStorage
      navigate("/"); // Navigate to the home page
    }
  }, [token, navigate]); // Watch for changes to token

  return (
    <div className="bg-gray-950 min-h-screen">
      <ToastContainer/>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} />} // Pass setToken to Login
        />
        <Route
          path="/"
          element={token ? <WebcamFeed /> : <Login setToken={setToken} />}
        />
      </Routes>
    </div>
  );
}

export default App;
