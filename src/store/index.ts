import { configureStore } from '@reduxjs/toolkit';

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
import habitReducer from './slices/habitSlice';
import todoReducer from './slices/todoSlice';
import movieReducer from './slices/movieSlice';

const todoPersistConfig = {
  key: 'todo',
  storage,
  whitelist: ['todos'],
};

const habutPersistConfig = {
  key: 'habit',
  storage,
  whitelist: ['habits'],
};

const moviePersistConfig = {
  key: 'movie',
  storage,
  whitelist: ['favorites'],
};

export const store = configureStore({
  reducer: {
    todo: persistReducer(todoPersistConfig, todoReducer),
    habit: persistReducer(habutPersistConfig, habitReducer),
    movie: persistReducer(moviePersistConfig, movieReducer),
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
