import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
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

const ScreenName = (props) => {
	const classes = useStlyes();
	return (
		<Box>
			<Grid container rowSpacing={2}>
				<Paper elevation={0} className={classes.paper}>
					<Typography className={classes.typography}>{props.name}</Typography>
				</Paper>
			</Grid>
		</Box>
	);
};

export default ScreenName;
