import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../lib/firebase';
import { useMovies } from '../../hooks/useMovies';
import { Save, Trash2, ArrowLeft, Image as ImageIcon, Star, RotateCcw } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Movie, Visibility } from '../../types';

const genresList = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Documentary', 'Animation', 'Mystery', 'Crime'];

const MovieEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createMovie, updateMovie, deleteMovie } = useMovies();
  
  const [loading, setLoading] = useState(id ? true : false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Movie>>({
    title: '',
    director: '',
    releaseYear: new Date().getFullYear(),
    synopsis: '',
    genres: [],
    posterUrl: '',
    rating: 5,
    visibility: 'draft' as Visibility,
    isFeatured: false,
  });

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        const docRef = doc(db, 'movies', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data() as Movie);
        } else {
          navigate('/dashboard');
        }
        setLoading(false);
      };
      fetchMovie();
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (id) {
        await updateMovie(id, formData);
      } else {
        await createMovie(formData);
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres?.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...(prev.genres || []), genre]
    }));
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-10 py-16">
      <div className="flex items-center justify-between mb-12">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Archive
        </button>

        <div className="flex items-center gap-4">
          {id && (
            <button 
              onClick={async () => {
                if (window.confirm('Erase this cinematic record forever?')) {
                  await deleteMovie(id);
                  navigate('/dashboard');
                }
              }}
              className="p-3 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
            >
              <Trash2 size={20} />
            </button>
          )}
          <button 
            type="submit" 
            form="movie-form"
            disabled={saving}
            className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center gap-2 shadow-2xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <Save size={18} />
            {saving ? 'Recording...' : (id ? 'Update Record' : 'Record Entry')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Form */}
        <div className="lg:col-span-2">
          <form id="movie-form" onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-6 glass-panel rounded-3xl p-10">
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-1">Archive Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="E.g. Inception"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-xl font-bold text-white placeholder-zinc-800 focus:border-primary transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-1">Visionary Director</label>
                  <input 
                    type="text" 
                    value={formData.director}
                    onChange={e => setFormData({ ...formData, director: e.target.value })}
                    required
                    placeholder="Christopher Nolan"
                    className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-white placeholder-zinc-800 focus:border-primary transition-all outline-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-1">Release Year</label>
                  <input 
                    type="number" 
                    value={formData.releaseYear}
                    onChange={e => setFormData({ ...formData, releaseYear: parseInt(e.target.value) })}
                    required
                    className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-white placeholder-zinc-800 focus:border-primary transition-all outline-none font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-1">Cinematic Synopsis</label>
                <textarea 
                  value={formData.synopsis}
                  onChange={e => setFormData({ ...formData, synopsis: e.target.value })}
                  required
                  rows={6}
                  placeholder="Describe the cinematic journey..."
                  className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 text-white placeholder-zinc-800 focus:border-primary transition-all outline-none font-medium leading-relaxed"
                />
              </div>
            </div>

            <div className="space-y-6 glass-panel rounded-3xl p-10">
               <div className="space-y-4">
                  <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-1">Genre Classification</label>
                  <div className="flex flex-wrap gap-3">
                    {genresList.map(genre => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => handleGenreToggle(genre)}
                        className={cn(
                          "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all",
                          formData.genres?.includes(genre)
                            ? "bg-secondary text-black border-secondary"
                            : "bg-white/5 text-zinc-500 border-white/10 hover:border-white/30"
                        )}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8 pt-4">
                  <div className="space-y-4">
                    <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-1">Critical Rating ({formData.rating}/10)</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="10" 
                      step="1"
                      value={formData.rating}
                      onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                      className="w-full accent-primary bg-zinc-800 rounded-lg h-2"
                    />
                    <div className="flex justify-between text-[9px] text-zinc-600 font-black uppercase tracking-widest">
                       <span>Flop</span>
                       <span>Masterpiece</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-1">Visibility Protocols</label>
                    <div className="flex gap-2">
                       {['public', 'private', 'draft'].map((v) => (
                         <button
                           key={v}
                           type="button"
                           onClick={() => setFormData({ ...formData, visibility: v as Visibility })}
                           className={cn(
                             "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all",
                             formData.visibility === v
                               ? "bg-primary text-white border-primary"
                               : "bg-black/20 text-zinc-600 border-white/5 hover:border-white/10"
                           )}
                         >
                           {v}
                         </button>
                       ))}
                    </div>
                  </div>
               </div>
            </div>
          </form>
        </div>

        {/* Right Column: Preview/Metadata */}
        <div className="space-y-10">
          <div className="glass-panel rounded-3xl p-8 space-y-6">
            <div className="space-y-4">
               <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-1">Poster Metapath (URL)</label>
               <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input 
                    type="url" 
                    value={formData.posterUrl}
                    onChange={e => setFormData({ ...formData, posterUrl: e.target.value })}
                    placeholder="https://image-cloud.com/poster.jpg"
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-800 focus:border-primary transition-all outline-none font-bold text-sm"
                  />
               </div>
            </div>

            <div className="aspect-[2/3] w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 relative group">
              {formData.posterUrl ? (
                <img 
                  src={formData.posterUrl} 
                  alt="Poster Preview" 
                  className="w-full h-full object-cover transition-all"
                  onError={() => console.log('Poster URL failed to load')}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 gap-4">
                  <ImageIcon size={48} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Visualization</span>
                </div>
              )}
              <div className="absolute inset-0 poster-gradient" />
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="text-white font-black text-xl uppercase tracking-tighter truncate">{formData.title || 'Untitled Entry'}</h4>
                <p className="text-secondary text-[10px] font-black uppercase tracking-[0.2em] mt-1">{formData.director || 'Visionary Name'}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 space-y-6">
             <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">System Overrides</h3>
             <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex flex-col gap-1">
                   <span className="text-xs font-black text-white uppercase tracking-widest">Featured Status</span>
                   <span className="text-[9px] text-zinc-600 uppercase font-black">Display on global headers</span>
                </div>
                <button 
                  type="button"
                  onClick={() => setFormData({ ...formData, isFeatured: !formData.isFeatured })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-all relative",
                    formData.isFeatured ? "bg-primary" : "bg-zinc-800"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                    formData.isFeatured ? "left-7" : "left-1"
                  )} />
                </button>
             </div>
             
             <button 
              type="button"
              onClick={() => {
                if(window.confirm('Reset cinematic metadata to defaults?')) {
                   setFormData({
                    title: '',
                    director: '',
                    releaseYear: 2024,
                    synopsis: '',
                    genres: [],
                    posterUrl: '',
                    rating: 5,
                    visibility: 'draft',
                    isFeatured: false,
                   });
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-4 text-zinc-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
             >
                <RotateCcw size={16} /> Reset Parameters
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieEditor;
