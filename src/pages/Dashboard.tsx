import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Film, Edit, Trash2, Eye, Star, Clock } from 'lucide-react';
import { useMovies } from '../hooks/useMovies';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const Dashboard = () => {
  const { movies, loading, deleteMovie } = useMovies(true);
  const { profile } = useAuth();

  const handleDelete = async (id: string) => {
    if (window.confirm('Terminate this cinematic record?')) {
      await deleteMovie(id);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-10 py-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-secondary">
             <div className="w-12 h-0.5 bg-secondary" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Overview</span>
          </div>
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none italic">
             Central Control
          </h1>
          <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest max-w-md">
             Manage your proprietary cinematic archive and visionary entries.
          </p>
        </div>

        <Link 
          to="/movies/new"
          className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase flex items-center gap-3 shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
        >
          <Plus size={20} />
          Append New Entry
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {movies.length > 0 ? (
          <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                   <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Entry Metadata</th>
                   <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Classification</th>
                   <th className="px-12 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                   <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Score</th>
                   <th className="px-8 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {movies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-6">
                          <div className="w-16 aspect-[2/3] rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                            <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex flex-col min-w-0">
                             <span className="text-lg font-bold text-white uppercase tracking-tight truncate group-hover:text-secondary transition-colors">{movie.title}</span>
                             <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{movie.director} • {movie.releaseYear}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex flex-wrap gap-2">
                          {movie.genres?.slice(0, 2).map(g => (
                            <span key={g} className="bg-zinc-800 text-zinc-400 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">{g}</span>
                          ))}
                       </div>
                    </td>
                    <td className="px-12 py-6">
                       <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]",
                            movie.visibility === 'public' ? "text-green-500" : (movie.visibility === 'draft' ? "text-amber-500" : "text-zinc-500")
                          )} />
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            movie.visibility === 'public' ? "text-zinc-300" : "text-zinc-500"
                          )}>
                             {movie.visibility}
                          </span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-1.5 text-secondary">
                          <Star size={12} fill="currentColor" />
                          <span className="text-sm font-black tracking-widest">{movie.rating}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                          <Link 
                            to={`/movies/${movie.id}`}
                            className="p-3 bg-zinc-800 text-zinc-400 hover:text-white rounded-xl transition-all"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link 
                            to={`/movies/${movie.id}/edit`}
                            className="p-3 bg-zinc-800 text-zinc-400 hover:text-secondary rounded-xl transition-all"
                          >
                            <Edit size={18} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(movie.id)}
                            className="p-3 bg-zinc-800 text-zinc-400 hover:text-red-500 rounded-xl transition-all"
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
        ) : (
          <div className="py-32 text-center glass-panel rounded-[2.5rem] border border-white/5 space-y-8">
             <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto border border-primary/10">
                <Film size={40} className="text-primary/40" />
             </div>
             <div className="space-y-4">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Your Archive is Barren</h3>
                <p className="text-zinc-500 text-sm max-w-sm mx-auto font-bold uppercase tracking-widest leading-loose">
                   Begin your sequence by appending cinematic records to the global database.
                </p>
             </div>
             <Link 
               to="/movies/new"
               className="inline-flex items-center gap-3 bg-primary text-white px-12 py-5 rounded-2xl font-black text-xs tracking-[0.2em] uppercase shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
             >
                <Plus size={20} /> Initialize First Entry
             </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
