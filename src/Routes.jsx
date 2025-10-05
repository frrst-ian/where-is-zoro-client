import { Routes, Route } from "react-router-dom";
import Game from "./components/containers/GamePageContainer";
import Auth from "./components/containers/AuthContainer";
import Signup from "./components/containers/SignupContainer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
