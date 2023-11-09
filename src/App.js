import "./App.css";
import "@fontsource/roboto/400.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Pets from "./components/Pets";
import Dashboard from "./components/Dashboard";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import Detail from "./components/Detail";

function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Pets />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
