import { Routes, Route, Navigate } from "react-router-dom";
import Game from "./components/containers/GamePageContainer";
import Auth from "./components/containers/AuthContainer";
import Signup from "./components/containers/SignupContainer";
import ProtectedRoute from "./components/containers/ProtectedRoute";
import NotFound from "./components/ui/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/game"
        element={
          <ProtectedRoute>
            <Game />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
