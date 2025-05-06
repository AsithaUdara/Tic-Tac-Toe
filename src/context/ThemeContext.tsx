import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import type { 
  ThemeType, 
  AnimationSpeed,
  ThemeContextType, 
  ThemeColors 
} from '../types/game.types';

// Create Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme: ThemeType;
  initialSpeed: AnimationSpeed;
}

// Theme Provider Component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme,
  initialSpeed
}) => {
  const [theme, setTheme] = useState<ThemeType>(initialTheme);
  const [animationSpeed, setAnimationSpeed] = useState<AnimationSpeed>(initialSpeed);
  
  // Update when props change
  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);
  
  useEffect(() => {
    setAnimationSpeed(initialSpeed);
  }, [initialSpeed]);
  
  // Get animation duration based on speed setting
  const animationDuration = useMemo((): number => {
    switch(animationSpeed) {
      case 'slow': return 800;
      case 'fast': return 300;
      default: return 500; // normal
    }
  }, [animationSpeed]);
  
  // Theme color configurations
  const colors = useMemo((): ThemeColors => {
    switch(theme) {
      case 'neon':
        return {
          bg: 'bg-gray-900',
          primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white',
          secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700',
          accent: 'bg-gray-800 border border-gray-700',
          panel: 'bg-gray-800 border border-gray-700',
          header: 'bg-gray-900 border-b border-gray-800',
          xColor: 'text-cyan-400 glow-cyan-500',
          oColor: 'text-pink-500 glow-pink-500',
          winColor: 'bg-purple-900/40 border border-purple-700',
          heading: 'text-white',
          cardText: 'text-gray-200',
          labelText: 'text-gray-400',
          tabActive: 'bg-gray-800 text-white border-t-2 border-t-purple-500',
          tabInactive: 'bg-gray-900 text-gray-400 hover:text-gray-300'
        };
      case 'modern':
        return {
          bg: 'bg-slate-900',
          primary: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white',
          secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
          accent: 'bg-slate-800 border border-slate-700',
          panel: 'bg-slate-800 border border-slate-700',
          header: 'bg-slate-900 border-b border-slate-800',
          xColor: 'text-emerald-400 glow-emerald-500',
          oColor: 'text-amber-400 glow-amber-500',
          winColor: 'bg-emerald-900/40 border border-emerald-700',
          heading: 'text-white',
          cardText: 'text-slate-200',
          labelText: 'text-slate-400',
          tabActive: 'bg-slate-800 text-white border-t-2 border-t-emerald-500',
          tabInactive: 'bg-slate-900 text-slate-400 hover:text-slate-300'
        };
      case 'elegance':
        return {
          bg: 'bg-white',
          primary: 'bg-black hover:bg-gray-800 text-white shadow-lg',
          secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-300',
          accent: 'bg-gray-100 border border-gray-300',
          panel: 'bg-white border border-gray-300 shadow-md',
          header: 'bg-white border-b border-gray-200',
          xColor: 'text-black',
          oColor: 'text-black',
          winColor: 'bg-black/5 border border-black/20',
          heading: 'text-black',
          cardText: 'text-gray-800',
          labelText: 'text-gray-600',
          tabActive: 'bg-white text-black border-t-2 border-t-black',
          tabInactive: 'bg-white text-gray-500 hover:text-gray-800'
        };
      default:
        return {
          bg: 'bg-gray-900',
          primary: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white',
          secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700',
          accent: 'bg-gray-800 border border-gray-700',
          panel: 'bg-gray-800 border border-gray-700',
          header: 'bg-gray-900 border-b border-gray-800',
          xColor: 'text-cyan-400 glow-cyan-500',
          oColor: 'text-pink-500 glow-pink-500',
          winColor: 'bg-purple-900/40 border border-purple-700',
          heading: 'text-white',
          cardText: 'text-gray-200',
          labelText: 'text-gray-400',
          tabActive: 'bg-gray-800 text-white border-t-2 border-t-purple-500',
          tabInactive: 'bg-gray-900 text-gray-400 hover:text-gray-300'
        };
    }
  }, [theme]);
  
  // Values to be provided to consumers
  const value: ThemeContextType = {
    theme,
    setTheme,
    animationSpeed,
    setAnimationSpeed,
    animationDuration,
    colors
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};