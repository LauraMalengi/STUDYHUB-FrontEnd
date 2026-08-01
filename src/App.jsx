import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import LogIn from "./components/LogIn/LogIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;