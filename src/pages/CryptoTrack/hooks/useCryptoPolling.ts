import { useEffect, useState } from 'react';

export function useCryptoPolling<T>(
  fetchFn: (signal: AbortSignal) => Promise<T>,
  enabled: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    async function loadCoins(isFirst = false) {
      if (isFirst) setLoading(true);
      setError(null);

      try {
        const result = await fetchFn(controller.signal);
        setData(result);
        setLastUpdated(new Date());
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Ошибка загрузки');
        }
      } finally {
        if (isFirst) setLoading(false);
      }
    }
    loadCoins(true);

    const interval = setInterval(() => loadCoins(false), 30000);

    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, [enabled]);
  return { data, loading, error, lastUpdated };
}
