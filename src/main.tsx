import { AuthProvider } from "./context/AuthContext.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <>
          <App />
          <Toaster />
        </>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
