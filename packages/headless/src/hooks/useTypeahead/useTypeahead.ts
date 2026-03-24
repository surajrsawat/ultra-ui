import { useCallback, useEffect, useRef, useState } from 'react';
import type { UseTypeaheadOptions, UseTypeaheadReturn } from './types';

export function useTypeahead(options: UseTypeaheadOptions): UseTypeaheadReturn {
  const { items, timeoutMs = 500 } = options;

  const [query, setQuery] = useState('');
  const [matchedIndex, setMatchedIndex] = useState(-1);

  const queryRef = useRef('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearScheduledReset = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearScheduledReset();
    queryRef.current = '';
    setQuery('');
  }, [clearScheduledReset]);

  const onType = useCallback((key: string) => {
    if (key.length !== 1) {
      return -1;
    }

    const nextQuery = `${queryRef.current}${key}`.toLowerCase();
    queryRef.current = nextQuery;
    setQuery(nextQuery);

    const nextMatchedIndex = items.findIndex((item) => item.toLowerCase().startsWith(nextQuery));
    setMatchedIndex(nextMatchedIndex);

    clearScheduledReset();
    timeoutRef.current = setTimeout(() => {
      queryRef.current = '';
      setQuery('');
    }, timeoutMs);

    return nextMatchedIndex;
  }, [clearScheduledReset, items, timeoutMs]);

  useEffect(() => {
    return () => {
      clearScheduledReset();
    };
  }, [clearScheduledReset]);

  return {
    query,
    matchedIndex,
    onType,
    reset,
  };
}
