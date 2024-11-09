import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./Router/Router";
import { RouterProvider } from "react-router-dom";
import AuthProviders from "./Firebase/AuthProvider";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a QueryClient instance
const queryClients = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClients}>
      <AuthProviders>
        <RouterProvider router={Router} />
      </AuthProviders>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
