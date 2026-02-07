import { Link, useLocation } from "wouter";
import { Home, PenTool, MessageCircle, BarChart2, Map, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { settings } = useStore();

  const navItems = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/log", icon: PenTool, label: "Log" },
    { href: "/analysis", icon: BarChart2, label: "Analysis" },
    { href: "/twin", icon: MessageCircle, label: "Ask Twin" },
    { href: "/strategy", icon: Map, label: "Plan" },
    { href: "/profile", icon: User, label: "Profile" },
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-sidebar-border bg-sidebar p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10">
          <img src={logo} alt="NutriTwin" className="w-10 h-10 object-contain rounded-xl bg-primary/10 p-1" />
          <div>
            <h1 className="font-display font-bold text-xl tracking-tight">NutriTwin</h1>
            <p className="text-xs text-muted-foreground font-medium">{settings.goal} Mode</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm font-medium" 
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-accent-foreground font-bold text-sm">
              {settings.name.charAt(0)}
            </div>
            <div className="text-sm">
              <p className="font-medium">{settings.name}</p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src={logo} alt="NutriTwin" className="w-8 h-8 rounded-lg bg-primary/10 p-1" />
          <h1 className="font-display font-bold text-lg">NutriTwin</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background pt-20 px-6 animate-in slide-in-from-top-10 duration-200">
          <nav className="space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="flex items-center gap-4 p-4 text-lg font-medium border-b border-border/50"
              >
                <item.icon className="text-primary" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-10 space-y-8 animate-in fade-in duration-500">
          {children}
        </div>
      </main>

      {/* Bottom Nav (Mobile) */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-background/80 backdrop-blur-lg border-t border-border flex justify-around p-2 pb-safe z-50">
        {navItems.slice(0, 4).map((item) => {
          const isActive = location === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg w-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
