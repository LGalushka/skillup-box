// hooks/useAsyncResource.ts
import { useState, useEffect, type DependencyList } from 'react';

export function useAsyncResource<T>(
  fetchFn: (signal: AbortSignal) => Promise<T>,
  deps: DependencyList = [],
  enabled: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let ignore = false;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn(controller.signal);
        if (!ignore) {
          setData(result);
        }
      } catch (err: any) {
        if (err.name !== 'AbortError' && !ignore) {
          setError(err.message || 'Ошибка загрузки');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, [enabled, ...deps]);

  return { data, loading, error };
}
