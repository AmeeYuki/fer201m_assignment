import "./App.css";
import "@fontsource/roboto/400.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import BackToTop from "./components/Navigation";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
    </div>
  );
}

export default App;
