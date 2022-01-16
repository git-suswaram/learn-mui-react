import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter-slice';
import authenticationReducer from './auth-slice';

const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authenticationReducer,
	},
});

export default store;
