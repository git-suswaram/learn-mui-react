import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { counterActions } from '../store/counter-slice';

const ReduxApp = () => {
	const dispatch = useDispatch();
	const counter = useSelector((state) => {
		return state.counter.counter;
	});
	const show = useSelector((state) => {
		return state.counter.showCounter;
	});

	const incrementHandler = () => {
		dispatch(counterActions.increment());
	};

	const decrementHandler = () => {
		dispatch(counterActions.decrement());
	};

	const toggleCounterHandler = () => {
		dispatch(counterActions.toggleCounter());
	};

	const increaseHandler = () => {
		dispatch(counterActions.increase(10));
		//{type: SOME_UNIQUE_IDENTIFIER, payload: 10}
	};

	return (
		<React.Fragment>
			{show && (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: '30px',
						marginBottom: '20px',
					}}
				>
					<Typography variant='h5'>{counter}</Typography>
				</div>
			)}
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<span>
					<Button
						variant='contained'
						onClick={incrementHandler}
						style={{ margin: '10px' }}
					>
						Increment
					</Button>
					<Button
						variant='contained'
						color='success'
						onClick={increaseHandler}
						style={{ margin: '10px' }}
					>
						Increment By 10
					</Button>
					<Button
						variant='contained'
						color='warning'
						onClick={decrementHandler}
					>
						Decrement
					</Button>
				</span>
			</div>

			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Button
					variant='contained'
					color='secondary'
					onClick={toggleCounterHandler}
				>
					ToggleCounter
				</Button>
			</div>
		</React.Fragment>
	);
};

export default ReduxApp;
