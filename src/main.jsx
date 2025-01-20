import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>
);
