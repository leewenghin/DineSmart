import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { OrderProvider } from "./pages/context";




ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  // Remove after react
  <BrowserRouter>
    <OrderProvider>
      <App />
    </OrderProvider>
  </BrowserRouter>
);
