import { combineReducers, configureStore } from '@reduxjs/toolkit';
import orderReducer from './Slice/orderSlice';
import userSlice from './Slice/userSlice';
import productSlice from './Slice/productSlice';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
	blacklist: ['user']
};
const rootReducer = combineReducers({
	order: orderReducer,
	user: userSlice,
	product: productSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoreActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER
				]
			}
		});
	}
});

export let persistor = persistStore(store);
