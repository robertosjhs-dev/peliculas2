import React from 'react';
import { useAdminData } from '../../hooks/useMovies';
import { Users, FileText, Activity, ShieldAlert, CheckCircle2, UserCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const AdminDashboard = () => {
  const { users, stats, loading } = useAdminData();

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-10 py-16 space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-secondary">
           <div className="w-12 h-0.5 bg-secondary" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Administrator Protocols</span>
        </div>
        <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none italic">
           System Override
        </h1>
        <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest max-w-md border-l-2 border-white/10 pl-6">
           Real-time surveillance of user identities and archive metadata assets.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Users, label: 'Verified Personnel', value: stats.totalUsers, color: 'text-blue-500' },
          { icon: FileText, label: 'Total Archives', value: stats.totalMovies, color: 'text-primary' },
          { icon: Activity, label: 'System Health', value: 'OPTIMAL', color: 'text-green-500', isStatus: true },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-8 rounded-3xl border border-white/5 space-y-6 group hover:border-white/20 transition-all">
             <div className="flex items-center justify-between">
                <div className={cn("p-4 rounded-2xl bg-white/5", stat.color)}>
                   <stat.icon size={24} />
                </div>
                <div className="h-6 w-1 rounded-full bg-white/10" />
             </div>
             <div className="space-y-1">
                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</h3>
                <p className={cn(
                  "text-4xl font-black tracking-tighter uppercase",
                  stat.isStatus ? stat.color : "text-white"
                )}>
                  {stat.value}
                </p>
             </div>
          </div>
        ))}
      </div>

      {/* User Management Table */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
           <ShieldAlert className="text-secondary" size={24} />
           <h2 className="text-xl font-black text-white uppercase tracking-widest italic">Identity Registry</h2>
        </div>
        
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
           <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                   <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Personnel</th>
                   <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Digital Address</th>
                   <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Clearance Level</th>
                   <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Recruitment Date</th>
                   <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden">
                             {user.photoURL ? <img src={user.photoURL} alt="" /> : <UserCircle2 className="text-zinc-600" size={20} />}
                          </div>
                          <span className="text-sm font-bold text-white uppercase tracking-tight">{user.displayName || 'Unknown'}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-zinc-500 font-medium text-sm">{user.email}</span>
                    </td>
                    <td className="px-8 py-6">
                       <span className={cn(
                          "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                          user.role === 'admin' ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-white/5 text-zinc-400 border-white/10"
                       )}>
                          {user.role}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-zinc-600 font-bold text-[10px] uppercase tracking-widest">
                          {user.createdAt?.seconds ? new Date(user.createdAt.seconds * 1000).toLocaleDateString() : 'Historical'}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <CheckCircle2 size={18} className="text-green-500/40 ml-auto" />
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

export default AdminDashboard;
