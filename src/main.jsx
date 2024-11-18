import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router/Router";  // Assuming Router is correctly created
import { RouterProvider } from "react-router-dom";
import AuthProviders from "./Firebase/AuthProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProviders>
        <RouterProvider router={Router} />  {/* Ensure Router is a valid router configuration */}
      </AuthProviders>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
