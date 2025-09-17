import { Routes, Route } from "react-router-dom";
import GamePageContainer from "./components/containers/GamePageContainer";

const Home = () => <div>hello sekai</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/game" element={<GamePageContainer />} />
    </Routes>
  );
};

export default AppRoutes;
