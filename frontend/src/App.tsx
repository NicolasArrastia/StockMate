import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "./features/Products";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sales from "./features/Sales";
import Dashboard from "./features/Dashboard";
import NotFound from "./features/NotFound";
import Settings from "./features/Settings";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />

          <Route path="/products/*" element={<Products />} />
          <Route path="/sales/*" element={<Sales />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer draggable theme="colored" />
    </QueryClientProvider>
  );
};

export default App;
