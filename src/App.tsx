import React, { useState, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './features/game/components/Header';
import { Game } from './features/game/components';
import SettingsPanel from './features/game/components/SettingsPanel';
import ScoresPanel from './features/game/components/ScoresPanel';
import Notification from './features/game/components/Notification';
import Confetti from './features/game/components/Confetti';
import FloatingXO from './features/game/components/FloatingXO';
import type { 
  TabType, 
  ThemeType, 
  AnimationSpeed, 
  GameMode, 
  Difficulty, 
  Player, 
  Scores, 
  GameState 
} from './types/game.types';
import './styles/animations.css';

// Main App Component
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('game');
  const [previousTab, setPreviousTab] = useState<TabType>('game');
  const [scores, setScores] = useState<Scores>({ x: 0, o: 0, ties: 0 });
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [gameMode, setGameMode] = useState<GameMode>('human');
  const [aiDifficulty, setAiDifficulty] = useState<Difficulty>('medium');
  const [humanPlayer, setHumanPlayer] = useState<Player>('X');
  const [gameInProgress, setGameInProgress] = useState<boolean>(false);
  const [appTheme, setAppTheme] = useState<ThemeType>('neon');
  const [appAnimSpeed, setAppAnimSpeed] = useState<AnimationSpeed>('normal');
  
  // Update scores when game state changes
  const updateScores = useCallback((gameState: GameState): void => {
    if (gameState.isOver) {
      setScores(prevScores => {
        const newScores = {...prevScores};
        if (gameState.winner === 'X') {
          newScores.x += 1;
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        } else if (gameState.winner === 'O') {
          newScores.o += 1;
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        } else if (gameState.isDraw) {
          newScores.ties += 1;
        }
        return newScores;
      });
    }
  }, []);
  
  // Handle tab changes with tracking for animations
  const handleTabChange = useCallback((tab: TabType): void => {
    setPreviousTab(activeTab);
    setActiveTab(tab);
  }, [activeTab]);
  
  // Show notification with timeout
  const showGameNotification = useCallback((message: string): void => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  }, []);
  
  // Handle score reset
  const handleResetScores = useCallback((): void => {
    setScores({ x: 0, o: 0, ties: 0 });
    showGameNotification('Scores reset!');
  }, [showGameNotification]);
  
  // Handle game mode change
  const handleGameModeChange = useCallback((mode: GameMode): void => {
    setGameMode(mode);
    showGameNotification(`Game mode changed to ${mode === 'human' ? 'Human vs Human' : 'Human vs AI'}`);
  }, [showGameNotification]);
  
  // Handle difficulty change
  const handleDifficultyChange = useCallback((difficulty: Difficulty): void => {
    setAiDifficulty(difficulty);
    showGameNotification(`AI difficulty set to ${difficulty}`);
  }, [showGameNotification]);
  
  // Handle player change
  const handlePlayerChange = useCallback((player: Player): void => {
    setHumanPlayer(player);
    showGameNotification(`Playing as ${player}`);
  }, [showGameNotification]);
  
  // Handle theme change
  const handleThemeChange = useCallback((theme: ThemeType): void => {
    setAppTheme(theme);
    showGameNotification(`Theme changed to ${theme}`);
  }, [showGameNotification]);
  
  // Handle animation speed change
  const handleAnimationSpeedChange = useCallback((speed: AnimationSpeed): void => {
    setAppAnimSpeed(speed);
    showGameNotification(`Animation speed set to ${speed}`);
  }, [showGameNotification]);
  
  // Handle game state change
  const handleGameStateChange = useCallback((state: GameState) => {
    updateScores(state);
    setGameInProgress(!state.isOver && !state.isDraw);
  }, [updateScores]);
  
  // Render the appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'settings':
        return (
          <SettingsPanel
            gameMode={gameMode}
            aiDifficulty={aiDifficulty}
            humanPlayer={humanPlayer}
            gameInProgress={gameInProgress}
            onGameModeChange={handleGameModeChange}
            onDifficultyChange={handleDifficultyChange}
            onPlayerChange={handlePlayerChange}
            onThemeChange={handleThemeChange}
            onAnimationSpeedChange={handleAnimationSpeedChange}
            onTabChange={handleTabChange}
            currentTheme={appTheme}
            currentAnimationSpeed={appAnimSpeed}
          />
        );
      case 'scores':
        return (
          <ScoresPanel
            scores={scores}
            onResetScores={handleResetScores}
            onTabChange={handleTabChange}
          />
        );
      case 'game':
      default:
        return (
          <Game 
            onShowNotification={showGameNotification} 
            onGameStateChange={handleGameStateChange}
            gameMode={gameMode}
            aiDifficulty={aiDifficulty}
            humanPlayer={humanPlayer}
          />
        );
    }
  };
  
  return (
    <ThemeProvider initialTheme={appTheme} initialSpeed={appAnimSpeed}>
      <div className="min-h-screen flex flex-col transition-colors duration-500 bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700">
        {/* Show interactive floating X and O characters only on game screen */}
        {!gameInProgress && activeTab === 'game' && 
          <FloatingXO isTabSwitch={previousTab !== 'game'} />
        }
        
        <Header activeTab={activeTab} setActiveTab={handleTabChange} />
        
        <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
          {renderContent()}
        </main>
        
        <Notification message={notificationMessage} show={showNotification} />
        <Confetti show={showConfetti} />
        
        <footer className="py-5 text-center text-white/90 text-sm relative z-10 flex flex-col items-center">
  <div className="mb-2">
    <span>Developed with ❤️ by U-Games</span>
  </div>
  <div className="flex space-x-4">
    <a 
      href="https://web.facebook.com/asitha.udara.161" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-white hover:text-blue-300 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    </a>
    <a 
      href="https://github.com/AsithaUdara" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-white hover:text-gray-300 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    </a>
    <a 
      href="https://www.linkedin.com/in/asithaudara" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-white hover:text-blue-400 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    </a>
  </div>
</footer>
      </div>
    </ThemeProvider>
  );
};

export default App;