import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { SettingsPanelProps } from '../../../types/game.types';

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  gameMode,
  aiDifficulty,
  humanPlayer,
  gameInProgress,
  onGameModeChange,
  onDifficultyChange,
  onPlayerChange,
  onThemeChange,
  onAnimationSpeedChange,
  onTabChange,
  currentTheme,
  currentAnimationSpeed
}) => {
  const { colors } = useTheme();
  
  // Return button handler
  const handleBack = () => {
    onTabChange('game');
  };
  
  return (
    <div className={`w-full max-w-2xl mx-auto ${colors.panel} rounded-lg shadow-xl p-6 animate-fade-in backdrop-blur-sm`}>
      {/* Header with Back Button */}
      <div className="flex items-center mb-8">
        <button 
          onClick={handleBack}
          className={`mr-4 p-3 rounded-md ${colors.secondary} transition-all duration-300 transform hover:scale-105 hover:bg-opacity-80`}
          aria-label="Back to game"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </button>
        <h1 className={`text-2xl sm:text-3xl font-bold ${colors.cardText}`}>Game Settings</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Game Mode Section */}
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${colors.labelText}`}>Game Mode</h3>
          <div className="space-y-2">
            <button
              className={`w-full p-3 rounded-md transition-all duration-300 text-left flex items-center justify-between
                       ${gameMode === 'human' 
                         ? colors.primary
                         : `${colors.accent} hover:${colors.primary.replace('bg-', 'border-')} border border-transparent`}`}
              onClick={() => onGameModeChange('human')}
              disabled={gameInProgress}
            >
              <span>Human vs Human</span>
              {gameMode === 'human' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              )}
            </button>
            
            <button
              className={`w-full p-3 rounded-md transition-all duration-300 text-left flex items-center justify-between
                       ${gameMode === 'ai' 
                         ? colors.primary
                         : `${colors.accent} hover:${colors.primary.replace('bg-', 'border-')} border border-transparent`}`}
              onClick={() => onGameModeChange('ai')}
              disabled={gameInProgress}
            >
              <span>Human vs AI</span>
              {gameMode === 'ai' && (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* AI Difficulty Section */}
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${colors.labelText}`}>AI Difficulty</h3>
          <div className="space-y-2">
            {['easy', 'medium', 'hard'].map((level) => (
              <button
                key={level}
                className={`w-full p-3 rounded-md transition-all duration-300 text-left flex items-center justify-between
                         ${aiDifficulty === level 
                           ? colors.primary
                           : `${colors.accent} hover:${colors.primary.replace('bg-', 'border-')} border border-transparent`}`}
                onClick={() => onDifficultyChange(level as any)}
                disabled={gameInProgress}
              >
                <span className="capitalize">{level}</span>
                {aiDifficulty === level && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Play as Section */}
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${colors.labelText}`}>Play as</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              className={`p-4 rounded-md transition-all duration-300 flex flex-col items-center justify-center
                       ${humanPlayer === 'X' 
                         ? colors.primary
                         : `${colors.accent} hover:${colors.primary.replace('bg-', 'border-')} border border-transparent`}`}
              onClick={() => onPlayerChange('X')}
              disabled={gameInProgress}
            >
              <span className={`text-3xl font-bold ${humanPlayer === 'X' ? 'text-white' : colors.xColor}`}>X</span>
              <span className="text-sm mt-1">First</span>
            </button>
            
            <button
              className={`p-4 rounded-md transition-all duration-300 flex flex-col items-center justify-center
                       ${humanPlayer === 'O' 
                         ? colors.primary
                         : `${colors.accent} hover:${colors.primary.replace('bg-', 'border-')} border border-transparent`}`}
              onClick={() => onPlayerChange('O')}
              disabled={gameInProgress}
            >
              <span className={`text-3xl font-bold ${humanPlayer === 'O' ? 'text-white' : colors.oColor}`}>O</span>
              <span className="text-sm mt-1">Second</span>
            </button>
          </div>
        </div>
        
        {/* Theme Section */}
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold ${colors.labelText}`}>Theme</h3>
          <div className="space-y-2">
            {['neon', 'elegance', 'modern'].map((themeName) => (
              <button
                key={themeName}
                className={`w-full p-3 rounded-md transition-all duration-300 text-left flex items-center justify-between
                         ${currentTheme === themeName 
                           ? colors.primary
                           : `${colors.accent} hover:${colors.primary.replace('bg-', 'border-')} border border-transparent`}`}
                onClick={() => onThemeChange(themeName as any)}
              >
                <span className="capitalize">{themeName}</span>
                {currentTheme === themeName && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Animation Speed Section */}
      <div className="mt-8 space-y-4">
        <h3 className={`text-lg font-semibold ${colors.labelText}`}>Animation Speed</h3>
        <div className="flex gap-4 justify-center">
          {['slow', 'normal', 'fast'].map((speed) => (
            <button
              key={speed}
              className={`px-6 py-3 rounded-md transition-all duration-300 capitalize
                       ${currentAnimationSpeed === speed 
                         ? colors.primary
                         : `${colors.accent} hover:${colors.primary.replace('bg-', 'border-')} border border-transparent`}`}
              onClick={() => onAnimationSpeedChange(speed as any)}
            >
              {speed}
            </button>
          ))}
        </div>
      </div>
      
      {/* Footer with Return to Game Button */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={handleBack}
          className={`w-full px-6 py-3 rounded-md ${colors.primary} transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium`}
        >
          Return to Game
        </button>
      </div>
      
      {/* Game in Progress Message */}
      {gameInProgress && (
        <div className={`mt-6 p-4 ${colors.accent} rounded-md text-center`}>
          <p className={`${colors.labelText} text-sm`}>
            Some settings can only be changed when no game is in progress.
          </p>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;