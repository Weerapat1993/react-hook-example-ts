import { useRef, useEffect } from 'react';

/**
 * Use Previous Props
 * @param {*} value
 * @returns {*} 
 */
export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}