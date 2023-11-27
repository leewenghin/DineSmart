import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
  useNavigate,
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
import Admin_variant_group from "./pages/admin/admin_variant_group";
import Admin_variant_value from "./pages/admin/admin_variant_value";
import Testing from "./pages/testing";
import QRModal from "./components/qr_modal";
import { useEffect, useState } from "react";
import Table from "./pages/table";
import React from "react";
import axios from "axios";
// import { UserContext, OrderList } from './pages/context';

interface changeIP {
  ip: string;
}

export const changeIP = "192.168.1.24"; // DomDom

export interface User {
  name: string;
}
interface Pathname {
  pathname: string;
}

function App() {
  const changeip = "192.168.1.8"; // Zhen Xun
  // const changeip = "192.168.0.12"; //Zhen Xun Home
  // const changeip = "192.168.0.207"; //Zhen Xun Kenny
  
  // const changeip = "192.168.1.24"; // DomDom
  
  const [pathname, setPathname] = useState(window.location.pathname.split("-")[0]);
  const [color, setColor] = useState("#f2f2f2");  
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const expires = urlParams.get("expires");
  const demo = urlParams.get("demo");
  
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
  
  //Check the path have any changer
  const ProtectedRoute = ({
    pathname,
    redirectPath = "/not-found",
  }: any) => {
    const storedPathname = localStorage.getItem("storedPathname");
    console.log(storedPathname);
    if(demo){
      return <Outlet />
    }else{
      return pathname && pathname.startsWith(storedPathname) ? (
      <Outlet />
      ) : (
        <Navigate to={redirectPath} replace />
      );
    }
  };

  //Starting loop  website to do the checking
  useEffect(() => {

    const updatelocal = () => {
      const lastVisitTime = localStorage.getItem("lastVisitTime");
      const isMoreThanOneHourAgo =
      lastVisitTime &&
      new Date().getTime() - new Date(lastVisitTime).getTime() >
          60 * 60 * 1000;

      if (isMoreThanOneHourAgo) {
        console.log("Creating new data or performing necessary actions...");
        localStorage.setItem("storedPathname", pathname);
        localStorage.setItem("lastVisitTime", new Date().toISOString()) ;
      }
    };
    const storedPathname = localStorage.getItem("storedPathname");

    if(!demo){
      if (storedPathname !== null) { // the url same with before access url
        // Check QR code expiration
        if (expires) { // check qrcode have expired or not- means the qrcode have limit time
          const expirationTime = new Date(expires);
          const currentTime = new Date();
          
          if (currentTime > expirationTime) {
            // QR code has expired, navigate to "/not-found"
            navigate("/not-found");
          }else{
            updatelocal();
          }
        }
      } else { // first time access this page
        localStorage.setItem("storedPathname", pathname); // store path avoid user change the url to other page
        navigate(pathname);
      }
    }

  }, []);

  // useEffect(() => {
  //   // Replace 'your-server-endpoint' with the actual endpoint on your server
  //   const fetchList = () => {
  //     fetch("http://127.0.0.1/api/ordertables")
  //       .then(response => response.json()) // Convert the response to JSON
  //       .then(data => {
  //         const userIP = data.ip;
  //         console.log(`User's IP address from server: ${userIP}`);
  //         // Do something with the user's IP address
  //       })
  //       .catch(error => console.error("Error fetching data: ", error));
  //   };

  //   fetchList(); // Call the function to initiate the API request

  // }, []);

  // useEffect(() => {
  //   // Replace 'your-server-endpoint' with the actual endpoint on your server
  //   axios.get('http://127.0.0.1/')
  //     .then(response => {
  //       const userIP = response.data.ip;
  //       console.log(`User's IP address from server: ${userIP}`);
  //       // Do something with the user's IP address
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user IP:', error);
  //     });
  // }, []);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/not-found" />} />
      <Route element={<ProtectedRoute pathname={pathname} />}>
        <Route path="table/:tableqrid">
          <Route index element={<Menu changeIP={changeip} />} />
          <Route path="paymentdetail" element={<Payment_detail />} />
          <Route path="cashpayment" element={<Cash_payment />} />
          <Route path="cardpayment" element={<Card_payment />} />
          <Route path="testing" element={<Testing />} />
          <Route path="qr_modal" element={<QRModal />} />
          <Route path="tableid" element={<Table />} />
          <Route
            path="order_detail"
            element={<OrderDetailPage changeIP={changeip} />}
          />
        </Route>
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
      </Route>
    </Routes>
    // </UserContext.Provider>
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
