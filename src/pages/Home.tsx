import React from 'react';
import { motion } from 'motion/react';
import { Play, Info, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

const Home = () => {
  const { movies, loading } = useMovies();
  const { user } = useAuth();
  
  const featuredMovie = movies.find(m => m.isFeatured && m.visibility === 'public') || movies.find(m => m.visibility === 'public');
  const publicMovies = movies.filter(m => m.visibility === 'public');

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="pb-20">
      {/* Hero Section */}
      {featuredMovie && (
        <section className="relative h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src={featuredMovie.posterUrl} 
              alt={featuredMovie.title} 
              className="w-full h-full object-cover blur-sm opacity-40 scale-105"
            />
            <div className="absolute inset-0 hero-gradient" />
          </div>

          <div className="relative z-10 w-full max-w-5xl px-10 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.4em]">The Ultimate Cinematic Archive</span>
                <span className="h-px w-12 bg-secondary/30" />
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white uppercase leading-[0.9] tracking-tighter">
                {featuredMovie.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? "text-primary" : ""}>{word} </span>
                ))}
              </h1>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="flex items-center gap-6"
            >
              <div className="flex items-center gap-2 text-secondary">
                 <Star size={16} fill="currentColor" />
                 <span className="font-black text-sm">{featuredMovie.rating}/10</span>
              </div>
              <div className="text-zinc-400 text-xs font-bold uppercase tracking-widest">
                {featuredMovie.director} • {featuredMovie.releaseYear} • {featuredMovie.genres?.[0] || 'Feature'}
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl text-zinc-400 text-sm md:text-lg leading-relaxed font-medium"
            >
              {featuredMovie.synopsis}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link 
                to={`/movies/${featuredMovie.id}`}
                className="bg-primary text-white px-10 py-4 font-black rounded-xl shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 text-xs tracking-widest uppercase"
              >
                <Play size={18} fill="currentColor" />
                Watch Trailer
              </Link>
              <Link 
                to={`/movies/${featuredMovie.id}`}
                className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-4 font-black rounded-xl hover:bg-white/10 transition-all text-xs tracking-widest uppercase"
              >
                View Details
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Movie Grid */}
      <section className="px-10 max-w-[1440px] mx-auto mt-20">
        <div className="flex items-end justify-between mb-12 border-b border-white/5 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-secondary">
              <div className="w-10 h-0.5 bg-secondary" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Global Pulse</span>
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">Trending Now</h2>
          </div>
          <button className="text-zinc-500 hover:text-white transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest py-2">
            View All <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10">
          {publicMovies.map((movie, index) => (
            <motion.div 
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <Link to={`/movies/${movie.id}`}>
                <div className="relative aspect-[2/3] mb-5 overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 shadow-2xl transition-all duration-500 hover:border-secondary/50 group">
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 poster-gradient opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10">
                    <Star size={12} className="text-secondary fill-secondary" />
                    <span className="text-secondary font-black text-xs">{movie.rating}</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                     <button className="w-full bg-white text-black py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-secondary transition-colors">
                        Quick Preview
                     </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors uppercase truncate">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                    <span>{movie.genres?.[0] || 'Drama'}</span>
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                    <span>{movie.releaseYear}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
          
          {!loading && publicMovies.length === 0 && (
            <div className="col-span-full py-20 text-center glass-panel rounded-3xl">
               <Film size={48} className="mx-auto text-zinc-700 mb-6" />
               <h3 className="text-xl font-bold text-zinc-400 uppercase tracking-widest">The Archive is Empty</h3>
               <p className="text-zinc-600 mt-2 text-sm uppercase tracking-widest font-bold">Be the first to record a cinematic entry</p>
               {user && (
                 <Link to="/movies/new" className="inline-block mt-8 bg-primary/10 text-primary border border-primary/20 px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                    Add Entry
                 </Link>
               )}
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Placeholder */}
      <section className="py-32 px-10">
        <div className="max-w-4xl mx-auto glass-panel rounded-[2rem] p-16 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full" />
          
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter italic">Stay Ahead of the Screen</h2>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto font-medium">Get exclusive industry insights, early screening alerts, and curated movie lists delivered to your private inbox.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4">
            <input 
              type="email" 
              placeholder="ENTER YOUR EMAIL"
              className="bg-black/40 border border-white/5 rounded-2xl px-6 py-4 w-full text-white placeholder-zinc-800 focus:border-secondary focus:ring-0 transition-colors uppercase text-[10px] tracking-widest font-black"
            />
            <button className="bg-primary text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:brightness-110 transition-all shadow-2xl shadow-primary/20 shrink-0">
              Join Now
            </button>
          </div>
          <p className="text-[9px] text-zinc-700 uppercase tracking-[0.3em] font-black">No Spam. Just Cinema.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
