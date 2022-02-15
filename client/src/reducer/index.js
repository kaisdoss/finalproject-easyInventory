import { combineReducers } from 'redux';
import { AuthReducer } from './authReducer';
import achatReducer from './facturesAndProductsReducer'
import usersReducer from './userReducer'

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth']
}

const rootReducer = combineReducers({ auth: AuthReducer, facturesAndProducts: achatReducer, usersRed: usersReducer });

export default persistReducer(persistConfig, rootReducer)
