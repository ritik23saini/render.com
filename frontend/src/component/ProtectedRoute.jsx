import { Navigate, Outlet } from "react-router-dom";
import Nav from "./Nav";

const ProtectedRoute = () => {
  const userinfo = localStorage.getItem("userInfo");

  if (!userinfo) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
