import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import List from "./pages/Admin/List";
import From from "./pages/Admin/Form";
import Detail from "./pages/Detail/Detail";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/list" element={<List />}/>
      <Route path="/form/:id" element={<From />}/>
      <Route path="/detail/:slug" element={<Detail />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
