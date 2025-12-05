import React, { useState, useEffect } from 'react';
import FinEXMonitor from './FinEXMonitor';
import MEHGTChart from './MEHGTChart';
import LogConsole from './LogConsole';
import KnowledgeGraphTopology from './KnowledgeGraphTopology';
import SystemHeatmap from './SystemHeatmap';
import PortfolioCard from './PortfolioCard';
import AssetDetail from './AssetDetail';
import SettlementModal from './SettlementModal';
import DeepSeekChat from './DeepSeekChat';
import { Cpu, Activity, Server, Power, Globe } from 'lucide-react';
import { TradingState, MarketTrend, Language, StockSymbol } from '../types';
import { TRANSLATIONS, STOCKS, COLORS } from '../constants';

const SYSTEM_TASKS = [
    "NVIDIA A100 (High Load)",
    "Allocating Tensor Cores...",
    "Syncing On-Chain Ledger...",
    "Optimizing MEHGT Gradients...",
    "Verifying Block Hashes..."
];

const Dashboard: React.FC = () => {
  // === GLOBAL SYSTEM STATE ===
  const [isSystemOn, setIsSystemOn] = useState(false);
  const [latency, setLatency] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  
  // === NEW: LOCALIZATION & STOCK STATE ===
  const [language, setLanguage] = useState<Language>('CN'); // Default to Chinese
  const [currentStock, setCurrentStock] = useState<StockSymbol>('CAMBRICON'); // Default to Cambricon

  // Helper to get current translations
  const t = TRANSLATIONS[language];

  // === TRADING LOOP STATE ===
  const [tradingState, setTradingState] = useState<TradingState>('IDLE');
  const [showAssetDetail, setShowAssetDetail] = useState(false);
  const [showSettlement, setShowSettlement] = useState(false);

  // === MARKET SIMULATION STATE ===
  const [marketTrend, setMarketTrend] = useState<MarketTrend>('BULLISH');
  const [pnlJitter, setPnlJitter] = useState(0);

  // 1. System Switch Logic
  const toggleSystem = () => {
      setIsSystemOn(prev => !prev);
      if (isSystemOn) {
          // Turning OFF
          setLatency(0);
          setTradingState('IDLE');
      } else {
          // Turning ON
          setLatency(12);
      }
  };

  // 2. Realism Effects
  useEffect(() => {
    if (!isSystemOn) return;

    const latInterval = setInterval(() => {
        setLatency(Math.floor(12 + Math.random() * 14));
    }, 2000);

    const taskInterval = setInterval(() => {
        setTaskIndex(prev => (prev + 1) % SYSTEM_TASKS.length);
    }, 3000);

    const moneyInterval = setInterval(() => {
        setPnlJitter(prev => prev + (Math.random() - 0.5) * 50);
    }, 1000);

    const trendInterval = setInterval(() => {
        setMarketTrend(prev => prev === 'BULLISH' ? 'BEARISH' : 'BULLISH');
    }, 20000);

    return () => {
        clearInterval(latInterval);
        clearInterval(taskInterval);
        clearInterval(moneyInterval);
        clearInterval(trendInterval);
    };
  }, [isSystemOn]);

  // 3. Trading Actions
  const handleSmartFollow = () => {
      if (!isSystemOn || tradingState !== 'IDLE') return;
      setTradingState('BUYING');
      setTimeout(() => setTradingState('HOLDING'), 2500);
  };

  const handleTakeProfit = () => {
      if (!isSystemOn || tradingState !== 'HOLDING') return;
      setTradingState('SELLING');
      setTimeout(() => {
          setTradingState('IDLE');
          setShowSettlement(true);
      }, 1500);
  };

  return (
    <div className="h-[100dvh] w-full bg-[#0A0E17] flex flex-col overflow-hidden relative font-sans text-slate-200">
      
      {/* Modals */}
      {showAssetDetail && (
        <AssetDetail 
          onClose={() => setShowAssetDetail(false)} 
          t={t} 
          currentStock={currentStock} 
        />
      )}
      {showSettlement && (
        <SettlementModal 
          onClose={() => setShowSettlement(false)} 
          trend={marketTrend} 
          t={t} 
        />
      )}
      
      {/* DeepSeek Chat */}
      <DeepSeekChat t={t} />

      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-900 via-cyan-500 to-cyan-900 opacity-50 z-30"></div>
      
      {/* 1. Header with Safe Area Padding */}
      <header 
        className="flex-none bg-[#0d121f]/90 backdrop-blur-md border-b border-slate-800 z-20 sticky top-0"
        style={{ paddingTop: 'env(safe-area-inset-top)' }} 
      >
        <div className="p-2 md:p-3">
          <div className="flex flex-wrap justify-between items-center gap-2">
            
            {/* Title Area */}
            <div className="flex items-center gap-2">
              <div className="bg-cyan-950/50 border border-cyan-500/30 px-2 py-1 md:px-3 md:py-1 rounded shadow-[0_0_10px_rgba(6,182,212,0.1)]">
                 <h1 className="text-cyan-400 font-bold tracking-wide text-sm md:text-lg whitespace-nowrap">
                   {t.appTitle} <span className="text-[9px] md:text-[10px] text-slate-400 ml-1">V3.1</span>
                 </h1>
              </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4 ml-auto">
              
              {/* Apple-style Language Switch */}
              <div className="flex items-center gap-1.5 cursor-pointer group" onClick={() => setLanguage(prev => prev === 'CN' ? 'EN' : 'CN')}>
                  <span className={`text-[10px] font-bold transition-colors ${language === 'EN' ? 'text-cyan-400' : 'text-slate-600'}`}>EN</span>
                  <div className={`
                      relative w-9 h-5 rounded-full transition-colors duration-300 ease-in-out shadow-inner
                      ${language === 'CN' ? 'bg-cyan-600' : 'bg-slate-700'}
                  `}>
                      <div className={`
                          absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300 ease-in-out
                          ${language === 'CN' ? 'translate-x-4' : 'translate-x-0'}
                      `}/>
                  </div>
                  <span className={`text-[10px] font-bold transition-colors ${language === 'CN' ? 'text-cyan-400' : 'text-slate-600'}`}>CN</span>
              </div>

              {/* MASTER SWITCH */}
              <button 
                onClick={toggleSystem}
                className={`flex items-center gap-1.5 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full border transition-all duration-500 text-[10px] md:text-xs font-bold font-mono tracking-wide
                    ${isSystemOn 
                        ? 'bg-red-950/40 border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                        : 'bg-slate-800 border-slate-600 text-slate-400'
                    }
                `}
              >
                 <Power className="w-3 h-3" />
                 {isSystemOn ? `🟢 ${t.running}` : `🔴 ${t.paused}`}
              </button>
            </div>
          </div>
          
          {/* Status Scroll Row */}
          <div className="flex gap-3 mt-2 overflow-x-auto pb-1 scrollbar-hide text-[9px] md:text-[10px] text-slate-400 font-mono whitespace-nowrap transition-opacity duration-500" style={{ opacity: isSystemOn ? 1 : 0.4 }}>
             <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50">
                <Cpu className={`w-3 h-3 text-cyan-500 ${isSystemOn && taskIndex % 2 === 0 ? 'animate-pulse' : ''}`} />
                <span className="min-w-[120px] md:min-w-[140px]">{t.node}: {isSystemOn ? SYSTEM_TASKS[taskIndex] : 'OFFLINE'}</span>
             </div>
             <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50">
                <Activity className="w-3 h-3 text-purple-500" />
                <span>{t.latency}: {latency}ms</span>
             </div>
             <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50">
                <Server className="w-3 h-3 text-blue-500" />
                <span>Nodes: {isSystemOn ? '8.4M' : '---'}</span>
             </div>
          </div>
        </div>
      </header>

      {/* 2. Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto p-2 md:p-3 space-y-2 md:space-y-3 pb-safe scrollbar-hide">
        
        {/* Section A: MEHGT Chart (Pass Stock props) */}
        <div className="w-full h-[240px] md:h-[280px]">
            <MEHGTChart 
                isSystemOn={isSystemOn} 
                marketTrend={marketTrend} 
                t={t}
                currentStock={currentStock}
                onStockChange={setCurrentStock}
            />
        </div>

        {/* Section A.1: Portfolio (Pass t and Stock) */}
        <div className="w-full">
            <PortfolioCard 
                onClick={() => setShowAssetDetail(true)}
                tradingState={tradingState}
                marketTrend={marketTrend}
                isSystemOn={isSystemOn}
                onBuy={handleSmartFollow}
                onSell={handleTakeProfit}
                pnlJitter={pnlJitter}
                t={t}
                currentStock={currentStock}
            />
        </div>

        {/* Section B: FinEX Monitor (Pass Language & t) */}
        <div className="w-full h-[160px] md:h-[180px]">
            <FinEXMonitor 
                isSystemOn={isSystemOn} 
                language={language}
                t={t}
            />
        </div>

        {/* Section C: Knowledge & Heatmap (Pass t) - Responsive Layout */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 min-h-[160px] md:h-[180px]">
            <div className="flex-1 min-w-0 h-[180px] md:h-auto">
                <KnowledgeGraphTopology t={t} isSystemOn={isSystemOn} />
            </div>
            <div className="flex-1 min-w-0 h-[180px] md:h-auto">
                <SystemHeatmap t={t} isSystemOn={isSystemOn} />
            </div>
        </div>

        {/* Section D: Logs (Pass t) */}
        <div className="w-full h-[120px] md:h-[150px]">
            <LogConsole t={t} language={language} />
        </div>

        <div className="h-6 text-center text-[9px] md:text-[10px] text-slate-600 pb-2">
            Yi Jin Jing · 2025 · DeepSeek Enhanced
        </div>
      </main>
    </div>
  );
};

export default Dashboard;