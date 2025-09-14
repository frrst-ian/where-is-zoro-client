import { Routes, Route } from "react-router-dom";

const Home = () => <div>hello sekai</div>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRoutes;