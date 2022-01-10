import React from 'react';
import { Stack } from '@mui/material';
// import SampleForm from './sampleForm';
import ScreenName from '../components/controls/ScreenName';
import SampleTable from './sampleTable';
import AddNewPopup from './sampleAddEditDialog';

const HomePage = () => {
	return (
		<Stack>
			<ScreenName name='Accounts Listing' />
			<AddNewPopup />
			<SampleTable />
		</Stack>
	);
};

export default HomePage;
