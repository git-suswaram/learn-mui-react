import { Button as MuiButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 0,
		margin: theme.spacing(0.5),
	},
	secondary: {
		backgroundColor: theme.palette.secondary.light,
		'& .MuiButton-label': {
			color: theme.palette.secondary.main,
		},
	},
	primary: {
		backgroundColor: theme.palette.primary.light,
		'& .MuiButton-label': {
			color: theme.palette.primary.main,
		},
	},
}));

const ActionButton = (props) => {
	const { color, children, onClick } = props;

	const classes = useStyles();

	return (
		<MuiButton
			className={`${classes.root} ${classes[color]}`}
			onClick={onClick}
		>
			{children}
		</MuiButton>
	);
};

export default ActionButton;
