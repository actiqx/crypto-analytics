import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAssets, deleteAsset, fetchAssetHistory } from '@/services/api';

export const useAssets = () => {
    const queryClient = useQueryClient();

    const assetsQuery = useQuery({
        queryKey: ['assets'],
        queryFn: fetchAssets,
        refetchInterval: 30000,
    });

    const deleteAssetMutation = useMutation({
        mutationFn: deleteAsset,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assets'] });
        },
    });

    return {
        assets: assetsQuery.data ?? [],
        isLoading: assetsQuery.isLoading,
        isRefetching: assetsQuery.isRefetching,
        refresh: () => queryClient.invalidateQueries({ queryKey: ['assets'] }),
        deleteAsset: deleteAssetMutation.mutate,
        isDeleting: deleteAssetMutation.isPending,
    };
};

export const useAssetHistory = (assetId: string) => {
    return useQuery({
        queryKey: ['asset-history', assetId],
        queryFn: () => fetchAssetHistory(assetId),
        enabled: !!assetId,
    });
};
