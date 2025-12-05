
import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import SplashScreen from './components/SplashScreen';
import Dashboard from './components/Dashboard';
import { AppState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>(AppState.LOGIN);

  const renderView = () => {
    switch (view) {
      case AppState.LOGIN:
        return <LoginScreen onLoginSuccess={() => setView(AppState.SPLASH)} />;
      case AppState.SPLASH:
        return <SplashScreen onComplete={() => setView(AppState.DASHBOARD)} />;
      case AppState.DASHBOARD:
        return <Dashboard />;
      default:
        return <div>Error: Unknown State</div>;
    }
  };

  return (
    <div className="antialiased text-slate-200 selection:bg-cyan-500/30">
      {renderView()}
    </div>
  );
};

export default App;
