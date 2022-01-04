import React from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

import SampleForm from './sampleForm';
import ScreenName from '../components/controls/ScreenName';

const useStyles = makeStyles((theme) => ({
	pageContent: {
		borderRadius: '15px',
		margin: `${theme.spacing(1)} 0px`,
		padding: theme.spacing(3),
	},
}));

const HomePage = () => {
	const classes = useStyles();
	return (
		<React.Fragment>
			<ScreenName name='Accounts Listing' />
			<Paper className={classes.pageContent}>
				<SampleForm />
			</Paper>
		</React.Fragment>
	);
};

export default HomePage;
