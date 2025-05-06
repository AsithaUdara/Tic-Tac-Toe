// src/types/game.types.ts

// Basic type definitions
export type Player = 'X' | 'O' | null;
export type GameMode = 'human' | 'ai';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type ThemeType = 'neon' | 'elegance' | 'modern';
export type AnimationSpeed = 'fast' | 'normal' | 'slow';
export type TabType = 'game' | 'settings' | 'scores';

// Game state related interfaces
export interface GameState {
  isOver: boolean;
  winner: Player;
  isDraw: boolean;
  line?: number[];
}

export interface Scores {
  x: number;
  o: number;
  ties: number;
}

// Theme related interfaces
export interface ThemeColors {
  bg: string;
  primary: string;
  secondary: string;
  accent: string;
  panel: string;
  header: string;
  xColor: string;
  oColor: string;
  winColor: string;
  heading: string;
  cardText: string;
  labelText: string;
  tabActive: string;
  tabInactive: string;
}

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  animationSpeed: AnimationSpeed;
  setAnimationSpeed: (speed: AnimationSpeed) => void;
  animationDuration: number;
  colors: ThemeColors;
}

// Component props interfaces
export interface SquareProps {
  value: Player;
  onSquareClick: () => void;
  isWinningSquare: boolean;
  index: number;
  currentPlayer: Player;
}

export interface BoardProps {
  squares: Player[];
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
  currentPlayer: Player;
}

export interface GameStatusProps {
  gameState: GameState;
  currentPlayer: Player;
  isAIThinking: boolean;
}

export interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export interface GameProps {
  onShowNotification: (message: string) => void;
  onGameStateChange?: (gameState: GameState) => void;
  gameMode: GameMode;
  aiDifficulty: Difficulty;
  humanPlayer: Player;
}

export interface SettingsPanelProps {
  gameMode: GameMode;
  aiDifficulty: Difficulty;
  humanPlayer: Player;
  gameInProgress: boolean;
  currentTheme: ThemeType;
  currentAnimationSpeed: AnimationSpeed;
  onGameModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onPlayerChange: (player: Player) => void;
  onThemeChange: (theme: ThemeType) => void;
  onAnimationSpeedChange: (speed: AnimationSpeed) => void;
  onTabChange: (tab: TabType) => void;
}

export interface ScoresPanelProps {
  scores: Scores;
  onResetScores: () => void;
  onTabChange: (tab: TabType) => void;
}

export interface NotificationProps {
  message: string;
  show: boolean;
}

export interface ConfettiProps {
  show: boolean;
}

// Game hook return type
export interface UseGameWithAIReturn {
  history: Player[][];
  currentMove: number;
  currentSquares: Player[];
  xIsNext: boolean;
  gameState: GameState;
  gameMode: GameMode;
  aiDifficulty: Difficulty;
  humanPlayer: Player;
  isAIThinking: boolean;
  isHumanTurn: boolean;
  handleSquareClick: (i: number) => void;
  jumpTo: (move: number) => void;
  startNewGame: (mode?: GameMode, difficulty?: Difficulty, player?: Player) => void;
  setGameMode: (mode: GameMode) => void;
  setAiDifficulty: (difficulty: Difficulty) => void;
  setHumanPlayer: (player: Player) => void;
}

// AI algorithm interface
export interface MinimaxResult {
  score: number;
  move: number | null;
}