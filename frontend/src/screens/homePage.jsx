import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Stack } from '@mui/material';
import SampleTable from './sampleTable';

const HomePage = () => {
	return (
		<Stack>
			<Routes>
				<Route path='/' exact element={<SampleTable />} />
			</Routes>
		</Stack>
	);
};

export default HomePage;
