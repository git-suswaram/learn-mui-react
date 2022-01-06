import React from 'react';
import { Paper, Stack } from '@mui/material';

import SampleForm from './sampleForm';
import ScreenName from '../components/controls/ScreenName';

const HomePage = () => {
	return (
		<Stack>
			<ScreenName name='Accounts Listing' />
			<SampleForm />
		</Stack>
	);
};

export default HomePage;
