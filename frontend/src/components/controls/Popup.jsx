import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';

import Controls from '../controls';

const useStyles = makeStyles((theme) => ({
	dialogWrapper: {
		padding: theme.spacing(2),
		position: 'absolute',
		top: theme.spacing(7),
	},
	dialogTitle: {
		paddingRight: '0px',
	},
}));

const Popup = (props) => {
	const classes = useStyles();
	const { title, children, openPopup, setOpenPopup } = props;

	return (
		<Dialog
			open={openPopup}
			maxWidth='md'
			classes={{ paper: classes.dialogWrapper }}
		>
			<DialogTitle className={classes.dialogTitle}>
				<div style={{ display: 'flex' }}>
					<Typography variant='h6' component='div' style={{ flexGrow: 1 }}>
						{title}
					</Typography>
					<Controls.ActionButton
						color='default'
						onClick={() => setOpenPopup(false)}
					>
						<CloseIcon />
					</Controls.ActionButton>
				</div>
			</DialogTitle>
			<DialogContent dividers>{children} </DialogContent>
		</Dialog>
	);
};

export default Popup;
