import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

interface AssetTableProps {
  assets: any[];
  isLoading: boolean;
}

export function AssetTable({ assets, isLoading }: AssetTableProps) {
  return (
    <Card className="rounded-2xl border-border bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="text-lg font-medium flex justify-between items-center">
          Market Assets
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            View All
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-[80px] pl-6 text-xs uppercase tracking-widest text-muted-foreground">Rank</TableHead>
              <TableHead className="text-xs uppercase tracking-widest text-muted-foreground">Asset</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-widest text-muted-foreground">Price</TableHead>
              <TableHead className="text-right text-xs uppercase tracking-widest text-muted-foreground">24h Change</TableHead>
              <TableHead className="text-right pr-6 text-xs uppercase tracking-widest text-muted-foreground hidden md:table-cell">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3, 4, 5].map(i => (
                <TableRow key={i}>
                  <TableCell className="pl-6"><Skeleton className="h-4 w-6" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-4 w-12 ml-auto" /></TableCell>
                  <TableCell className="text-right pr-6 hidden md:table-cell"><Skeleton className="h-4 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))
            ) : (
              assets.slice(0, 10).map((asset) => {
                const change = parseFloat(asset.changePercent24Hr);
                const isPositive = change >= 0;
                
                return (
                  <TableRow key={asset.id} className="border-border/50 hover:bg-muted/30 cursor-pointer transition-colors group">
                    <TableCell className="pl-6 font-medium text-muted-foreground">{asset.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                          {asset.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{asset.name}</div>
                          <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${parseFloat(asset.priceUsd).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className={`border-0 font-medium ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-destructive/10 text-destructive'}`}>
                        {isPositive ? '+' : ''}{change.toFixed(2)}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6 hidden md:table-cell text-muted-foreground">
                      ${(parseFloat(asset.marketCapUsd) / 1e9).toFixed(2)}B
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
