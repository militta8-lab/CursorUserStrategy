/**
 * Utility function to detect if the device supports hover
 * Uses CSS media queries to determine if the device has a pointing device
 * that can hover (mouse/trackpad) vs touch-only devices
 * 
 * @returns {boolean} True if device supports hover, false otherwise
 */
export function canHover(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/**
 * Hook-like function that returns a reactive value for hover support
 * Can be used in components that need to conditionally enable hover effects
 * 
 * @returns {boolean} True if device supports hover, false otherwise
 */
export function useCanHover(): boolean {
  if (typeof window === 'undefined') return false;
  
  // For SSR compatibility, return false initially
  // Components should check this on mount or use useEffect
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

