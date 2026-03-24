export type UseToggleSetFn = (value: boolean) => void;

export interface UseToggleReturn {
  on: boolean;
  set: UseToggleSetFn;
  toggle: () => void;
}
