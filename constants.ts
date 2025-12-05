
import { StockSymbol, StockConfig } from './types';

export const COLORS = {
  cyan: '#06b6d4',
  purple: '#d946ef',
  emerald: '#10b981',
  red: '#ef4444',
  blue: '#3b82f6',
  slate: '#64748b'
};

// Updated to requested Chinese Stocks: Cambricon, BYD, ZTE
export const STOCKS: Record<StockSymbol, StockConfig> = {
  CAMBRICON: { name: '寒武纪', symbol: '688256', price: 245.50, color: '#d946ef' }, // AI Chip (Purple)
  BYD: { name: '比亚迪', symbol: '002594', price: 208.60, color: '#10b981' },       // EV (Emerald)
  ZTE: { name: '中兴通讯', symbol: '000063', price: 29.15, color: '#3b82f6' }       // Telecom (Blue)
};

export const LOADING_MESSAGES = [
  "Loading Weights: SFT_TF-14B.sh...",
  "Initializing MEHGT-LKG: han_conv_edge_attr3.py...",
  "Building Hetero Graph: HeteroG_eventall2.0.ipynb...",
  "Connecting TMKG Knowledge Base...",
  "Calibrating FinEX Extraction Matrix...",
  "Verifying Node: NVIDIA A100 [Simulated]..."
];

export const MOCK_NEWS_CN = [
  "[快讯] 寒武纪 (688256): 发布的最新一代云端AI芯片性能测试超预期，算力利用率提升 40%",
  "中兴通讯 (000063): 6G 关键技术取得突破，发布全场景智算网络解决方案",
  "比亚迪 (002594): 发布新一代刀片电池技术，主要参数优于预期，海外订单激增",
  "[预警] 美联储会议纪要显示加息预期增强，全球流动性承压",
  "监管动态: 某 DeFi 协议遭受闪电贷攻击，跨链桥风险敞口扩大",
  "宏观: 人民币兑美元汇率波动加剧，触发 MEHGT 波动率阈值",
  "[公告] 腾讯控股 (0700.HK): 回购 100 万股，彰显管理层信心",
  "半导体: 中芯国际获 12 英寸晶圆代工新订单，产能利用率回升",
  "[快讯] 离岸人民币收复 7.20 关口，跨境资本流动保持平稳",
  "大宗商品: 黄金现货突破 2100 美元/盎司，避险情绪升温",
  "AI 政策: 欧盟通过《人工智能法案》，生成式 AI 面临合规大考",
  "[预警] 某头部房企债务重组方案遇阻，债券价格大幅波动",
  "寒武纪: 获多家头部大模型厂商算力集群订单，涉及金额超 5 亿元",
  "原油: OPEC+ 宣布延长自愿减产协议至二季度末",
  "光伏: 通威股份宣布新型电池组件转换效率刷新世界纪录",
  "数字货币: 比特币哈希率创历史新高，减半预期发酵",
  "中兴通讯: 联合运营商完成 5G-A 通感一体化基站验证",
  "美债: 10 年期国债收益率逼近 4.5% 阻力位"
];

export const MOCK_NEWS_EN = [
  "[Flash] Cambricon (688256): New gen cloud AI chip performance exceeds expectations, utilization up 40%",
  "ZTE (000063): Breakthrough in 6G key technologies, releases intelligent computing network solution",
  "BYD (002594): Releases new generation Blade Battery, exceeding expectations, overseas orders surge",
  "[Alert] Fed Minutes: Rate hike expectations rise, global liquidity under pressure",
  "Regulation: DeFi protocol suffers flash loan attack, bridge risk exposure widens",
  "Macro: RMB/USD volatility intensifies, triggering MEHGT threshold",
  "[Notice] Tencent (0700.HK): Repurchases 1M shares, signaling management confidence",
  "Semiconductors: SMIC secures new 12-inch wafer orders, utilization rising",
  "[Flash] Offshore RMB reclaims 7.20 level, cross-border flows stable",
  "Commodities: Spot Gold breaks $2100/oz, safe-haven sentiment rising",
  "AI Policy: EU passes AI Act, generative AI faces compliance tests",
  "[Alert] Major property developer debt restructuring stalled, bonds volatile",
  "Cambricon: Secures computing cluster orders from major LLM vendors exceeding 500M CNY",
  "Crude Oil: OPEC+ extends voluntary cuts through Q2",
  "Solar: Tongwei announces new cell efficiency world record",
  "Crypto: Bitcoin hash rate hits all-time high ahead of halving",
  "ZTE: Completes 5G-A sensing-communication integration verification with operators",
  "Treasuries: 10-year yield approaches 4.5% resistance"
];

export const MOCK_NEWS_TITLES = MOCK_NEWS_CN;

export const LOG_TEMPLATES_CN = [
  "HGTConv 层前向传播完成 (14ms)",
  "实体对齐: TMKG 节点 #8821 匹配源 ext_source_04",
  "时序切片: 窗口 [t-10, t] 处理完毕",
  "检测到风险事件 (区块 #204): 波动率激增",
  "FinEX: 抽取三元组 {实体: '宁德时代', 关系: '供应商', 对象: '特斯拉'}",
  "MEHGT: 边注意力权重更新 Alpha: 0.85",
  "反向传播: 梯度范数 0.042 - 收敛稳定",
  "推理引擎: 生成信号 -> 买入 (置信度 0.92)",
  "内存回收: 释放 402MB GPU 显存",
  "知识图谱: 关系推理 '共同投资' 置信度 0.88",
  "系统监控: GPU 温度 72°C - 风扇转速 45%"
];

export const LOG_TEMPLATES_EN = [
  "HGTConv Layer Forward Pass Complete (14ms)",
  "Entity Alignment: TMKG Node #8821 matches ext_source_04",
  "Temporal Slicing: Window [t-10, t] processed",
  "Risk Event Detected (Block #204): Volatility Spike",
  "FinEX: Extracted Triplet {Entity: 'CATL', Relation: 'Supplier', Object: 'Tesla'}",
  "MEHGT: Edge Attention Weight Update Alpha: 0.85",
  "Backprop: Gradient Norm 0.042 - Convergence Stable",
  "Inference Engine: Signal Generated -> BUY (Conf 0.92)",
  "Memory GC: Freed 402MB GPU VRAM",
  "Knowledge Graph: Relation Reasoning 'Co-invest' Conf 0.88",
  "System Monitor: GPU Temp 72°C - Fan Speed 45%"
];

export const LOG_TEMPLATES = LOG_TEMPLATES_CN;

export const RADAR_METRICS_CN = [
  { subject: '实体抽取', A: 120, fullMark: 150 },
  { subject: '关系推理', A: 98, fullMark: 150 },
  { subject: '事件对齐', A: 86, fullMark: 150 },
  { subject: '风险预测', A: 99, fullMark: 150 },
  { subject: '多模态', A: 85, fullMark: 150 },
  { subject: '低时延', A: 65, fullMark: 150 },
];

export const RADAR_METRICS_EN = [
  { subject: 'Extraction', A: 120, fullMark: 150 },
  { subject: 'Reasoning', A: 98, fullMark: 150 },
  { subject: 'Alignment', A: 86, fullMark: 150 },
  { subject: 'Risk Pred', A: 99, fullMark: 150 },
  { subject: 'Multimodal', A: 85, fullMark: 150 },
  { subject: 'Latency', A: 65, fullMark: 150 },
];

export const RADAR_METRICS = RADAR_METRICS_CN;

export const TRANSLATIONS = {
  CN: {
    appTitle: "易金经", // Removed · 智能风控
    running: "运行中",
    paused: "系统待机",
    node: "算力节点",
    latency: "端到端时延",
    
    // Chart
    chartTitle: "MEHGT-LKG 趋势预测",
    liveInference: "实时推理中",
    standby: "系统待机",
    aiSignal: "AI 建议",
    action: "建议操作",
    buyHold: "买入 / 持有",
    reduceShort: "减仓 / 观望",
    
    // Portfolio
    assetAccount: "智能投顾账户",
    totalAsset: "总资产估值",
    todayPnl: "今日收益",
    smartFollow: "一键智能跟投",
    takeProfit: "止盈卖出",
    executing: "执行中...",
    holding: "已持仓",
    clearing: "清算中...",
    systemOff: "请先启动系统",
    
    // FinEX
    finexTitle: "FinEX · 舆情知识抽取流",
    nlpStream: "NLP 实时流",
    
    // Others
    knowledgeGraph: "知识图谱拓扑",
    heatmap: "策略回测热力图",
    logs: "系统实时日志",
    
    // Asset Detail
    assetPerspective: "资产透视 · 收益归因分析",
    cumulativeNetValue: "累计净值曲线 (近30日)",
    assetAllocation: "资产分布",
    recentYields: "近期收益记录",
    
    // Settlement
    settlementComplete: "交易交割成功",
    strategy: "执行策略",
    principal: "投入本金",
    realizedPnl: "实现收益",
    txHash: "交易哈希",
    archive: "确认归档",
    share: "分享战绩",
    download: "下载回单"
  },
  EN: {
    appTitle: "Yi Jin Jing", // Removed · Intelligent Risk
    running: "SYSTEM ONLINE",
    paused: "SYSTEM PAUSED",
    node: "Node",
    latency: "Latency",
    
    // Chart
    chartTitle: "MEHGT-LKG Prediction",
    liveInference: "LIVE INFERENCE",
    standby: "STANDBY",
    aiSignal: "AI Signal",
    action: "Action",
    buyHold: "Buy / Hold",
    reduceShort: "Reduce / Short",
    
    // Portfolio
    assetAccount: "Robo-Advisor Account",
    totalAsset: "Total Assets", // Removed (USD)
    todayPnl: "Today's P&L",
    smartFollow: "Smart Follow",
    takeProfit: "Take Profit",
    executing: "Executing...",
    holding: "Holding",
    clearing: "Clearing...",
    systemOff: "System Offline",
    
    // FinEX
    finexTitle: "FinEX Knowledge Extraction",
    nlpStream: "NLP Stream",
    
    // Others
    knowledgeGraph: "Knowledge Graph Topology",
    heatmap: "Strategy Backtest Heatmap",
    logs: "System Real-time Logs",
    
    // Asset Detail
    assetPerspective: "Asset Analysis & Attribution",
    cumulativeNetValue: "Cumulative Net Value (30D)",
    assetAllocation: "Asset Allocation",
    recentYields: "Recent Yields",
    
    // Settlement
    settlementComplete: "Transaction Settled",
    strategy: "Strategy",
    principal: "Principal",
    realizedPnl: "Realized P&L",
    txHash: "Tx Hash",
    archive: "Archive",
    share: "Share",
    download: "Download"
  }
};
