"use client";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { PrimeReactProvider } from "primereact/api";

import "./styles/global.scss";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider value={{ ripple: true, inputStyle: "outlined" }}>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </PrimeReactProvider>
  </StrictMode>,
);
