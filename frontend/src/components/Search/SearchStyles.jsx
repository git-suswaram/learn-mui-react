import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	searchInput: {
		// opacity: '0.8',
		padding: `8px ${theme.spacing(1)}`,
		borderRadius: '10px',
		margin: '10px 0px ',
		width: '400px',
		color: theme.palette.primary.dark,
		boxShadow: '-5px 8px #c9c8c8',
		'&:hover': {
			backgroundColor: '#f2f2f2',
		},
		'& .MuiSvgIcon-root': {
			marginRight: theme.spacing(1),
		},
		'& .MuiInputBase-inputAdornedStart': {
			opacity: '0.9',
			color: theme.palette.primary.dark,
		},
	},
	inputField: {
		color: 'black',
		fontSize: '1rem',
	},
}));

export default useStyles;
