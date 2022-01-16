import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	counter: 0,
	showCounter: true,
};

//https://learning.oreilly.com/videos/react-the/9781801812603/9781801812603-video18_17/
const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
		increase(state, action) {
			state.counter = state.counter + action.payload;
		},
		toggleCounter(state) {
			state.showCounter = !state.showCounter;
		},
	},
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
