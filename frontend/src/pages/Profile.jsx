import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      setUser(data.user);

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <div>

      <Navbar />

      <h2>Profile Page</h2>

      {user && (
        <div>
          <h3>Name: {user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      )}

      <hr />

      <h3>My Posts</h3>

      <p>Posts will appear here</p>

    </div>

  );

}

export default Profile;
