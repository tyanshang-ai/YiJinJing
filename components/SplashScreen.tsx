
import React, { useEffect, useState } from 'react';
import { LOADING_MESSAGES } from '../constants';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(LOADING_MESSAGES[0]);

  useEffect(() => {
    const totalDuration = 4000; // 4 seconds load time
    const step = 50;
    const increment = 100 / (totalDuration / step);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small delay before unmount
          return 100;
        }
        
        // Update message based on progress
        const messageIndex = Math.floor((prev / 100) * LOADING_MESSAGES.length);
        setCurrentMessage(LOADING_MESSAGES[Math.min(messageIndex, LOADING_MESSAGES.length - 1)]);
        
        return prev + increment;
      });
    }, step);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0A0E17] text-cyan-500 font-mono p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo Section */}
        <div className="text-center space-y-2 animate-pulse">
          <h1 className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
            易金经
          </h1>
          <h2 className="text-2xl tracking-widest text-white/80 uppercase font-light">Yi Jin Jing</h2>
          <p className="text-sm text-cyan-500/60 mt-4 tracking-widest uppercase">
            LLM 驱动 · 金融全链路解决方案
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs uppercase tracking-widest text-cyan-300/50">
            <span>系统初始化</span>
            <span>{Math.round(progress)}%</span>
          </div>
          
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div 
              className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-100 ease-linear relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-[pulse_1s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>

        {/* Terminal Text */}
        <div className="h-8 font-mono text-xs md:text-sm text-cyan-400/80 truncate">
          <span className="mr-2 text-green-500">➜</span>
          <span className="typing-effect">{currentMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
