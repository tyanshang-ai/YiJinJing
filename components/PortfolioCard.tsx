
import React, { useState, useEffect } from 'react';
import { Wallet, ArrowUpRight, ChevronRight, Terminal, Loader2, Zap, ShieldAlert, CheckCircle, Lock } from 'lucide-react';
import { TradingState, MarketTrend, StockSymbol } from '../types';
import { STOCKS } from '../constants';

interface PortfolioCardProps {
    onClick?: () => void;
    tradingState: TradingState;
    marketTrend: MarketTrend;
    isSystemOn: boolean;
    onBuy: () => void;
    onSell: () => void;
    pnlJitter: number;
    t: any;
    currentStock: StockSymbol;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ 
    onClick, tradingState, marketTrend, isSystemOn, onBuy, onSell, pnlJitter, t, currentStock
}) => {
  const [logs, setLogs] = useState<string[]>([]);
  const stockInfo = STOCKS[currentStock];
  
  // P&L logic (CNY)
  const basePnl = 12400;
  const currentPnl = marketTrend === 'BULLISH' ? basePnl + pnlJitter : -2100 + pnlJitter;
  const pnlPercent = marketTrend === 'BULLISH' ? '3.8%' : '-0.15%';
  // Chinese: Red = Profit/Up, Green = Loss/Down
  const pnlColor = marketTrend === 'BULLISH' ? 'text-red-500' : 'text-green-500'; 
  const pnlIconRot = marketTrend === 'BULLISH' ? '' : 'rotate-180';

  const isHolding = tradingState === 'HOLDING' || tradingState === 'SELLING';
  const stockPercent = isHolding ? 90 : 20; 
  const cashPercent = isHolding ? 10 : 80;

  // Log Logic
  useEffect(() => {
    if (tradingState === 'BUYING') {
        setLogs([]);
        const steps = [
            { msg: `[Step 1] MEHGT Signal Verified (${currentStock})... OK`, delay: 200 },
            { msg: "[Step 2] Route Optimization... OK", delay: 800 },
            { msg: `[Step 3] Broadcast Tx (Ref: 0x8f2a...)`, delay: 1600 },
            { msg: "[Success] Rebalance Complete.", delay: 2200 }
        ];
        steps.forEach(step => {
            setTimeout(() => setLogs(prev => [...prev, step.msg]), step.delay);
        });
    } else if (tradingState === 'SELLING') {
        setLogs(["[Order] Take Profit Queued...", "[System] Clearing positions..."]);
    }
  }, [tradingState, currentStock]);

  return (
    <div className="flex flex-col w-full bg-[#0d121f] border border-cyan-900/50 rounded-lg overflow-hidden relative shadow-[0_0_10px_rgba(6,182,212,0.05)] p-2 md:p-3 space-y-2 md:space-y-3 transition-colors hover:border-cyan-700/50 group">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-1 md:pb-2">
        <h3 className="text-indigo-400 font-bold tracking-wider flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
          <Wallet className="w-3.5 h-3.5 md:w-4 md:h-4" />
          {t.assetAccount}
        </h3>
        <span className="text-[9px] md:text-[10px] text-slate-500 font-mono bg-slate-800/50 px-1.5 py-0.5 rounded">ID: 8829103-X</span>
      </div>

      {/* Clickable Assets & PnL Area */}
      <div 
        role="button"
        onClick={onClick}
        className="flex justify-between items-end cursor-pointer rounded-md bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 p-2 -mx-1 transition-all relative active:scale-[0.99]"
      >
        <div>
          <div className="text-[9px] md:text-[10px] text-slate-400 mb-0.5 md:mb-1 flex items-center gap-1">
             {t.totalAsset}
             <span className={`w-1.5 h-1.5 rounded-full ${isSystemOn ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></span>
          </div>
          <div className="text-xl md:text-2xl font-bold text-white tracking-tight font-mono transition-all duration-300">
            ¥ {(1420592 + currentPnl).toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="text-right">
           <div className="text-[9px] md:text-[10px] text-slate-400 mb-0.5 md:mb-1">{t.todayPnl}</div>
           <div className={`flex items-center justify-end gap-1 font-bold font-mono text-sm md:text-lg transition-colors duration-500 ${pnlColor}`}>
             <ArrowUpRight className={`w-3.5 h-3.5 md:w-4 md:h-4 ${pnlIconRot}`} />
             {currentPnl > 0 ? '+' : ''}{currentPnl.toLocaleString('zh-CN', { minimumFractionDigits: 0 })} ({pnlPercent})
           </div>
        </div>
        
        <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-5 h-5 text-slate-500/50" />
        </div>
      </div>

      {/* Holdings Bar (Animated) */}
      <div className="space-y-1 pointer-events-none select-none">
        <div className="flex justify-between text-[9px] md:text-[10px] text-slate-400 font-mono uppercase transition-all duration-500">
            <span className="font-bold" style={{ color: stockInfo.color }}>{stockInfo.name} {stockPercent}%</span>
            <span className="text-emerald-400 font-bold transition-all duration-1000">CASH {cashPercent}%</span>
        </div>
        <div className="flex h-1 md:h-1.5 w-full rounded-full overflow-hidden bg-slate-800">
            <div className="h-full w-[35%] shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" style={{ backgroundColor: stockInfo.color, width: `${stockPercent}%` }}></div>
            <div 
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000 ease-in-out" 
                style={{ width: `${cashPercent}%` }}
            ></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-5 gap-2 md:gap-3 pt-1">
        
        {/* BUY BUTTON */}
        <button
          onClick={(e) => { e.stopPropagation(); onBuy(); }}
          disabled={!isSystemOn || tradingState !== 'IDLE'}
          className={`
            col-span-3 relative group overflow-hidden py-2 md:py-2.5 rounded flex items-center justify-center gap-1 md:gap-2 transition-all active:scale-[0.98] border
            ${!isSystemOn 
                ? 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed' 
                : tradingState === 'IDLE' 
                    ? 'bg-emerald-700 hover:bg-emerald-600 text-white border-emerald-500/30 shadow-[0_0_15px_rgba(4,120,87,0.3)]' 
                    : 'bg-emerald-900/50 border-emerald-900 text-emerald-500/50 cursor-not-allowed'
            }
          `}
        >
            {tradingState === 'BUYING' ? (
                <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" />
            ) : !isSystemOn ? (
                <Lock className="w-3 h-3" />
            ) : (
                <Zap className={`w-3 h-3 md:w-4 md:h-4 ${tradingState === 'IDLE' ? 'fill-emerald-100 text-emerald-100' : ''}`} />
            )}
            <span className="font-bold text-[10px] sm:text-xs md:text-sm tracking-wide truncate px-1">
                {!isSystemOn ? t.systemOff : tradingState === 'IDLE' ? t.smartFollow : tradingState === 'BUYING' ? t.executing : t.holding}
            </span>
        </button>

        {/* SELL BUTTON */}
        <button
          onClick={(e) => { e.stopPropagation(); onSell(); }}
          disabled={!isSystemOn || tradingState !== 'HOLDING'}
          className={`
            col-span-2 border py-2 md:py-2.5 rounded flex items-center justify-center gap-1 md:gap-2 transition-all active:scale-[0.98]
            ${tradingState === 'HOLDING' && isSystemOn
                ? 'border-red-500/40 text-red-400 hover:bg-red-950/30 cursor-pointer'
                : 'border-slate-800 text-slate-600 bg-slate-900/50 cursor-not-allowed'
            }
          `}
        >
          {tradingState === 'SELLING' ? <Loader2 className="w-3 h-3 md:w-4 md:h-4 animate-spin" /> : <ShieldAlert className="w-3 h-3 md:w-4 md:h-4" />}
          <span className="font-bold text-[10px] sm:text-xs md:text-sm tracking-wide truncate px-1">
             {tradingState === 'SELLING' ? t.clearing : t.takeProfit}
          </span>
        </button>
      </div>

      {/* Execution Module Log (Reactive) */}
      {(tradingState === 'BUYING' || tradingState === 'SELLING' || tradingState === 'HOLDING') && logs.length > 0 && (
        <div className="bg-black/50 border border-slate-800 rounded p-1.5 md:p-2 mt-1 md:mt-2 font-mono text-[9px] md:text-[10px] animate-in slide-in-from-top-2 duration-300">
            <div className="flex items-center gap-1.5 text-slate-500 border-b border-slate-800 pb-1 mb-1">
                <Terminal className="w-3 h-3" />
                <span>MEHGT_EXECUTION_LAYER</span>
            </div>
            <div className="space-y-0.5 md:space-y-1 max-h-[60px] md:max-h-[80px] overflow-y-auto scrollbar-hide">
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-2 text-cyan-300/90 animate-in fade-in slide-in-from-left-2 duration-300">
                        <span className="text-slate-600">&gt;</span>
                        <span>{log}</span>
                    </div>
                ))}
            </div>
            {tradingState === 'HOLDING' && logs.length > 3 && (
                 <div className="mt-1 pt-1 border-t border-slate-800 text-emerald-400 flex items-center gap-1 animate-in zoom-in duration-300">
                    <CheckCircle className="w-3 h-3" />
                    <span className="font-bold">EXECUTION SUCCESSFUL</span>
                 </div>
            )}
        </div>
      )}
    </div>
  );
};

export default PortfolioCard;
