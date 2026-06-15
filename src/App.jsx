import { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ToastProvider } from "./hooks/useToast";
import { AuctionProvider } from "./context/AuctionContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Loader from "./components/ui/Loader";

// Lazy loaded pages for performance optimization
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdInventory = lazy(() => import("./pages/AdInventory"));
const BudgetHistory = lazy(() => import("./pages/BudgetHistory"));
const LiveAuction = lazy(() => import("./pages/LiveAuction"));
const AudienceManager = lazy(() => import("./pages/AudienceManager"));
const CampaignRanking = lazy(() => import("./pages/CampaignRanking"));
const PublisherNetwork = lazy(() => import("./pages/PublisherNetwork"));
const DeliveryRoutes = lazy(() => import("./pages/DeliveryRoutes"));
const StorageSystem = lazy(() => import("./pages/StorageSystem"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Sidebar ──────────────────────────────── */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* ── Main content area ────────────────────── */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? "md:ml-[72px]" : "md:ml-[260px]"}
        `}
      >
        <Navbar onMobileMenuOpen={() => setMobileOpen(true)} />
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuctionProvider>
      <BrowserRouter>
        <ToastProvider>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ad-inventory" element={<AdInventory />} />
                <Route path="/budget-history" element={<BudgetHistory />} />
                <Route path="/live-auction" element={<LiveAuction />} />
                <Route path="/audience-manager" element={<AudienceManager />} />
                <Route path="/campaign-ranking" element={<CampaignRanking />} />
                <Route path="/publisher-network" element={<PublisherNetwork />} />
                <Route path="/delivery-routes" element={<DeliveryRoutes />} />
                <Route path="/storage-system" element={<StorageSystem />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ToastProvider>
      </BrowserRouter>
    </AuctionProvider>
  );
}

export default App;
