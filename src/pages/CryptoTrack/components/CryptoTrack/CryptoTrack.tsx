import { useMemo, useState } from 'react';
import { fetchCoins } from '../../api/cryptoApi';
import { useCryptoPolling } from '../../hooks/useCryptoPolling';
import type { Coin } from '../../types/crypto';
import { CoinCard } from '../CoinCard/CoinCard';
import CryptoHeader from '../CryptoHeader/CryptoHeader';
import { MarketCapChart } from '../MarketCapChart';
import { CoinsTable } from '../CoinsTable';
import { useLocalStorageCoin } from '../../hooks/useLocalStorageCoin';
import { CoinModal } from '../CoinModal';

export const CryptoTrack = () => {
  const [search, setSearch] = useState<string>('');

  const { data, loading, error, lastUpdated } = useCryptoPolling<Coin[]>(
    (signal) => fetchCoins({ signal })
  );

  const [favorites, setFavorites] = useLocalStorageCoin<string[]>(
    'crypto-favorites',
    []
  );
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const allCoins = data ?? [];

  const filteredCoins = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return normalizedSearch
      ? allCoins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(normalizedSearch) ||
            coin.symbol.toLowerCase().includes(normalizedSearch)
        )
      : allCoins.slice(0, 10);
  }, [search, allCoins]);

  const topCoins = allCoins.slice(0, 3);

  const toggleFavorite = (coinID: string) => {
    setFavorites((prev) =>
      prev.includes(coinID)
        ? prev.filter((id) => id !== coinID)
        : [...prev, coinID]
    );
  };

  return (
    <div className="m-6">
      <CryptoHeader
        search={search}
        onSearchChange={setSearch}
        lastUpdated={lastUpdated}
      />

      {loading && <p>Загружаем...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {/**Список монет */}

      {topCoins.length > 0 ? (
        <div className="mb-6 grid grid-cols-3 gap-4">
          {topCoins.map((coin) => (
            <CoinCard key={coin.id} crypto={coin} />
          ))}
        </div>
      ) : (
        <div className="mb-6 grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card/50 h-48 animate-pulse rounded-lg" />
          ))}
        </div>
      )}

      <MarketCapChart coins={allCoins} />

      <CoinsTable
        coins={filteredCoins}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onSelectCoin={setSelectedCoin}
      />

      {selectedCoin && (
        <CoinModal coin={selectedCoin} onClose={() => setSelectedCoin(null)} />
      )}
    </div>
  );
};
