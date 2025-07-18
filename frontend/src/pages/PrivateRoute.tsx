import { Navigate } from "react-router-dom";

import { ReactNode } from "react";

function PrivateRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" />;
}

export default PrivateRoute;
