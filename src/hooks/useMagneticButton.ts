import { useState, useCallback, useRef } from 'react';

/**
 * Custom hook that creates a magnetic effect for buttons
 * Button follows the cursor like it's stuck to it, moving in all directions
 * Returns to original position when cursor moves too far away
 * 
 * @param {number} strength - Magnetic strength (0-1, default: 0.5)
 * @param {number} maxDistance - Maximum distance button can move in pixels (default: 30)
 * @returns {Object} Object containing event handlers and transform values
 */
export const useMagneticButton = (strength: number = 0.5, maxDistance: number = 30) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const originalPositionRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Store original position on first hover (relative to viewport)
    if (!originalPositionRef.current) {
      originalPositionRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }

    const originalCenterX = originalPositionRef.current.x;
    const originalCenterY = originalPositionRef.current.y;

    // Calculate distance from cursor to original center
    const deltaX = e.clientX - originalCenterX;
    const deltaY = e.clientY - originalCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // If cursor is within max distance, button follows it proportionally
    if (distance <= maxDistance) {
      // Button moves towards cursor with strength factor
      // The closer the cursor, the more the button moves
      const moveX = deltaX * strength;
      const moveY = deltaY * strength;
      setPosition({ x: moveX, y: moveY });
    } else {
      // If cursor is too far, calculate position on the edge of the magnetic field
      const angle = Math.atan2(deltaY, deltaX);
      const edgeX = Math.cos(angle) * maxDistance * strength;
      const edgeY = Math.sin(angle) * maxDistance * strength;
      setPosition({ x: edgeX, y: edgeY });
    }
  }, [strength, maxDistance]);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setIsHovered(true);
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    originalPositionRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
    originalPositionRef.current = null;
  }, []);

  return {
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    x: position.x,
    y: position.y,
  };
};

