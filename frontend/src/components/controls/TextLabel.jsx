import React from 'react';
import { Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStlyes = makeStyles((theme) => ({
	paper: {
		width: '400px',
		height: '40px',
		marginY: '5px',
		background: '#e9ecef',
	},
	typography: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: theme.spacing(5),
		fontWeight: 'bold',
		fontSize: 20,
		color: theme.palette.primary.dark,
	},
}));

const TextLabel = (props) => {
	const classes = useStlyes();
	return (
		<Box>
			<Typography className={classes.typography}>{props.name}</Typography>
		</Box>
	);
};

export default TextLabel;
