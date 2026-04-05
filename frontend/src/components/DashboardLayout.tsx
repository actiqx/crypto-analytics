import React from 'react';
import { Activity, LayoutDashboard, Coins, Users, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function DashboardLayout({ children, activeTab, setActiveTab }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans text-foreground transition-all duration-300">
      {/* Sidebar */}
      <aside className="w-72 border-r border-border bg-card/40 backdrop-blur-3xl flex-none hidden lg:flex flex-col relative group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        <div className="p-8 relative z-10">
          <div className="flex items-center gap-3 group/logo cursor-pointer px-4">
            <div className="bg-primary/20 p-2.5 rounded-2xl group-hover/logo:bg-primary group-hover/logo:text-primary-foreground transition-all duration-500 rotate-0 group-hover/logo:rotate-12">
              <Activity className="h-7 w-7 text-primary group-hover/logo:text-inherit" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase italic text-foreground">NEXUS</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6 relative z-10">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />
          <SidebarItem 
            icon={Coins} 
            label="Assets" 
            active={activeTab === 'assets'} 
            onClick={() => setActiveTab('assets')} 
          />
          <SidebarItem 
            icon={Users} 
            label="Users" 
            active={activeTab === 'users'} 
            onClick={() => setActiveTab('users')} 
          />
          <div className="pt-4 mt-4 border-t border-border/50">
            <SidebarItem icon={Settings} label="Settings" />
          </div>
        </nav>

        <div className="p-6 mt-auto relative z-10">
          <div className="bg-primary/10 rounded-3xl p-6 border border-primary/20 backdrop-blur-md hover:border-primary/50 transition-all group/banner">
            <h4 className="text-sm font-bold mb-1 group-hover/banner:text-primary transition-colors">Institutional Pro</h4>
            <p className="text-xs text-muted-foreground mb-4">You have reached 84% of your monthly API limits.</p>
            <Button size="sm" className="w-full bg-primary text-primary-foreground font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20">
              Upgrade Now
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full relative">
        {/* Modern ambient lighting */}
        <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        <div className="p-10 pb-24 max-w-7xl mx-auto space-y-10 relative z-10">
          <header className="flex flex-col gap-2 mb-10 translate-y-0 opacity-100 transition-all duration-700">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              Live Terminal
            </div>
            <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              {activeTab === 'dashboard' && 'Market Overview'}
              {activeTab === 'assets' && 'Asset Management'}
              {activeTab === 'users' && 'User Administration'}
            </h1>
            <p className="text-lg text-muted-foreground/80 font-medium max-w-2xl leading-relaxed">
              {activeTab === 'dashboard' && 'The definitive hub for real-time crypto analytics and high-fidelity portfolio tracking.'}
              {activeTab === 'assets' && 'Curate, modify, and manage your institutional-grade asset database with ease.'}
              {activeTab === 'users' && 'Control access levels and manage team roles for your organization dashboard.'}
            </p>
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group/item",
        active 
          ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 translate-x-1" 
          : "text-muted-foreground hover:bg-primary/5 hover:text-primary hover:translate-x-1"
      )}
    >
      <Icon className={cn("h-5 w-5 transition-transform duration-500", active ? "scale-110" : "group-hover/item:scale-110")} />
      {label}
      {active && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground" />
      )}
    </button>
  );
}
