
import React from 'react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { X, TrendingUp, PieChart as PieIcon, History } from 'lucide-react';
import { StockSymbol } from '../types';
import { STOCKS } from '../constants';

interface AssetDetailProps {
  onClose: () => void;
  t: any;
  currentStock: StockSymbol;
}

const YIELD_HISTORY = [
    { id: 1, date: '10-24', type: 'MEHGT Strategy', amount: '+ ¥ 1,240', rate: '+1.2%' },
    { id: 2, date: '10-23', type: 'Arbitrage', amount: '+ ¥ 890', rate: '+0.8%' },
    { id: 3, date: '10-22', type: 'Liquidity', amount: '+ ¥ 2,100', rate: '+2.1%' },
    { id: 4, date: '10-21', type: 'Rebalance', amount: '- ¥ 120', rate: '-0.1%' },
    { id: 5, date: '10-20', type: 'MEHGT Strategy', amount: '+ ¥ 3,400', rate: '+3.2%' },
];

const AssetDetail: React.FC<AssetDetailProps> = ({ onClose, t, currentStock }) => {
    // Dynamic config based on selected stock
    const CHART_DATA_CONFIG = [
      { name: `${STOCKS[currentStock].name} (股票)`, value: 70, color: STOCKS[currentStock].color }, 
      { name: '现金 (CNY)', value: 30, color: '#10b981' }, 
    ];

    const pnlData = Array.from({ length: 30 }).map((_, i) => {
        const x = i;
        const value = 1.0 + (x * 0.008) + (Math.random() * 0.02);
        return {
            day: i % 5 === 0 ? `T-${30 - i}` : '',
            value: value,
        };
    });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-200">
      <div className="bg-[#0d121f] border border-cyan-500/30 w-full max-w-lg max-h-[90vh] rounded-xl flex flex-col relative shadow-[0_0_50px_rgba(168,85,247,0.15)] overflow-hidden">
        
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-[#0A0E17]">
            <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                    <PieIcon className="w-5 h-5 text-purple-400" />
                    {t.assetPerspective}
                </h2>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5 tracking-wider">ASSET PERSPECTIVE & ATTRIBUTION</p>
            </div>
            <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
            >
                <X className="w-6 h-6" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
            
            <div className="space-y-2">
                <h3 className="text-sm font-bold text-cyan-400 flex items-center gap-2 bg-cyan-950/20 p-2 rounded border-l-2 border-cyan-400">
                    <TrendingUp className="w-4 h-4" /> {t.cumulativeNetValue}
                </h3>
                <div className="h-[180px] w-full bg-slate-900/50 rounded p-2 border border-slate-800 relative">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={pnlData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="day" tick={{fontSize: 9, fill: '#64748b'}} axisLine={false} tickLine={false} />
                            <YAxis domain={['dataMin - 0.05', 'dataMax + 0.05']} tick={{fontSize: 9, fill: '#64748b'}} axisLine={false} tickLine={false} width={30} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }}
                                itemStyle={{ color: '#34d399' }}
                                formatter={(value: number) => [`${value.toFixed(4)}`, 'Net Value']}
                                labelStyle={{ color: '#94a3b8' }}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#22d3ee" 
                                strokeWidth={3} 
                                dot={false} 
                                activeDot={{r: 6, fill: '#fff', stroke: '#22d3ee'}} 
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2 bg-purple-950/20 p-2 rounded border-l-2 border-purple-500">
                    <PieIcon className="w-4 h-4" /> {t.assetAllocation}
                </h3>
                <div className="h-[220px] w-full bg-slate-900/50 rounded p-2 border border-slate-800 flex relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={CHART_DATA_CONFIG}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="value"
                                stroke="none"
                            >
                                {CHART_DATA_CONFIG.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend 
                                verticalAlign="middle" 
                                align="right" 
                                layout="vertical"
                                iconType="circle"
                                wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                            />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '12px' }} />
                        </PieChart>
                     </ResponsiveContainer>
                     <div className="absolute top-1/2 left-1/2 -translate-x-[80px] -translate-y-[10px] text-center pointer-events-none">
                         <div className="text-[10px] text-slate-500">Total</div>
                         <div className="text-sm font-bold text-white">100%</div>
                     </div>
                </div>
            </div>

            <div className="space-y-2">
                 <h3 className="text-sm font-bold text-orange-400 flex items-center gap-2 bg-orange-950/20 p-2 rounded border-l-2 border-orange-400">
                    <History className="w-4 h-4" /> {t.recentYields}
                </h3>
                <div className="bg-slate-900/50 rounded border border-slate-800 overflow-hidden">
                    {YIELD_HISTORY.map((item, idx) => (
                        <div key={item.id} className={`flex justify-between items-center p-3 border-b border-slate-800/50 last:border-0 ${idx % 2 === 0 ? 'bg-white/5' : ''}`}>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-300 font-bold">{item.type}</span>
                                <span className="text-[10px] text-slate-500 font-mono">{item.date}</span>
                            </div>
                            <div className="text-right">
                                <div className={`text-sm font-mono font-bold ${item.amount.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                                    {item.amount}
                                </div>
                                <div className={`text-[10px] ${item.amount.startsWith('+') ? 'text-red-500/70' : 'text-green-500/70'}`}>
                                    {item.rate}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default AssetDetail;
