import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { HeaderProps, TabType } from '../../../types/game.types';

// Header with Logo and Navigation
const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { colors } = useTheme();
  
  return (
    <header className={`${colors.header} py-3 px-4 shadow-md sticky top-0 z-20`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className={`text-2xl md:text-3xl font-bold ${colors.heading} flex items-center`}>
            <span className={colors.xColor}>Tic</span>
            <span className="mx-1">-</span>
            <span className="mx-1">Tac</span>
            <span className="mx-1">-</span>
            <span className={colors.oColor}>Toe</span>
          </div>
        </div>
        
        <nav className="flex items-center space-x-1">
          <button 
            onClick={() => setActiveTab('game' as TabType)} 
            className={`px-4 py-2 transition-colors ${activeTab === 'game' ? colors.tabActive : colors.tabInactive}`}
          >
            Game
          </button>
          <button 
            onClick={() => setActiveTab('settings' as TabType)}
            className={`px-4 py-2 transition-colors ${activeTab === 'settings' ? colors.tabActive : colors.tabInactive}`}
          >
            Settings
          </button>
          <button 
            onClick={() => setActiveTab('scores' as TabType)}
            className={`px-4 py-2 transition-colors ${activeTab === 'scores' ? colors.tabActive : colors.tabInactive}`}
          >
            Scores
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;