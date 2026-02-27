import { useEffect, useRef, useState } from 'react';

export function useLocalStorageCoint<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [favoriteValue, setFavoriteValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  });

  const keyRef = useRef(key);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        keyRef.current,
        JSON.stringify(favoriteValue)
      );
    } catch (error) {
      console.error(
        `Error serrings localStorage key "${keyRef.current}":`,
        error
      );
    }
  }, [favoriteValue]);
  return [favoriteValue, setFavoriteValue] as const;
}
