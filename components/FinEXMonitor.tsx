
import React, { useState, useEffect, useRef } from 'react';
import { MOCK_NEWS_CN, MOCK_NEWS_EN } from '../constants';
import { NewsItem, Language } from '../types';
import { Database, Rss, PauseCircle } from 'lucide-react';

interface FinEXMonitorProps {
    isSystemOn: boolean;
    language: Language;
    t: any;
}

const FinEXMonitor: React.FC<FinEXMonitorProps> = ({ isSystemOn, language, t }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Choose news pool based on language
  const pool = language === 'CN' ? MOCK_NEWS_CN : MOCK_NEWS_EN;
  const poolRef = useRef<string[]>([...pool]);

  // Update pool when language changes
  useEffect(() => {
    poolRef.current = [...(language === 'CN' ? MOCK_NEWS_CN : MOCK_NEWS_EN)];
    poolRef.current.sort(() => Math.random() - 0.5);
    // Reset news on language change to avoid mixing languages immediately
    const initialNews = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now().toString() + i,
      time: new Date(Date.now() - i * 60000).toLocaleTimeString([], { hour12: false }),
      title: poolRef.current[i % poolRef.current.length],
      confidence: 92 + Math.random() * 7,
      source: language === 'CN' ? '路透社' : 'Reuters',
      type: 'Notice' as const
    }));
    setNews(initialNews);
  }, [language]);

  const renderTitle = (title: string) => {
    // Regex matches [Something] at start or inside
    const parts = title.split(/(\[.*?\])/);
    return parts.map((part, index) => {
        if (part.startsWith('[') && part.endsWith(']')) {
            let colorClass = "text-slate-400";
            const content = part.toLowerCase();
            if (content.includes('预警') || content.includes('alert')) colorClass = "text-red-400";
            if (content.includes('公告') || content.includes('notice')) colorClass = "text-blue-400";
            if (content.includes('快讯') || content.includes('flash')) colorClass = "text-yellow-400";
            return <span key={index} className={`${colorClass} font-bold mr-1`}>{part}</span>;
        }
        return <span key={index}>{part}</span>;
    });
  };

  useEffect(() => {
    if (!isSystemOn) return; 

    const interval = setInterval(() => {
      let nextTitle = poolRef.current[Math.floor(Math.random() * poolRef.current.length)];
      setNews(prev => {
        // Avoid immediate duplicates
        let attempts = 0;
        while (prev.slice(0, 3).some(n => n.title === nextTitle) && attempts < 5) {
             nextTitle = poolRef.current[Math.floor(Math.random() * poolRef.current.length)];
             attempts++;
        }

        const sources = language === 'CN' 
            ? ['路透社', '彭博社', '财新', '华尔街日报'] 
            : ['Reuters', 'Bloomberg', 'WSJ', 'FT'];

        const newItem: NewsItem = {
            id: Date.now().toString(),
            time: new Date().toLocaleTimeString([], { hour12: false }),
            title: nextTitle,
            confidence: 85 + Math.random() * 14,
            source: sources[Math.floor(Math.random() * sources.length)],
            type: 'Notice'
        };
        return [newItem, ...prev].slice(0, 15);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isSystemOn, language]);

  return (
    <div className="flex flex-col h-full bg-[#0d121f] border border-cyan-900/50 rounded-lg overflow-hidden relative shadow-[0_0_10px_rgba(6,182,212,0.05)]">
      <div className="bg-[#0A0E17] p-2 border-b border-cyan-900/50 flex justify-between items-center">
        <h3 className="text-cyan-400 font-bold tracking-wider flex items-center gap-2 text-sm">
          <Rss className="w-3.5 h-3.5 text-orange-500" />
          {t.finexTitle}
        </h3>
        {isSystemOn ? (
            <span className="text-[9px] bg-cyan-900/30 text-cyan-300 px-1.5 py-px rounded border border-cyan-800 flex items-center gap-1">
                <Database className="w-2.5 h-2.5" />
                {t.nlpStream}
            </span>
        ) : (
            <span className="text-[9px] text-slate-600 flex items-center gap-1">
                <PauseCircle className="w-2.5 h-2.5" />
                {t.paused}
            </span>
        )}
      </div>

      <div className={`flex-1 overflow-y-auto p-2 space-y-2 font-mono text-sm relative scrollbar-hide ${!isSystemOn ? 'opacity-50 grayscale' : ''}`} ref={scrollRef}>
        {news.map((item, idx) => (
          <div 
            key={item.id} 
            className={`
                border-l-[2px] pl-2 py-1 transition-all duration-500
                ${idx === 0 && isSystemOn ? 'border-cyan-400 bg-cyan-900/10' : 'border-slate-800/50 opacity-70'}
            `}
          >
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="text-[10px] text-slate-500 tracking-tight">{item.time}</span>
              <span className="text-[10px] font-bold text-emerald-500">Conf: {item.confidence?.toFixed(1)}%</span>
            </div>
            <p className="text-slate-300 text-xs leading-tight font-sans tracking-tight line-clamp-2">
                {renderTitle(item.title)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinEXMonitor;
