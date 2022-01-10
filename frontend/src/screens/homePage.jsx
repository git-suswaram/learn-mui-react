import React from 'react';
import { Stack } from '@mui/material';
import SampleForm from './sampleForm';
import ScreenName from '../components/controls/ScreenName';
import SampleTable from './sampleTable';

const HomePage = () => {
	return (
		<Stack>
			<ScreenName name='Accounts Listing' />
			<SampleForm />
			<SampleTable />
		</Stack>
	);
};

export default HomePage;
