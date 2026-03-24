import { useCallback, useState } from 'react';
import type { UseControllableStateOptions, UseControllableStateSetState } from './types';

export function useControllableState<T>(
  options: UseControllableStateOptions<T>
): [T, UseControllableStateSetState<T>] {
  const { value: controlledValue, defaultValue, onChange } = options;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue: UseControllableStateSetState<T> = useCallback((nextValue) => {
    const resolvedValue = typeof nextValue === 'function'
      ? (nextValue as (previous: T) => T)(value)
      : nextValue;

    if (!isControlled) {
      setInternalValue(resolvedValue);
    }

    onChange?.(resolvedValue);
  }, [isControlled, onChange, value]);

  return [value, setValue];
}
