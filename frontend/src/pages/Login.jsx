import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authservice";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      alert("Login successful ✅");

      navigate("/");

    } catch (error) {

      alert(error.message);

    }
  };


  return (

    <div className="login-container">

      <div className="login-box">

        <h1>Welcome Back 👋</h1>


        <form onSubmit={handleSubmit}>


          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />


          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />


          <button 
            className="login-btn"
            type="submit"
          >
            Login
          </button>


        </form>

      </div>

    </div>

  );
}


export default Login;