import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { UserPlus, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="relative z-10 w-full max-w-[480px]">
        <div className="text-center mb-10">
          <h1 className="text-primary text-5xl font-black tracking-tighter mb-2">CineTrack</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">Private Screening Portal</p>
        </div>

        <div className="glass-panel rounded-2xl shadow-2xl p-10">
          <div className="flex border-b border-white/5 mb-8">
            <Link to="/login" className="flex-1 pb-4 text-zinc-500 font-bold text-sm tracking-widest uppercase hover:text-white transition-all text-center">Login</Link>
            <button className="flex-1 pb-4 text-primary border-b-2 border-primary font-bold text-sm tracking-widest uppercase transition-all">Sign Up</button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Screen Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input 
                    type="text" 
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-800 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-sm"
                    placeholder="Marcus Vance"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">Professional Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-zinc-800 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-sm"
                    placeholder="name@cinetrack.pro"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest ml-1">New Passphrase</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-12 text-white placeholder-zinc-800 focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-medium text-sm"
                    placeholder="••••••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-2xl shadow-primary/20 active:scale-[0.98] transition-all hover:brightness-110 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
            >
              <UserPlus size={20} />
              {loading ? 'Creating Identity...' : 'Join the Archive'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
