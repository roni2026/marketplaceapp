import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { InstallPrompt } from "@/components/pwa/InstallPrompt";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PostAd from "./pages/PostAd";
import AdDetails from "./pages/AdDetails";
import Category from "./pages/Category";
import Search from "./pages/Search";
import MyAds from "./pages/MyAds";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Categories from "./pages/Categories";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner richColors closeButton position="top-center" />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/post-ad" element={<PostAd />} />
                <Route path="/ad/:slug" element={<AdDetails />} />
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/search" element={<Search />} />
                <Route path="/my-ads" element={<MyAds />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile" element={<Profile />} />
                {/* Admin side removed — this build is customer-only. */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <InstallPrompt />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
