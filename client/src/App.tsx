import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import LogPage from "@/pages/log";
import AnalysisPage from "@/pages/analysis";
import StrategyPage from "@/pages/strategy";
import OnboardingPage from "@/pages/onboarding";
import ProfilePage from "@/pages/profile";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { useLocation } from "wouter";

function Router() {
  const { settings } = useStore();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!settings.onboardingCompleted && location !== "/onboarding") {
      setLocation("/onboarding");
    }
  }, [settings.onboardingCompleted, location, setLocation]);

  return (
    <Switch>
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/" component={Dashboard} />
      <Route path="/log" component={LogPage} />
      <Route path="/analysis" component={AnalysisPage} />
      <Route path="/strategy" component={StrategyPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
