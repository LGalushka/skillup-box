import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './slices/todoSlice';
import { default as storage } from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const todoPersistConfig = {
  key: 'todo',
  storage,
  whitelist: ['todos'],
};

export const store = configureStore({
  reducer: {
    todo: persistReducer(todoPersistConfig, todoSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          'persist/PERSIST',
          PAUSE,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
