import { useState } from 'react';
import { fitchCoins } from '../../api/cryptoApi';
import { useCryptoPolling } from '../../hooks/useCryptoPolling';
import type { Coin } from '../../types/crypto';
import { CoinCard } from '../CoinCard/CoinCard';
import CryptoHeader from '../CryptoHeader/CryptoHeader';
import { MarketCapChart } from '../MarketCapChart';
import { CoinsTable } from '../CoinsTable';
import { useLocalStorageCoint } from '../../hooks/useLocalStorageCoint';
import { CoinModal } from '../CointModal';

export const CryptoTrack = () => {
  const [search, setSearch] = useState<string>('');

  const { data, loading, error, lastUpdated } = useCryptoPolling<Coin[]>(
    (signal) => fitchCoins({ signal })
  );

  const [favorites, setFavorites] = useLocalStorageCoint<string[]>(
    'crypto-favorites',
    []
  );
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const allCoins = data ?? [];
  const filteredCoins = search
    ? allCoins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
      )
    : allCoins.slice(0, 10);

  const topCoints = allCoins.slice(0, 3);

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

      {topCoints.length > 0 ? (
        <div className="mb-6 grid grid-cols-3 gap-4">
          {topCoints.map((coin) => (
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
