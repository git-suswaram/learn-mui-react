import React from 'react';
import { Paper as MuiPaper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	paper: {
		borderRadius: '15px',
		margin: `${theme.spacing(1)} 0px`,
	},
}));

const Paper = ({ children }) => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<MuiPaper className={classes.paper}>{children}</MuiPaper>
		</React.Fragment>
	);
};

export default Paper;
