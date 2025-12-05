
import React, { useEffect, useState } from 'react';
import { Grid } from 'lucide-react';

interface SystemHeatmapProps {
    t: any;
    isSystemOn: boolean;
}

const SystemHeatmap: React.FC<SystemHeatmapProps> = ({ t, isSystemOn }) => {
    const rows = 5;
    const cols = 8;
    const [grid, setGrid] = useState<number[]>(Array(rows * cols).fill(0));

    useEffect(() => {
        if (!isSystemOn) return;
        const interval = setInterval(() => {
            setGrid(prev => {
                const next = [...prev];
                const changes = Math.floor(Math.random() * 5) + 1;
                for (let i = 0; i < changes; i++) {
                    const idx = Math.floor(Math.random() * next.length);
                    const rand = Math.random();
                    let val = 0;
                    if (rand > 0.95) val = 4;
                    else if (rand > 0.6) val = 3;
                    else if (rand > 0.3) val = 2;
                    else val = 1;
                    next[idx] = val;
                }
                return next;
            });
        }, 500);
        return () => clearInterval(interval);
    }, [isSystemOn]);

    const getColor = (val: number) => {
        switch(val) {
            case 0: return 'bg-slate-800';
            case 1: return 'bg-emerald-900/60';
            case 2: return 'bg-emerald-600/80';
            case 3: return 'bg-emerald-400 shadow-[0_0_5px_#34d399]';
            case 4: return 'bg-red-500 shadow-[0_0_5px_#ef4444]';
            default: return 'bg-slate-800';
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#0d121f] border border-cyan-900/50 rounded-lg overflow-hidden">
             <div className="bg-[#0A0E17] p-2 border-b border-cyan-900/50 flex justify-between items-center">
                <h3 className="text-emerald-400 font-bold tracking-wider flex items-center gap-1 text-xs">
                    <Grid className="w-3 h-3 text-emerald-400" />
                    {t.heatmap}
                </h3>
            </div>
            <div className="flex-1 p-2 grid grid-cols-8 gap-1 content-center bg-black/40">
                {grid.map((val, i) => (
                    <div 
                        key={i} 
                        className={`w-full aspect-square rounded-sm transition-colors duration-500 ${getColor(val)}`}
                    ></div>
                ))}
            </div>
            <div className="bg-slate-900/50 p-1 flex justify-between px-2 text-[9px] font-mono text-slate-500">
                <span>EPOCH: 9021</span>
                <span>LOSS: 0.0031</span>
            </div>
        </div>
    );
};

export default SystemHeatmap;
