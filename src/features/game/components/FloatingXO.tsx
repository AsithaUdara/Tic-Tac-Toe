import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { FloatingXOProps } from '../../../types/game.types';

// Component for interactive floating X and O characters
const FloatingXO: React.FC<FloatingXOProps> = ({ isTabSwitch = false }) => {
  const { colors } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [characters, setCharacters] = useState<Array<{
    type: 'X' | 'O';
    x: number;
    y: number;
    size: number;
    rotation: number;
    vx: number;
    vy: number;
    id: number;
  }>>([]);
  
  // Handle visibility based on tab switch
  useEffect(() => {
    if (isTabSwitch) {
      // When switching tabs, fade out and regenerate characters
      setIsVisible(false);
      
      const timeout = setTimeout(() => {
        // Regenerate characters after fade out
        initializeCharacters();
        setIsVisible(true);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [isTabSwitch]);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Initialize characters function
  const initializeCharacters = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const initialCharacters = Array.from({ length: 12 }, (_, index) => {
      return {
        type: index % 2 === 0 ? 'X' : 'O' as 'X' | 'O',
        x: Math.random() * windowWidth,
        y: Math.random() * windowHeight,
        size: Math.random() * 40 + 30,
        rotation: Math.random() * 360,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        id: Date.now() + index // Use timestamp to ensure unique IDs
      };
    });
    
    setCharacters(initialCharacters);
  };
  
  // Initialize characters on mount
  useEffect(() => {
    initializeCharacters();
  }, []);
  
  // Animate characters and react to mouse
  useEffect(() => {
    if (!isVisible) return;
    
    const animationFrame = requestAnimationFrame(() => {
      const mouseInfluenceRadius = 200; // How far the mouse influence reaches
      const mouseRepelStrength = 1; // How strongly characters are repelled
      
      setCharacters(prevChars => 
        prevChars.map(char => {
          // Calculate distance from mouse
          const dx = char.x - mousePosition.x;
          const dy = char.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply mouse repulsion when within influence radius
          let newVx = char.vx;
          let newVy = char.vy;
          
          if (distance < mouseInfluenceRadius) {
            // Normalize direction vector
            const factor = mouseRepelStrength * (1 - distance / mouseInfluenceRadius);
            newVx += (dx / distance) * factor;
            newVy += (dy / distance) * factor;
          }
          
          // Apply damping to prevent excessive speeds
          newVx *= 0.98;
          newVy *= 0.98;
          
          // Update position
          let newX = char.x + newVx;
          let newY = char.y + newVy;
          
          // Bounce off window edges
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          
          if (newX < 0 || newX > windowWidth) {
            newVx = -newVx;
            newX = newX < 0 ? 0 : windowWidth;
          }
          
          if (newY < 0 || newY > windowHeight) {
            newVy = -newVy;
            newY = newY < 0 ? 0 : windowHeight;
          }
          
          // Slowly rotate based on velocity
          const newRotation = char.rotation + (Math.abs(newVx) + Math.abs(newVy)) * 0.5;
          
          return {
            ...char,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: newRotation % 360
          };
        })
      );
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [characters, mousePosition, isVisible]);
  
  // Animation class based on visibility and tab switch
  const animationClass = `transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`;
  
  return (
    <div className={animationClass}>
      {characters.map(char => (
        <div 
          key={char.id}
          className={`fixed font-bold ${char.type === 'X' ? colors.xColor : colors.oColor} select-none pointer-events-none`}
          style={{
            left: `${char.x}px`,
            top: `${char.y}px`,
            fontSize: `${char.size}px`,
            transform: `translate(-50%, -50%) rotate(${char.rotation}deg)`,
            opacity: isVisible ? 0.6 : 0,
            textShadow: '0 0 10px currentColor',
            transition: 'opacity 0.3s ease-out, transform 0.1s ease-out'
          }}
        >
          {char.type}
        </div>
      ))}
    </div>
  );
};

export default FloatingXO;