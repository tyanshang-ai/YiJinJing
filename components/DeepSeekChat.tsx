
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface DeepSeekChatProps {
  t: any;
}

const API_KEY = "sk-bbd4d36d561c4c91b135c61fda5741cd";
const API_URL = "https://api.deepseek.com/chat/completions";

const DeepSeekChat: React.FC<DeepSeekChatProps> = ({ t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: 'You are "Yi Jin Jing AI", a professional financial analysis assistant. Provide concise, data-driven insights on financial markets, risk control, and investment strategies. Use professional tone.' },
    { role: 'assistant', content: 'Hello. I am the Yi Jin Jing AI Copilot. I have access to real-time market vectors and risk models. How can I assist with your portfolio today?' }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          stream: false
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices.length > 0) {
        const botMsg: ChatMessage = { 
            role: 'assistant', 
            content: data.choices[0].message.content 
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error('No response from API');
      }
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = { role: 'assistant', content: "⚠️ Connection Error: Unable to reach DeepSeek Neural Core. Please check latency or API quota." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all hover:scale-110 z-50 group"
      >
        <div className="absolute inset-0 rounded-full border border-white/30 animate-ping opacity-30"></div>
        <Bot className="w-6 h-6 md:w-7 md:h-7 text-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 md:-top-2 md:-right-2 md:w-4 md:h-4 bg-red-500 rounded-full border-2 border-[#0A0E17]"></div>
      </button>
    );
  }

  return (
    <>
      {/* Mobile Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)}></div>
      
      <div className="fixed bottom-1/2 translate-y-1/2 right-1/2 translate-x-1/2 w-[92vw] h-[60vh] md:w-[380px] md:h-[500px] md:bottom-6 md:right-6 md:translate-x-0 md:translate-y-0 bg-[#0d121f]/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.6)] z-50 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-cyan-900/50 bg-[#0A0E17]/50">
          <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                  <h3 className="font-bold text-slate-100 text-sm">DeepSeek AI</h3>
                  <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] text-cyan-400 font-mono">ONLINE v3.0</span>
                  </div>
              </div>
          </div>
          <div className="flex items-center gap-1">
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
              </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 scrollbar-hide bg-[#080b12]">
          {messages.filter(m => m.role !== 'system').map((msg, idx) => (
              <div key={idx} className={`flex gap-2 md:gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex-shrink-0 flex items-center justify-center border ${msg.role === 'user' ? 'bg-slate-700 border-slate-600' : 'bg-cyan-900/30 border-cyan-700/50'}`}>
                      {msg.role === 'user' ? <User className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-300" /> : <Bot className="w-3.5 h-3.5 md:w-4 md:h-4 text-cyan-400" />}
                  </div>
                  <div className={`max-w-[85%] rounded-2xl p-2.5 md:p-3 text-xs md:text-sm leading-relaxed ${
                      msg.role === 'user' 
                          ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-tr-none' 
                          : 'bg-[#151b2b] border border-cyan-900/30 text-cyan-50 rounded-tl-none shadow-[0_0_15px_rgba(6,182,212,0.05)]'
                  }`}>
                      {msg.content}
                  </div>
              </div>
          ))}
          {loading && (
              <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-900/30 border border-cyan-700/50 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="bg-[#151b2b] border border-cyan-900/30 px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-cyan-500 animate-spin" />
                      <span className="text-xs text-cyan-500/70 font-mono">Processing query...</span>
                  </div>
              </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-[#0A0E17] border-t border-cyan-900/50">
          <div className="relative flex items-center">
              <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about risk, market trends..."
                  className="w-full bg-[#151b2b] border border-slate-700 rounded-xl pl-4 pr-12 py-2.5 md:py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-slate-600"
                  disabled={loading}
              />
              <button 
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="absolute right-1.5 p-1.5 md:p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  <Send className="w-4 h-4" />
              </button>
          </div>
          <div className="text-[9px] md:text-[10px] text-center text-slate-600 mt-2 font-mono">
              Yi Jin Jing x DeepSeek V3 Model
          </div>
        </div>
      </div>
    </>
  );
};

export default DeepSeekChat;
