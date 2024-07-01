import { Toaster } from "./components/ui/toaster.tsx";
import { queryClient } from "./lib/react-query/client.ts";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <>
          <App />
          <Toaster />
        </>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
