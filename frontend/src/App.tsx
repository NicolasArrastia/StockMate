import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

const queryClient = new QueryClient();

const Products = lazy(() => import("./features/Products"));
const Sales = lazy(() => import("./features/Sales"));
const Dashboard = lazy(() => import("./features/Dashboard"));
const Settings = lazy(() => import("./features/Settings"));
const NotFound = lazy(() => import("./features/NotFound"));

const App = () => {
  // TODO: Refactor this logic
  const isProduction = import.meta.env.VITE_ENV === "production";

  return (
    <QueryClientProvider client={queryClient}>
      {isProduction ? (
        <HashRouter>
          <Suspense fallback={<>loading...</>}>
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />

              <Route path="/products/*" element={<Products />} />
              <Route path="/sales/*" element={<Sales />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </HashRouter>
      ) : (
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />

              <Route path="/products/*" element={<Products />} />
              <Route path="/sales/*" element={<Sales />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      )}
      <ToastContainer draggable theme="colored" />
    </QueryClientProvider>
  );
};

export default App;
