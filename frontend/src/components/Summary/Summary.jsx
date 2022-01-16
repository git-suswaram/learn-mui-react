import * as React from 'react';
import { styled, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Img = styled('img')({
	margin: 'auto',
	display: 'block',
	maxWidth: '100%',
	maxHeight: '100%',
});

const theme = createTheme({
	components: {
		MuiButtonBase: {
			defaultProps: {
				disabled: true,
			},
		},
	},
});

const useStyles = makeStyles((theme) => ({
	chipRoot: {
		padding: '10px',
		minWidth: '50px',
	},
	paperRoot: {
		backgroundColor: '#44464a',
	},
}));

const Summary = (props) => {
	const classes = useStyles();
	const { logo } = props;
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					display: 'flex',
					direction: 'column',

					width: '100%',
				}}
			>
				<Paper
					sx={{
						p: 2,
						flexGrow: 1,
						display: 'flex',
						direction: 'column',
						justifyContent: 'space-between',
						borderLeftColor: '#ae1e23',
						borderLeftStyle: 'solid',
						borderLeftWidth: '20px',

						// width: '100%',
						// flexWrap: 'wrap',
					}}
					style={{ borderRadius: '15px 0px 0px 15px' }}
				>
					<Grid container spacing={1}>
						<Grid item>
							<div>
								<Box
									sx={{
										display: 'flex',
										padding: '5px',
										width: 155,
										height: 44,
									}}
								>
									<Img alt='complex' src={logo} />
								</Box>
							</div>
							<div>
								<Box
									display='flex'
									justifyContent={'center'}
									sx={{ width: 155, height: 34, marginTop: '5px' }}
								>
									<Typography
										variant='body2'
										color='#44464a'
										fontWeight={'bold'}
									>
										Savings Account
									</Typography>
								</Box>
							</div>
							<div>
								<Box
									display='flex'
									paddingLeft='5px'
									justifyContent={'center'}
									sx={{ width: 155, height: 34 }}
								>
									<Chip label='Active' color='success' side='medium' />
								</Box>
							</div>
						</Grid>

						<Grid item xs={12} sm container>
							<Grid
								item
								xs
								container
								style={{
									display: 'flex',
									maxWidth: '440px',
								}}
								direction='column'
								spacing={2}
							>
								<Grid item xs>
									<Typography gutterBottom variant='subtitle1' component='div'>
										Account Number
									</Typography>
									<Typography variant='body2' gutterBottom>
										Primary account holder
									</Typography>
									<Typography variant='body2' color='text.secondary'>
										Secondary account holder
									</Typography>
								</Grid>
								{/* <Grid item>
									<Typography sx={{ cursor: 'pointer' }} variant='body2'>
										Remove
									</Typography>
								</Grid> */}
							</Grid>

							<Grid
								item
								container
								style={{ display: 'flex', width: '145px', margin: 'auto' }}
								spacing={2}
							>
								<Grid item>
									<Typography
										variant='subtitle1'
										component='div'
										sx={{
											display: 'flex',
											alignContent: 'center',
											justifyContent: 'center',
										}}
									>
										$ 10000000.00
									</Typography>
									<Typography
										variant='body2'
										component='div'
										// sx={{
										// 	display: 'flex',
										// 	alignContent: 'center',
										// 	justifyContent: 'center',
										// }}
									></Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Paper>

				<Paper
					classes={{ root: classes.paperRoot }}
					sx={{
						display: 'flex',
						justify: 'flex-end ',
					}}
					style={{ borderRadius: '0px 15px 15px 0px' }}
				>
					<Grid item display={'flex'} justify='flex-end'>
						<IconButton aria-label='settings'>
							<MoreVertIcon style={{ color: 'white' }} />
						</IconButton>
					</Grid>
				</Paper>
			</Box>
		</ThemeProvider>
	);
};

export default Summary;
