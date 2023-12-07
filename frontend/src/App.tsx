import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
  useNavigate,
  useNavigation,
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
import Error_page from "./pages/error_page";

interface changeIP {
  ip: string;
}

// export const changeIP = "192.168.1.24"; // DomDom

export interface User {
  name: string;
}
interface Pathname {
  pathname: string;
}

function App() {
  const [ipaddress, setIpAddress] = useState("localhost");
  const [qrtable, setQrTable] = useState<any>(0);
  // const changeip = "192.168.1.5"; //Zhen Xun Home
  // const changeip = "192.168.0.207"; //Zhen Xun Kenny

  // const changeip = "192.168.1.24"; // DomDom
  const changeip = `${ipaddress}`; // Zhen Xun

  const [pathname, setPathname] = useState(
    window.location.pathname.split("-")[0]
  );
  const [color, setColor] = useState("#f2f2f2");
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const expires = urlParams.get("expires");
  const demo = urlParams.get("demo");

  //Switch background color different page
  useEffect(() => {
    console.log(12);
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
        //Fetch api from backend get local ip
        const fetchIpAddress = async () => {
          try {
            const urlString = new URL(window.location.href);
            const urlhostname = urlString.hostname;
            const response = await fetch(`http://${urlhostname}:8000/local/`);
            const data = await response.json();
            setIpAddress(data.local_ip);
          } catch (error) {
            console.error("Error fetching IP address:", error);
          }
        };
        fetchIpAddress();
        const fetchQrtable = async () => {
          try {
            const response = await fetch(
              `http://${changeip}:8000/api/ordertables/`
            );
            const data = await response.json();
    
            // const geturlidExists = data.some(table:any => table.name === geturlid);
            setQrTable(data);
          } catch (error) {
            console.error("Error fetching IP address:", error);
          }
        };
        fetchQrtable();
  }, [location.pathname]);
  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  //Starting loop  website to do the checking
  const extractNumberFromSentence: any = (sentence: any) => {
    const matches = sentence.match(/\d+/); // Regular expression to match one or more digits

    if (matches) {
      // If there is a match, return the first matched number
      return parseInt(matches[0], 10); // Convert the matched string to an integer
    } else {
      // If no match found, return null or handle accordingly
      return null;
    }
  };
  let count = 0;
  useEffect(() => {
    const storedPathname = localStorage.getItem("storedPathname");
    const geturlid = window.location.pathname.split("/")[2];
    // Check if qrtable is an array before using the some method
    const isIdInData =
      Array.isArray(qrtable) && qrtable.some((item) => item?.name == geturlid);
      console.log(isIdInData);
    const updatelocal = () => {
      const lastVisitTime = localStorage.getItem("lastVisitTime");
      const isMoreThanOneHourAgo =
        lastVisitTime &&
        new Date().getTime() - new Date(lastVisitTime).getTime() > 60 * 1000;

      if (isMoreThanOneHourAgo) {
        console.log("Creating new data or performing necessary actions...");
        localStorage.setItem("storedPathname", pathname);
        localStorage.setItem("lastVisitTime", new Date().toISOString());
      }
    };

    if (!demo) {
      if (storedPathname !== null) {
        // the url same with before access url
        // Check QR code expiration
        if (expires) {
          // check qrcode have expired or not- means the qrcode have limit time
          const expirationTime = new Date(expires);
          const currentTime = new Date();

          if (currentTime > expirationTime) {
            // QR code has expired, navigate to "/not-found"
            navigate("/not-found",{ state: { value: '1' } });
          } else {
            updatelocal();
          }
        } else {
          updatelocal();
        }
      } else {
        // first time access this page
        localStorage.setItem("storedPathname", pathname); // store path avoid user change the url to other page
        navigate(pathname);
      }
    } else {
      // if(count > 5){
        console.log(count);
        navigate("/not-found",{ state: { value: '2' } });
        console.log(count);
      // }else{
      //   count = count + 1 ;
      //   console.log(count);
      // }
    }
  }, []);
  // console.log(qrtable);

  //Check the path have any changer
  const ProtectedRoute = ({ pathname, redirectPath = "/not-found"}: any) => {
    const storedPathname = localStorage.getItem("storedPathname");
    console.log(storedPathname);
    // const geturlid = extractNumberFromSentence(pathname); // 1
    // setQrTable(data);
    const geturlid = window.location.pathname.split("/")[2];
    // Check if qrtable is an array before using the some method
    const isIdInData =
      Array.isArray(qrtable) && qrtable.some((item) => item?.name == geturlid);
    if (demo) {
      return <Outlet />;
    } else {
      console.log(pathname);
      return pathname &&
        pathname.startsWith(storedPathname)? (
        <Outlet />
      ) : (
        // console.log("asd")
        <Navigate to={redirectPath} replace />
      );
    }
  };



  return (
    <Routes>
      <Route path="*" element={<Error_page />} />
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
        <Route
          path="variant_group"
          element={<Admin_variant_group changeIP={changeip} />}
        />
        <Route
          path="variant_value"
          element={<Admin_variant_value changeIP={changeip} />}
        />
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
