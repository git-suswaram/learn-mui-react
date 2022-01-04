import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiFormControl-root': {
			width: '80%',
			margin: theme.spacing(1),
		},
	},
}));

export default useStyles;
