
import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { Share2 } from 'lucide-react';
import { RADAR_METRICS_CN, RADAR_METRICS_EN } from '../constants';

interface KnowledgeGraphTopologyProps {
    t: any;
    isSystemOn: boolean;
}

const KnowledgeGraphTopology: React.FC<KnowledgeGraphTopologyProps> = ({ t, isSystemOn }) => {
  // Use generic English keys internally but map display labels? 
  // Easier to just pick the dataset based on current language or passed props.
  // Ideally Dashboard passes 'language' and we pick. 
  // For now let's use the provided text prop 't.knowledgeGraph' for title
  // And use a simple hack: random updates to numeric values are language agnostic, 
  // but the labels need to match language.
  
  // Since we don't have 'language' prop explicitly in the previous interface 
  // let's assume we re-initialize data when language changes if we want translated labels.
  // Actually, let's keep it simple: The component will just use English labels for the tech vibe 
  // OR we add language prop. Let's add language prop in Dashboard if needed, but for now
  // let's use English metrics for "Tech" feel or Chinese if t.knowledgeGraph implies CN.
  
  // Simplified: We will just animate the numbers. The labels come from constant.
  // To support switching, we should ideally reload data.
  // Let's stick to English labels for the Radar Chart as they look better in "Tech" demos usually,
  // or use the CN ones if strictly required. 
  // Let's check constants: RADAR_METRICS_CN vs EN.
  // We'll use EN by default for the "Global" feel requested, or match the T.
  
  const [data, setData] = useState(RADAR_METRICS_EN.map(m => ({ ...m, target: m.A })));
  
  useEffect(() => {
    if (!isSystemOn) return;

    const interval = setInterval(() => {
        setData(prevData => {
            return prevData.map(item => {
                const dist = item.target - item.A;
                let newTarget = item.target;
                if (Math.abs(dist) < 2) {
                    newTarget = 50 + Math.random() * 90;
                }
                const speed = 0.05 + Math.random() * 0.05; 
                let newA = item.A + (newTarget - item.A) * speed;
                return { ...item, A: newA, target: newTarget };
            });
        });
    }, 50);

    return () => clearInterval(interval);
  }, [isSystemOn]);

  return (
    <div className="flex flex-col h-full bg-[#0d121f] border border-cyan-900/50 rounded-lg overflow-hidden shadow-[0_0_10px_rgba(6,182,212,0.05)]">
      <div className="bg-[#0A0E17] p-2 border-b border-cyan-900/50 flex justify-between items-center">
        <h3 className="text-purple-400 font-bold tracking-wider flex items-center gap-1 text-xs">
          <Share2 className="w-3 h-3 text-purple-400" />
          {t.knowledgeGraph}
        </h3>
      </div>

      <div className="flex-1 relative flex items-center justify-center bg-gradient-to-br from-[#0d121f] to-[#120f26]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
             <div className="w-32 h-32 border border-dashed border-purple-500/50 rounded-full animate-[spin_10s_linear_infinite]"></div>
             <div className="absolute w-20 h-20 border border-dotted border-cyan-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#94a3b8', fontSize: 9 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar
              name="Metrics"
              dataKey="A"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="#8b5cf6"
              fillOpacity={0.4}
              isAnimationActive={false} 
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KnowledgeGraphTopology;
