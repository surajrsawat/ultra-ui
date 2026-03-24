export interface UseTypeaheadOptions {
  items: string[];
  timeoutMs?: number;
}

export interface UseTypeaheadReturn {
  query: string;
  matchedIndex: number;
  onType: (key: string) => number;
  reset: () => void;
}
