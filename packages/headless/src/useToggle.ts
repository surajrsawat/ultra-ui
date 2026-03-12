import { useState, useCallback } from 'react';

export function useToggle(defaultValue = false) {
  const [on, setOn] = useState(!!defaultValue);
  const toggle = useCallback(() => setOn(v => !v), []);
  const set = useCallback((v: boolean) => setOn(v), []);
  return { on, set, toggle };
}