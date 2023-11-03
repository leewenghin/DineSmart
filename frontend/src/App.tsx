import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// ===== Customer Site =====
import OrderDetailPage from "./pages/order_detail";
import Menu from "./pages/menu";
import Payment_detail from "./pages/payment_detail";
import Card_payment from "./pages/card_payment";
import Cash_payment from "./pages/cash_payment";

// ===== Admin Site =====
import Admin_panel from "./pages/admin/admin_panel";
import Admin_method from "./pages/admin/admin_menu";
import Admin_category from "./pages/admin/admin_category";
import Admin_item from "./pages/admin/admin_item";
import Testing from "./pages/testing";

interface changeIP {
  ip: string;
}

function App() {
  // const changeip = "192.168.1.46"; // Zhen Xun
  const changeip = "192.168.1.24"; // DomDom
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu changeIP={changeip} />}></Route>
        <Route path="/paymentdetail" element={<Payment_detail />}></Route>
        <Route path="/cashpayment" element={<Cash_payment />}></Route>
        <Route path="/menu" element={<Menu changeIP={changeip} />}></Route>
        <Route path="/testing" element={<Testing />}></Route>
        <Route path="/order_detail" element={<OrderDetailPage />} />
        <Route path="/card_payment" element={<Card_payment />}></Route>
        <Route
          path="/admin_panel"
          element={<Admin_panel changeIP={changeip} />}
        >
          <Route path="menu" element={<Admin_method changeIP={changeip} />} />
          <Route
            path="category/:foodmenu_id"
            element={<Admin_category changeIP={changeip} />}
          />
          <Route
            path="category/:foodmenu_id/:foodcategory_id"
            element={<Admin_item changeIP={changeip} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
// type OrderDetailRouteProps = {};
// const OrderDetailRoute: React.FC<OrderDetailRouteProps> = () => {
//   let { id, quantity } = useParams();
//   const orderId = id ? String(id) : "";
//   const parsedQuantity = quantity ? parseInt(quantity, 10) : 0;

//   return <Order_detail orderId={orderId} quantity={parsedQuantity} />;
// };

export default App;
