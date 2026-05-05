import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../lib/firebase';
import { cn } from '../../lib/utils';

const TopBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-zinc-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl flex items-center justify-between px-10 z-50 transition-all duration-300">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-2xl font-black tracking-tighter text-primary">CineTrack</Link>
        <div className="hidden md:flex gap-8">
          <Link to="/" className="text-zinc-400 font-bold hover:text-white transition-all text-[11px] uppercase tracking-widest border-b-2 border-transparent hover:border-primary pb-1">Movies</Link>
          <Link to="/tv" className="text-zinc-400 font-bold hover:text-white transition-all text-[11px] uppercase tracking-widest border-b-2 border-transparent hover:border-primary pb-1">TV Shows</Link>
          <Link to="/watchlist" className="text-zinc-400 font-bold hover:text-white transition-all text-[11px] uppercase tracking-widest border-b-2 border-transparent hover:border-primary pb-1">Watchlist</Link>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden lg:flex items-center bg-black/40 border border-white/10 rounded-full px-4 py-2 focus-within:border-secondary transition-all w-64 group relative">
          <Search size={16} className="text-zinc-500 group-focus-within:text-secondary" />
          <input 
            type="text" 
            placeholder="Search metadata..." 
            className="bg-transparent border-none focus:ring-0 text-sm text-white w-full placeholder:text-zinc-700 h-6"
          />
        </div>

        <div className="flex items-center gap-6">
          <button className="text-zinc-400 hover:text-white transition-colors relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          {user ? (
            <button 
              onClick={handleLogout}
              className="group flex items-center gap-2 text-zinc-500 hover:text-primary transition-all text-[11px] uppercase tracking-[0.2em] font-black"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link 
              to="/login"
              className="bg-primary text-white px-6 py-2 rounded-full font-bold text-[11px] uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              Subscribe
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
