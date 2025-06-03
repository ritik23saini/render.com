import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); 
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null; 

  const isAdmin = userInfo.isAdmin;

  return (
    <>
      <h2>Welcome, {isAdmin ? "Admin" : userInfo.username}</h2>
      {isAdmin && <Link to="/createEmployee">Create Employee</Link>}
    </>
  );
};

export default Dashboard;
