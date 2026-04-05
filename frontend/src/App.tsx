import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatsGrid } from '@/components/StatsGrid';
import { MainChart } from '@/components/MainChart';
import { AssetTable } from '@/components/AssetTable';
import { AssetManagement } from '@/components/AssetManagement';
import { UserManagement } from '@/components/UserManagement';
import { useAssets } from '@/hooks/useAssets';
import { LayoutDashboard, Coins, Users as UsersIcon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { assets, isLoading } = useAssets();

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'assets':
        return <AssetManagement />;
      case 'users':
        return <UserManagement />;
      default:
        return (
          // Use space-y-10 to add generous spacing between dashboard sections
          <div className="space-y-6 animate-in fade-in duration-1000">
            <StatsGrid assets={assets} isLoading={isLoading} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MainChart assetId={assets.length > 0 ? assets[0].id : 'bitcoin'} />
              </div>
              <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-3xl p-8 flex-1 relative overflow-hidden group hover:border-primary/50 transition-all duration-500 shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <LayoutDashboard size={20} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight">Alpha Insights</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed font-medium">
                    Based on the 24h market activity, <span className="text-primary font-bold">{assets[0]?.name || 'Bitcoin'}</span> is showing strong momentum. Total market liquidity remains stable with high institutional participation.
                  </p>
                  <div className="bg-muted/30 p-4 rounded-2xl border border-border/50 text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    AI Analysis Updated just now
                  </div>
                </div>
              </div>
            </div>
            
            <AssetTable assets={assets} isLoading={isLoading} />
          </div>
        );
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="bg-card/40 backdrop-blur-md border border-border/50 p-1.5 rounded-2xl flex gap-1 mb-10 w-fit mx-auto lg:mx-0 shadow-2xl">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'assets', label: 'Asset Center', icon: Coins },
          { id: 'users', label: 'User Hub', icon: UsersIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-7 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-500 relative ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-xl -translate-y-0.5' 
                  : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:-translate-y-0.5'
              }`}
            >
              <Icon size={16} />
              {tab.label}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="min-h-[600px] transition-all duration-700">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
}

export default App;
