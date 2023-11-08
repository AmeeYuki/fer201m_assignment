import "./App.css";
import "@fontsource/roboto/400.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
import Blog from "./components/Blog";
import Home from "./components/Home";
import Contact from "./components/Contact";
import PetList from "./components/PetList";
import Footer from "./components/Footer";
import Navigation from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="mt-3 mb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Blog" element={<Blog />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/Pet List" element={<PetList />}></Route>
          {/* <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/addNewStaff" element={<AddStaff />}></Route>
        <Route path="/updateStaff/:id" element={<UpdateStaff />}></Route> */}
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
