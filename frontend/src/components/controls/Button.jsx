import { Button as MuiButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		textTransform: 'none',
	},
}));
const Button = (props) => {
	const { text, size, color, variant, onClick, ...others } = props;

	const classes = useStyles();

	return (
		<MuiButton
			variant={variant || 'contained'}
			size={size || 'large'}
			color={color || 'primary'}
			onClick={onClick}
			{...others}
			classes={{ root: classes.root }}
		>
			{text}
		</MuiButton>
	);
};

export default Button;
