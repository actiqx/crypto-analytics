import { useState } from 'react';
import { useAssets } from '@/hooks/useAssets';
import { 
    DollarSign, 
    Trash2, 
    RefreshCcw, 
    ArrowUpRight, 
    ArrowDownRight,
    Loader2,
    Database,
    Zap,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

export const AssetManagement = () => {
    const { assets, isLoading, isRefetching, refresh, deleteAsset } = useAssets();
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleDelete = (id: string) => {
        if (!confirm(`Delete ${id}?`)) return;
        deleteAsset(id, {
            onSuccess: () => showNotification('success', `${id} deleted.`),
            onError: () => showNotification('error', "Deletion failed.")
        });
    };

    const formatCurrency = (val: number) => {
        if (!val) return "$0";
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
            
            {notification && (
                <div className={`fixed top-8 right-8 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right-full duration-300 border ${
                    notification.type === 'success' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' 
                        : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
                } backdrop-blur-xl font-bold`}>
                    {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    {notification.message}
                </div>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Market Assets</h2>
                    <p className="text-muted-foreground flex items-center gap-2">
                        <Database size={14} className="text-primary" />
                        Synchronized with live market data from CoinCap.
                    </p>
                </div>
                <button
                    onClick={refresh}
                    className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-xl font-medium hover:bg-muted transition-all active:scale-95 border border-border/50"
                >
                    {(isLoading || isRefetching) ? <Loader2 size={18} className="animate-spin" /> : <RefreshCcw size={18} />}
                    Refresh Data
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading && assets.length === 0 ? (
                    Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-32 bg-card/50 border border-border rounded-2xl animate-pulse" />
                    ))
                ) : assets.slice(0, 4).map((asset: any) => (
                    <div key={asset.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all group overflow-hidden relative">
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
                        <div className="flex justify-between items-start mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Zap size={20} />
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${asset.changePercent24Hr > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                {asset.changePercent24Hr > 0 ? '+' : ''}{asset.changePercent24Hr?.toFixed(2)}%
                            </span>
                        </div>
                        <h3 className="font-bold text-lg tracking-tight">{asset.name}</h3>
                        <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mb-2 opacity-60">{asset.symbol}</p>
                        <div className="text-2xl font-black text-primary tracking-tighter">
                            {formatCurrency(asset.priceUsd)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-muted/30 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 border-b border-border/50">
                                <th className="px-6 py-5">#</th>
                                <th className="px-6 py-5">Asset</th>
                                <th className="px-6 py-5">Price</th>
                                <th className="px-6 py-5">Market Cap</th>
                                <th className="px-6 py-5">24h Change</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50 font-medium font-mono text-sm leading-6">
                            {assets.map((asset: any) => (
                                <tr key={asset.id} className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground font-sans">{asset.rank}</td>
                                    <td className="px-6 py-4 font-sans">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary font-black text-xs border border-primary/10">
                                                {asset.symbol[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-sm tracking-tight">{asset.name}</div>
                                                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">{asset.symbol}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap tabular-nums font-bold text-sm">
                                        <div className="flex items-center gap-1.5 ">
                                            <DollarSign size={14} className="text-primary opacity-50" />
                                            {formatCurrency(asset.priceUsd)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold text-muted-foreground font-sans tabular-nums whitespace-nowrap">
                                        {formatCurrency(asset.marketCapUsd)}
                                    </td>
                                    <td className="px-6 py-4 tabular-nums">
                                        <div className={`flex items-center gap-1.5 text-xs font-bold ${asset.changePercent24Hr > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {asset.changePercent24Hr > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                            {asset.changePercent24Hr?.toFixed(2)}%
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                            <button 
                                                onClick={() => handleDelete(asset.id)}
                                                className="p-2.5 text-rose-500 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded-xl transition-all border border-rose-500/20"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
