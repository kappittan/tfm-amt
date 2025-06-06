import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { Dashboard } from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import { Footer } from "./components/Footer";
import { NavBar } from "./components/NavBar";
//import "./App.css";

function App() {
  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#3D2462", minHeight: "100vh" }}
    >
      <NavBar />
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
      <Footer />
    </div>
  );
}

export default App;
