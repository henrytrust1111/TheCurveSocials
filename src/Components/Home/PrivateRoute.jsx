import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const users = JSON.parse(localStorage.getItem("userData"));
  console.log(users);
  const email = localStorage.getItem("email");
  console.log(email);
  const password = localStorage.getItem("password");
  console.log(password);
  const authUser = users?.find(
    (e) => e.email === email && e.password === password
  );
  if (email && password && authUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
