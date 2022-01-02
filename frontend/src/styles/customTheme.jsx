import { createTheme } from '@mui/material';

const customTheme = createTheme({
	palette: {
		primary: {
			main: '#375a7f',
			light: '#adb5bd',
		},
		secondary: {
			main: '#444',
		},
	},
	shape: {
		borderRadius: '15px 15px',
	},
	typography: {
		fontFamily: ['Quicksand', 'Genos', 'Lobster Two', 'Caveat'].join(','),
		fontSize: 16,
	},
	overrides: {
		MuiAppBar: {
			root: {
				transform: 'translateZ(0)',
			},
		},
	},
	props: {
		MuiIconButton: {
			// disableRipple: 'true',
		},
	},
});
export default customTheme;
