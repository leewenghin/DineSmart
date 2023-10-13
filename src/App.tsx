import { BrowserRouter, Routes, Route } from "react-router-dom";
import Order_detail from "./pages/order_detail";
import Menu from "./pages/menu";
import "./App.css";
import Payment_detail from "./pages/payment_detail";
import Card_payment from "./pages/card_payment";
import Cash_payment from "./pages/cash_payment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}></Route>
        <Route path="/paymentdetail" element={<Payment_detail />}></Route>
        <Route path="/cashpayment" element={<Cash_payment />}></Route>
        {
          /* Define routes */ <Route
            path="/menu"
            element={<Menu />} // Components must start with capital letter
          />
        }
        {
          /* Define routes */ <Route
            path="/order_detail"
            element={<Order_detail />} // Components must start with capital letter
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
