import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from './contactsSlice';
import { filterSlice } from './filterSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);