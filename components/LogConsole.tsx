
import React, { useState, useEffect, useRef } from 'react';
import { LOG_TEMPLATES_CN, LOG_TEMPLATES_EN } from '../constants';
import { LogEntry, Language } from '../types';
import { Terminal } from 'lucide-react';

interface LogConsoleProps {
    t: any;
    language: Language;
}

const LogConsole: React.FC<LogConsoleProps> = ({ t, language }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pool = language === 'CN' ? LOG_TEMPLATES_CN : LOG_TEMPLATES_EN;

  useEffect(() => {
    const addLog = () => {
      // Pick random template from current pool
      const currentPool = language === 'CN' ? LOG_TEMPLATES_CN : LOG_TEMPLATES_EN;
      const template = currentPool[Math.floor(Math.random() * currentPool.length)];
      const type = template.includes('Risk') || template.includes('风险') ? 'warning' : template.includes('Error') ? 'error' : 'info';
      
      const newLog: LogEntry = {
        id: Date.now().toString() + Math.random(),
        timestamp: new Date().toISOString().split('T')[1].replace('Z', ''),
        message: template,
        type
      };

      setLogs(prev => [...prev.slice(-20), newLog]);
    };

    const interval = setInterval(addLog, 1200);
    return () => clearInterval(interval);
  }, [language]); // Re-subscribe when language changes to switch pool

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-black border border-slate-800 rounded-lg overflow-hidden font-mono text-[10px] shadow-inner">
      <div className="bg-slate-900 p-1.5 border-b border-slate-800 flex justify-between items-center">
        <span className="text-slate-400 flex items-center gap-2 text-xs">
            <Terminal className="w-3 h-3" />
            {t.logs} [TMKG_CORE]
        </span>
        <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-2 space-y-0.5 bg-[#050505]"
      >
        {logs.map((log) => (
          <div key={log.id} className="flex gap-2 hover:bg-white/5 p-px rounded">
            <span className="text-slate-600 shrink-0">[{log.timestamp.slice(0,8)}]</span>
            <span className={`
              ${log.type === 'warning' ? 'text-orange-400' : ''}
              ${log.type === 'error' ? 'text-red-500 font-bold' : ''}
              ${log.type === 'info' ? 'text-slate-300' : ''}
            `}>
              {log.type === 'warning' ? 'WARN ' : log.type === 'info' ? '> ' : 'ERR  '}
               {log.message}
            </span>
          </div>
        ))}
        <div className="animate-pulse text-green-500">_</div>
      </div>
    </div>
  );
};

export default LogConsole;
