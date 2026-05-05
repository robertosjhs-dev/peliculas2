import React from 'react';
import { Compass, Search, Filter } from 'lucide-react';

const Explore = () => {
  return (
    <div className="max-w-7xl mx-auto px-10 py-16 space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-secondary">
           <div className="w-12 h-0.5 bg-secondary" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Universal Archive</span>
        </div>
        <h1 className="text-6xl font-black text-white uppercase tracking-tighter leading-none italic">
           Discovery Hub
        </h1>
        <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest max-w-md">
           Navigate the complete cinematic multiverse indexed by CineTrack agents.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
         <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
            <input 
              type="text" 
              placeholder="SEARCH METADATA BY KEYWORD..."
              className="w-full bg-black/40 border border-white/5 rounded-2xl py-6 pl-16 pr-6 text-white placeholder-zinc-800 focus:border-secondary transition-all outline-none uppercase font-black tracking-widest text-xs"
            />
         </div>
         <button className="bg-white/5 border border-white/5 rounded-2xl px-10 py-6 flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-all">
            <Filter size={18} />
            Refine Parameters
         </button>
      </div>

      <div className="py-40 text-center glass-panel rounded-[2.5rem] bg-white/[0.01]">
         <div className="w-32 h-32 bg-secondary/5 rounded-full flex items-center justify-center mx-auto border border-secondary/10 mb-8">
            <Compass size={48} className="text-secondary/20 animate-pulse" />
         </div>
         <h3 className="text-3xl font-black text-zinc-700 uppercase tracking-tighter italic">Scanning multiverse...</h3>
         <p className="text-zinc-800 mt-4 text-[10px] font-black uppercase tracking-[0.4em]">Index synchronization in progress</p>
      </div>
    </div>
  );
};

export default Explore;
