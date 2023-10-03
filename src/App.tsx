import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product_detail from "./pages/product_detail";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {
          /* Define routes */ <Route
            path="/"
            element={<Product_detail />} // Components must start with capital letter
          />
        }
      </Routes>
    </BrowserRouter>
  );
}
