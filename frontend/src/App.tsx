import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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
import VariantTest from "./pages/admin/page";
import Admin_variant_group from "./pages/admin/admin_variant_group";
import Admin_variant_value from "./pages/admin/admin_variant_value";
import Testing from "./pages/testing";
import Testing1 from "./pages/testing copy";
import QRModal from "./components/qr_modal";
import { useEffect, useState } from "react";

interface changeIP {
  ip: string;
}

function App() {
  // const changeip = "192.168.1.46"; // Zhen Xun
  // const changeip = "192.168.0.5"; //Zhen Xun Home
  // const changeip = "192.168.0.206"; //Zhen Xun Kenny
  const changeip = "192.168.1.24"; // DomDom

  const [color, setColor] = useState("#f2f2f2");
  const location = useLocation();
  useEffect(() => {
    // Function to determine background color based on the URL
    const determineBackgroundColor = () => {
      const currentPath = location.pathname.split("/")[1];
      // Example logic: Change background color for specific routes
      if (currentPath === "table") {
        setColor("#f2f2f2"); // Set background color to #f2f2f2 for 'table'
      } else if (currentPath === "admin_panel") {
        setColor("#FFEADB"); // Set background color to #FFEADB for 'admin_panel'
      }
    };
    determineBackgroundColor();
  }, [location.pathname]);
  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/not-found" />} />
      <Route path="table/:tableqrid">
        <Route index element={<Menu changeIP={changeip} />} />
        <Route path="paymentdetail" element={<Payment_detail />} />
        <Route path="cashpayment" element={<Cash_payment />} />
        <Route path="testing" element={<Testing />} />
        <Route path="testing1" element={<Testing1 />} />
        <Route path="qr_modal" element={<QRModal />} />
        <Route
          path="order_detail"
          element={<OrderDetailPage changeIP={changeip} />}
        />
      </Route>
      <Route path="admin_panel" element={<Admin_panel changeIP={changeip} />}>
        <Route path="menu" element={<Admin_method changeIP={changeip} />} />
        <Route path="qrtable" element={<Admin_qrtable changeIP={changeip} />} />
        <Route
          path="category/:foodmenu_id"
          element={<Admin_category changeIP={changeip} />}
        />
        <Route
          path="category/:foodmenu_id/:foodcategory_id"
          element={<Admin_item changeIP={changeip} />}
        />
        {/* <Route
          path="variant_group"
          element={<Admin_variant_group changeIP={changeip} />}
        /> */}
        <Route path="variant_group" element={<VariantTest />} />
        <Route path="variant_value" element={<Admin_variant_value />} />
      </Route>
    </Routes>
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
