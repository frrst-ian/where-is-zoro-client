import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import Navbar from "./components/ui/Navbar";
import "./styles/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;