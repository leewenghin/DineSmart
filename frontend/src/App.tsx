import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// ===== Customer Site =====
import Order_detail from "./pages/order_detail";
import Menu from "./pages/menu";
import Payment_detail from "./pages/payment_detail";
import Card_payment from "./pages/card_payment";
import Cash_payment from "./pages/cash_payment";

// ===== Admin Site =====
import Admin_panel from "./pages/admin/admin_panel";
import Admin_method from "./pages/admin/admin_method";
import Admin_category from "./pages/admin/admin_category";
import Admin_item from "./pages/admin/admin_item";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}></Route>
        <Route path="/paymentdetail" element={<Payment_detail />}></Route>
        <Route path="/cashpayment" element={<Cash_payment />}></Route>
        <Route path="/menu" element={<Menu />}></Route>
        <Route path="/order_detail" element={<Order_detail />}></Route>
        <Route path="/card_payment" element={<Card_payment />}></Route>
        <Route path="/admin_panel" element={<Admin_panel />}>
          <Route path="method" element={<Admin_method />} />
          <Route path="category/:cateLabel" element={<Admin_category />} />
          <Route
            path="category/:cateLabel/:itemLabel"
            element={<Admin_item />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
