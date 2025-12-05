
import React from 'react';
import { CheckCircle, Share2, Download } from 'lucide-react';

interface SettlementModalProps {
  onClose: () => void;
  trend: 'BULLISH' | 'BEARISH';
  t: any;
}

const SettlementModal: React.FC<SettlementModalProps> = ({ onClose, trend, t }) => {
  const isProfit = trend === 'BULLISH';
  
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-[#0d121f] border border-cyan-500/50 w-full max-w-sm rounded-xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)] relative">
        
        <div className="bg-[#0A0E17] p-6 text-center border-b border-dashed border-slate-700 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
             <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div className="mt-6 space-y-1">
             <h2 className="text-xl font-bold text-white tracking-wide">{t.settlementComplete}</h2>
             <p className="text-xs text-slate-400 font-mono">SETTLEMENT COMPLETE</p>
          </div>
        </div>

        <div className="p-6 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-500">{t.strategy}</span>
                    <span className="font-bold text-cyan-400 font-mono">MEHGT-V3 (Adaptive)</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-500">{t.principal}</span>
                    <span className="font-bold text-slate-200 font-mono">¥ 1,420,000.00</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-slate-500">{t.realizedPnl}</span>
                    <span className={`font-bold font-mono text-lg ${isProfit ? 'text-red-500' : 'text-green-500'}`}>
                        {isProfit ? '+¥ 12,580 (3.8%)' : '-¥ 2,100 (0.15%)'}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-500">{t.txHash}</span>
                    <span className="font-mono text-[10px] text-slate-400 bg-black/30 px-2 py-1 rounded">0x7a8...9f2b</span>
                </div>
            </div>

            <div className="pt-4 space-y-3">
                <button 
                    onClick={onClose}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    {t.archive}
                </button>
                <div className="flex gap-2">
                    <button className="flex-1 border border-slate-700 text-slate-400 py-2 rounded text-xs hover:bg-slate-800 flex items-center justify-center gap-1">
                        <Share2 className="w-3 h-3" /> {t.share}
                    </button>
                    <button className="flex-1 border border-slate-700 text-slate-400 py-2 rounded text-xs hover:bg-slate-800 flex items-center justify-center gap-1">
                        <Download className="w-3 h-3" /> {t.download}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettlementModal;
