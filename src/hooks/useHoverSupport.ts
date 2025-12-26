import { useState, useEffect } from 'react';
import { canHover } from '../utils/canHover';

/**
 * Custom hook that provides hover support detection for framer-motion
 * Returns conditional hover props that only work on devices with hover support
 * 
 * @param {Object} hoverProps - Props to apply on hover (e.g., { scale: 1.05, y: -8 })
 * @returns {Object} Object with whileHover prop (empty on touch devices) and supportsHover flag
 */
export const useHoverSupport = (hoverProps: Record<string, any> = {}) => {
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const checkHover = () => setSupportsHover(canHover());
    
    checkHover();
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    
    // Listen for changes (e.g., when connecting/disconnecting external mouse on tablet)
    const handleChange = () => checkHover();
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    whileHover: supportsHover ? hoverProps : undefined,
    supportsHover,
  };
};

