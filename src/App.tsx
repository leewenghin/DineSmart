import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/product_detail";
import Payment from "./pages/payment";
import Menu from "./pages/menu";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={< Menu />}></Route>
      {
          /* Define routes */ <Route
            path="/menu"
            element={<Menu />} // Components must start with capital letter
          />
        }
      {
          /* Define routes */ <Route
            path="/product"
            element={<Product />} // Components must start with capital letter
          />
        }
        </Routes>
    </BrowserRouter>
  );
}
export default App;
