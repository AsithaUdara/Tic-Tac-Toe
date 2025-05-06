// game.types.ts
export type Player = 'X' | 'O';
export type TabType = 'game' | 'settings' | 'scores';
export type ThemeType = 'neon' | 'elegance' | 'modern';
export type AnimationSpeed = 'slow' | 'normal' | 'fast';
export type GameMode = 'human' | 'ai';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  isOver: boolean;
  winner: Player | null;
  isDraw: boolean;
  line?: number[] | null;
}

export interface Scores {
  x: number;
  o: number;
  ties: number;
}

export interface ThemeColors {
  panel: string;
  accent: string;
  primary: string;
  secondary: string;
  square: string;
  highlight: string;
  xColor: string;
  oColor: string;
  xColorHover: string;
  oColorHover: string;
  labelText: string;
  cardText: string;
  navActive: string;
  navInactive: string;
  bg: string;
  header: string;
  winColor: string;
  heading: string;
  button: string;
  buttonHover: string;
}

export interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  animationSpeed: AnimationSpeed;
  setAnimationSpeed: (speed: AnimationSpeed) => void;
  animationDuration: number;
  colors: ThemeColors;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeType;
  initialSpeed?: AnimationSpeed;
}

export interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export interface GameProps {
  onShowNotification: (message: string) => void;
  onGameStateChange: (state: GameState) => void;
  gameMode: GameMode;
  aiDifficulty: Difficulty;
  humanPlayer: Player;
}

export interface SettingsPanelProps {
  gameMode: GameMode;
  aiDifficulty: Difficulty;
  humanPlayer: Player;
  gameInProgress: boolean;
  onGameModeChange: (mode: GameMode) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onPlayerChange: (player: Player) => void;
  onThemeChange: (theme: ThemeType) => void;
  onAnimationSpeedChange: (speed: AnimationSpeed) => void;
  onTabChange: (tab: TabType) => void;
  currentTheme: ThemeType;
  currentAnimationSpeed: AnimationSpeed;
}

export interface ScoresPanelProps {
  scores: Scores;
  onResetScores: () => void;
  onTabChange: (tab: TabType) => void;
}

export interface BoardProps {
  squares: (Player | null)[];
  onSquareClick: (i: number) => void;
  winningLine: number[] | null;
  currentPlayer: Player;
}

export interface SquareProps {
  value: Player | null;
  onSquareClick: () => void;
  highlight: boolean;
  currentPlayer: Player;
  style?: React.CSSProperties;
}

export interface FloatingXOProps {
  isTabSwitch?: boolean;
}

export interface NotificationProps {
  message: string;
  show: boolean;
}

export interface FloatingXOProps {
  isTabSwitch?: boolean;
}

export interface MinimaxResult {
  score: number;
  move?: number; 
}

export interface UseGameWithAIReturn {
  history: (Player | null)[][];
  currentMove: number;
  currentSquares: (Player | null)[];
  xIsNext: boolean;
  gameState: GameState;
  isAIThinking: boolean;
  handleSquareClick: (i: number) => void;
  jumpTo: (nextMove: number) => void;
  startNewGame: (mode: GameMode, difficulty: Difficulty, humanPlayer: Player) => void;
  setGameMode: (mode: GameMode) => void;
  setAiDifficulty: (difficulty: Difficulty) => void;
  setHumanPlayer: (player: Player) => void;
  aiDifficulty: Difficulty;
  gameMode: GameMode;
  humanPlayer: Player;  
  isHumanTurn: boolean; 
}