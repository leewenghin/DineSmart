import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/product_detail";
import Menu from "./pages/menu";
import "./App.css";
import Payment_detail from "./pages/payment_detail";
import Card_payment from "./pages/card_payment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}></Route>
        <Route path="/paymentdetail" element={<Payment_detail />}></Route>
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
        {
          /* Define routes */ <Route
            path="/card_payment"
            element={<Card_payment />} // Components must start with capital letter
          />
        }
      </Routes>
    </BrowserRouter>
  );
}
export default App;
