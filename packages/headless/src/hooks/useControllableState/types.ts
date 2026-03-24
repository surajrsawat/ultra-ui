import type { Dispatch, SetStateAction } from 'react';

export interface UseControllableStateOptions<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}

export type UseControllableStateSetState<T> = Dispatch<SetStateAction<T>>;
