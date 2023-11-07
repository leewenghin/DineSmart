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
import Admin_qrtable from "./pages/admin/admin_qrtable";
import Testing from "./pages/testing";
import Testing1 from "./pages/testing copy";
import QRModal from "./components/qr_modal";

interface changeIP {
  ip: string;
}

function App() {
  // const changeip = "192.168.1.46"; // Zhen Xun
  // const changeip = "192.168.0.5"; //Zhen Xun Home
  // const changeip = "192.168.0.206"; //Zhen Xun Kenny
  const changeip = "192.168.1.103"; // DomDom

  // http:// 192.168:8000/menu/1 // dine in (Table order)
  // http:// 192.168:8000/menu/2 // delively

  // http:// 192.168:8000/menu/1/?table_id={1}/
  //
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu changeIP={changeip} />}></Route>

        <Route
          path="/department"
          element={<Menu changeIP={changeip} />}
        ></Route>
        <Route path="/menu" element={<Menu changeIP={changeip} />}></Route>

        <Route path="/paymentdetail" element={<Payment_detail />}></Route>
        <Route path="/cashpayment" element={<Cash_payment />}></Route>
        <Route path="/testing" element={<Testing />}></Route>
        <Route path="/testing1" element={<Testing1 />}></Route>
        <Route path="/components/qr_modal" element={<QRModal />} />
        <Route path="/order_detail" element={<OrderDetailPage />} />
        <Route
          path="/admin_panel"
          element={<Admin_panel changeIP={changeip} />}
        >
          <Route path="menu" element={<Admin_method changeIP={changeip} />} />
          <Route
            path="qrtable"
            element={<Admin_qrtable changeIP={changeip} />}
          />
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
