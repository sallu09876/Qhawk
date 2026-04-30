import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import Settings from "./pages/Settings";
import Catalogue from "./pages/Catalogue";
import Products from "./pages/Products";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import OrderReceiving from "./pages/sales/OrderReceiving";
import OrderApprove from "./pages/sales/OrderApprove";
import OrderCancel from "./pages/sales/OrderCancel";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/products" element={<Products />} />
              <Route path="/leads" element={<Leads />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/team" element={<Team />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Sales Routes */}
              <Route path="/sales/order-receiving" element={<OrderReceiving />} />
              <Route path="/sales/order-approve" element={<OrderApprove />} />
              <Route path="/sales/order-cancel" element={<OrderCancel />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
