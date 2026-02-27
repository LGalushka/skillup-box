import type { Coin, CoinDetails } from '../types/crypto';
import { ENDPOINTS } from './cryptoUrl';

export const fitchCoins = async (
  options: RequestInit = {}
): Promise<Coin[]> => {
  const url = ENDPOINTS.markets();
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Детали монеты
export const fetchCryptoDetails = async (
  id: string,
  options: RequestInit = {}
): Promise<CoinDetails> => {
  if (!id.trim()) {
    throw new Error('ID не должен быть пустым');
  }

  const url = ENDPOINTS.coinDetails(id);
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status}`);
  }
  return response.json();
};
