import { useCallback, useState } from 'react';
import type { UseToggleReturn } from './types';

export function useToggle(defaultValue = false): UseToggleReturn {
  const [on, setOn] = useState(!!defaultValue);
  const toggle = useCallback(() => setOn((value) => !value), []);
  const set = useCallback((value: boolean) => setOn(value), []);

  return { on, set, toggle };
}
