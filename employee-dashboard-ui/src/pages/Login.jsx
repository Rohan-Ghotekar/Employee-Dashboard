import React, { useContext, useState } from "react";
import { loginUser } from "../api/authApi";
import { AuthContext } from "../Auth/Authantication";
import { useNavigate } from "react-router-dom";
import "../App.css"
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await loginUser(username, password);

    if (result.success) {
      login(result);
      navigate("/dashboard");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <input
          className="login-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}