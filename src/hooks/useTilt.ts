import { useState } from 'react';
import { useSpring } from 'framer-motion';

/**
 * Custom hook that creates a 3D tilt effect for cards
 * Card tilts based on mouse position, creating a perspective effect
 * Uses Framer Motion springs for smooth animations
 * 
 * @param {number} maxTilt - Maximum tilt angle in degrees (default: 15)
 * @returns {Object} Object containing event handlers and MotionValue references
 */
export const useTilt = (maxTilt = 15) => {
  const [isHovered, setIsHovered] = useState(false);

  // Very fast, responsive spring settings - high stiffness, low damping for immediate response
  const rotateX = useSpring(0, { stiffness: 400, damping: 18, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 400, damping: 18, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    if (!element) return;

    const { clientX, clientY } = e;
    const rect = element.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const offsetX = clientX - centerX;
    const offsetY = clientY - centerY;

    // Calculate tilt with proper normalization and clamping
    const normalizedX = Math.max(-1, Math.min(1, offsetX / (rect.width / 2)));
    const normalizedY = Math.max(-1, Math.min(1, offsetY / (rect.height / 2)));

    // Card should tilt TOWARDS the cursor position
    // Inverting signs to match CSS perspective behavior where card follows cursor
    // When cursor is in top-right corner → card tilts up-right
    // When cursor is in bottom-left corner → card tilts down-left
    const newRotateY = -normalizedX * maxTilt;
    const newRotateX = -normalizedY * maxTilt;

    // Smoothly update values - spring will handle the animation
    rotateX.set(newRotateX);
    rotateY.set(newRotateY);
  };

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return {
    isHovered,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    rotateX,
    rotateY,
  };
};

