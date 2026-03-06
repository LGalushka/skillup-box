import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  fetchCoinsThunk,
  setSearch,
  toggleFavorite,
} from '../../../../store/slices/cryptoSlice';
import {
  selectFilteredCoins,
  selectFavorites,
  selectCryptoLoading,
  selectCryptoError,
  selectLastUpdated,
} from '../../../../store/selectors/cryptoSelectors';
import { CoinCard } from '../CoinCard/CoinCard';
import CryptoHeader from '../CryptoHeader/CryptoHeader';
import { MarketCapChart } from '../MarketCapChart';
import { CoinsTable } from '../CoinsTable';
import { CoinModal } from '../CoinModal';
import type { Coin, CoinBase } from '../../types/crypto';
import { useDebounce } from '../../../MovieSearch/hooks';

export const CryptoTrack = () => {
  const dispatch = useAppDispatch();
  const [localSearch, setLocalSearch] = useState<string>('');
  const debounceSearch = useDebounce(localSearch, 300);

  // ✅ Redux вместо useCryptoPolling + useLocalStorageCoin
  const filteredCoins = useAppSelector(selectFilteredCoins);
  const favorites = useAppSelector(selectFavorites);

  const loading = useAppSelector(selectCryptoLoading);
  const error = useAppSelector(selectCryptoError);
  const lastUpdated = useAppSelector(selectLastUpdated);

  // ✅ UI state
  const [modalCoin, setModalCoin] = useState<Coin | null>(null);

  // ✅ поллинг каждые 30 секунд вместо useCryptoPolling
  useEffect(() => {
    dispatch(fetchCoinsThunk());
    const interval = setInterval(() => {
      dispatch(fetchCoinsThunk());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearch(debounceSearch));
  }, [debounceSearch, dispatch]);

  // ✅ топ 3 монеты из всех монет
  const topCoins = useAppSelector((state) => state.crypto.coins.slice(0, 3));

  return (
    <div className="m-6">
      <CryptoHeader
        search={localSearch}
        onSearchChange={setLocalSearch}
        lastUpdated={lastUpdated ? new Date(lastUpdated) : null} // ✅ string → Date
      />

      {loading && <p>Загружаем...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {topCoins.length > 0 ? (
        <div className="mb-6 grid grid-cols-3 gap-4">
          {topCoins.map((coin: Coin) => (
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

      <MarketCapChart coins={useAppSelector((state) => state.crypto.coins)} />

      <CoinsTable
        coins={filteredCoins}
        favorites={favorites.map((f: CoinBase) => f.id)} // ✅ CoinsTable ожидает string[]
        onToggleFavorite={(coinId) => {
          const coin = filteredCoins.find((c: Coin) => c.id === coinId);
          if (coin) dispatch(toggleFavorite(coin));
        }}
        onSelectCoin={setModalCoin}
      />

      {modalCoin && (
        <CoinModal coin={modalCoin} onClose={() => setModalCoin(null)} />
      )}
    </div>
  );
};
