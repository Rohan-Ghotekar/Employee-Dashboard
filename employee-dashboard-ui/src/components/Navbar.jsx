import { useContext } from "react";
import { AuthContext } from "../Auth/Authantication";
import { useNavigate } from "react-router-dom";

function Navbar({employees}) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="app-navbar">
      <div className="nav-left">
        <div className="nav-logo">EM</div>
        <span className="nav-title">Employee Management</span>
      </div>
      {user?.role === "admin" && (
        <h4>Total Employee: {employees.length}</h4>
      )}
      <div className="nav-right">
        {user && (
          <button
            className="nav-btn"
            onClick={() => {
       
              logout();
              navigate("/login");
              // window.location.href = "/login";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;