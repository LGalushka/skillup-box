export interface CoinBase {
  id: string;
  name: string;
  symbol: string;
  image: string;
}

// Монета из списка /coins/markets
export interface Coin extends CoinBase {
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
  last_updated: string;
}

// Детали одной монеты /coins/:id
export interface CoinDetails extends CoinBase {
  description: { en: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    price_change_percentage_24h: number;
    high_24h: { usd: number };
    low_24h: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
  };
  market_cap_rank: number;
  last_updated: string;
}

// Внутренний тип для компонентов
export interface CryptoItem {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  marketCapRank: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  lastUpdated: string;
}
