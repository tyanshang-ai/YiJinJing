
import React, { useState, useEffect, useRef } from 'react';
import { 
    ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { ChartDataPoint, MarketTrend, StockSymbol } from '../types';
import { Zap, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import { STOCKS } from '../constants';

interface MEHGTChartProps {
    isSystemOn: boolean;
    marketTrend: MarketTrend;
    t: any;
    currentStock: StockSymbol;
    onStockChange: (stock: StockSymbol) => void;
}

const MEHGTChart: React.FC<MEHGTChartProps> = ({ isSystemOn, marketTrend, t, currentStock, onStockChange }) => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const stockConfig = STOCKS[currentStock];
  
  // Ref to store the current simulation state without triggering re-renders
  const simState = useRef({
      currentAlpha: 0.5,
      velocity: 0,
      volatility: 0.02
  });

  useEffect(() => {
    // Fill initial buffer
    const buffer: ChartDataPoint[] = [];
    const now = Date.now();
    let val = 0.5;
    for (let i = 40; i > 0; i--) {
        val += (Math.random() - 0.5) * 0.05;
        val = Math.max(0.2, Math.min(0.8, val));
        buffer.push({
            time: new Date(now - i * 1000).toLocaleTimeString([], { second: '2-digit', minute: '2-digit' }),
            alpha: val,
            risk: 0.2,
            ci: [val - 0.05, val + 0.05],
        });
    }
    setData(buffer);
    simState.current.currentAlpha = val;
  }, [currentStock]); // Reset on stock change

  useEffect(() => {
    if (!isSystemOn) return; 

    const interval = setInterval(() => {
      setData(prev => {
        const lastTime = Date.now();
        
        // --- RANDOM WALK ALGORITHM ---
        const state = simState.current;
        
        // Target/Gravity based on Market Trend
        const targetGravity = marketTrend === 'BULLISH' ? 0.75 : 0.25;
        
        // Pull (Mean Reversion)
        const pull = (targetGravity - state.currentAlpha) * 0.05;
        
        // Update Velocity (Momentum + Pull + Random Noise)
        const currentVolatility = marketTrend === 'BULLISH' ? 0.015 : 0.035;
        const noise = (Math.random() - 0.5) * currentVolatility * 2;
        
        state.velocity = (state.velocity * 0.8) + pull + noise;
        
        // Update Position
        state.currentAlpha += state.velocity;
        state.currentAlpha = Math.max(0.1, Math.min(0.9, state.currentAlpha));
        
        // Generate Trade Signal
        let signal: 'buy' | 'sell' | undefined = undefined;
        if (Math.abs(state.velocity) > 0.04) {
             if (state.velocity > 0 && Math.random() > 0.7) signal = 'buy';
             if (state.velocity < 0 && Math.random() > 0.7) signal = 'sell';
        }

        // Calculate Dynamic Confidence Interval (CI)
        const ciSpread = 0.05 + Math.abs(state.velocity) * 3;

        const newPoint: ChartDataPoint = {
          time: new Date(lastTime).toLocaleTimeString([], { second: '2-digit', minute: '2-digit' }),
          alpha: state.currentAlpha,
          risk: Math.min(1, Math.abs(state.velocity) * 10),
          ci: [state.currentAlpha - ciSpread, state.currentAlpha + ciSpread],
          signal: signal
        };

        const newBuffer = [...prev, newPoint];
        if (newBuffer.length > 40) newBuffer.shift();
        return newBuffer;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isSystemOn, marketTrend]);

  // Custom Dot for Trade Signals
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.signal === 'buy') {
        return (
            <g>
                <circle cx={cx} cy={cy} r={8} fill="#ef4444" opacity={0.3} className="animate-ping" />
                <circle cx={cx} cy={cy} r={4} fill="#ef4444" stroke="#fff" strokeWidth={1} />
            </g>
        );
    }
    if (payload.signal === 'sell') {
        return (
             <g>
                <circle cx={cx} cy={cy} r={8} fill="#10b981" opacity={0.3} className="animate-ping" />
                <circle cx={cx} cy={cy} r={4} fill="#10b981" stroke="#fff" strokeWidth={1} />
            </g>
        );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full bg-[#0d121f] border border-cyan-900/50 rounded-lg overflow-hidden relative shadow-[0_0_15px_rgba(6,182,212,0.08)]">
      <div className="bg-[#0A0E17] p-3 border-b border-cyan-900/50 flex justify-between items-center">
        <h3 className="text-cyan-400 font-bold tracking-wider flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-cyan-400" />
          {t.chartTitle} <span className="text-slate-500">[{stockConfig.name}]</span>
        </h3>
        
        {/* Stock Switcher */}
        <div className="flex gap-1">
            {(Object.keys(STOCKS) as StockSymbol[]).map((sym) => (
                <button
                    key={sym}
                    onClick={() => onStockChange(sym)}
                    className={`px-2 py-0.5 text-[10px] rounded font-bold transition-all border ${
                        currentStock === sym 
                        ? 'bg-cyan-950 text-cyan-400 border-cyan-500' 
                        : 'bg-slate-800 text-slate-500 border-transparent hover:bg-slate-700'
                    }`}
                >
                    {STOCKS[sym].name}
                </button>
            ))}
        </div>

        {isSystemOn ? (
            <div className="flex items-center gap-1 bg-red-900/20 px-2 py-0.5 rounded border border-red-900/50">
                <Zap className="w-3 h-3 text-red-500 animate-pulse" />
                <span className="text-[10px] text-red-400 font-mono">{t.liveInference}</span>
            </div>
        ) : (
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                <span className="text-[10px] text-slate-500 font-mono">{t.standby}</span>
            </div>
        )}
      </div>

      <div className="flex-1 p-0 min-h-[180px] relative">
         {/* Background Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

        {/* AI Signal Card Overlay */}
        {isSystemOn && (
            <div className={`absolute top-2 right-2 backdrop-blur-md border p-2 rounded shadow-lg flex items-center gap-3 z-10 max-w-[160px] transition-colors duration-500
                ${marketTrend === 'BULLISH' 
                    ? 'bg-[#0A0E17]/90 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                    : 'bg-[#0A0E17]/90 border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                }
            `}>
                <div className={`p-2 rounded-full border flex-shrink-0 ${marketTrend === 'BULLISH' ? 'bg-red-500/10 border-red-500/40' : 'bg-green-500/10 border-green-500/40'}`}>
                    {marketTrend === 'BULLISH' 
                        ? <ArrowUp className="w-5 h-5 text-red-500 animate-bounce" />
                        : <ArrowDown className="w-5 h-5 text-green-500 animate-bounce" />
                    }
                </div>
                <div className="flex flex-col">
                    <div className={`font-bold text-xs tracking-wider whitespace-nowrap ${marketTrend === 'BULLISH' ? 'text-red-400' : 'text-green-400'}`}>
                        {marketTrend === 'BULLISH' ? `${t.aiSignal}: Bullish` : `${t.aiSignal}: Risk Alert`}
                    </div>
                    <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                        {t.action}: {marketTrend === 'BULLISH' ? t.buyHold : t.reduceShort}
                    </div>
                </div>
            </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAlpha" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={marketTrend === 'BULLISH' ? "#ef4444" : "#10b981"} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={marketTrend === 'BULLISH' ? "#ef4444" : "#10b981"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
                dataKey="time" 
                tick={{fill: '#64748b', fontSize: 9, fontFamily: 'monospace'}} 
                axisLine={{stroke: '#334155'}}
                tickLine={false}
                interval={4}
            />
            <YAxis 
                domain={[0, 1]} 
                tick={{fill: '#64748b', fontSize: 9, fontFamily: 'monospace'}} 
                axisLine={{stroke: '#334155'}}
                tickLine={false}
            />
            <ReferenceLine y={0.5} stroke="#334155" strokeDasharray="3 3" />
            
            <Area 
                type="monotone" 
                dataKey="ci" 
                stroke="none" 
                fill={marketTrend === 'BULLISH' ? "#ef4444" : "#10b981"} 
                fillOpacity={0.1} 
                isAnimationActive={false} 
            />

            <Area 
                type="monotone" 
                dataKey="alpha" 
                stroke="none" 
                fill="url(#colorAlpha)" 
                isAnimationActive={false} 
            />

            <Line 
                type="monotone" 
                dataKey="alpha" 
                stroke={marketTrend === 'BULLISH' ? "#ef4444" : "#10b981"}
                strokeWidth={2} 
                dot={<CustomDot />}
                activeDot={{ r: 4, fill: '#fff' }}
                isAnimationActive={true}
                animationDuration={800} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MEHGTChart;
