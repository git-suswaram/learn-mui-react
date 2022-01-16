import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Stack } from '@mui/material';
import SampleTable from './sampleTable';
import ReduxApp from './counter';
import Summary from '../components/Summary/Summary';
const HomePage = () => {
	return (
		<Stack>
			<Routes>
				<Route path='/' exact element={<SampleTable />} />
				<Route path='/redux' exact element={<ReduxApp />} />
				<Route
					path='/summary'
					exact
					element={<Summary logo='/static/images/logo/Hdfc.jpg' />}
				/>
			</Routes>
		</Stack>
	);
};

export default HomePage;
