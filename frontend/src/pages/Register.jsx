import { useState } from "react";
import { registerUser } from "../services/authservice";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await registerUser(formData);

      alert("User registered successfully");

      navigate("/login");

    } catch (error) {

      alert(error.message);

    }

  };

 return (
  <div className="register-container">

    <div className="register-box">

      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>

        <input
          className="register-input"
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="register-input"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="register-btn" type="submit">
          Register
        </button>

      </form>

    </div>

  </div>
);
}

export default Register;