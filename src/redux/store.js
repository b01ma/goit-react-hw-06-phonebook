import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { items } from './contactReducer';
import { filter } from './filterReducer';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filter'],
};

const customReducer = combineReducers({
  items,
  filter,
});
const persistedContactReducer = persistReducer(persistConfig, customReducer);
// persistReducer(persistConfig, items),
export const store = configureStore({
  reducer: {
    contacts: persistedContactReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
