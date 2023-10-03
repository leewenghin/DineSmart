import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product_detail from "./pages/product_detail";
import Payment from "./pages/payment";
import Menu from "./pages/menu";
import "./App.css";

 function App() {
  return (
    <BrowserRouter>
      <Route path='/' element={< Menu />}></Route>
      {
          /* Define routes */ <Route
            path="/product"
            element={<Product_detail />} // Components must start with capital letter
          />
        }
    </BrowserRouter>
  );
}
export default App;