import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Film, PlaySquare, Settings, ShieldCheck } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { profile, isAdmin } = useAuth();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: PlaySquare, label: 'Dashboard', path: '/dashboard' },
    { icon: Film, label: 'Library', path: '/library' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-panel border-r border-white/10 flex flex-col py-8 z-40 hidden xl:flex">
      <div className="px-8 mt-24 mb-10">
        <h2 className="text-xl font-bold text-primary uppercase tracking-tighter">CineTrack</h2>
        <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold">Private Screening</p>
      </div>

      <nav className="flex-1 flex flex-col space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "px-8 py-4 flex items-center gap-3 transition-all duration-200 border-r-4",
              isActive 
                ? "bg-primary/10 text-primary border-primary font-semibold" 
                : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5 border-transparent"
            )}
          >
            <item.icon size={20} />
            <span className="uppercase tracking-widest text-[11px] font-bold">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto flex flex-col space-y-1">
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) => cn(
              "px-8 py-4 flex items-center gap-3 transition-all duration-200 border-r-4",
              isActive 
                ? "bg-secondary/10 text-secondary border-secondary font-semibold" 
                : "text-zinc-500 hover:text-secondary hover:bg-secondary/5 border-transparent"
            )}
          >
            <ShieldCheck size={20} />
            <span className="uppercase tracking-widest text-[11px] font-bold">Admin</span>
          </NavLink>
        )}
        
        <NavLink
            to="/settings"
            className={({ isActive }) => cn(
              "px-8 py-4 flex items-center gap-3 transition-all duration-200 border-r-4",
              isActive 
                ? "bg-white/10 text-white border-white font-semibold" 
                : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5 border-transparent"
            )}
          >
            <Settings size={20} />
            <span className="uppercase tracking-widest text-[11px] font-bold">Settings</span>
          </NavLink>

        {profile && (
          <div className="px-8 py-6 border-t border-white/5 flex items-center gap-4 mt-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden shrink-0">
               {profile.photoURL ? (
                 <img src={profile.photoURL} alt={profile.displayName || ''} className="w-full h-full object-cover" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold bg-zinc-700">
                    {profile.displayName?.charAt(0) || profile.email.charAt(0)}
                 </div>
               )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-bold text-zinc-200 truncate">{profile.displayName || 'Alex Chen'}</span>
              <span className={cn(
                "text-[9px] font-bold uppercase tracking-widest",
                isAdmin ? "text-secondary" : "text-primary"
              )}>
                {isAdmin ? 'Administrator' : 'Premium'}
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
