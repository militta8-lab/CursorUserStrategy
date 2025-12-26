import { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface MagneticButtonProps extends MotionProps {
  children: ReactNode;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  tabIndex?: number;
  ariaLabel?: string;
}

/**
 * MagneticButton component that creates a magnetic effect on hover
 * Button slightly follows the cursor when hovered
 * 
 * @param {MagneticButtonProps} props - Component props
 * @param {ReactNode} props.children - Button content
 * @param {number} props.strength - Magnetic strength (default: 0.3)
 * @param {'button' | 'a'} props.as - Element type (default: 'button')
 * @returns {JSX.Element} Rendered magnetic button component
 */
export const MagneticButton = ({
  children,
  strength = 0.3,
  as = 'button',
  className = '',
  style = {},
  ...props
}: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;

      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered, strength]);

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      ref={buttonRef as any}
      className={className}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.3s ease-out',
      }}
      {...props}
    >
      {children}
    </Component>
  );
};

