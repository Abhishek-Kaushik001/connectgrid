import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <div style={{marginBottom:"20px"}}>

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

  );

}

export default Navbar;

