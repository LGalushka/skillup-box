import { useState } from 'react';
import { fitchCoins } from '../../api/cryptoApi';
import { useCryptoPolling } from '../../hooks/useCryptoPolling';
import type { Coin } from '../../types/crypto';
import { CoinCard } from '../CoinCard/CoinCard';
import CryptoHeader from '../CryptoHeader/CryptoHeader';

export const CryptoTrack = () => {
  const [search, setSearch] = useState<string>('');

  const { data, loading, error, lastUpdates } = useCryptoPolling<Coin[]>(
    (signal) => fitchCoins({ signal })
  );

  const allCoins = data ?? [];
  const filteredCoins = search
    ? allCoins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
      )
    : allCoins;

  const bitcoin = filteredCoins.find((coin) => coin.id === 'bitcoin');
  return (
    <div className="m-6">
      <CryptoHeader
        search={search}
        onSearchChange={setSearch}
        lastUpdated={lastUpdates}
      />

      {/**Время обновления */}

      {loading && <p>Загружаем...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/**Список монет */}
      <div>
        {bitcoin ? <CoinCard crypto={bitcoin} /> : <p>Монета не найдена</p>}
      </div>
    </div>
  );
};
