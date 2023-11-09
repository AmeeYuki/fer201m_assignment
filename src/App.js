import "./App.css";
import "@fontsource/roboto/400.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import BackToTop from "./components/Navigation";
import Navigation from "./components/Navigation";
import Pets from "./components/Pets";
import Dashboard from "./components/Dashboard";
import Blog from "./components/Blog";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Pets />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
