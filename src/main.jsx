import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { router } from "./Router/Router";
import AuthProvider from "./Providers/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";





ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <AuthProvider>
    <HelmetProvider>
    <RouterProvider router={router} />
    </HelmetProvider>
    <Toaster position='top-right' reverseOrder={false} />
   </AuthProvider>
  </React.StrictMode>
);
