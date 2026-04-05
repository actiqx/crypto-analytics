import { Card, CardContent } from "./ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp, BarChart2 } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface StatsGridProps {
  assets: any[];
  isLoading: boolean;
}

export function StatsGrid({ assets, isLoading }: StatsGridProps) {
  if (isLoading || !assets.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-3xl" />
        ))}
      </div>
    );
  }

  // Calculate some dummy global stats based on top 50 assets
  const totalMarketCap = assets.reduce((acc, asset) => acc + (parseFloat(asset.marketCapUsd) || 0), 0);
  const totalVolume = assets.reduce((acc, asset) => acc + (parseFloat(asset.volumeUsd24Hr) || 0), 0);
  
  // Fake percentage for UI demonstration
  const marketCapChange = 2.4; 
  const volumeChange = -1.2;

  const formatCurrency = (val: number) => {
    if (val >= 1e12) return `$${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
    return `$${val.toLocaleString()}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        title="Total Market Cap" 
        value={formatCurrency(totalMarketCap)} 
        change={marketCapChange} 
        icon={DollarSign} 
      />
      <StatCard 
        title="24h Volume" 
        value={formatCurrency(totalVolume)} 
        change={volumeChange} 
        icon={BarChart2} 
      />
      <StatCard 
        title="Top Performer" 
        value={assets[0]?.symbol || "N/A"} 
        subtitle={assets[0]?.name || "N/A"}
        change={parseFloat(assets[0]?.changePercent24Hr) || 0} 
        icon={TrendingUp} 
      />
    </div>
  );
}

function StatCard({ title, value, change, icon: Icon, subtitle }: any) {
  const isPositive = change >= 0;
  return (
    <Card className="rounded-3xl border-border bg-card/60 backdrop-blur-md overflow-hidden relative group shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-primary/50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-6 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${
            isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'
          }`}>
            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(change).toFixed(2)}%
          </div>
        </div>
        <div>
          <h3 className="text-muted-foreground font-medium text-sm mb-1">{title}</h3>
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
