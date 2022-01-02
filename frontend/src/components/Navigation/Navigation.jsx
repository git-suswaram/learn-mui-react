import React from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Button,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navigation = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position='static'
				style={{
					borderRadius: '10px 10px',
					backgroundColor: '#343148FF',
					marginBottom: '25px',
				}}
			>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}
					></Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navigation;
