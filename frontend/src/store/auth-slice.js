import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
};

// https://learning.oreilly.com/videos/react-the/9781801812603/9781801812603-video18_20/
const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		login(state) {
			state.isAuthenticated = true;
		},
		logout(state) {
			state.isAuthenticated = false;
		},
	},
});

export const authActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
