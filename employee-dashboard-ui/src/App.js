import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import "./App.css";
import { useState } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  return (
    <Router>
      <Navbar employees={employees}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard employees={employees}
              setEmployees={setEmployees} />} />
      </Routes>
    </Router>
  );
}

export default App;