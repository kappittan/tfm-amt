import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { Dashboard } from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
//import "./App.css";

function App() {
  return (
    <div
      className="Aplicacion"
      style={{ backgroundColor: "#3D2462", minHeight: "100vh" }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
