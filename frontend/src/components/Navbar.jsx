import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (

    <div className="navbar">

      <h2 className="logo">ConnectGrid</h2>

      <div className="nav-links">

        <button onClick={() => navigate("/")}>
          Feed
        </button>

        <button onClick={() => navigate("/profile")}>
          Profile
        </button>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;