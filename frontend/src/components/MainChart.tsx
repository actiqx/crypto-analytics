import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from './ui/skeleton';
import { fetchAssetHistory } from '@/services/api';

export function MainChart({ assetId }: { assetId: string }) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!assetId) return;
    
    const loadHistory = async () => {
      setIsLoading(true);
      try {
        const history = await fetchAssetHistory(assetId);
        // format data for recharts
        const formatted = history.map((item: any) => ({
          time: new Date(item.time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          price: parseFloat(item.priceUsd)
        }));
        setData(formatted);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, [assetId]);

  return (
    <Card className="rounded-2xl border-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="text-lg font-medium flex justify-between items-center">
          <span>Price History: {assetId.toUpperCase()}</span>
          <div className="flex space-x-2">
            {['1D', '1W', '1M', '1Y'].map(t => (
              <span key={t} className={`text-xs px-2 py-1 rounded-md cursor-pointer ${t === '1D' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted'}`}>
                {t}
              </span>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <Skeleton className="w-full h-[350px] rounded-xl" />
        ) : (
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  dy={10}
                  minTickGap={30}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickFormatter={(val) => `$${val.toLocaleString()}`}
                  domain={['auto', 'auto']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderRadius: '12px',
                    border: '1px solid hsl(var(--border))',
                    boxShadow: 'var(--shadow)'
                  }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(val: number) => [`$${val.toFixed(2)}`, 'Price']}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
