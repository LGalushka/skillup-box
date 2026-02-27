export const COIN_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;

if (!COIN_API_KEY) {
  throw new Error('VITE_COINGECKO_API_KEY не задан в .env файле');
}

export const BASE_URL = 'https://api.coingecko.com/api/v3';

export const ENDPOINTS = {
  markets: () =>
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=true&x_cg_demo_api_key=${COIN_API_KEY}`,

  coinDetails: (id: string) =>
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&x_cg_demo_api_key=${COIN_API_KEY}`,
};
