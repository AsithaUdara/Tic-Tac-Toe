import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { NotificationProps } from '../../../types/game.types';

const Notification: React.FC<NotificationProps> = ({ message, show }) => {
  const { colors, theme } = useTheme();
  
  if (!show) return null;
  
  const isWinMessage = message.includes('wins!');
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div className="px-4 py-2 mt-16 rounded-md shadow-lg" 
           style={{ 
             background: theme === 'elegance' 
               ? 'rgba(255, 255, 255, 0.9)' 
               : 'rgba(30, 30, 50, 0.8)',
             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
             backdropFilter: 'blur(4px)'
           }}>
        <p className={`${colors.cardText} text-center font-medium ${isWinMessage ? 'text-lg' : ''}`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default Notification;