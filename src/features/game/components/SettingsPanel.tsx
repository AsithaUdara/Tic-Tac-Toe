import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { 
  SettingsPanelProps, 
  GameMode, 
  Difficulty, 
  Player, 
  ThemeType, 
  AnimationSpeed, 
  TabType 
} from '../../../types/game.types';

// Settings Panel Component
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
}) => {
  const { colors, theme, animationSpeed } = useTheme();
  
  return (
    <div className={`${colors.panel} rounded-lg shadow-xl p-6 w-full max-w-2xl mx-auto
                     transform animate-fade-in backdrop-blur-sm`}>
      <h2 className={`text-xl font-bold mb-6 text-center ${colors.heading}`}>Game Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Game Mode Settings */}
        <div className={`p-4 ${colors.accent} rounded-lg`}>
          <h3 className={`text-lg font-medium mb-4 border-b border-gray-700 pb-2 ${colors.cardText}`}>Game Mode</h3>
          <div className="flex flex-col gap-3">
            <button
              className={`px-4 py-3 rounded-md text-md font-medium transition-all duration-200
                         transform hover:scale-105 active:scale-95 flex items-center justify-between
                         ${gameMode === 'human' ? colors.primary : colors.secondary}`}
              onClick={() => onGameModeChange('human')}
              disabled={gameInProgress}
            >
              <span>Human vs Human</span>
              {gameMode === 'human' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
            <button
              className={`px-4 py-3 rounded-md text-md font-medium transition-all duration-200
                         transform hover:scale-105 active:scale-95 flex items-center justify-between
                         ${gameMode === 'ai' ? colors.primary : colors.secondary}`}
              onClick={() => onGameModeChange('ai')}
              disabled={gameInProgress}
            >
              <span>Human vs AI</span>
              {gameMode === 'ai' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* AI Settings (only shown when AI mode is selected) */}
        {gameMode === 'ai' && (
          <div className={`p-4 ${colors.accent} rounded-lg`}>
            <h3 className={`text-lg font-medium mb-4 border-b border-gray-700 pb-2 ${colors.cardText}`}>AI Difficulty</h3>
            <div className="flex flex-col gap-3">
              {(['easy', 'medium', 'hard'] as Difficulty[]).map(difficulty => (
                <button
                  key={difficulty}
                  className={`px-4 py-3 rounded-md text-md font-medium transition-all duration-200
                             transform hover:scale-105 active:scale-95 flex items-center justify-between
                             ${aiDifficulty === difficulty ? colors.primary : colors.secondary}`}
                  onClick={() => onDifficultyChange(difficulty)}
                  disabled={gameInProgress}
                >
                  <span className="capitalize">{difficulty}</span>
                  {aiDifficulty === difficulty && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Player Choice (only shown when AI mode is selected) */}
        {gameMode === 'ai' && (
          <div className={`p-4 ${colors.accent} rounded-lg`}>
            <h3 className={`text-lg font-medium mb-4 border-b border-gray-700 pb-2 ${colors.cardText}`}>Play as</h3>
            <div className="flex justify-between gap-4">
              <button
                className={`flex-1 py-3 rounded-md text-xl font-bold transition-all duration-200
                           transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center
                           ${humanPlayer === 'X' ? colors.primary : colors.secondary}`}
                onClick={() => onPlayerChange('X')}
                disabled={gameInProgress}
              >
                <span className={theme === 'elegance' && humanPlayer === 'X' ? 'text-black' : colors.xColor}>X</span>
                <span className="text-sm mt-1">First</span>
              </button>
              <button
                className={`flex-1 py-3 rounded-md text-xl font-bold transition-all duration-200
                           transform hover:scale-105 active:scale-95 flex flex-col items-center justify-center
                           ${humanPlayer === 'O' ? colors.primary : colors.secondary}`}
                onClick={() => onPlayerChange('O')}
                disabled={gameInProgress}
              >
                <span className={theme === 'elegance' && humanPlayer === 'O' ? 'text-black' : colors.oColor}>O</span>
                <span className="text-sm mt-1">Second</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Theme Settings */}
        <div className={`p-4 ${colors.accent} rounded-lg`}>
          <h3 className={`text-lg font-medium mb-4 border-b border-gray-700 pb-2 ${colors.cardText}`}>Theme</h3>
          <div className="flex flex-col gap-3">
            {(['neon', 'elegance', 'modern'] as ThemeType[]).map(themeOption => (
              <button
                key={themeOption}
                className={`px-4 py-3 rounded-md text-md font-medium transition-all duration-200
                           transform hover:scale-105 active:scale-95 flex items-center justify-between
                           ${theme === themeOption ? colors.primary : colors.secondary}`}
                onClick={() => onThemeChange(themeOption)}
              >
                <span className="capitalize">{themeOption}</span>
                {theme === themeOption && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Animation Speed Settings */}
        <div className={`p-4 ${colors.accent} rounded-lg`}>
          <h3 className={`text-lg font-medium mb-4 border-b border-gray-700 pb-2 ${colors.cardText}`}>Animation Speed</h3>
          <div className="flex flex-col gap-3">
            {(['fast', 'normal', 'slow'] as AnimationSpeed[]).map(speed => (
              <button
                key={speed}
                className={`px-4 py-3 rounded-md text-md font-medium transition-all duration-200
                           transform hover:scale-105 active:scale-95 flex items-center justify-between
                           ${animationSpeed === speed ? colors.primary : colors.secondary}`}
                onClick={() => onAnimationSpeedChange(speed)}
              >
                <span className="capitalize">{speed}</span>
                {animationSpeed === speed && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {gameInProgress && (
        <div className="mt-4 p-3 bg-gray-800 border border-gray-700 rounded-md">
          <p className="text-gray-300 text-sm">
            Some settings can only be changed before starting a new game
          </p>
        </div>
      )}
      
      <div className="text-center mt-6">
        <button
          className={`px-4 py-2 rounded-md ${colors.primary} transition-all duration-200
                     transform hover:scale-105 active:scale-95`}
          onClick={() => onTabChange('game')}
        >
          Back to Game
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;