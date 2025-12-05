
// types.ts

// --- New Types for Localization & Stock Switching ---
export type Language = 'EN' | 'CN';

// Changed to Specific Chinese Tech Stocks: Cambricon, BYD, ZTE
export type StockSymbol = 'CAMBRICON' | 'BYD' | 'ZTE';

export interface StockConfig {
  name: string;
  symbol: string;
  price: number;
  color: string;
}

// --- Existing Types ---

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface NewsItem {
  id: string;
  time: string;
  title: string;
  source: string;
  type: 'Notice' | 'Alert';
  confidence?: number;
}

export interface ChartDataPoint {
  time: string;
  alpha: number;
  risk: number;
  ci: [number, number];
  signal?: 'buy' | 'sell';
}

export interface RadarDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}

export enum AppState {
  LOGIN = 'LOGIN',
  SPLASH = 'SPLASH',
  DASHBOARD = 'DASHBOARD'
}

export type TradingState = 'IDLE' | 'BUYING' | 'HOLDING' | 'SELLING';

export type MarketTrend = 'BULLISH' | 'BEARISH';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
