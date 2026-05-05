import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { LogIn, Github, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { cn } from '../../lib/utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-secondary/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="relative z-10 w-full max-w-[480px]">
        <div className="text-center mb-10">
          <h1 className="text-primary text-5xl font-black tracking-tighter mb-2">CineTrack</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">Private Screening Portal</p>
        </div>

        <div className="glass-panel rounded-2xl shadow-2xl p-10">
          <div className="flex border-b border-white/5 mb-8">
            <button className="flex-1 pb-4 text-primary border-b-2 border-primary font-bold text-sm tracking-widest uppercase transition-all">Login</button>
            <Link to="/register" className="flex-1 pb-4 text-zinc-500 font-bold text-sm tracking-widest uppercase hover:text-white transition-all text-center">Sign Up</Link>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs p-4 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button" 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-xl py-3 px-4 hover:bg-white/10 transition-all active:scale-95 group"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Google</span>
              </button>
              <button 
                type="button" 
                className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-xl py-3 px-4 hover:bg-white/10 transition-all active:scale-95 group"
              >
                <Github size={16} className="text-white" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Github</span>
              </button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-zinc-600 text-[9px] font-black uppercase tracking-[0.3em]">or continue with email</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            <div className="space-y-4">
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
                <div className="flex justify-between items-end px-1">
                  <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Passphrase</label>
                  <a href="#" className="text-[9px] text-secondary/60 hover:text-secondary uppercase tracking-widest font-black transition-colors">Forgot?</a>
                </div>
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
              <LogIn size={20} />
              {loading ? 'Authorizing...' : 'Authorize Access'}
            </button>
            
            <p className="text-center text-[10px] text-zinc-600 leading-relaxed uppercase tracking-wider font-bold">
              By entering, you agree to our <a href="#" className="text-zinc-300 underline underline-offset-4 hover:text-white transition-colors">Terms of Screening</a> and our <a href="#" className="text-zinc-300 underline underline-offset-4 hover:text-white transition-colors">Data Privacy Policy</a>.
            </p>
          </form>
        </div>

        <div className="mt-8 flex justify-center gap-8">
          <a href="#" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors group">
            <span className="text-[10px] font-bold uppercase tracking-widest">Support</span>
          </a>
          <a href="#" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors group">
            <span className="text-[10px] font-bold uppercase tracking-widest">System Status</span>
          </a>
        </div>
      </div>
      
      <footer className="fixed bottom-6 w-full text-center opacity-30 pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-black">© 2026 CineTrack Pro. Encrypted Session.</p>
      </footer>
    </div>
  );
};

export default Login;
