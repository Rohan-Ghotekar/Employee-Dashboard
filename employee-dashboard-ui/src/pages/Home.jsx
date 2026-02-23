import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-wrapper">
      <div className="home-content">
        <h1 className="home-title">
          Employee Management
        </h1>

        <button
          className="btn btn-outline-light home-login-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Home;