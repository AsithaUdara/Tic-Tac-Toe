import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { Scores, TabType } from '../../../types/game.types';

// Define the props interface directly in the file to avoid import issues
interface ScoresPanelProps {
  scores: Scores;
  onResetScores: () => void;
  onTabChange: (tab: TabType) => void;
}

// Scores Panel Component
const ScoresPanel: React.FC<ScoresPanelProps> = ({ scores, onResetScores, onTabChange }) => {
  const { colors } = useTheme();
  
  return (
    <div className={`${colors.panel} rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto
                     transform animate-fade-in backdrop-blur-sm`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-xl font-bold ${colors.cardText}`}>Score Board</h2>
        <button 
          className={`px-3 py-1 rounded-md text-sm ${colors.secondary} transition-all duration-200
                     transform hover:scale-105 active:scale-95`}
          onClick={onResetScores}
        >
          Reset Scores
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className={`${colors.accent} p-6 rounded-lg border border-gray-700 flex flex-col items-center`}>
          <div className={`text-3xl font-bold mb-2 ${colors.xColor}`}>X</div>
          <div className={`text-4xl font-bold ${colors.cardText}`}>{scores.x}</div>
          <div className={`text-sm ${colors.labelText} mt-2`}>Wins</div>
        </div>
        
        <div className={`${colors.accent} p-6 rounded-lg border border-gray-700 flex flex-col items-center`}>
          <div className={`text-3xl font-bold mb-2 ${colors.cardText}`}>Ties</div>
          <div className={`text-4xl font-bold ${colors.cardText}`}>{scores.ties}</div>
          <div className={`text-sm ${colors.labelText} mt-2`}>Draws</div>
        </div>
        
        <div className={`${colors.accent} p-6 rounded-lg border border-gray-700 flex flex-col items-center`}>
          <div className={`text-3xl font-bold mb-2 ${colors.oColor}`}>O</div>
          <div className={`text-4xl font-bold ${colors.cardText}`}>{scores.o}</div>
          <div className={`text-sm ${colors.labelText} mt-2`}>Wins</div>
        </div>
      </div>
      
      <div className="text-center">
        <button
          className={`px-4 py-2 rounded-md ${colors.primary} transition-all duration-200
                     transform hover:scale-105 active:scale-95`}
          onClick={() => onTabChange('game' as TabType)}
        >
          Back to Game
        </button>
      </div>
    </div>
  );
};

export default ScoresPanel;