import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import "./styles/App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <main className="main">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;