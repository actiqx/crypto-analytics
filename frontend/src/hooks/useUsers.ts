import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser, deleteUser, updateUser } from '@/services/api';

export const useUsers = () => {
    const queryClient = useQueryClient();

    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    const createUserMutation = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const deleteUserMutation = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const updateUserMutation = useMutation({
        mutationFn: ({ userId, data }: { userId: number, data: any }) => updateUser(userId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    return {
        users: usersQuery.data ?? [],
        isLoading: usersQuery.isLoading,
        createUser: createUserMutation.mutate,
        isCreating: createUserMutation.isPending,
        deleteUser: deleteUserMutation.mutate,
        isDeleting: deleteUserMutation.isPending,
        updateUser: updateUserMutation.mutate,
        isUpdating: updateUserMutation.isPending,
    };
};
