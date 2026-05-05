import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Play, Star, Calendar, Clock, User, ArrowLeft, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import type { Movie } from '../../types';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        const docSnap = await getDoc(doc(db, 'movies', id));
        if (docSnap.exists()) {
          setMovie({ id: docSnap.id, ...docSnap.data() } as Movie);
        }
        setLoading(false);
      };
      fetchMovie();
    }
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!movie) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <h2 className="text-4xl font-black text-zinc-700 uppercase tracking-tighter italic">Entry Missing</h2>
      <Link to="/" className="text-primary font-black uppercase text-xs tracking-widest bg-primary/10 px-8 py-4 rounded-xl border border-primary/20">Return to Archive</Link>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0">
        <img 
          src={movie.posterUrl} 
          alt="" 
          className="w-full h-full object-cover blur-2xl opacity-20 scale-110"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-10 py-16">
        <button 
           onClick={() => navigate(-1)}
           className="mb-12 flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Archive
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Poster Column */}
          <motion.div 
             initial={{ opacity: 0, x: -40 }}
             animate={{ opacity: 1, x: 0 }}
             className="lg:col-span-4"
          >
            <div className="sticky top-32">
              <div className="aspect-[2/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                <img 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-8">
                 {[Heart, Share2, MoreHorizontal].map((Icon, i) => (
                   <button key={i} className="flex items-center justify-center py-4 bg-white/5 border border-white/5 rounded-2xl text-zinc-500 hover:text-white hover:bg-white/10 transition-all">
                      <Icon size={20} />
                   </button>
                 ))}
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="lg:col-span-8 space-y-12"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-secondary">
                 <div className="w-12 h-0.5 bg-secondary" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Official File #{movie.id.slice(0, 8)}</span>
              </div>
              <h1 className="text-7xl font-black text-white uppercase tracking-tighter leading-none italic">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-8 py-4 border-y border-white/5">
                 <div className="flex items-center gap-2 text-secondary font-black">
                    <Star size={20} fill="currentColor" />
                    <span className="text-xl tracking-widest">{movie.rating}/10</span>
                 </div>
                 <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase tracking-widest text-xs">
                    <Calendar size={16} /> {movie.releaseYear}
                 </div>
                 <div className="flex items-center gap-2 text-zinc-400 font-bold uppercase tracking-widest text-xs">
                    <User size={16} /> {movie.director}
                 </div>
                 <div className="flex items-center gap-2">
                    {movie.genres?.map(g => (
                      <span key={g} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-300">
                        {g}
                      </span>
                    ))}
                 </div>
              </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Cinematic Briefing</h3>
               <p className="text-xl text-zinc-400 font-medium leading-relaxed max-w-3xl">
                  {movie.synopsis}
               </p>
            </div>

            <div className="pt-12">
               <button className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase flex items-center gap-4 shadow-2xl shadow-primary/40 hover:brightness-110 active:scale-95 transition-all">
                  <Play size={24} fill="currentColor" />
                  Initiate Screening
               </button>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/5">
               <div className="space-y-3">
                  <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Archive Status</h4>
                  <p className="text-white font-bold uppercase tracking-widest text-sm">{movie.visibility} Archive</p>
               </div>
               <div className="space-y-3">
                  <h4 className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Encryption Key</h4>
                  <p className="text-white font-mono uppercase tracking-widest text-[10px] truncate">{movie.creatorId}</p>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
