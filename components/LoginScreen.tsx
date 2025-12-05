
import React, { useState } from 'react';
import { Lock, User, Key, ShieldCheck, AlertCircle, ArrowRight, Activity } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

const ACCOUNTS = [
  { user: 'admin', pass: '1234', role: 'Super Admin' },
  { user: 'trader', pass: 'alpha', role: 'Quant Trader' },
  { user: 'guest', pass: 'visitor', role: 'Observer' }
];

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const validUser = ACCOUNTS.find(
        (acc) => acc.user === username && acc.pass === password
      );

      if (validUser) {
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Access Denied.');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="h-screen w-full bg-[#05080f] flex items-center justify-center relative overflow-hidden font-sans">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none animate-[pulse_8s_infinite]"></div>
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      <div className="w-full max-w-md z-10 p-4">
        {/* Logo Section */}
        <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-900 to-blue-900 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)] mb-4">
                <Activity className="w-8 h-8 text-cyan-400" />
            </div>
            <h1 className="text-4xl font-bold text-white tracking-tighter">
                <span className="text-cyan-400">Yi Jin</span> Jing
            </h1>
            <p className="text-cyan-500/60 text-xs tracking-[0.2em] uppercase">Advanced Financial Intelligence</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0d121f]/80 backdrop-blur-xl border border-cyan-900/50 rounded-2xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            {/* Scanning line effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs text-cyan-300/70 font-mono uppercase tracking-wider ml-1">Identity</label>
                    <div className="relative group/input">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors" />
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-[#0A0E17] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600 font-mono"
                            placeholder="username"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-cyan-300/70 font-mono uppercase tracking-wider ml-1">Access Key</label>
                    <div className="relative group/input">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within/input:text-cyan-400 transition-colors" />
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#0A0E17] border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600 font-mono"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-400 text-xs bg-red-950/20 p-3 rounded border border-red-900/50 animate-in shake">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group/btn"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="font-mono tracking-wider">AUTHENTICATING...</span>
                        </>
                    ) : (
                        <>
                            <span className="tracking-wide">INITIALIZE SYSTEM</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        SECURE CONNECTION
                    </span>
                    <span className="opacity-50">V3.0.1 BUILD 9921</span>
                </div>
            </div>
        </div>

        {/* Credentials Hint (For Demo Purpose) */}
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 delay-500 duration-1000">
             <p className="text-xs text-slate-500 mb-2 uppercase tracking-widest">Available Demo Accounts</p>
             <div className="flex justify-center gap-4 text-xs font-mono text-cyan-600/80">
                <span className="bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900/30">admin / 1234</span>
                <span className="bg-cyan-950/30 px-2 py-1 rounded border border-cyan-900/30">trader / alpha</span>
             </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
