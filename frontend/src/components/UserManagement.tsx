import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { 
    Trash2, 
    Plus, 
    Mail, 
    Shield, 
    User as UserIcon, 
    Loader2, 
    CheckCircle2, 
    AlertCircle 
} from 'lucide-react';

export const UserManagement = () => {
    const { users, isLoading, createUser, isCreating, deleteUser } = useUsers();
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({ email: '', full_name: '', role: 'viewer' });
    const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createUser(newUser, {
            onSuccess: () => {
                showNotification('success', "User created successfully!");
                setNewUser({ email: '', full_name: '', role: 'viewer' });
                setShowAddForm(false);
            },
            onError: (err: any) => {
                showNotification('error', err.response?.data?.detail || "Failed to create user.");
            }
        });
    };

    const handleDelete = (userId: number) => {
        if (!confirm("Delete this user?")) return;
        deleteUser(userId, {
            onSuccess: () => showNotification('success', "User deleted."),
            onError: () => showNotification('error', "Failed to delete user.")
        });
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
                    <h2 className="text-2xl font-bold tracking-tight">System Users</h2>
                    <p className="text-muted-foreground">Manage roles and access for your organization.</p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                >
                    <Plus size={18} />
                    Add User
                </button>
            </div>

            {showAddForm && (
                <div className="bg-card border border-border rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200 border-primary/20">
                    <h3 className="text-lg font-bold mb-6">Create New Identity</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                            <input
                                required
                                value={newUser.full_name}
                                onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                            <input
                                required
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                placeholder="john@example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Access Role</label>
                            <select
                                value={newUser.role}
                                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none font-bold"
                            >
                                <option value="viewer">Viewer</option>
                                <option value="editor">Editor</option>
                                <option value="admin">System Admin</option>
                            </select>
                        </div>
                        <div className="md:col-span-3 flex justify-end gap-3 pt-6 border-t border-border/50 mt-2">
                            <button
                                type="button"
                                onClick={() => setShowAddForm(false)}
                                className="px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-muted transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isCreating}
                                className="bg-primary text-primary-foreground px-8 py-2.5 rounded-xl text-sm font-black uppercase tracking-tighter hover:opacity-90 transition-all flex items-center gap-2"
                            >
                                {isCreating ? <Loader2 className="animate-spin" size={18} /> : "Initialize User"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading && users.length === 0 ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-48 bg-card/50 border border-border rounded-3xl animate-pulse" />
                    ))
                ) : users.length > 0 ? (
                    users.map((user: any) => (
                        <div key={user.id} className="group bg-card border border-border rounded-3xl p-6 hover:shadow-2xl hover:border-primary/50 transition-all relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="p-2 text-rose-500 bg-rose-500/10 hover:bg-rose-500 hover:text-white rounded-xl transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="flex items-center gap-5 mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                                    <UserIcon size={28} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl tracking-tight group-hover:text-primary transition-colors">{user.full_name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                        <Mail size={14} className="opacity-50" />
                                        {user.email}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-border/30">
                                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] ${
                                    user.role === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                }`}>
                                    <Shield size={12} />
                                    {user.role}
                                </div>
                                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest opacity-60">
                                    Member since {new Date(user.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-3 h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-3xl bg-muted/20">
                        <UserIcon size={48} className="mb-4 opacity-10" />
                        <p className="font-bold uppercase tracking-widest text-xs opacity-50">No Identities Registered</p>
                    </div>
                )}
            </div>
        </div>
    );
};
